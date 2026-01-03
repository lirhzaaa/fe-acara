import { DELAY } from "@/constants/list.constatns"
import useDebounce from "@/hooks/useDebounce"
import useMediaHandling from "@/hooks/useMediaHandling"
import eventServices from "@/services/event.service"
import { IEvent, IEventForm } from "@/types/Event"
import { toDateStandard } from "@/utils/date"
import { addToast, DateValue } from "@heroui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

const schema = Yup.object().shape({
    name: Yup.string().required("Please input name"),
    slug: Yup.string().required("Please input slug"),
    category: Yup.string().required("Please select category"),
    startDate: Yup.mixed<DateValue>().required("Please select start date"),
    endDate: Yup.mixed<DateValue>().required("Please select end date"),
    isPublish: Yup.string().required("Please select status"),
    isFeatured: Yup.string().required("Please select featured"),
    description: Yup.string().required("Please input description"),
    isOnline: Yup.string().required("Please select online or offline"),
    region: Yup.string().required("Please select region"),
    latitude: Yup.string().required("Please input latitude coordinate"),
    longitude: Yup.string().required("Please input longitude coordinate"),
    banner: Yup.mixed<FileList | string>().required("Please input Banner")
})

const useAddEvent = () => {
    const router = useRouter()
    const debounce = useDebounce()

    const {
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,

        handleUploadFile,
        handleDeleteFile,
    } = useMediaHandling()

    const {
        control, handleSubmit: handleSubmitForm, formState: { errors }, reset, watch, getValues, setValue
    } = useForm({
        resolver: yupResolver(schema)
    })

    const preview = watch("banner")
    const fileUrl = getValues("banner")

    const handleUploadBanner = (files: FileList, onChange: (files: FileList | undefined) => void) => {
        handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
            if (fileUrl) {
                setValue("banner", fileUrl)
            }
        })
    }

    const handleDeleteBanner = (
        onChange: (files: FileList | undefined) => void
    ) => {
        handleDeleteFile(fileUrl, () => onChange(undefined))
    }

    const handleOnClose = (onClose: () => void) => {
        handleDeleteFile(fileUrl, () => {
            reset()
            onClose()
        })
    }

    const { data: dataCategory } = useQuery({
        queryKey: ["Categories"],
        queryFn: () => eventServices.getEvents(),
        enabled: router.isReady,
    });

    const [searchRegency, setSearchRegency] = useState<string>("")

    const { data: dataRegion } = useQuery({
        queryKey: ["region", searchRegency],
        queryFn: () => eventServices.searchLocationByRegency(`${searchRegency}`),
        enabled: searchRegency !== ""
    })

    const handleSearchRegion = (region: string) => {
        debounce(() => setSearchRegency(region), DELAY)
    }

    const addEvent = async (payload: IEvent) => {
        return await eventServices.addEvents(payload)
    }

    const { mutate: mutateAddEvent, isPending: isPendingMutateAddEvent, isSuccess: isSuccessMutateAddEvent } = useMutation({
        mutationFn: addEvent,
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
                description: "Success add event",
                color: "success"
            })
            reset()
        }
    })

    const handleAddEvent = (data: IEventForm) => {
        const payload = {
            ...data,
            isFeatured: Boolean(data.isFeatured),
            isPublish: Boolean(data.isPublish),
            isOnline: Boolean(data.isOnline),
            startDate: toDateStandard(data.startDate),
            endDate: toDateStandard(data.endDate),
            location: {
                region: data.region,
                coordinates: [Number(data.latitude), Number(data.longitude)]
            },
            banner: data.banner
        }
        mutateAddEvent(payload)
    }

    return {
        control,
        errors,
        reset,
        handleSubmitForm,

        handleAddEvent,
        isPendingMutateAddEvent,
        isSuccessMutateAddEvent,

        preview,
        handleUploadBanner,
        handleDeleteBanner,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,

        handleOnClose,

        dataCategory,
        dataRegion,
        searchRegency,
        handleSearchRegion
    }
}

export default useAddEvent