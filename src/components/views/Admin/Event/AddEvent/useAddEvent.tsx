import useMediaHandling from "@/hooks/useMediaHandling"
import categoryServices from "@/services/category.service"
import { ICategory } from "@/types/Category"
import { addToast, DateValue } from "@heroui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
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
    banner: Yup.mixed<FileList | string>().required("Please input icon")
})

const useAddEvent = () => {
    const {
        mutateUploadFile,
        isPendingMutateUploadFile,
        mutateDeleteFile,
        isPendingMutateDeleteFile
    } = useMediaHandling()

    const {
        control, handleSubmit: handleSubmitForm, formState: { errors }, reset, watch, getValues, setValue
    } = useForm({
        resolver: yupResolver(schema)
    })

    const preview = watch("banner")

    const handleUploadBanner = (files: FileList, onChange: (files: FileList | undefined) => void) => {
        if (files.length !== 0) {
            onChange(files)
            mutateUploadFile({
                file: files[0],
                callback: (fileUrl: string) => {
                    setValue("banner", fileUrl)
                }
            })
        }
    }

    const handleDeleteBanner = (
        onchange: (files: FileList | undefined) => void
    ) => {
        const fileUrl = getValues("banner")
        if (typeof fileUrl === "string") {
            mutateDeleteFile({ fileUrl, callback: () => onchange(undefined) })
        }
    }

    const handleOnClose = (onClose: () => void) => {
        const fileUrl = getValues("banner")
        if (typeof fileUrl === "string") {
            mutateDeleteFile({
                fileUrl, callback: () => {
                    reset()
                    onClose()
                }
            })
        } else {
            reset();
            onClose()
        }
    }

    const addEvent = async (payload: ICategory) => {
        return await categoryServices.addCategories(payload)
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
                description: "Success add category",
                color: "success"
            })
            reset()
        }
    })

    const handleAddEvent = (data: ICategory) => mutateAddEvent(data)

    return {
        control,
        errors,
        reset,
        handleSubmitForm,

        handleAddEvent,
        isPendingMutateAddEvent,
        isSuccessMutateAddEvent,

        preview,
        handleUploadIcon,
        handleDeleteIcon,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,

        handleOnClose
    }
}

export default useAddEvent