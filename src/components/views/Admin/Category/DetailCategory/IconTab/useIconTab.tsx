import useMediaHandling from "@/hooks/useMediaHandling"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"


const schemaUpdateIcon = Yup.object().shape({
    icon: Yup.mixed<FileList | string>().required("Please input icon")
})

const useIconTab = () => {
    const {
        mutateUploadFile,
        mutateDeleteFile,
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,
    } = useMediaHandling()

    const {
        control: controlUpdateIcon,
        handleSubmit: handleSubmitUpdateIcon,
        formState: { errors: errorsUpdateIcon },
        reset: resetUpdateIcon,
        watch: watchUpdateIcon,
        getValues: getValuesUpdateIcon,
        setValue: setValueUpdateIcon
    } = useForm({
        resolver: yupResolver(schemaUpdateIcon)
    })

    const handleUploadUpdateIcon = (
        files: FileList, onChange: (files: FileList | undefined) => void) => {
        if (files.length !== 0) {
            onChange(files)
            mutateUploadFile({
                file: files[0],
                callback: (fileUrl: string) => {
                    setValueUpdateIcon("icon", fileUrl)
                }
            })
        }
    }

    const handleDeleteUpdateIcon = (
        onchange: (files: FileList | undefined) => void
    ) => {
        const fileUrl = getValuesUpdateIcon("icon")
        if (typeof fileUrl === "string") {
            mutateDeleteFile({ fileUrl, callback: () => onchange(undefined) })
        }
    }

    const preview = watchUpdateIcon("icon")

    return {
        preview,

        handleUploadUpdateIcon,
        handleDeleteUpdateIcon,
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,

        controlUpdateIcon,
        handleSubmitUpdateIcon,
        errorsUpdateIcon,
        resetUpdateIcon
    }
}

export default useIconTab
