import { ICategory } from "@/types/Category"
import { Button, Card, CardBody, CardHeader, Input, Skeleton, Textarea } from "@heroui/react"

interface IDataCategory {
    dataCategory: ICategory
}

const InfoTab = (props: IDataCategory) => {
    const { dataCategory } = props
    return (
        <Card className="w-full lg:w-1/2 p-4">
            <CardHeader className="flex flex-col lg:items-start gap-1">
                <h3 className="text-xl font-bold">Category Information</h3>
                <p className="w-full text-small text-default-400">Manage information of this category</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={() => { }}>
                    <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
                        <Input
                            label="Name"
                            variant="bordered"
                            type="text"
                            labelPlacement="outside"
                            placeholder="Please Input Name For Category"
                            defaultValue={dataCategory?.name} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
                        <Textarea
                            label="Description"
                            variant="bordered"
                            labelPlacement="outside"
                            placeholder="Please Input Description For Category"
                            defaultValue={dataCategory?.description} />
                    </Skeleton>
                    <Button color="danger" type="submit" className="disabled:bg-default-500 mt-2" disabled>
                        Save Changes
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default InfoTab
