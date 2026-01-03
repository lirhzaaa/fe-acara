import InputFile from "@/components/ui/InputFile"
import { Autocomplete, AutocompleteItem, Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner, Textarea } from "@heroui/react"
import useAddEvent from "./useAddEvent"
import { useEffect } from "react"
import { Controller } from "react-hook-form"
import { ICategory } from "@/types/Category"
import { IRegency } from "@/types/Event"
import { getLocalTimeZone, now } from "@internationalized/date"

interface IAddEvent {
  isOpen: boolean
  onClose: () => void
  onOpenChange: () => void
  refetchEvent: () => void
}

const AddEvent = (props: IAddEvent) => {
  const { isOpen, onClose, onOpenChange, refetchEvent } = props
  const {
    control,
    errors,
    handleSubmitForm,

    handleAddEvent,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,

    preview,
    handleUploadBanner,
    handleDeleteBanner,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    handleOnClose,

    dataCategory,
    dataRegion,
    searchRegency,
    handleSearchRegion
  } = useAddEvent()

  useEffect(() => {
    if (isSuccessMutateAddEvent) {
      onClose()
      refetchEvent()
    }
  }, [isSuccessMutateAddEvent])

  const disableSubmit = isPendingMutateAddEvent || isPendingMutateUploadFile || isPendingMutateDeleteFile

  return (
    <Modal onOpenChange={onOpenChange} isOpen={isOpen} placement="center" scrollBehavior="inside" onClose={() => handleOnClose(onClose)}>
      <form onSubmit={handleSubmitForm(handleAddEvent)}>
        <ModalContent className="m-4">
          <ModalHeader className="font-semibold">
            Add Event
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>
              <div className="flex flex-col gap-4">
                <Controller name="name" control={control} render={({ field }) => (
                  <Input {...field} label="Name" variant="bordered" isInvalid={errors.name !== undefined} errorMessage={errors.name?.message} />
                )} />
                <Controller name="slug" control={control} render={({ field }) => (
                  <Input {...field} label="Slug" variant="bordered" isInvalid={errors.slug !== undefined} errorMessage={errors.slug?.message} />
                )} />
                <Controller name="category" control={control} render={({ field: { onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    defaultItems={dataCategory?.data.data || []}
                    label="Category"
                    placeholder="Search category here..."
                    variant="bordered"
                    isInvalid={errors.category !== undefined}
                    errorMessage={errors.category?.message}
                    onSelectionChange={(value) => onChange(value)}
                  >
                    {(category: ICategory) => (
                      <AutocompleteItem key={`${category._id}`}>
                        {category.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )} />
                <Controller name="startDate" control={control} render={({ field }) => (
                  <DatePicker
                    {...field}
                    hideTimeZone
                    label="Start Date"
                    variant="bordered"
                    showMonthAndYearPickers
                    defaultValue={now(getLocalTimeZone())}
                    isInvalid={errors.startDate !== undefined}
                    errorMessage={errors.startDate?.message}
                  />
                )} />
                <Controller name="endDate" control={control} render={({ field }) => (
                  <DatePicker
                    {...field}
                    hideTimeZone
                    label="End Date"
                    variant="bordered"
                    showMonthAndYearPickers
                    defaultValue={now(getLocalTimeZone())}
                    isInvalid={errors.endDate !== undefined}
                    errorMessage={errors.endDate?.message}
                  />
                )} />
                <Controller name="isPublish" control={control} render={({ field }) => (
                  <Select
                    {...field}
                    label="Status"
                    variant="bordered"
                    isInvalid={errors.isPublish !== undefined}
                    errorMessage={errors.isPublish?.message}
                    disallowEmptySelection
                  >
                    <SelectItem key="true" textValue="Published">Published</SelectItem>
                    <SelectItem key="false" textValue="Not Published">Not Published</SelectItem>
                  </Select>
                )} />
                <Controller name="isFeatured" control={control} render={({ field }) => (
                  <Select
                    {...field}
                    label="Featured"
                    variant="bordered"
                    isInvalid={errors.isFeatured !== undefined}
                    errorMessage={errors.isFeatured?.message}
                    disallowEmptySelection
                  >
                    <SelectItem key="true" textValue="Yes">Yes</SelectItem>
                    <SelectItem key="false" textValue="No">No</SelectItem>
                  </Select>
                )} />

                <Controller name="isOnline" control={control} render={({ field }) => (
                  <Select
                    {...field}
                    label="Online/Offline"
                    variant="bordered"
                    isInvalid={errors.isOnline !== undefined}
                    errorMessage={errors.isOnline?.message}
                    disallowEmptySelection
                  >
                    <SelectItem key="true" textValue="Online">Online</SelectItem>
                    <SelectItem key="false" textValue="Offline">Offline</SelectItem>
                  </Select>
                )} />

                <Controller name="description" control={control} render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    variant="bordered"
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message} />
                )} />
              </div>

              <p className="text-sm font-bold">Location</p>
              <div className="flex flex-col gap-4">
                <Controller name="region" control={control} render={({ field: { onChange, ...field } }) => (
                  <Autocomplete
                    {...field}
                    defaultItems={dataRegion?.data.data && searchRegency !== "" ? dataRegion?.data.data : []}
                    label="City"
                    placeholder="Search city here..."
                    variant="bordered"
                    onInputChange={(search) => handleSearchRegion(search)}
                    isInvalid={errors.region !== undefined}
                    errorMessage={errors.region?.message}
                    onSelectionChange={(value) => onChange(value)}
                  >
                    {(regency: IRegency) => (
                      <AutocompleteItem key={`${regency.id}`}>
                        {regency.name}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                )} />

                <Controller name="latitude" control={control} render={({ field }) => (
                  <Input
                    {...field}
                    label="Latitude"
                    variant="bordered"
                    isInvalid={errors.latitude
                      !== undefined}
                    errorMessage={errors.latitude?.message} />
                )} />

                <Controller name="longitude" control={control} render={({ field }) => (
                  <Input
                    {...field}
                    label="Longitude"
                    variant="bordered"
                    isInvalid={errors.longitude
                      !== undefined}
                    errorMessage={errors.longitude?.message} />
                )} />
              </div>

              <p className="text-sm font-bold">Cover</p>
              <Controller name="banner" control={control} render={({ field: { onChange, value, ...field } }) => (
                <InputFile
                  {...field}
                  isDropable
                  isInvalid={errors.banner !== undefined}
                  errorMessage={errors.banner?.message}
                  onUpload={(files) => handleUploadBanner(files, onChange)}
                  onDelete={() => handleDeleteBanner(onChange)}
                  isDeleting={isPendingMutateDeleteFile}
                  isUploading={isPendingMutateUploadFile}
                  preview={typeof preview === "string" ? preview : ""}
                />
              )} />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={() => handleOnClose(onClose)}>
              Cancel
            </Button>
            <Button color="danger" type="submit" disabled={disableSubmit}>
              {isPendingMutateAddEvent ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Event"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

export default AddEvent