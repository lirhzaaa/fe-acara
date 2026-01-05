import { useEffect } from "react"
import useCoverTab from "./useCoverTab"
import { Button, Card, CardBody, CardHeader, Skeleton, Spinner } from "@heroui/react"
import Image from "next/image"
import { Controller } from "react-hook-form"
import InputFile from "@/components/ui/InputFile"
import { IEventForm } from "@/types/Event"

interface ICoverTypes {
    currentCover: string
    onUpdate: (data: IEventForm) => void
    isPendingUpdateEvent: boolean
    isSuccessUpdateEvent: boolean
}

const CoverTab = (props: ICoverTypes) => {
    const {
        currentCover,
        onUpdate,
        isPendingUpdateEvent,
        isSuccessUpdateEvent
    } = props

    const {
        handleUploadUpdateCover,
        handleDeleteUploadCover,
        handleSubmitUpdateCover,

        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,

        preview,
        controlUpdateCover,
        errosUpdateCover,
        resetUpdateCover
    } = useCoverTab()

    useEffect(() => {
        if (isSuccessUpdateEvent) {
            resetUpdateCover()
        }
    }, [isSuccessUpdateEvent])

    return (
        <Card className="w-full lg:w-1/2 p-4">
            <CardHeader className="flex flex-col lg:items-start gap-1">
                <h3 className="text-xl font-bold">Event Cover</h3>
                <p className="w-full text-small text-default-400">Manage cover of this event</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-10" onSubmit={handleSubmitUpdateCover(onUpdate)}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Cover</p>
                        <Skeleton isLoaded={!!currentCover} className="aspect-video rounded-lg">
                            <Image src={currentCover} alt="Image Cover for event" fill className="relative! object-cover rounded-lg" />
                        </Skeleton>
                    </div>
                    <Controller name="banner" control={controlUpdateCover} render={({ field: { onChange, value, ...field } }) => (
                        <InputFile
                            {...field}
                            name="banner"
                            label="Upload New Cover"
                            onUpload={(files) => handleUploadUpdateCover(files, onChange)}
                            onDelete={() => handleDeleteUploadCover(onChange)}
                            isUploading={isPendingMutateUploadFile}
                            isDeleting={isPendingMutateDeleteFile}
                            isInvalid={errosUpdateCover.banner !== undefined}
                            errorMessage={errosUpdateCover.banner?.message}
                            preview={typeof preview === "string" ? preview : ""}
                            isDropable />
                    )} />
                    <Button color="danger" type="submit" className="disabled:bg-default-500 mt-2" disabled={isPendingMutateUploadFile || isPendingUpdateEvent || !preview}>
                        {isPendingUpdateEvent ? (
                            <Spinner size="sm" color="white" />
                        ) : "Save Changes"}
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default CoverTab