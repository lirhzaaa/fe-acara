import useMediaHandling from "@/hooks/useMediaHandling"
import categoryServices from "@/services/category.service"
import { ICategory } from "@/types/Category"
import { addToast } from "@heroui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

type CategoryForm = {
    name: string
    description: string
    icon: string | FileList
}

const schema = Yup.object().shape({
    name: Yup.string().required("Please input name"),
    description: Yup.string().required("Please input description"),
    icon: Yup.mixed<FileList | string>().required("Please input icon")
})

const useAddCategory = () => {
    const {
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,

        handleUploadFile,
        handleDeleteFile,
    } = useMediaHandling()

    const {
        control, handleSubmit: handleSubmitForm, formState: { errors }, reset, watch, getValues, setValue
    } = useForm<CategoryForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            description: "",
            icon: undefined as unknown as FileList
        }
    })

    const preview = watch("icon")
    const fileUrl = getValues("icon")

    const handleUploadIcon = (files: FileList, onChange: (files: FileList | undefined) => void) => {
        handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
            if (fileUrl) {
                setValue("icon", fileUrl)
            }
        })
    }

    const handleDeleteIcon = (
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