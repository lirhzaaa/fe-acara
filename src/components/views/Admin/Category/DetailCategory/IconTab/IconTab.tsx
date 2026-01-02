import InputFile from "@/components/ui/InputFile"
import { Button, Card, CardBody, CardHeader, Skeleton, Spinner } from "@heroui/react"
import Image from "next/image"
import useIconTab from "./useIconTab"
import { Controller } from "react-hook-form"
import { useEffect } from "react"

interface IIconTypes {
    currentIcon: string
    onUpdate: (data: { icon: FileList | string }) => void
    isPendingUpdateCategory: boolean
    isSuccessUpdateCategory: boolean
}

const IconTab = (props: IIconTypes) => {
    const { currentIcon, onUpdate, isPendingUpdateCategory, isSuccessUpdateCategory } = props
    const {
        preview,

        handleUploadUpdateIcon,
        handleDeleteUpdateIcon,
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,

        controlUpdateIcon,
        handleSubmitUpdateIcon,
        resetUpdateIcon,
        errorsUpdateIcon,
    } = useIconTab()

    useEffect(() => {
        if (isSuccessUpdateCategory) {
            resetUpdateIcon()
        }
    }, [isSuccessUpdateCategory])

    return (
        <Card className="w-full lg:w-1/2 p-4">
            <CardHeader className="flex flex-col lg:items-start gap-1">
                <h3 className="text-xl font-bold">Category Icon</h3>
                <p className="w-full text-small text-default-400">Manage icon of this category</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateIcon(onUpdate)}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Icon</p>
                        <Skeleton isLoaded={!!currentIcon} className="aspect-square rounded-lg">
                            <Image src={currentIcon} alt="Image icon for category" fill className="relative!" />
                        </Skeleton>
                    </div>
                    <Controller name="icon" control={controlUpdateIcon} render={({ field: { onChange, value, ...field } }) => (
                        <InputFile
                            {...field}
                            name="icon"
                            label="Upload New Icon"
                            onDelete={() => handleDeleteUpdateIcon(onChange)}
                            onUpload={(files) => handleUploadUpdateIcon(files, onChange)}
                            isUploading={isPendingMutateUploadFile}
                            isDeleting={isPendingMutateDeleteFile}
                            isInvalid={errorsUpdateIcon.icon !== undefined}
                            errorMessage={errorsUpdateIcon.icon?.message}
                            preview={typeof preview === "string" ? preview : ""}
                            isDropable />
                    )} />
                    <Button color="danger" type="submit" className="disabled:bg-default-500 mt-2" disabled={isPendingMutateUploadFile || isPendingUpdateCategory || !preview}>
                        {isPendingUpdateCategory ? (
                            <Spinner size="sm" color="white" />
                        ) : "Save Changes"}
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default IconTab
