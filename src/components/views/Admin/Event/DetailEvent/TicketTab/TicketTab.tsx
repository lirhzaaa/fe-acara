import DropdownAction from "@/components/commons/DropdownAction"
import DataTable from "@/components/ui/DataTable"
import { converIDR } from "@/utils/currency"
import { Button, Card, CardBody, CardHeader, useDisclosure } from "@heroui/react"
import { Key, ReactNode, useCallback } from "react"
import { COLUMN_LIST_TICKET } from "./Ticket.constants"
import useTicketTab from "./useTicketTab"

const TicketTab = () => {
    const {
        dataTicket,
        refetchTicket,
        isPendingTicket,
        isRefetchingTicket
    } = useTicketTab()

    const addTicketModal = useDisclosure()
    const updateTicketModal = useDisclosure()
    const deleteTicketModal = useDisclosure()

    const renderCell = useCallback(
        (ticket: Record<string, unknown>, columnKey: Key) => {
            const cellValue = ticket[columnKey as keyof typeof ticket]
            switch (columnKey) {
                case "price":
                    return `${converIDR(cellValue as number)}`
                case "actions":
                    return (
                        <DropdownAction
                            textButtonDetail="Detail Ticket"
                            textButtonDelete="Delete Ticket"
                            onPressButtonDetail={() => {
                                updateTicketModal.onOpen()
                            }}
                            onPressButtonDelete={() => {
                                deleteTicketModal.onOpen()
                            }}
                        />
                    )
                default:
                    return cellValue as ReactNode
            }
        }, [deleteTicketModal, updateTicketModal]
    )

    return (
        <Card className="w-full p-4">
            <CardHeader className="items-center justify-between">
                <div className="flex flex-col">
                    <h3 className="text-xl font-bold">Ticket Information</h3>
                    <p className="w-full text-small text-default-400">Manage information of this Ticket</p>
                </div>
                <Button color="danger">Create Ticket</Button>
            </CardHeader>
            <CardBody>
                <DataTable
                    buttonTopContent="Create Ticket"
                    renderCell={renderCell}
                    columns={COLUMN_LIST_TICKET}
                    data={dataTicket || []}
                    isLoading={isPendingTicket || isRefetchingTicket}
                    totalPage={1}
                    emptyContent="Ticket is empty"
                    showTop={false}
                    showBottom={false}
                />
            </CardBody>
        </Card>
    )
}

export default TicketTab