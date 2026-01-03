import categoryServices from "@/services/category.service"
import { ICategory } from "@/types/Category"
import { addToast } from "@heroui/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

const useDetailCategory = () => {
    const { query, isReady } = useRouter()

    const {
        mutate: mutateUpdateCategory,
        isPending: isPendingMutateUpdateCategory,
        isSuccess: isSuccessMutateUpdateCategory
    } = useMutation({
        mutationFn: (payload: ICategory) => updateCategory(payload),
        onError: (error) => {
            addToast({
                title: "Error",
                description: error.message,
                color: "danger"
            })
        },
        onSuccess: () => {
            refetchCategory()
            addToast({
                title: "Success",
                description: "Success Update Category",
                color: "success"
            })
        }
    })

    const getCategoryById = async (id: string) => {
        const { data } = await categoryServices.getCategoriesById(id)
        return data.data
    }

    const { data: dataCategory, refetch: refetchCategory } = useQuery({
        queryKey: ["Categories"],
        queryFn: () => getCategoryById(`${query.id}`),
        enabled: isReady
    })

    const updateCategory = async (payload: ICategory) => {
        const { data } = await categoryServices.updateCategories(`${query.id}`, payload)
        return data.data
    }

    const handleUpdateCategory = (data: ICategory) => mutateUpdateCategory(data)

    return {
        dataCategory,

        handleUpdateCategory,
        mutateUpdateCategory,
        isPendingMutateUpdateCategory,
        isSuccessMutateUpdateCategory,

    }
}

export default useDetailCategory