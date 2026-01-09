import useChangeUrl from "@/hooks/useChangeUrl"
import eventServices from "@/services/event.service"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

const useEvent = () => {
    const router = useRouter()
    const {
        currentLimit,
        currentPage,
        currentSearch,
        currentCategory,
        currentIsOnline,
        currentIsFeatured,

        setURL,
        setExplore,

        handleChangePage,
        handleChangeLimit,
        handleSearch,
        handleClearSearch,
        handleChangeCategory,
        handleChangeIsOnline,
        handleChangeIsFeatured
    } = useChangeUrl()

    const getEvents = async () => {
        const params = `limit=${currentLimit}&page=${currentPage}&category=${currentCategory}&isOnline=${currentIsOnline}&isFeatured=${currentIsFeatured}&isPublish=true`
        const result = await eventServices.getEvents(params)
        const { data } = result
        return data
    }

    const {
        data: dataEvent,
        isLoading: isLoadingEvent,
        isRefetching: isRefetchingEvent,
        refetch: refetchEvent
    } = useQuery({
        queryKey: ["Events", currentPage, currentLimit, currentCategory, currentIsOnline, currentIsFeatured],
        queryFn: () => getEvents(),
        enabled: router.isReady && !!currentPage && !!currentLimit
    })

    return {
        dataEvent,
        isLoadingEvent,
        isRefetchingEvent,
        refetchEvent,
    }
}

export default useEvent