import { IEventForm, IRegency } from "@/types/Event"
import { Autocomplete, AutocompleteItem, Button, Card, CardBody, CardHeader, Input, Select, SelectItem, Skeleton, Spinner } from "@heroui/react"
import { useEffect } from "react"
import { Controller } from "react-hook-form"
import useLocationTab from "./useLocationTab"

interface ILocationTypes {
    dataEvent: IEventForm
    onUpdate: (data: IEventForm) => void
    isPendingUpdateEvent: boolean
    isSuccessUpdateEvent: boolean
    dataDefaultRegion: string
    isPendingUpdateRegion: boolean
}

const LocationTab = (props: ILocationTypes) => {
    const {
        dataEvent,
        onUpdate,
        isPendingUpdateEvent,
        isSuccessUpdateEvent,

        dataDefaultRegion,
        isPendingUpdateRegion,
    } = props

    const {
        dataRegion,
        handleSearchRegion,
        searchRegency,

        controlUpdateLocation,
        handleSubmitUpdateLocation,
        errorsUpdateLocation,
        resetUpdateLocation,
        setValueUpdateLocation
    } = useLocationTab()

    useEffect(() => {
        if (dataEvent?.location) {
            setValueUpdateLocation("isOnline", `${dataEvent.isOnline}`)
            setValueUpdateLocation("latitude", dataEvent.location.coordinates?.[0]?.toString() ?? "")
            setValueUpdateLocation("longitude", dataEvent.location.coordinates?.[1]?.toString() ?? "")
            setValueUpdateLocation("address", dataEvent.location.address ?? "")
            setValueUpdateLocation("region", Number(dataEvent?.location?.region))
        }
    }, [dataEvent]);

    useEffect(() => {
        if (isSuccessUpdateEvent) {
            resetUpdateLocation()
        }
    }, [isSuccessUpdateEvent])

    useEffect(() => {
        if (dataEvent?.location?.region) {
            handleSearchRegion(dataDefaultRegion)
        }
    }, [dataEvent])

    return (
        <Card className="w-full lg:w-1/2 p-4">
            <CardHeader className="flex flex-col lg:items-start gap-1">
                <h3 className="text-xl font-bold">Event Information</h3>
                <p className="w-full text-small text-default-400">Manage information of this event</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateLocation(onUpdate)}>
                    <Skeleton isLoaded={dataEvent?.isOnline !== undefined} className="rounded-lg">
                        <Controller
                            name="isOnline"
                            control={controlUpdateLocation}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Online/Offline"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    disallowEmptySelection
                                    isInvalid={errorsUpdateLocation.isOnline !== undefined}
                                    errorMessage={errorsUpdateLocation.isOnline?.message}
                                    defaultSelectedKeys={[dataEvent?.isOnline ? "true" : "false"]}>
                                    <SelectItem key="true" textValue="Online">Online</SelectItem>
                                    <SelectItem key="false" textValue="Offline">Offline</SelectItem>
                                </Select>
                            )}
                        />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent?.location?.coordinates} className="rounded-lg">
                        <Controller name="latitude" control={controlUpdateLocation} render={({ field }) => (
                            <Input
                                {...field}
                                label="Latitude"
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Please Input latitude For Event"
                                defaultValue={dataEvent?.location?.coordinates?.[0]?.toString()}
                                isInvalid={errorsUpdateLocation.latitude !== undefined}
                                errorMessage={errorsUpdateLocation.latitude?.message}
                            />
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent.location?.region && !isPendingUpdateRegion} className="rounded-lg">
                        <Controller name="longitude" control={controlUpdateLocation} render={({ field }) => (
                            <Input
                                {...field}
                                label="Longitude"
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Please Input longitude For Event"
                                defaultValue={dataEvent?.location?.coordinates?.[1]?.toString()}
                                isInvalid={errorsUpdateLocation.longitude !== undefined}
                                errorMessage={errorsUpdateLocation.longitude?.message}
                            />
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent.location?.region && !isPendingUpdateRegion} className="rounded-lg">
                        <Controller name="address" control={controlUpdateLocation} render={({ field }) => (
                            <Input
                                {...field}
                                label="Address"
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Please Input address For Event"
                                defaultValue={dataEvent?.location?.address}
                                isInvalid={errorsUpdateLocation.address !== undefined}
                                errorMessage={errorsUpdateLocation.address?.message}
                            />
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataEvent.location?.region && !isPendingUpdateRegion} className="rounded-lg">
                        <Controller
                            name="region"
                            control={controlUpdateLocation}
                            render={({ field }) => (
                                <Autocomplete
                                    selectedKey={field.value ? field.value.toString() : null}
                                    items={dataRegion?.data.data ?? []}
                                    label="City"
                                    placeholder="Search city here..."
                                    variant="bordered"
                                    onInputChange={handleSearchRegion}
                                    isInvalid={!!errorsUpdateLocation.region}
                                    errorMessage={errorsUpdateLocation.region?.message}
                                    onSelectionChange={(key) => {
                                        if (key) field.onChange(Number(key))
                                    }}
                                >
                                    {(regency: IRegency) => (
                                        <AutocompleteItem key={regency.id.toString()}>
                                            {regency.name}
                                        </AutocompleteItem>
                                    )}
                                </Autocomplete>
                            )}
                        />
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

export default LocationTab
