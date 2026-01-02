import uploadService from "@/services/upload.service"
import { addToast } from "@heroui/react"
import { useMutation } from "@tanstack/react-query"

const useMediaHandling = () => {
    const uploadIcon = async (file: File, callback: (fileUrl: string) => void) => {
        const formData = new FormData()
        formData.append("file", file)
        const {
            data: {
                data: { secure_url: icon }
            }
        } = await uploadService.uploadFile(formData)
        callback(icon)
    }

    const { mutate: mutateUploadFile, isPending: isPendingMutateUploadFile } = useMutation({
        mutationFn: (variables: { file: File, callback: (fileUrl: string) => void }) => uploadIcon(variables.file, variables.callback),
        onError: (error) => {
            addToast({
                title: "Terjadi Kesalahan",
                description: error.message,
                color: "danger"
            })
        },
    })

    const deleteIcon = async (fileUrl: string, callback: () => void = () => { }) => {
        const result = await uploadService.deleteFile({ fileUrl })
        if (result.data.meta.status === 200) {
            callback()
        }
    }

    const { mutate: mutateDeleteFile, isPending: isPendingMutateDeleteFile } = useMutation({
        mutationFn: (variables: { fileUrl: string, callback: () => void }) => deleteIcon(variables.fileUrl, variables.callback),
        onError: (error) => {
            addToast({
                title: "Terjadi Kesalahan",
                description: error.message,
                color: "danger"
            })
        },
    })

    return {
        mutateUploadFile,
        isPendingMutateUploadFile,
        mutateDeleteFile,
        isPendingMutateDeleteFile
    }
}

export default useMediaHandling