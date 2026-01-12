import eventServices from "@/services/event.service"
import orderServices from "@/services/order.service"
import ticketServices from "@/services/ticket.service"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

const useDetailTransaction = () => {
    const router = useRouter()

    const getOrderById = async () => {
        const { data } = await orderServices.getOrderById(`${router.query.id}`)
        return data.data
    }

    const { data: dataOrder } = useQuery({
        queryKey: ["Order"],
        queryFn: getOrderById,
        enabled: router.isReady
    })

    const getEventById = async () => {
        const { data } = await eventServices.getEventById(`${dataOrder.events}`)
        return data.data
    }

    const { data: dataEvent } = useQuery({
        queryKey: ["events"],
        queryFn: getEventById,
        enabled: !!dataOrder?.events
    })

    const getTicketById = async () => {
        const { data } = await ticketServices.getTicketById(`${dataOrder.ticket}`)
        return data.data
    }

    const { data: dataTicket } = useQuery({
        queryKey: ["Tickets"],
        queryFn: getTicketById,
        enabled: !!dataOrder?.ticket
    })

    return {
        dataOrder,
        dataEvent,
        dataTicket
    }
}

export default useDetailTransaction