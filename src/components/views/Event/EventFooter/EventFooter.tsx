import { LIMIT_LIST } from "@/constants/list.constatns"
import useChangeUrl from "@/hooks/useChangeUrl"
import { Pagination, Select, SelectItem } from "@heroui/react"

interface propTypes {
    totalPages: number
}

const EventFooter = (props: propTypes) => {
    const { totalPages } = props
    const { currentLimit, currentPage, handleChangeLimit, handleChangePage } = useChangeUrl()

    return (
        <div className="flex flex-col gap-4 items-center justify-center lg:justify-between lg:flex-row">
            <Select className="max-w-28 lg:block" size="md" selectedKeys={[`${currentLimit}`]} selectionMode="single" onChange={handleChangeLimit} startContent={<p className="text-small">Show:</p>} disallowEmptySelection>
                {LIMIT_LIST.map((item) => (
                    <SelectItem key={item.value} textValue={item.label}>
                        {item.label}
                    </SelectItem>
                ))}
            </Select>
            {totalPages > 0 && (
                <Pagination isCompact showControls color="danger" page={Number(currentPage)} total={totalPages} onChange={handleChangePage} loop />
            )}
        </div>
    )
}

export default EventFooter