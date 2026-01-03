import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react"
import { CiMenuKebab } from "react-icons/ci"

interface DropdownTypes {
    textButtonDetail: string
    textButtonDelete: string
    onPressButtonDetail: () => void
    onPressButtonDelete: () => void
}

const DropdownAction = (props: DropdownTypes) => {
    const {
        textButtonDetail,
        textButtonDelete,
        onPressButtonDetail,
        onPressButtonDelete
    } = props

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="bordered">
                    <CiMenuKebab className="text-default-700" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dropdown Actions">
                <DropdownItem key="detail" onPress={onPressButtonDetail}>
                    {textButtonDetail}
                </DropdownItem>
                <DropdownItem key="delete" onPress={onPressButtonDelete} className="text-danger-500">
                    {textButtonDelete}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default DropdownAction