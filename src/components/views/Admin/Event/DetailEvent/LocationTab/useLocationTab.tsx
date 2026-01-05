import { DELAY } from "@/constants/list.constatns"
import useDebounce from "@/hooks/useDebounce"
import eventServices from "@/services/event.service"
import { yupResolver } from "@hookform/resolvers/yup"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

const schemaUpdateLocation = Yup.object().shape({
    isOnline: Yup.boolean().required("Please select online/offline"),
    latitude: Yup.string().required("Please input latitude"),
    longitude: Yup.string().required("Please input logitude"),
    region: Yup.string().required("Please select region"),
})

const useLocationTab = () => {
    const debounce = useDebounce()

    const {
        control: controlUpdateLocation,
        handleSubmit: handleSubmitUpdateLocation,
        formState: { errors: errorsUpdateLocation },
        reset: resetUpdateLocation,
        setValue: setValueUpdateLocation
    } = useForm({
        resolver: yupResolver(schemaUpdateLocation),
        defaultValues: {
            isOnline: false,
            latitude: "",
            longitude: "",
            region: "",
        }
    })

    const [searchRegency, setSearchRegency] = useState<string>("")

    const { data: dataRegion } = useQuery({
        queryKey: ["region", searchRegency],
        queryFn: () => eventServices.searchLocationByRegency(`${searchRegency}`),
        enabled: searchRegency !== ""
    })

    const handleSearchRegion = (region: string) => {
        debounce(() => setSearchRegency(region), DELAY)
    }

    return {
        dataRegion,
        handleSearchRegion,
        searchRegency,

        controlUpdateLocation,
        handleSubmitUpdateLocation,
        errorsUpdateLocation,
        resetUpdateLocation,
        setValueUpdateLocation
    }
}

export default useLocationTab