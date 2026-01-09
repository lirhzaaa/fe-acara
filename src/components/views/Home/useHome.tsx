import { LIMIT_BANNER, LIMIT_CATEGORY, LIMIT_EVENT, PAGE_DEFAULT } from "@/constants/list.constatns";
import bannerServices from "@/services/banner.service";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";

const useHome = () => {
    const getBanners = async () => {
        const params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`;
        const res = await bannerServices.getBanners(params);
        const { data } = res;
        return data;
    };

    const {
        data: dataBanner,
        isLoading: isLoadingBanner,
    } = useQuery({
        queryKey: ["Banners"],
        queryFn: () => getBanners(),
        enabled: true,
    });

    const getEvent = async (params: string) => {
        const res = await eventServices.getEvents(params);
        const { data } = res;
        return data;
    };

    const {
        data: dataFeaturedEvent,
        isLoading: isLoadingFeaturedEvent,
    } = useQuery({
        queryKey: ["FeaturedEvent"],
        queryFn: () => getEvent(
            `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublish=true&isFeatured=true`
        ),
        enabled: true,
    });

    const {
        data: dataLatestEvent,
        isLoading: isLoadingLatestEvent,
    } = useQuery({
        queryKey: ["LatestEvent"],
        queryFn: () => getEvent(
            `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublish=true`
        ),
        enabled: true,
    });

    const getCategories = async (params: string) => {
        const res = await categoryServices.getCategories(params);
        const { data } = res;
        return data;
    };

    const {
        data: dataCategories,
        isLoading: isLoadingCategories,
    } = useQuery({
        queryKey: ["Categories"],
        queryFn: () => getCategories(
            `limit=${LIMIT_CATEGORY}&page=${PAGE_DEFAULT}&isPublish=true`
        ),
        enabled: true,
    });

    return {
        dataBanner,
        isLoadingBanner,

        dataFeaturedEvent,
        isLoadingFeaturedEvent,

        dataLatestEvent,
        isLoadingLatestEvent,

        dataCategories,
        isLoadingCategories
    }
}

export default useHome