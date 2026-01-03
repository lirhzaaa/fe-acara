import DataTable from "@/components/ui/DataTable/DataTable"
import { COLUMN_LISTS_CATEGORY } from "../Category/Category.constants"
import { Key, ReactNode, useCallback } from "react"
// import Image from "next/image"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react"
import { CiMenuKebab } from "react-icons/ci"
import { useRouter } from "next/router"

const Event = () => {
    const { push } = useRouter()
    const renderCell = useCallback(
        (event: Record<string, unknown>, columnKey: Key) => {
            const cellValue = event[columnKey as keyof typeof event]
            switch (columnKey) {
                // case "banner":
                //     return (
                //         <Image />
                //     )
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
                                <DropdownItem key="delete" onPress={() => { }} className="text-danger-500">
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )
                default:
                    return cellValue as ReactNode
            }
        }
    )

    return (
        <section>
            <DataTable
                renderCell={renderCell}
                columns={COLUMN_LISTS_CATEGORY}
                
            />
        </section>
    )
}

export default Event