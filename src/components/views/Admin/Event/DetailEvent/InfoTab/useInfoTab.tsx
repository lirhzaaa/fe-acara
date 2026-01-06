import categoryServices from "@/services/category.service"
import { DateValue } from "@heroui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

const schemaUpdateInformation = Yup.object().shape({
    name: Yup.string().required("please input name"),
    slug: Yup.string().required("please input slug"),
    category: Yup.string().required("please input category"),
    startDate: Yup.mixed<DateValue>().required("please input start date"),
    endDate: Yup.mixed<DateValue>().required("please input end date"),
    isPublish: Yup.string().required("please input status"),
    isFeatured: Yup.string().required("please input featured"),
    description: Yup.string().required("please input description"),
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
            isPublish: "",
            isFeatured: "",
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