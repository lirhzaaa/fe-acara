import useChangeUrl from "@/hooks/useChangeUrl";
import orderServices from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTransactions = () => {
    const router = useRouter();
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();

    const getMemberTransactions = async () => {
        const params = `limit=${currentLimit}&page=${currentPage}&search=${currentSearch}`;
        const result = await orderServices.getMemberOrder(params);
        const { data } = result;
        return data;
    };

    const {
        data: dataTransactions,
        isLoading: isLoadingTransactions,
        isRefetching: isRefetchingTransactions,
        refetch: refetchTransactions,
    } = useQuery({
        queryKey: ["MemberTransactions", currentPage, currentLimit, currentSearch],
        queryFn: () => getMemberTransactions(),
        enabled: router.isReady && !!currentPage && !!currentLimit,
    });

    return {
        dataTransactions,
        isLoadingTransactions,
        isRefetchingTransactions,
        refetchTransactions,
    };
};

export default useTransactions;
