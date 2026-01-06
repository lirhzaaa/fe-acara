import ticketServices from "@/services/ticket.service"
import { ITicket } from "@/types/Ticket"
import { addToast } from "@heroui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

const schema = Yup.object().shape({
    name: Yup.string().required("Please input name"),
    price: Yup.string().required("Please input price"),
    quantity: Yup.string().required("Please input quantity"),
    description: Yup.string().required("Please input description"),
})

const useUpdateTicket = (id: string) => {
    const router = useRouter()

    const {
        control, handleSubmit: handleSubmitForm, formState: { errors }, reset, setValue: setValueUpdateTicket
    } = useForm({
        resolver: yupResolver(schema),
    })

    const updateTicket = async (payload: ITicket) => {
        return await ticketServices.updateTicket(id, payload)
    }

    const { mutate: mutateUpdateTicket, isPending: isPendingMutateUpdateTicket, isSuccess: isSuccessMutateUpdateTicket } = useMutation({
        mutationFn: updateTicket,
        onError: (error) => {
            addToast({
                title: "Terjadi Kesalahan",
                description: error.message,
                color: "danger"
            })
        },
        onSuccess: () => {
            addToast({
                title: "Success",
                description: "Success update ticket",
                color: "success"
            })
            reset()
        }
    })

    const handleUpdateTicket = (data: ITicket) => {
        data.events = `${router.query.id}`
        data.price = Number(data.price)
        data.quantity = Number(data.quantity)
        mutateUpdateTicket(data)
    }

    return {
        control,
        errors,
        reset,
        setValueUpdateTicket,
        handleSubmitForm,

        handleUpdateTicket,
        isPendingMutateUpdateTicket,
        isSuccessMutateUpdateTicket
    }
}

export default useUpdateTicket