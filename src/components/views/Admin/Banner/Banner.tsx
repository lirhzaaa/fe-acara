import DropdownAction from "@/components/commons/DropdownAction"
import DataTable from "@/components/ui/DataTable"
import { Chip, useDisclosure } from "@heroui/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { Key, ReactNode, useCallback, useEffect } from "react"
import { COLUMN_LISTS_BANNER } from "./Banner.constants"
import useBanner from "./useBanner"
import useChangeUrl from "@/hooks/useChangeUrl"

const Banner = () => {
    const { push, isReady, query } = useRouter();
    const addBanner = useDisclosure()
    const deleteBanner = useDisclosure()
    const { setURL } = useChangeUrl()

    const {
        dataBanner,
        isLoadingBanner,
        isRefetchingBanner,
        refetchBanner,

        selectedDataBanner,
        setSelectedDataBanner } = useBanner()

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
                                deleteBanner.onOpen()
                            }}
                        />
                    )
                case "show":
                    return (
                        <Chip color={cellValue ? "success" : "warning"} size="sm" variant="flat">
                            {cellValue === true ? "Published" : "Not Published"}
                        </Chip>
                        )
                default:
                    return cellValue as ReactNode;
            }
        }, [push, deleteBanner]
    )

    return (
        <section>
            {Object.keys(query).length > 0 && (
                <DataTable
                    buttonTopContent="Create banner"
                    renderCell={renderCell}
                    columns={COLUMN_LISTS_BANNER}
                    data={dataBanner?.data || []}
                    isLoading={isLoadingBanner || isRefetchingBanner}
                    onClickButtonTopContent={addBanner.onOpen}
                    totalPage={dataBanner?.pagination.totalPages}
                    emptyContent="Banner is empty"
                />
            )}

            {/* <Addbanner
                {...addbanner}
                refetchbanner={refetchbanner} />
            <Deletebanner
                {...deletebanner}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                refetchbanner={refetchbanner} /> */}
        </section>
    )
}

export default Banner