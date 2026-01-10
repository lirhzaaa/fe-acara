import eventServices from "@/services/event.service"
import ticketServices from "@/services/ticket.service"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

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

    return {
        dataDetailEvent,
        dataTicket,

        isLoadingDetailEvent,
        isLoadingTicket
    }
}

export default useDetailEvent