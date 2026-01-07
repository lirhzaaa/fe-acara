import DropdownAction from "@/components/commons/DropdownAction"
import { Chip, useDisclosure } from "@heroui/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { Key, ReactNode, useCallback, useEffect } from "react"
import { COLUMN_LISTS_BANNER } from "./Banner.constants"
import useBanner from "./useBanner"
import useChangeUrl from "@/hooks/useChangeUrl"
import AddBanner from "./AddBanner"
import DeleteBanner from "./DeleteBanner"
import DataTable from "@/components/ui/DataTable"

const Banner = () => {
    const { push, isReady, query } = useRouter();
    const {
        dataBanner,
        isLoadingBanner,
        isRefetchingBanner,
        refetchBanner,

        selectedId,
        setSelectedId } = useBanner()

    const addBanner = useDisclosure()
    const deleteBanner = useDisclosure()
    const { setURL } = useChangeUrl()

    useEffect(() => {
        if (isReady) {
            setURL();
        }
    }, [isReady]);

    const renderCell = useCallback(
        (banner: Record<string, unknown>, columnKey: Key) => {
            const cellValue = banner[columnKey as keyof typeof banner]
            switch (columnKey) {
                case "image":
                    return (
                        <Image src={`${cellValue}`} alt="image" width={300} height={100} className="rounded-lg" />
                    )
                case "actions":
                    return (
                        <DropdownAction
                            textButtonDetail="Detail banner"
                            textButtonDelete="Delete banner"
                            onPressButtonDetail={() => push(`/admin/banner/${banner._id}`)}
                            onPressButtonDelete={() => {
                                setSelectedId(`${banner._id}`)
                                deleteBanner.onOpen()
                            }}
                        />
                    )
                case "isShow":
                    return (
                        <Chip color={cellValue ? "success" : "warning"} size="sm" variant="flat">
                            {cellValue === true ? "Published" : "Not Published"}
                        </Chip>
                    )
                default:
                    return cellValue as ReactNode;
            }
        }, [push, deleteBanner, setSelectedId]
    )

    return (
        <section>
            {Object.keys(query).length > 0 && (
                <DataTable
                    buttonTopContent="Create Banner"
                    renderCell={renderCell}
                    columns={COLUMN_LISTS_BANNER}
                    data={dataBanner?.data || []}
                    isLoading={isLoadingBanner || isRefetchingBanner}
                    onClickButtonTopContent={addBanner.onOpen}
                    totalPage={dataBanner?.pagination.totalPages}
                    emptyContent="Banner is empty"
                />
            )}

            <AddBanner
                {...addBanner}
                refetchBanner={refetchBanner} />

            <DeleteBanner
                {...deleteBanner}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                refetchBanner={refetchBanner} />
        </section>
    )
}

export default Banner