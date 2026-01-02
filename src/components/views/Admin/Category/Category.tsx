import DataTable from "@/components/ui/DataTable"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
// import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react"
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LISTS_CATEGORY } from "./Category.constants";
import useCategory from "./useCategory";
import AddCategory from "./AddCategory";
import DeleteCategory from "./DeleteCategory";
import Image from "next/image";

const Category = (  ) => {
    const { push, isReady, query } = useRouter();
    const { setURL, dataCategory, isLoadingCategory, isRefetchingCategory, currentPage, currentLimit, handleChangeLimit, handleChangePage, handleSearch, handleClearSearch, refetchCategory, selectedId, setSelectedId } = useCategory()

    const addCategory = useDisclosure()
    const deleteCategory = useDisclosure()

    useEffect(() => {
        if (isReady) {
            setURL();
        }
    }, []);

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
                                <DropdownItem key="detail" onPress={() => push(`/admin/category/${category._id}`)}>Detail</DropdownItem>
                                <DropdownItem key="delete" onPress={() => {
                                    setSelectedId(`${category._id}`);
                                    deleteCategory.onOpen()
                                }} className="text-danger-500">Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown >
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
                    renderCell={renderCell}
                    columns={COLUMN_LISTS_CATEGORY}
                    currentPage={Number(currentPage)}
                    data={dataCategory?.data || []}
                    isLoading={isLoadingCategory || isRefetchingCategory}
                    onChangeSearch={handleSearch}
                    onClearSearch={handleClearSearch}
                    onClickButtonTopContent={addCategory.onOpen}
                    limit={String(currentLimit)}
                    onChangeLimit={handleChangeLimit}
                    totalPage={dataCategory?.pagination.totalPages}
                    onChangePage={handleChangePage}
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
