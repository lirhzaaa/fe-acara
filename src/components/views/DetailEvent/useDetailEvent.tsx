import eventServices from "@/services/event.service"
import ticketServices from "@/services/ticket.service"
import { ICart, ITicket } from "@/types/Ticket"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { defaultCart } from "./DetailEvent.constants"
import orderServices from "@/services/order.service"
import { addToast } from "@heroui/react"

const useDetailEvent = () => {
    const router = useRouter()

    const getEventBySlug = async () => {
        const { data } = await eventServices.getEventsySlug(`${router.query.slug}`)
        return data.data
    }

    const { data: dataDetailEvent, isLoading: isLoadingDetailEvent } = useQuery({
        queryKey: ["Event By Slug"],
        queryFn: getEventBySlug,
        enabled: router.isReady
    })

    const getTicketByEventId = async () => {
        const { data } = await ticketServices.getTicketByEventId(`${dataDetailEvent._id}`)
        return data.data
    }

    const { data: dataTicket, isLoading: isLoadingTicket } = useQuery({
        queryKey: ["Tickets"],
        queryFn: getTicketByEventId,
        enabled: !!dataDetailEvent?._id
    })

    const [cart, setCart] = useState<ICart>(defaultCart)

    const dataTicketInCart = useMemo(() => {
        if (dataTicket) {
            return dataTicket.find((ticket: ITicket) => ticket._id === cart.ticket)
        }
        return null
    }, [dataTicket, cart])

    const handleAddToCart = (ticket: ITicket) => {
        setCart({
            events: dataDetailEvent._id as string,
            ticket: ticket._id as string,
            quantity: 1
        })
    }

    const handleChangeQuantity = (type: "increment" | "decrement") => {
        if (!dataTicketInCart) return
        if (type === "increment") {
            if (cart.quantity < dataTicketInCart.quantity) {
                setCart(prev => ({
                    ...prev,
                    quantity: prev.quantity + 1
                }))
            }
            return
        }

        if (cart.quantity <= 1) {
            setCart(defaultCart)
            return
        }

        setCart(prev => ({
            ...prev,
            quantity: prev.quantity - 1
        }))
    }

    const createOrder = async () => {
        const { data } = await orderServices.createOrder(cart)
        return data.data
    }

    const { mutate: mutateCreateOrder, isPending: isPendingCreateOrder } = useMutation({
        mutationFn: createOrder,
        onError: (error) => {
            addToast({
                title: "Error",
                description: error.message,
                color: "danger"
            })
        },
onSuccess: (result) => {
    if (result.payment?.token) {
        const transactionToken = result.payment.token;
        window.snap.pay(transactionToken, {
            onSuccess: function(result) {
                router.push(`/payment/success?order_id=${result.order_id}`)
            },
            onPending: function(result) {
                router.push(`/payment/pending?order_id=${result.order_id}`)
            },
            onError: function(result) {
                router.push(`/payment/error?order_id=${result.order_id}`)
            },
            onClose: function() {
                addToast({
                    title: "Cancelled",
                    description: "Payment was cancelled.",
                    color: "warning"
                })
            }
        })
    } else {
        addToast({
            title: "Order Created",
            description: "Your order has been created successfully.",
            color: "success"
        })
        router.push('/member/transaction')
    }
}
    })

    return {
        dataDetailEvent,
        dataTicket,

        isLoadingDetailEvent,
        isLoadingTicket,

        cart,
        dataTicketInCart,
        handleAddToCart,
        handleChangeQuantity,

        mutateCreateOrder,
        isPendingCreateOrder
    }
}

export default useDetailEvent