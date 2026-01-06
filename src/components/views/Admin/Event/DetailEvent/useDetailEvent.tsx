import eventServices from "@/services/event.service"
import { IEvent, IEventForm } from "@/types/Event"
import { toDateStandard } from "@/utils/date"
import { addToast } from "@heroui/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

const useDetailEvent = () => {
    const { query, isReady } = useRouter()

    const {
        mutate: mutateUpdateEvent,
        isPending: isPendingMutateEvent,
        isSuccess: isSuccessMutateEvent,
    } = useMutation({
        mutationFn: (payload: IEvent) => updateEvent(payload),
        onError: (error) => {
            addToast({
                title: "Error",
                description: error.message,
                color: "danger"
            })
        },
        onSuccess: () => {
            refetchEvent()
            addToast({
                title: "Success",
                description: "Success Update Event",
                color: "success"
            })
        }
    })

    const getEventById = async (id: string) => {
        const { data } = await eventServices.getEventsById(id)
        return data.data
    }

    const { data: dataEvent, refetch: refetchEvent } = useQuery({
        queryKey: ["events"],
        queryFn: () => getEventById(`${query.id}`),
        enabled: isReady
    })

    const updateEvent = async (payload: IEvent) => {
        const { data } = await eventServices.updateEvents(`${query.id}`, payload)
        return data.data
    }

    const handleUpdateEvent = (data: IEventForm) => {
        const payload = {
            ...data,
            isFeatured: data.isFeatured !== undefined ? data.isFeatured : dataEvent.isFeatured,
            isPublish: data.isPublish !== undefined ? data.isPublish : dataEvent.isPublish,
            isOnline: data.isOnline !== undefined ? data.isOnline : dataEvent.isOnline,
            startDate: data.startDate ? toDateStandard(data.startDate) : dataEvent.startDate,
            endDate: data.endDate ? toDateStandard(data.endDate) : dataEvent.endDate,
            location: {
                region: data.region || dataEvent.location.region,
                coordinates: [
                    data.latitude ? data.latitude : dataEvent.location.coordinates[0],
                    data.longitude ? data.longitude : dataEvent.location.coordinates[1],
                ]
            },

            banner: data.banner || dataEvent.banner
        }
        mutateUpdateEvent(payload)
    }

    const { data: dataDefaultRegion, isPending: isPendingUpdateRegion } = useQuery({
        queryKey: ["regency"],
        queryFn: () => eventServices.getRegencyById(dataEvent?.location?.region),
        enabled: !!dataEvent?.location?.region
    })

    return {
        dataEvent,
        handleUpdateEvent,
        mutateUpdateEvent,

        dataDefaultRegion,
        isPendingUpdateRegion,

        isPendingMutateEvent,
        isSuccessMutateEvent
    }
}

export default useDetailEvent