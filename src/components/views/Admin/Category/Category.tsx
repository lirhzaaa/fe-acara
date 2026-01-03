import DataTable from "@/components/ui/DataTable/DataTable"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react"
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LISTS_CATEGORY } from "./Category.constants";
import useCategory from "./useCategory";
import AddCategory from "./AddCategory";
import DeleteCategory from "./DeleteCategory";
import Image from "next/image";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";

const Category = () => {
    const { push, isReady, query } = useRouter();
    const {
        dataCategory,
        isLoadingCategory,
        isRefetchingCategory,
        refetchCategory,
        selectedId,
        setSelectedId } = useCategory()

    const addCategory = useDisclosure()
    const deleteCategory = useDisclosure()
    const { setURL } = useChangeUrl()

    useEffect(() => {
        if (isReady) {
            setURL();
        }
    }, [isReady]);

    const renderCell = useCallback(
        (category: Record<string, unknown>, columnKey: Key) => {
            const cellValue = category[columnKey as keyof typeof category]
            switch (columnKey) {
                case "icon":
                    return (
                        <Image src={`${cellValue}`} alt="icon" width={100} height={100} className="rounded-lg" />
                    )
                case "actions":
                    return (
                        <DropdownAction
                            textButtonDetail="Detail Category"
                            textButtonDelete="Delete Category"
                            onPressButtonDetail={() => push(`/admin/category/${category._id}`)}
                            onPressButtonDelete={() => {
                                setSelectedId(`${category._id}`);
                                deleteCategory.onOpen()
                            }}
                        />
                    )
                default:
                    return cellValue as ReactNode;
            }
        }, [push, setSelectedId, deleteCategory]
    )
    return (
        <section>
            {Object.keys(query).length > 0 && (
                <DataTable
                    buttonTopContent="Create Category"
                    renderCell={renderCell}
                    columns={COLUMN_LISTS_CATEGORY}
                    data={dataCategory?.data || []}
                    isLoading={isLoadingCategory || isRefetchingCategory}
                    onClickButtonTopContent={addCategory.onOpen}
                    totalPage={dataCategory?.pagination.totalPages}
                    emptyContent="Category is empty"
                />
            )}

            <AddCategory
                {...addCategory}
                refetchCategory={refetchCategory} />
            <DeleteCategory
                {...deleteCategory}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                refetchCategory={refetchCategory} />
        </section>
    )
}

export default Category
