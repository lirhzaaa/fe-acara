import categoryServices from "@/services/category.service"
import { DateValue } from "@heroui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

const schemaUpdateInformation = Yup.object().shape({
    name: Yup.string().required(),
    slug: Yup.string().required(),
    category: Yup.string().required(),
    startDate: Yup.mixed<DateValue>().required(),
    endDate: Yup.mixed<DateValue>().required(),
    isPublish: Yup.boolean().required(),
    isFeatured: Yup.boolean().required(),
    description: Yup.string().required(),
})


const useInfoTab = () => {
    const {
        control: controlUpdateInformation,
        handleSubmit: handleSubmitUpdateInformation,
        formState: { errors: errorsUpdateInformation },
        reset: resetUpdateInformation,
        setValue: setValueUpdateInformation
    } = useForm({
        resolver: yupResolver(schemaUpdateInformation),
        defaultValues: {
            name: "",
            slug: "",
            category: "",
            startDate: undefined,
            endDate: undefined,
            isPublish: false,
            isFeatured: false,
            description: "",
        }
    })


    const { data: dataCategory } = useQuery({
        queryKey: ["Categories"],
        queryFn: () => categoryServices.getCategories(),
        enabled: true
    })

    return {
        dataCategory,

        controlUpdateInformation,
        handleSubmitUpdateInformation,
        errorsUpdateInformation,
        resetUpdateInformation,
        setValueUpdateInformation
    }
}

export default useInfoTab