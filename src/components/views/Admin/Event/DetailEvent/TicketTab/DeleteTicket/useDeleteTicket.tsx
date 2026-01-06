import ticketServices from "@/services/ticket.service"
import { addToast } from "@heroui/react"
import { useMutation } from "@tanstack/react-query"

const useDeleteTicket = () => {
    const deleteTicket = async (id: string) => {
        return await ticketServices.deleteTicket(id)
    }

    const {
        mutate: mutateDeleteTicket,
        isPending: isPendingDeleteTicket,
        isSuccess: isSuccessDeleteTicket
    } = useMutation({
        mutationFn: deleteTicket,
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
                description: "Delete Ticket Success",
                color: "success"
            })
        }
    })

    return {
        mutateDeleteTicket,
        isPendingDeleteTicket,
        isSuccessDeleteTicket
    }
}

export default useDeleteTicket