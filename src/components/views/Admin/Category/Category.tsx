import DataTable from "@/components/ui/DataTable"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback } from "react"
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LISTS_CATEGORY } from "./Category.constants";

const Category = () => {
    const { push } = useRouter();
    const renderCell = useCallback(
        (category: Record<string, unknown>, columnKey: Key) => {
            const cellValue = category[columnKey as keyof typeof category]
            switch (columnKey) {
                case "icon":
                    return (
                        <Image src={`${cellValue}`} alt="icon" width={100} height={100} />
                    )
                case "actions":
                    return (
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="bordered"><CiMenuKebab className="text-default-700" /></Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Dropdown Actions">
                                <DropdownItem key="detail" onPress={() => push(`/admin/category/detail${category._id}`)}>Detail</DropdownItem>
                                <DropdownItem key="edit" onPress={() => push(`/admin/category/edit${category._id}`)} className="text-primary-500">Edit</DropdownItem>
                                <DropdownItem key="delete" onPress={() => push(`/admin/category/delete${category._id}`)} className="text-danger-500">Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )
                default:
                    return cellValue as ReactNode;
            }
        }, [push]
    )
    return (
        <section>
            <DataTable renderCell={renderCell} columns={COLUMN_LISTS_CATEGORY} data={[
                {
                    _id: "123341",
                    name: "Category v1",
                    description: "Description category v1",
                    icon: "/images/general/logo"
                }
            ]}>
            </DataTable>
        </section>
    )
}

export default Category
