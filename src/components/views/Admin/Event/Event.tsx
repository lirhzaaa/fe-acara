import DataTable from "@/components/ui/DataTable/DataTable"
import { Key, ReactNode, useCallback, useEffect } from "react"
import { Chip, useDisclosure } from "@heroui/react"
import { useRouter } from "next/router"
import useEvent from "./useEvent"
import useChangeUrl from "@/hooks/useChangeUrl"
import { COLUMN_LIST_EVENT } from "./Event.constants"
import Image from "next/image"
import AddEvent from "./AddEvent"
import DropdownAction from "@/components/commons/DropdownAction"

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
            setURL();
        }
    }, [isReady]);

    const renderCell = useCallback(
        (event: Record<string, unknown>, columnKey: Key) => {
            const cellValue = event[columnKey as keyof typeof event]
            switch (columnKey) {
                case "banner":
                    return (
                        <Image src={`${cellValue}`} alt="icon" width={100} height={100} className="rounded-lg" />
                    )
                case "actions":
                    return (
                        <DropdownAction
                            textButtonDetail="Detail Event"
                            textButtonDelete="Delete Event"
                            onPressButtonDetail={() => push(`/admin/event/${event._id}`)}
                            onPressButtonDelete={() => {
                                setSelectedId(`${event._id}`)
                                deleteEvent.onOpen()
                            }}
                        />
                    )
                case "isPublish":
                    return (
                        <Chip color={cellValue ? "success" : "warning"} size="sm" variant="flat">
                            {cellValue === true ? "Published" : "Not Published"}
                        </Chip>
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

            <AddEvent
                {...addEvent}
                refetchEvent={refetchEvent} />
            {/* <DeleteEvent
                {...deleteCategory}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                refetchCategory={refetchCategory} /> */}
        </section>
    )
}

export default Event