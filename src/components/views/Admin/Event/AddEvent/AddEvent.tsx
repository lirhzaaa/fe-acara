import InputFile from "@/components/ui/InputFile"
import { Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Textarea } from "@heroui/react"
import { getLocalTimeZone, now } from "@internationalized/date"

interface IAddEvent {
  isOpen: boolean
  onClose: () => void
  onOpenChange: () => void
  refetchEvent: () => void
}

export const categoryEvent = [
  { key: "acara", label: "Acara" }
]

const AddEvent = (props: IAddEvent) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchEvent
  } = props


  return (
    <Modal onOpenChange={onOpenChange} isOpen={isOpen} placement="center" scrollBehavior="inside" onClose={() => { }}>
      <form>
        <ModalContent className="m-4">
          <ModalHeader className="font-semibold">
            Add Event
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold">Information</p>
              <Input label="Name" variant="bordered" />
              <Input label="Slug" variant="bordered" />
              <Select label="Category" placeholder="Search category here...">
                {categoryEvent.map((category) => (
                  <SelectItem key={category.key}>{category.label}</SelectItem>
                ))}
              </Select>
              <DatePicker
                hideTimeZone
                showMonthAndYearPickers
                defaultValue={now(getLocalTimeZone())}
                label="Start Date"
                variant="bordered"
              />
              <DatePicker
                hideTimeZone
                showMonthAndYearPickers
                defaultValue={now(getLocalTimeZone())}
                label="End Date"
                variant="bordered"
              />
              <Select label="Status">
                {categoryEvent.map((category) => (
                  <SelectItem key={category.key}>{category.label}</SelectItem>
                ))}
              </Select>
              <Select label="Featured">
                {categoryEvent.map((category) => (
                  <SelectItem key={category.key}>{category.label}</SelectItem>
                ))}
              </Select>
              <Select label="Online/Offline">
                {categoryEvent.map((category) => (
                  <SelectItem key={category.key}>{category.label}</SelectItem>
                ))}
              </Select>
              <Textarea label="Description" variant="bordered" />

              <p className="text-sm font-bold">Location</p>
              <Select label="Search city here...">
                {categoryEvent.map((category) => (
                  <SelectItem key={category.key}>{category.label}</SelectItem>
                ))}
              </Select>
              <Input label="Latitude" variant="bordered" />
              <Input label="Longitude" variant="bordered" />

              <p className="text-sm font-bold">Cover</p>
              <InputFile name="event" />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={() => { onClose() }}>
              Cancel
            </Button>
            <Button color="danger" type="submit">
              Create Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

export default AddEvent