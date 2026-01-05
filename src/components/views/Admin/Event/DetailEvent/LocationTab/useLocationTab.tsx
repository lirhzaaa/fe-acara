import { DELAY } from "@/constants/list.constatns"
import useDebounce from "@/hooks/useDebounce"
import eventServices from "@/services/event.service"
import { IEventForm } from "@/types/Event"
import { yupResolver } from "@hookform/resolvers/yup"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

const schemaUpdateLocation = Yup.object().shape({
    isOnline: Yup.string().required("Please select online/offline"),
    latitude: Yup.string().required("Please input latitude"),
    longitude: Yup.string().required("Please input longitude"),
    region: Yup.number().required("Please select region"),
})

const useLocationTab = () => {
    const debounce = useDebounce()

    const form = useForm({
        resolver: yupResolver(schemaUpdateLocation),
        defaultValues: {
            isOnline: "",
            latitude: "",
            longitude: "",
            region: undefined,
        },
    })

    const handleSubmitUpdateLocation = (
        onValid: (data: IEventForm) => void
    ) =>
        form.handleSubmit((data) => {
            onValid({
                ...data,
                isOnline: data.isOnline === "true",
            })
        })

    const [searchRegency, setSearchRegency] = useState<string>("")

    const { data: dataRegion } = useQuery({
        queryKey: ["region", searchRegency],
        queryFn: () =>
            eventServices.searchLocationByRegency(`${searchRegency}`),
        enabled: searchRegency !== "",
    })

    const handleSearchRegion = (region: string) => {
        debounce(() => setSearchRegency(region), DELAY)
    }

    return {
        dataRegion,
        handleSearchRegion,
        searchRegency,

        controlUpdateLocation: form.control,
        handleSubmitUpdateLocation,
        errorsUpdateLocation: form.formState.errors,
        resetUpdateLocation: form.reset,
        setValueUpdateLocation: form.setValue,
    }
}

export default useLocationTab