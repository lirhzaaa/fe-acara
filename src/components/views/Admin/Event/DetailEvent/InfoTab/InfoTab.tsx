import { IEvent, IEventForm } from "@/types/Event"
import { Autocomplete, AutocompleteItem, Button, Card, CardBody, CardHeader, DatePicker, Input, Select, SelectItem, Skeleton, Spinner, Textarea } from "@heroui/react"
import { Controller } from "react-hook-form"
import useInfoTab from "./useInfoTab"
import { useEffect } from "react"
import { ICategory } from "@/types/Category"
import { toInputDate } from "@/utils/date"


interface IInfoTypes {
    dataEvent: IEvent
    onUpdate: (data: IEventForm) => void
    isPendingUpdateEvent: boolean
    isSuccessUpdateEvent: boolean
}

const InfoTab = (props: IInfoTypes) => {
    const {
        dataEvent,
        onUpdate,
        isPendingUpdateEvent,
        isSuccessUpdateEvent
    } = props

    const {
        dataCategory,

        controlUpdateInformation,
        handleSubmitUpdateInformation,
        errorsUpdateInformation,
        resetUpdateInformation,
        setValueUpdateInformation
    } = useInfoTab()

    useEffect(() => {
        if (dataEvent) {
            setValueUpdateInformation("name", `${dataEvent.name}`)
            setValueUpdateInformation("slug", `${dataEvent.slug}`)
            setValueUpdateInformation("category", `${dataEvent.category}`)
            setValueUpdateInformation("startDate", toInputDate(`${dataEvent?.startDate}`))
            setValueUpdateInformation("endDate", toInputDate(`${dataEvent?.endDate}`))
            setValueUpdateInformation("isPublish", dataEvent.isPublish ?? false)
            setValueUpdateInformation("isFeatured", dataEvent.isFeatured ?? false)
            setValueUpdateInformation("description", `${dataEvent.description}`)
        }
    }, [dataEvent])

    useEffect(() => {
        if (isSuccessUpdateEvent) {
            resetUpdateInformation()
        }
    }, [isSuccessUpdateEvent])

    return (
        <Card className="w-full lg:w-1/2 p-4">
            <CardHeader className="flex flex-col lg:items-start gap-1">
                <h3 className="text-xl font-bold">Event Information</h3>
                <p className="w-full text-small text-default-400">Manage information of this event</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateInformation(onUpdate)}>
                    <Skeleton isLoaded={!!dataEvent?.name} className="rounded-lg">
                        <Controller name="name" control={controlUpdateInformation} render={({ field }) => (
                            <Input
                                {...field}
                                label="Name"
                                placeholder="Please Input Name For Event"
                                variant="bordered"
                                labelPlacement="outside"
                                defaultValue={dataEvent?.name}
                                isInvalid={errorsUpdateInformation.name !== undefined}
                                errorMessage={errorsUpdateInformation.name?.message}
                            />
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.slug} className="rounded-lg">
                        <Controller name="slug" control={controlUpdateInformation} render={({ field }) => (
                            <Input
                                {...field}
                                label="Slug"
                                placeholder="Please Input Slug For Event"
                                variant="bordered"
                                labelPlacement="outside"
                                defaultValue={dataEvent?.slug}
                                isInvalid={errorsUpdateInformation.slug !== undefined}
                                errorMessage={errorsUpdateInformation.slug?.message}
                            />
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.category} className="rounded-lg">
                        <Controller name="category" control={controlUpdateInformation} render={({ field: { onChange, ...field } }) => (
                            <Autocomplete
                                {...field}
                                defaultItems={dataCategory?.data?.data ?? []}
                                defaultSelectedKey={dataEvent?.category}
                                label="Category"
                                labelPlacement="outside"
                                variant="bordered"
                                placeholder="Search category here..."
                                isInvalid={errorsUpdateInformation.category !== undefined}
                                errorMessage={errorsUpdateInformation.category?.message}
                                onSelectionChange={(value) => onChange(value)}
                            >
                                {(category: ICategory) => (
                                    <AutocompleteItem key={`${category._id}`}>
                                        {category.name}
                                    </AutocompleteItem>
                                )}
                            </Autocomplete>
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.startDate} className="rounded-lg">
                        <Controller name="startDate" control={controlUpdateInformation} render={({ field }) => (
                            <DatePicker
                                {...field}
                                label="Start Date"
                                labelPlacement="outside"
                                showMonthAndYearPickers
                                hideTimeZone
                                variant="bordered"
                                // defaultValue={}
                                isInvalid={errorsUpdateInformation.startDate !== undefined}
                                errorMessage={errorsUpdateInformation.startDate?.message}
                            />
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.endDate} className="rounded-lg">
                        <Controller name="endDate" control={controlUpdateInformation} render={({ field }) => (
                            <DatePicker
                                {...field}
                                label="Start Date"
                                labelPlacement="outside"
                                showMonthAndYearPickers
                                hideTimeZone
                                variant="bordered"
                                // defaultValue={}
                                isInvalid={errorsUpdateInformation.endDate !== undefined}
                                errorMessage={errorsUpdateInformation.endDate?.message}
                            />
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={dataEvent?.isPublish !== undefined} className="rounded-lg">
                        <Controller name="isPublish" control={controlUpdateInformation} render={({ field }) => (
                            <Select
                                {...field}
                                label="Status"
                                labelPlacement="outside"
                                variant="bordered"
                                isInvalid={errorsUpdateInformation.isPublish !== undefined}
                                errorMessage={errorsUpdateInformation.isPublish?.message}
                                disallowEmptySelection
                                defaultSelectedKeys={[
                                    dataEvent?.isPublish ? "true" : "false"
                                ]}
                            >
                                <SelectItem key="true" textValue="Published">Published</SelectItem>
                                <SelectItem key="false" textValue="Not Published">Not Published</SelectItem>
                            </Select>
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.isFeatured} className="rounded-lg">
                        <Controller name="isFeatured" control={controlUpdateInformation} render={({ field }) => (
                            <Select
                                {...field}
                                label="Featured"
                                labelPlacement="outside"
                                variant="bordered"
                                isInvalid={errorsUpdateInformation.isFeatured !== undefined}
                                errorMessage={errorsUpdateInformation.isFeatured?.message}
                                disallowEmptySelection
                                defaultSelectedKeys={[
                                    dataEvent?.isFeatured ? "true" : "false"
                                ]}
                            >
                                <SelectItem key="true" textValue="Yes">Yes</SelectItem>
                                <SelectItem key="false" textValue="No">No</SelectItem>
                            </Select>
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.description} className="rounded-lg">
                        <Controller name="description" control={controlUpdateInformation} render={({ field }) => (
                            <Textarea
                                {...field}
                                label="Description"
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Please Input Description For Event"
                                defaultValue={dataEvent?.description}
                                isInvalid={errorsUpdateInformation.description !== undefined}
                                errorMessage={errorsUpdateInformation.description?.message}
                            />
                        )} />
                    </Skeleton>
                    <Button color="danger" type="submit" className="disabled:bg-default-500 mt-2" disabled={isPendingUpdateEvent}>
                        {isPendingUpdateEvent ? (
                            <Spinner size="sm" color="white" />
                        ) : "Save Changes"}
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default InfoTab