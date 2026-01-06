import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react"
import useAddTicket from "./useAddTicket"
import { useEffect } from "react"
import { Controller } from "react-hook-form"

interface IAddTicket {
    isOpen: boolean
    onClose: () => void
    onOpenChange: () => void
    refetchTicket: () => void
}

const AddTicket = (props: IAddTicket) => {
    const { isOpen, onClose, onOpenChange, refetchTicket } = props
    const {
        control,
        errors,
        handleSubmitForm,
        reset,

        handleAddTicket,
        isPendingMutateAddTicket,
        isSuccessMutateAddTicket
    } = useAddTicket()

    useEffect(() => {
        if (isSuccessMutateAddTicket) {
            onClose()
            refetchTicket()
        }
    }, [isSuccessMutateAddTicket])

    const disableSubmit = isPendingMutateAddTicket

    return (
        <Modal onOpenChange={onOpenChange} isOpen={isOpen} placement="center" scrollBehavior="inside" onClose={() => {
            reset();
            onClose();
        }}>
            <form onSubmit={handleSubmitForm(handleAddTicket)}>
                <ModalContent className="m-4">
                    <ModalHeader className="font-semibold">
                        Add Ticket
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-bold">Information</p>
                            <div className="flex flex-col gap-4">
                                <Controller name="name" control={control} render={({ field }) => (
                                    <Input {...field} label="Name" variant="bordered" isInvalid={errors.name !== undefined} errorMessage={errors.name?.message} />
                                )} />
                                <Controller name="price" control={control} render={({ field }) => (
                                    <Input {...field} label="Price" variant="bordered" isInvalid={errors.price !== undefined} errorMessage={errors.price?.message} />
                                )} />
                                <Controller name="quantity" control={control} render={({ field }) => (
                                    <Input {...field} label="Quantity" variant="bordered" isInvalid={errors.quantity !== undefined} errorMessage={errors.quantity?.message} />
                                )} />
                                <Controller name="description" control={control} render={({ field }) => (
                                    <Input {...field} label="Description" variant="bordered" isInvalid={errors.description !== undefined} errorMessage={errors.description?.message} />
                                )} />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onPress={() => {
                            reset()
                            onClose()
                        }}>
                            Cancel
                        </Button>
                        <Button color="danger" type="submit" disabled={disableSubmit}>
                            {isPendingMutateAddTicket ? (
                                <Spinner size="sm" color="white" />
                            ) : (
                                "Add Ticket"
                            )}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default AddTicket