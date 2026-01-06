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

const useAddTicket = () => {
    const router = useRouter()

    const {
        control, handleSubmit: handleSubmitForm, formState: { errors }, reset
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            price: undefined,
            quantity: undefined,
            description: "",
        }
    })

    const addTicket = async (payload: ITicket) => {
        return await ticketServices.addTicket(payload)
    }

    const { mutate: mutateAddTicket, isPending: isPendingMutateAddTicket, isSuccess: isSuccessMutateAddTicket } = useMutation({
        mutationFn: addTicket,
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
                description: "Success add ticket",
                color: "success"
            })
            reset()
        }
    })

    const handleAddTicket = (data: ITicket) => {
        data.events = `${router.query.id}`
        data.price = Number(data.price)
        data.quantity = Number(data.quantity)
        mutateAddTicket(data)
    }

    return {
        control,
        errors,
        reset,
        handleSubmitForm,

        handleAddTicket,
        isPendingMutateAddTicket,
        isSuccessMutateAddTicket
    }
}

export default useAddTicket