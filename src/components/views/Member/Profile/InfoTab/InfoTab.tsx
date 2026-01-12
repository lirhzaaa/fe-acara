import { Button, Card, CardBody, CardHeader, input, Input, Skeleton, Spinner } from "@heroui/react"
import { useEffect } from "react"
import { Controller } from "react-hook-form"
import useInfoTab from "./useInfoTab"
import { IProfile } from "@/types/Auth"

interface IInfoTypes {
    dataProfile: IProfile
    onUpdate: (data: IProfile) => void
    isPendingUpdate: boolean
    isSuccessUpdate: boolean
}

const InfoTab = (props: IInfoTypes) => {
    const {
        dataProfile,
        onUpdate,
        isPendingUpdate,
        isSuccessUpdate,
    } = props

    const {
        controlUpdateInfo,
        handleSubmitUpdateInfo,
        errorsUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
    } = useInfoTab()

    useEffect(() => {
        if (dataProfile) {
            setValueUpdateInfo("fullname", `${dataProfile?.fullname}`)
        }
    }, [dataProfile]);

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateInfo()
        }
    }, [isSuccessUpdate])

    return (
        <Card className="w-full lg:w-1/2 p-4">
            <CardHeader className="flex flex-col lg:items-start gap-1">
                <h3 className="text-xl font-bold">Profile Information</h3>
                <p className="w-full text-small text-default-400">Manage information of this Info</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateInfo(onUpdate)}>
                    <Skeleton isLoaded={dataProfile?.fullname !== undefined} className="rounded-lg">
                        <Controller name="fullname" control={controlUpdateInfo} render={({ field }) => (
                            <Input
                                {...field}
                                label="Fullname"
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Please input your fullname"
                                defaultValue={dataProfile?.fullname}
                                isInvalid={errorsUpdateInfo.fullname !== undefined}
                                errorMessage={errorsUpdateInfo.fullname?.message}
                            />
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={dataProfile?.username !== undefined} className="rounded-lg">
                        <Input
                            label="Username"
                            variant="flat"
                            labelPlacement="outside"
                            value={dataProfile?.username}
                            disabled
                        />
                    </Skeleton>
                    <Skeleton isLoaded={dataProfile?.email !== undefined} className="rounded-lg">
                        <Input
                            label="Email"
                            variant="flat"
                            labelPlacement="outside"
                            value={dataProfile?.email}
                            disabled
                        />
                    </Skeleton>
                    <Skeleton isLoaded={dataProfile?.role !== undefined} className="rounded-lg">
                        <Input
                            label="Role"
                            variant="flat"
                            labelPlacement="outside"
                            value={dataProfile?.role}
                            classNames={{
                                input: "capitalize",
                            }}
                            disabled
                        />
                    </Skeleton>
                    <Button color="danger" type="submit" className="disabled:bg-default-500 mt-2" disabled={isPendingUpdate}>
                        {isPendingUpdate ? (
                            <Spinner size="sm" color="white" />
                        ) : "Save Changes"}
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default InfoTab
