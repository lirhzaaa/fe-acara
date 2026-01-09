import categoryServices from "@/services/category.service"
import eventServices from "@/services/event.service"
import { yupResolver } from "@hookform/resolvers/yup"
import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

const schema = Yup.object().shape({
    category: Yup.string().required("Please select category"),
    isOnline: Yup.string().required("Please select online/offline"),
    isFeatured: Yup.string().required("Please select featured"),
})

const useEventFilter = () => {
    const {
        data: dataCategory,
        isSuccess: isSuccessGetCategory,
    } = useQuery({
        queryKey: ["Categories"],
        queryFn: () => categoryServices.getCategories()
    });

    const {
        data: dataEvent,
        isSuccess: isSuccessGetEvent,
    } = useQuery({
        queryKey: ["Featured"],
        queryFn: () => eventServices.getEvents()
    });

    const {
        control,
        reset,
        setValue
    } = useForm({
        resolver: yupResolver(schema),
    })

    return {
        control,
        setValue,

        dataCategory,
        dataEvent,

        isSuccessGetCategory,
        isSuccessGetEvent
    }
}

export default useEventFilter