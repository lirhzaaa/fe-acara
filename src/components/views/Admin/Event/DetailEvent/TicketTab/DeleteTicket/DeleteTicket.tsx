import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react"
import useDeleteTicket from "./useDeleteTicket"
import { Dispatch, SetStateAction, useEffect } from "react"
import { ITicket } from "@/types/Ticket"

interface IDeleteTicket {
    isOpen: boolean
    onClose: () => void
    onOpenChange: () => void
    refetchTicket: () => void
    selectedDataTicket: ITicket | null,
    setSelectedDataTicket: Dispatch<SetStateAction<ITicket | null>>
}

const DeleteTicket = (props: IDeleteTicket) => {
    const {
        isOpen,
        onOpenChange,
        onClose,
        refetchTicket,
        selectedDataTicket,
        setSelectedDataTicket } = props

    const {
        mutateDeleteTicket,
        isPendingDeleteTicket,
        isSuccessDeleteTicket
    } = useDeleteTicket()

    useEffect(() => {
        if (isSuccessDeleteTicket) {
            onClose()
            refetchTicket()
            setSelectedDataTicket(null)
        }
    }, [isSuccessDeleteTicket])

    return (
        <Modal placement="center" scrollBehavior="inside" isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>
                    Delete Ticket
                </ModalHeader>
                <ModalBody>
                    <p className="text-medium">Are you sure you want to delete this Ticket?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" disabled={isPendingDeleteTicket} onPress={() => {
                        onClose()
                        setSelectedDataTicket(null)
                    }}>
                        Cancel
                    </Button>
                    <Button color="danger" type="submit" disabled={isPendingDeleteTicket} onPress={() => mutateDeleteTicket(`${selectedDataTicket?._id}`)}>
                        {isPendingDeleteTicket ? (
                            <Spinner size="sm" color="white" />
                        ) : "Delete Ticket"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteTicket