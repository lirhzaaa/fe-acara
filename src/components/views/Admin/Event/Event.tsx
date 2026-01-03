import DataTable from "@/components/ui/DataTable/DataTable"
import { Key, ReactNode, useCallback, useEffect } from "react"
// import Image from "next/image"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react"
import { CiMenuKebab } from "react-icons/ci"
import { useRouter } from "next/router"
import useEvent from "./useEvent"
import useChangeUrl from "@/hooks/useChangeUrl"
import { COLUMN_LIST_EVENT } from "./Event.constants"
import Image from "next/image"
import AddEvent from "./AddEvent"

const Event = () => {
    const { push, isReady, query } = useRouter()
    const {
        dataEvent,
        isLoadingEvent,
        isRefetchingEvent,
        refetchEvent,

        selectedId,
        setSelectedId
    } = useEvent()

    const addEvent = useDisclosure()
    const deleteEvent = useDisclosure()
    const { setURL } = useChangeUrl()

    useEffect(() => {
        if (isReady) {
            setURL()
        }
    }, [isReady])

    const renderCell = useCallback(
        (event: Record<string, unknown>, columnKey: Key) => {
            const cellValue = event[columnKey as keyof typeof event]
            switch (columnKey) {
                case "banner":
                    return (
                        <Image src={`${cellValue}`} alt="icon" width={100} height={100} className="aspect-video object-cover rounded-lg" />
                    )
                case "actions":
                    return (
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="bordered">
                                    <CiMenuKebab className="text-default-700" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Dropdown Actions">
                                <DropdownItem key="detail" onPress={() => push(`/admin/event/${event._id}`)}>
                                    Detail
                                </DropdownItem>
                                <DropdownItem key="delete" onPress={() => {
                                    setSelectedId(`${event._id}`)
                                    deleteEvent.onOpen()
                                }} className="text-danger-500">
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )
                default:
                    return cellValue as ReactNode
            }
        }, [push, setSelectedId, deleteEvent]
    )

    return (
        <section>
            {Object.keys(query).length > 0 && (
                <DataTable
                    buttonTopContent="Create Event"
                    renderCell={renderCell}
                    columns={COLUMN_LIST_EVENT}
                    data={dataEvent?.data || []}
                    isLoading={isLoadingEvent || isRefetchingEvent}
                    onClickButtonTopContent={addEvent.onOpen}
                    totalPage={dataEvent?.pagination.totalPages}
                    emptyContent="Event is empty"
                />
            )}


            {/* 
            <AddEvent
                {...addEvent}
                refetchEvent={refetchEvent} /> */}
            {/* <DeleteEvent
                {...deleteCategory}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                refetchCategory={refetchCategory} /> */}
        </section>
    )
}

export default Event