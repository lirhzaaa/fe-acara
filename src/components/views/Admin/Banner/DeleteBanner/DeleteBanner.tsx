import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react"
import useDeleteBanner from "./useDeleteBanner"
import { Dispatch, SetStateAction, useEffect } from "react"
import { IBanner } from "@/types/Banner"

interface IDeleteBanner {
    isOpen: boolean
    onClose: () => void
    onOpenChange: () => void
    refetchBanner: () => void
    selectedDataBanner: IBanner | null,
    setSelectedDataBanner: Dispatch<SetStateAction<IBanner | null>>
}

const DeleteBanner = (props: IDeleteBanner) => {
    const {
        isOpen,
        onOpenChange,
        onClose,
        refetchBanner,
        selectedDataBanner,
        setSelectedDataBanner } = props

    const {
        mutateDeleteBanner,
        isPendingDeleteBanner,
        isSuccessDeleteBanner
    } = useDeleteBanner()

    useEffect(() => {
        if (isSuccessDeleteBanner) {
            onClose()
            refetchBanner()
            setSelectedDataBanner(null)
        }
    }, [isSuccessDeleteBanner, onClose, refetchBanner, setSelectedDataBanner])

    return (
        <Modal placement="center" scrollBehavior="inside" isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>
                    Delete Banner
                </ModalHeader>
                <ModalBody>
                    <p className="text-medium">Are you sure you want to delete this banner?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" disabled={isPendingDeleteBanner} onPress={() => {
                        setSelectedDataBanner(null)
                        onClose()
                    }}>
                        Cancel
                    </Button>
                    <Button color="danger" type="submit" disabled={isPendingDeleteBanner} onPress={() => mutateDeleteBanner(`${selectedDataBanner?._id}`)}>
                        {isPendingDeleteBanner ? (
                            <Spinner size="sm" color="white" />
                        ) : "Delete Banner"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteBanner