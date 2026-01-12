import authServices from "@/services/auth.service"
import { IProfile } from "@/types/Auth"
import { addToast } from "@heroui/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

const useProfile = () => {
    const { isReady } = useRouter()

    const getProfile = async () => {
        const { data } = await authServices.getProfile()
        return data.data
    }

    const { data: dataProfile, refetch: refetchProfile } = useQuery({
        queryKey: ["Profile"],
        queryFn: getProfile,
        enabled: isReady
    })

    const {
        mutate: mutateUpdateProfile,
        isPending: isPendingMutateProfile,
        isSuccess: isSuccessMutateProfile,
    } = useMutation({
        mutationFn: (payload: IProfile) => updateProfile(payload),
        onError: (error) => {
            addToast({
                title: "Error",
                description: error.message,
                color: "danger"
            })
        },
        onSuccess: () => {
            refetchProfile()
            addToast({
                title: "Success",
                description: "Success Update Profile",
                color: "success"
            })
        }
    })

    const updateProfile = async (payload: IProfile) => {
        const { data } = await authServices.updateProfile(payload)
        return data.data
    }

    const handleUpdateProfile = (data: IProfile) => mutateUpdateProfile(data)

    return {
        dataProfile,
        handleUpdateProfile,

        isPendingMutateProfile,
        isSuccessMutateProfile
    }
}

export default useProfile