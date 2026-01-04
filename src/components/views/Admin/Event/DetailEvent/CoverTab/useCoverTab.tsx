import useMediaHandling from "@/hooks/useMediaHandling"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

const schemaUpdateCover = Yup.object().shape({
    banner: Yup.mixed<FileList | string>().required("Please input cover")
})

const useCoverTab = () => {
    const {
        mutateUploadFile,
        mutateDeleteFile,
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile
    } = useMediaHandling()

    const {
        control: controlUpdateCover,
        handleSubmit: handleSubmitUpdateCover,
        formState: { errors: errosUpdateCover },
        reset: resetUpdateCover,
        watch: watchUpdateCover,
        getValues: getValuesUpdateCover,
        setValue: setValueUpdateCover,
    } = useForm({
        resolver: yupResolver(schemaUpdateCover)
    })

    const handleUploadUpdateCover = (
        files: FileList, onChange: (files: FileList | undefined) => void
    ) => {
        if (files.length !== 0) {
            onChange(files)
            mutateUploadFile({
                file: files[0],
                callback: (fileUrl: string) => [
                    setValueUpdateCover("banner", fileUrl)
                ]
            })
        }
    }

    const handleDeleteUploadCover = (
        onchange: (files: FileList | undefined) => void
    ) => {
        const fileUrl = getValuesUpdateCover("banner")
        if (typeof fileUrl === "string") {
            mutateDeleteFile({ fileUrl, callback: () => onchange(undefined) })
        }
    }

    const preview = watchUpdateCover("banner")

    return {
        handleUploadUpdateCover,
        handleDeleteUploadCover,
        handleSubmitUpdateCover,
        
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,
        
        preview,
        controlUpdateCover,
        errosUpdateCover,
        resetUpdateCover
    }
}

export default useCoverTab