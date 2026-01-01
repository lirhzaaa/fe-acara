import categoryServices from "@/services/category.service"
import uploadService from "@/services/upload.service"
import { ICategory, ICategoryForm } from "@/types/Category"
import { addToast } from "@heroui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

const schema = Yup.object().shape({
    name: Yup.string().required("Please input name"),
    description: Yup.string().required("Please input description"),
    icon: Yup.mixed<FileList>().required("Please input icon")
})

const useAddCategory = () => {
    const {
        control, handleSubmit: handleSubmitForm, formState: { errors }, reset
    } = useForm<ICategoryForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            description: "",
            icon: undefined as unknown as FileList
        }
    })

    const uploadIcon = async (data: ICategoryForm) => {
        const file = data.icon.item(0)
        const formData = new FormData()
        formData.append("file", file as File)
        const {
            data: { data: { secure_url: icon } }
        } = await uploadService.uploadFile(formData)
        return { name: data.name, description: data.description, icon }
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

    const { mutate: mutateAddFile, isPending: isPendingMutateAddFile } = useMutation({
        mutationFn: uploadIcon,
        onError: (error) => {
            addToast({
                title: "Terjadi Kesalahan",
                description: error.message,
                color: "danger"
            })
        },
        onSuccess: (payload) => {
            mutateAddCategory(payload)
        }
    })

    const handleAddCategory = (data: ICategoryForm) => mutateAddFile(data)

    return {
        control,
        errors,
        reset,
        handleSubmitForm,
        handleAddCategory,
        isPendingMutateAddCategory,
        isSuccessMutateAddCategory,
        isPendingMutateAddFile,
    }
}

export default useAddCategory