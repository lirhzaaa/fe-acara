import DropdownAction from "@/components/commons/DropdownAction"
import { Chip, useDisclosure } from "@heroui/react"
import { useRouter } from "next/router"
import { Key, ReactNode, useCallback, useEffect } from "react"
import { COLUMN_LISTS_TRANSACTION } from "./Transaction.constants"
import useTransaction from "./useTransaction"
import useChangeUrl from "@/hooks/useChangeUrl"
import DataTable from "@/components/ui/DataTable"
import { converIDR } from "@/utils/currency"
import DeleteTransaction from "./DeleteTransaction"

const Transaction = () => {
    const { push, isReady, query } = useRouter();
    const {
        dataTransactions,
        isLoadingTransactions,
        isRefetchingTransactions,
        refetchTransactions,

        selectedId,
        setSelectedId
    } = useTransaction()

    const deleteTransaction = useDisclosure()
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
                            textButtonDelete="Delete Transaction"
                            onPressButtonDetail={() => push(`/admin/transaction/${transaction.orderId}`)}
                            onPressButtonDelete={() => {
                                setSelectedId(`${transaction.orderId}`);
                                deleteTransaction.onOpen()
                            }}
                        />
                    )
                default:
                    return cellValue as ReactNode;
            }
        }, [push, setSelectedId, deleteTransaction]
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

            <DeleteTransaction
                {...deleteTransaction}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                refetchTransaction={refetchTransactions} />
        </section>
    )
}

export default Transaction