import { cn } from "@/utils/cn"
import Image from "next/image"
import { ChangeEvent, useEffect, useId, useRef, useState } from "react"
import { CiSaveUp2 } from "react-icons/ci"

interface IInputFile {
    name: string
    className?: string
    isDropable?: boolean
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    isInvalid?: boolean
    errorMessage?: string
}

const InputFile = (props: IInputFile) => {
    const { name, className, isDropable = false, onChange, isInvalid, errorMessage } = props
    const [uploadImage, setUploadImage] = useState<File | null>(null)
    const drop = useRef<HTMLLabelElement>(null)
    const dropzoneId = useId()
    const handleDragOver = (e: DragEvent) => {
        if (isDropable) {
            e.preventDefault()
            e.stopPropagation()
        }
    }

    const handleDrop = (e: DragEvent) => {
        e.preventDefault()
        setUploadImage(e.dataTransfer?.files?.[0] || null)
    }

    useEffect(() => {
        const dropCurrent = drop.current
        if (dropCurrent) {
            dropCurrent.addEventListener("dragover", handleDragOver)
            dropCurrent.addEventListener("drop", handleDrop)
        }
        return () => {
            dropCurrent?.removeEventListener("dragover", handleDragOver)
            dropCurrent?.removeEventListener("drop", handleDrop)
        }
    }, [])

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files
        if (files && files.length > 0) {
            setUploadImage(files[0])
            if (onChange) {
                onChange(e)
            }
        }
    }

    return (
        <div>
            <label htmlFor={`dropzone-file-${dropzoneId}`} ref={drop} className={cn(
                "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
                className,
                { "border-danger-500": isInvalid }
            )}>
                {uploadImage ? (
                    <div className="flex flex-col items-center justify-center p-5">
                        <div className="mb-2 w-1/2">
                            <Image fill src={URL.createObjectURL(uploadImage)} alt="Image" className="relative!" />
                        </div>
                        <p className="text-center text-sm font-semibold text-gray-500">
                            {uploadImage.name}
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-5">
                        <div className="mb-2">
                            <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-400" />
                        </div>
                        <p className="text-center text-sm font-semibold text-gray-500">
                            {isDropable ? "Drag and drop on click to updload file here" : "Click to upload file here"}
                        </p>
                    </div>
                )}
                <input type="file" className="hidden" accept="image/*" id={`dropzone-file-${dropzoneId}`} name={name} onChange={handleOnChange} />
            </label>
            {isInvalid && (
                <p className="p-1 text-xs text-danger-500">{errorMessage}</p>
            )}
        </div>
    )
}

export default InputFile
