import { DELAY, LIMIT_EVENT, PAGE_DEFAULT } from "@/constants/list.constatns"
import useDebounce from "@/hooks/useDebounce"
import authServices from "@/services/auth.service"
import eventServices from "@/services/event.service"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"

const useLandingPageLayoutNavbar = () => {
    const router = useRouter()
    const debounce = useDebounce()
    const [search, setSearch] = useState("")

    const getProfile = async () => {
        const { data } = await authServices.getProfile()
        return data.data
    }

    const { data: dataProfile } = useQuery({
        queryKey: ['Profile'],
        queryFn: getProfile,
        enabled: router.isReady
    })

    const getEventSearch = async () => {
        const params = `search=${search}&limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublish=true&isFeatured=true`
        const res = await eventServices.getEvents(params);
        const { data } = res;
        return data;
    };

    const {
        data: dataEventSearch,
        isLoading: isLoadingEventSearch,
        isRefetching: isRefetchingEventSearch
    } = useQuery({
        queryKey: ["Events", search],
        queryFn: getEventSearch,
        enabled: !!search
    });

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        debounce(() => setSearch(e.target.value), DELAY)
    }

    return {
        dataProfile,
        dataEventSearch,
        search,
        setSearch,

        handleSearch,
        isLoadingEventSearch,
        isRefetchingEventSearch
    }
}

export default useLandingPageLayoutNavbar