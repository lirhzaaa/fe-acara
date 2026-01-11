import DropdownAction from "@/components/commons/DropdownAction"
import { Chip, useDisclosure } from "@heroui/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { Key, ReactNode, useCallback, useEffect } from "react"
import { COLUMN_LISTS_TRANSACTION } from "./Transaction.constants"
import useTransaction from "./useTransaction"
import useChangeUrl from "@/hooks/useChangeUrl"
import DataTable from "@/components/ui/DataTable"
import { converIDR } from "@/utils/currency"

const Transaction = () => {
    const { push, isReady, query } = useRouter();
    const {
        dataTransactions,
        isLoadingTransactions,
        isRefetchingTransactions,
        refetchTransactions,
    } = useTransaction()

    const { setURL } = useChangeUrl()

    useEffect(() => {
        if (isReady) {
            setURL();
        }
    }, [isReady]);

    const renderCell = useCallback(
        (transaction: Record<string, unknown>, columnKey: Key) => {
            const cellValue = transaction[columnKey as keyof typeof transaction]
            switch (columnKey) {
                case "total":
                    return converIDR(Number(cellValue))
                case "status":
                    return (
                        <Chip color={cellValue === "completed" ? "success" : "warning"} size="sm" variant="flat">
                            {cellValue as ReactNode}
                        </Chip>
                    )
                case "actions":
                    return (
                        <DropdownAction
                            textButtonDetail="Detail Transaction"
                            onPressButtonDetail={() => push(`/member/transaction/${transaction._id}`)}
                            hideButtonDelete
                        />
                    )
                default:
                    return cellValue as ReactNode;
            }
        }, [push]
    )

    return (
        <section>
            {Object.keys(query).length > 0 && (
                <DataTable
                    renderCell={renderCell}
                    columns={COLUMN_LISTS_TRANSACTION}
                    data={dataTransactions?.data || []}
                    emptyContent="Transaction is empty"
                    isLoading={isLoadingTransactions || isRefetchingTransactions}
                    totalPage={dataTransactions?.pagination.totalPages}
                />
            )}
        </section>
    )
}

export default Transaction