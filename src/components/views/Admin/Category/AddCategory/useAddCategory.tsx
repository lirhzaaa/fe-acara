import useMediaHandling from "@/hooks/useMediaHandling"
import categoryServices from "@/services/category.service"
import { ICategory } from "@/types/Category"
import { addToast } from "@heroui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

const schema = Yup.object().shape({
    name: Yup.string().required("Please input name"),
    description: Yup.string().required("Please input description"),
    icon: Yup.mixed<FileList | string>().required("Please input icon")
})

const useAddCategory = () => {
    const {
        mutateUploadFile,
        isPendingMutateUploadFile,
        mutateDeleteFile,
        isPendingMutateDeleteFile
    } = useMediaHandling()

    const {
        control, handleSubmit: handleSubmitForm, formState: { errors }, reset, watch, getValues, setValue
    } = useForm<ICategory>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            description: "",
            icon: undefined as unknown as FileList
        }
    })

    const preview = watch("icon")

    const handleUploadIcon = (files: FileList, onChange: (files: FileList | undefined) => void) => {
        if (files.length !== 0) {
            onChange(files)
            mutateUploadFile({
                file: files[0],
                callback: (fileUrl: string) => {
                    setValue("icon", fileUrl)
                }
            })
        }
    }

    const handleDeleteIcon = (
        onchange: (files: FileList | undefined) => void
    ) => {
        const fileUrl = getValues("icon")
        if (typeof fileUrl === "string") {
            mutateDeleteFile({ fileUrl, callback: () => onchange(undefined) })
        }
    }

    const handleOnClose = (onClose: () => void) => {
        const fileUrl = getValues("icon")
        if (typeof fileUrl === "string") {
            mutateDeleteFile({ fileUrl, callback: () => {
                reset()
                onClose()
            } })
        } else {
            reset();
            onClose()
        }
    }

    const addCategory = async (payload: ICategory) => {
        return await categoryServices.addCategories(payload)
    }

    const { mutate: mutateAddCategory, isPending: isPendingMutateAddCategory, isSuccess: isSuccessMutateAddCategory } = useMutation({
        mutationFn: addCategory,
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

    const handleAddCategory = (data: ICategory) => mutateAddCategory(data)

    return {
        control,
        errors,
        reset,
        handleSubmitForm,

        handleAddCategory,
        isPendingMutateAddCategory,
        isSuccessMutateAddCategory,

        preview,
        handleUploadIcon,
        handleDeleteIcon,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,

        handleOnClose
    }
}

export default useAddCategory