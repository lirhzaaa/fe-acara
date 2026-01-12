import bannerServices from "@/services/banner.service"
import { IBanner } from "@/types/Banner"
import { addToast } from "@heroui/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

const useDetailBanner = () => {
    const { query, isReady } = useRouter()

    const {
        mutate: mutateUpdateBanner,
        isPending: isPendingMutateUpdateBanner,
        isSuccess: isSuccessMutateUpdateBanner
    } = useMutation({
        mutationFn: (payload: Partial<IBanner>) => updateBanner(payload),
        onError: (error) => {
            addToast({
                title: "Error",
                description: error.message,
                color: "danger"
            })
        },
        onSuccess: () => {
            refetchBanner()
            addToast({
                title: "Success",
                description: "Success Update Banner",
                color: "success"
            })
        }
    })

    const getBannersById = async (id: string) => {
        const { data } = await bannerServices.getBannersById(id)
        return data.data
    }

    const { data: dataBanner, refetch: refetchBanner } = useQuery({
        queryKey: ["Banners"],
        queryFn: () => getBannersById(`${query.id}`),
        enabled: isReady
    })

    const updateBanner = async (payload: Partial<IBanner>) => {
        const { data } = await bannerServices.updateBanners(`${query.id}`, payload)
        return data.data
    }

    const handleUpdateBanner = (data: Partial<IBanner>) => mutateUpdateBanner(data as IBanner)

    return {
        dataBanner,

        handleUpdateBanner,
        mutateUpdateBanner,
        isPendingMutateUpdateBanner,
        isSuccessMutateUpdateBanner,

    }
}

export default useDetailBanner