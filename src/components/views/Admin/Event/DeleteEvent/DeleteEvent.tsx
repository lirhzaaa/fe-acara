import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react"
import useDeleteEvent from "./useDeleteEvent"
import { Dispatch, SetStateAction, useEffect } from "react"

interface IDeleteEvent {
    isOpen: boolean
    onClose: () => void
    onOpenChange: () => void
    refetchEvent: () => void
    selectedId: string,
    setSelectedId: Dispatch<SetStateAction<string>>
}

const DeleteEvent = (props: IDeleteEvent) => {
    const {
        isOpen,
        onOpenChange,
        onClose,
        refetchEvent,
        selectedId,
        setSelectedId } = props

    const {
        mutateDeleteEvent,
        isPendingDeleteEvent,
        isSuccessDeleteEvent
    } = useDeleteEvent()

    useEffect(() => {
        if (isSuccessDeleteEvent) {
            onClose()
            refetchEvent()
        }
    }, [isSuccessDeleteEvent])

    return (
        <Modal placement="center" scrollBehavior="inside" isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>
                    Delete Event
                </ModalHeader>
                <ModalBody>
                    <p className="text-medium">Are you sure you want to delete this Event?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" disabled={isPendingDeleteEvent} onPress={() => {
                        onClose()
                        setSelectedId("")
                    }}>
                        Cancel
                    </Button>
                    <Button color="danger" type="submit" disabled={isPendingDeleteEvent} onPress={() => mutateDeleteEvent(selectedId)}>
                        {isPendingDeleteEvent ? (
                            <Spinner size="sm" color="white" />
                        ) : "Delete Event"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteEvent