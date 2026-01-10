import eventServices from "@/services/event.service"
import ticketServices from "@/services/ticket.service"
import { ICart, ITicket } from "@/types/Ticket"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useMemo, useState } from "react"
import { defaultCart } from "./DetailEvent.constants"

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
            ticket,
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

    return {
        dataDetailEvent,
        dataTicket,

        isLoadingDetailEvent,
        isLoadingTicket,

        cart,
        dataTicketInCart,
        handleAddToCart,
        handleChangeQuantity
    }
}

export default useDetailEvent