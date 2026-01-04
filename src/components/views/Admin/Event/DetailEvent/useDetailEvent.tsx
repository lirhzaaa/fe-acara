import eventServices from "@/services/event.service"
import { IEvent } from "@/types/Event"
import { addToast } from "@heroui/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

const useDetailEvent = () => {
    const { query, isReady } = useRouter()

    // const {
    //     mutate: mutateUpdateEvent,
    //     isPending: isPendingMutateEvent,
    //     isSuccess: isSuccessMutateEvent,
    // } = useMutation({
    //     mutationFn: (payload: IEvent) => UpdateEvent(payload),
    //     onError: (error) => {
    //         addToast({
    //             title: "Error",
    //             description: error.message,
    //             color: "danger"
    //         })
    //     },
    //     onSuccess: () => {
    //         addToast({
    //             title: "Success",
    //             description: "Success Update Event",
    //             color: "success"
    //         })
    //     }
    // })


    const getEventById = async (id: string) => {
        const { data } = await eventServices.getEvents(id)
        return data.data
    }

    const { data: dataEvent, refetch: refetchEvent } = useQuery({
        queryKey: ["events"],
        queryFn: () => getEventById(`${query.id}`),
        enabled: isReady
    })

    return {
        dataEvent,

        // mutateUpdateEvent,


        // isPendingMutateEvent,
        // isSuccessMutateEvent
    }
}

export default useDetailEvent