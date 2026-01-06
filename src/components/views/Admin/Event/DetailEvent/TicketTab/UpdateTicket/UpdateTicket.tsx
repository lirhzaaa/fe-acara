import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react"
import useUpdateTicket from "./useUpdateTicket"
import { Dispatch, SetStateAction, useEffect } from "react"
import { Controller } from "react-hook-form"
import { ITicket } from "@/types/Ticket"

interface ITicketTypes {
    isOpen: boolean
    onClose: () => void
    onOpenChange: () => void
    refetchTicket: () => void
    selectedDataTicket: ITicket | null
    setSelectedDataTicket: Dispatch<SetStateAction<ITicket | null>>
}

const UpdateTicket = (props: ITicketTypes) => {
    const { isOpen, onClose, onOpenChange, refetchTicket, selectedDataTicket, setSelectedDataTicket } = props
    const {
        control,
        errors,
        reset,
        setValueUpdateTicket,
        handleSubmitForm,

        handleUpdateTicket,
        isPendingMutateUpdateTicket,
        isSuccessMutateUpdateTicket
    } = useUpdateTicket(`${selectedDataTicket?._id}`)

    useEffect(() => {
        if (selectedDataTicket) {
         setValueUpdateTicket("name", `${selectedDataTicket?.name}`)   
         setValueUpdateTicket("price", `${selectedDataTicket?.price}`)   
         setValueUpdateTicket("quantity", `${selectedDataTicket?.quantity}`)   
         setValueUpdateTicket("description", `${selectedDataTicket?.description}`)   
        }
    }, [selectedDataTicket])

    useEffect(() => {
        if (isSuccessMutateUpdateTicket) {
            onClose()
            refetchTicket()
            setSelectedDataTicket(null)
        }
    }, [isSuccessMutateUpdateTicket])

    const disableSubmit = isPendingMutateUpdateTicket

    return (
        <Modal onOpenChange={onOpenChange} isOpen={isOpen} placement="center" scrollBehavior="inside" onClose={() => {
            reset();
            onClose();
            setSelectedDataTicket(null)
        }}>
            <form onSubmit={handleSubmitForm(handleUpdateTicket)}>
                <ModalContent className="m-4">
                    <ModalHeader className="font-semibold">
                        Update Ticket
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
                            setSelectedDataTicket(null)
                        }}>
                            Cancel
                        </Button>
                        <Button color="danger" type="submit" disabled={disableSubmit}>
                            {isPendingMutateUpdateTicket ? (
                                <Spinner size="sm" color="white" />
                            ) : (
                                "Update Ticket"
                            )}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default UpdateTicket