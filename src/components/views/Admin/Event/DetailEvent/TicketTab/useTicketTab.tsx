import ticketServices from "@/services/ticket.service"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

const useTicketTab = () => {
    const { query, isReady } = useRouter()

    const getTicketByEventId = async () => {
        const { data } = await ticketServices.getTicketByEventId(`${query.id}`)
        return data.data
    }

    const { data: dataTicket, refetch: refetchTicket, isPending: isPendingTicket, isRefetching: isRefetchingTicket} = useQuery({
        queryKey: ["Tickets"],
        queryFn: getTicketByEventId,
        enabled: isReady
    })

    // const updateEvent = async (payload: IEvent) => {
    //     const { data } = await eventServices.updateEvents(`${query.id}`, payload)
    //     return data.data
    // }

    // const handleUpdateEvent = (data: IEventForm) => {
    //     const payload = {
    //         ...data,
    //         isFeatured: data.isFeatured !== undefined ? data.isFeatured : dataEvent.isFeatured,
    //         isPublish: data.isPublish !== undefined ? data.isPublish : dataEvent.isPublish,
    //         isOnline: data.isOnline !== undefined ? data.isOnline : dataEvent.isOnline,
    //         startDate: data.startDate ? toDateStandard(data.startDate) : dataEvent.startDate,
    //         endDate: data.endDate ? toDateStandard(data.endDate) : dataEvent.endDate,
    //         location: {
    //             region: data.region || dataEvent.location.region,
    //             coordinates: [
    //                 data.latitude ? data.latitude : dataEvent.location.coordinates[0],
    //                 data.longitude ? data.longitude : dataEvent.location.coordinates[1],
    //             ]
    //         },

    //         banner: data.banner || dataEvent.banner
    //     }
    //     mutateUpdateEvent(payload)
    // }


    return {
        dataTicket,
        refetchTicket,
        isPendingTicket,
        isRefetchingTicket
    }
}

export default useTicketTab
