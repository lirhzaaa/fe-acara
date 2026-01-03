import eventServices from "@/services/event.service"
import { addToast } from "@heroui/react"
import { useMutation } from "@tanstack/react-query"

const useDeleteEvent = () => {
    const deleteEvent = async (id: string) => {
        return await eventServices.deleteEvents(id)
    }

    const {
        mutate: mutateDeleteEvent,
        isPending: isPendingDeleteEvent,
        isSuccess: isSuccessDeleteEvent
    } = useMutation({
        mutationFn: deleteEvent,
        onError: (error) => {
            addToast({
                title: "Error",
                description: error.message,
                color: "danger"
            })
        },
        onSuccess: () => {
            addToast({
                title: "Success",
                description: " Delete Event Success",
                color: "success"
            })
        }
    })

    return {
        mutateDeleteEvent,
        isPendingDeleteEvent,
        isSuccessDeleteEvent
    }
}

export default useDeleteEvent