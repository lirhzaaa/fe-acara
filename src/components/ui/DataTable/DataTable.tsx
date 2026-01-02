import { LIMIT_LIST } from "@/constants/list.constatns"
import { cn } from "@/utils/cn"
import { Button, Input, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react"
import { ChangeEvent, Key, ReactNode, useMemo } from "react"
import { CiSearch } from "react-icons/ci"

interface PropTypes {
    columns: Record<string, unknown>[]
    data: Record<string, unknown>[]
    limit: string
    emptyContent: string
    currentPage: number
    totalPage: number
    isLoading?: boolean
    onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void
    onClearSearch: () => void
    onClickButtonTopContent: () => void
    renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode
    onChangeLimit: (e: ChangeEvent<HTMLSelectElement>) => void
    onChangePage: (page: number) => void
}
const DataTable = (props: PropTypes) => {
    const { columns, data, renderCell, onChangeSearch, onClearSearch, onClickButtonTopContent, limit, onChangeLimit, currentPage, totalPage, onChangePage, emptyContent, isLoading } = props
    const TopContent = useMemo(() => {
        return (
            <div className="flex flex-col-reverse items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                <Input aria-label="Search category by name" isClearable className="w-full sm:max-w-[24%]" placeholder="Search by name" startContent={<CiSearch />} onChange={onChangeSearch} onClear={onClearSearch} />
                <Button color="danger" onPress={onClickButtonTopContent}>Create Category</Button>
            </div>
        )
    }, [onChangeSearch, onClearSearch, onClickButtonTopContent])

    const BottomContent = useMemo(() => {
        return (
            <div className="flex items-center justify-center lg:justify-between">
                <Select className="hidden max-w-36 lg:block" size="md" selectedKeys={[limit]} selectionMode="single" onChange={onChangeLimit} startContent={<p className="text-small">Show:</p>} disallowEmptySelection>
                    {LIMIT_LIST.map((item) => (
                        <SelectItem key={item.value} textValue={item.label}>
                            {item.label}
                        </SelectItem>
                    ))}
                </Select>
                {totalPage > 1 && (
                    <Pagination isCompact showControls color="danger" page={currentPage} total={totalPage} onChange={onChangePage} loop />
                )}
            </div>
        )
    }, [limit, onChangeLimit, currentPage, totalPage, onChangePage])

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