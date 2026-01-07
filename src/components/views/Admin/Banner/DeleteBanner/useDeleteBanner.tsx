import bannerServices from "@/services/banner.service"
import { addToast } from "@heroui/react"
import { useMutation } from "@tanstack/react-query"

const useDeleteBanner = () => {
    const deleteBanner = async (id: string) => {
        return await bannerServices.deleteBanners(id)
    }

    const {
        mutate: mutateDeleteBanner,
        isPending: isPendingDeleteBanner,
        isSuccess: isSuccessDeleteBanner
    } = useMutation({
        mutationFn: deleteBanner,
        onError: (error) => {
            addToast({
                title: "Error",
                description: error.message,
                color: "danger"
            })
        },
        onSuccess: () => {
            addToast({
                title: "Success",
                description: "Delete Banner Success",
                color: "success"
            })
        }
    })

    return {
        mutateDeleteBanner,
        isPendingDeleteBanner,
        isSuccessDeleteBanner
    }
}

export default useDeleteBanner