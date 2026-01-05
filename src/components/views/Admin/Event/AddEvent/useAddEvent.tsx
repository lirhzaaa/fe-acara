import { DELAY } from "@/constants/list.constatns"
import useDebounce from "@/hooks/useDebounce"
import useMediaHandling from "@/hooks/useMediaHandling"
import categoryServices from "@/services/category.service"
import eventServices from "@/services/event.service"
import { IEvent } from "@/types/Event"
import { toDateStandard } from "@/utils/date"
import { addToast, DateValue } from "@heroui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { getLocalTimeZone, now } from "@internationalized/date"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as Yup from "yup"
type AddEventFormValues = Yup.InferType<typeof schema>;

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
        resolver: yupResolver(schema),
        defaultValues: {
            startDate: now(getLocalTimeZone()),
            endDate: now(getLocalTimeZone()),
        }
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
        queryFn: () => categoryServices.getCategories(),
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

    const handleAddEvent = (data: AddEventFormValues) => {
        const payload: IEvent = {
            ...data,
            isFeatured: Boolean(data.isFeatured),
            isPublish: Boolean(data.isPublish),
            isOnline: Boolean(data.isOnline),
            startDate: data.startDate ? toDateStandard(data.startDate) : "",
            endDate: data.endDate ? toDateStandard(data.endDate) : "",
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
        handleSubmitForm,
        errors,
        reset,

        handleAddEvent,
        isPendingMutateAddEvent,
        isSuccessMutateAddEvent,

        preview,
        handleUploadBanner,
        handleDeleteBanner,
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,

        dataCategory,
        dataRegion,
        searchRegency,
        handleSearchRegion,
        handleOnClose,
    }
}

export default useAddEvent