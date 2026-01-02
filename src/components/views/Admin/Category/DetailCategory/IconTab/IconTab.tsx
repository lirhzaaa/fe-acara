import InputFile from "@/components/ui/InputFile"
import { Card, CardBody, CardFooter, CardHeader, Skeleton } from "@heroui/react"
import Image from "next/image"

interface IIconTypes {
    currentIcon: string
}

const IconTab = (props: IIconTypes) => {
    const { currentIcon } = props
    return (
        <Card className="w-full lg:w-1/2 p-4">
            <CardHeader className="flex flex-col lg:items-start gap-1">
                <h1 className="text-xl font-bold">Category Icon</h1>
                <p className="w-full text-small text-default-400">Manage icon of this category</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={() => { }}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Icon</p>
                        <Skeleton isLoaded={!!currentIcon} className="aspect-square rounded-lg">
                            <Image src={currentIcon} alt="Image icon for category" fill className="relative!"/>
                        </Skeleton>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}

export default IconTab
