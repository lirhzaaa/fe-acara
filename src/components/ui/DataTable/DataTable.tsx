import { LIMIT_LIST } from "@/constants/list.constatns"
import useChangeUrl from "@/hooks/useChangeUrl"
import { cn } from "@/utils/cn"
import { Button, Input, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react"
import { Key, ReactNode, useMemo } from "react"
import { CiSearch } from "react-icons/ci"

interface PropTypes {
    buttonTopContent: string
    columns: Record<string, unknown>[]
    data: Record<string, unknown>[]
    emptyContent: string
    totalPage: number
    isLoading?: boolean
    onClickButtonTopContent: () => void
    renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode
}
const DataTable = (props: PropTypes) => {
    const {
        buttonTopContent,
        columns,
        data,
        renderCell,
        onClickButtonTopContent,
        totalPage,
        emptyContent,
        isLoading } = props

    const {
        currentLimit,
        currentPage,
        handleChangeLimit,
        handleChangePage,
        handleSearch,
        handleClearSearch,
    } = useChangeUrl()

    const TopContent = useMemo(() => {
        return (
            <div className="flex flex-col-reverse items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <Input aria-label="Search by name" isClearable className="w-full sm:max-w-[24%]" placeholder="Search by name" startContent={<CiSearch />} onChange={handleSearch} onClear={handleClearSearch} />
                <Button color="danger" onPress={onClickButtonTopContent}>{buttonTopContent}</Button>
            </div>
        )
    }, [handleSearch, handleClearSearch, onClickButtonTopContent, buttonTopContent])

    const BottomContent = useMemo(() => {
        return (
            <div className="flex items-center justify-center lg:justify-between">
                <Select className="hidden max-w-36 lg:block" size="md" selectedKeys={[`${currentLimit}`]} selectionMode="single" onChange={handleChangeLimit} startContent={<p className="text-small">Show:</p>} disallowEmptySelection>
                    {LIMIT_LIST.map((item) => (
                        <SelectItem key={item.value} textValue={item.label}>
                            {item.label}
                        </SelectItem>
                    ))}
                </Select>
                {totalPage > 1 && (
                    <Pagination isCompact showControls color="danger" page={Number(currentPage)} total={totalPage} onChange={handleChangePage} loop />
                )}
            </div>
        )
    }, [currentLimit, handleChangeLimit, currentPage, totalPage, handleChangePage])

    return (
        <Table topContent={TopContent} topContentPlacement="outside" bottomContent={BottomContent} bottomContentPlacement="outside" classNames={{
            base: "max-w-full",
            wrapper: cn({ "overflow-x-hidden": isLoading })
        }}>
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid as Key}>
                        {column.name as string}
                    </TableColumn>
                )}
            </TableHeader>

            <TableBody
                items={data}
                emptyContent={emptyContent}
                isLoading={isLoading}
                className={isLoading ? "blur-xs pointer-events-none" : ""}
                loadingContent={
                    <div className="flex h-full w-full items-center justify-center bg-foreground-700/30 backdrop-blur-xs">
                        <Spinner color="danger" />
                    </div>
                }>
                {(item) => (
                    <TableRow key={item._id as Key} className={isLoading ? "blur-xs opacity-60" : ""}>
                        {(columnKey) => (
                            <TableCell className={isLoading ? "blur-xs" : ""}>
                                {renderCell(item, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default DataTable