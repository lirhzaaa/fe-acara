import { Tab, Tabs } from "@heroui/react"
import IconTab from "./IconTab"
import InfoTab from "./InfoTab"
import useDetailCategory from "./useDetailCategory"

const DetailCategory = () => {
    const { dataCategory } = useDetailCategory()
    return (
        <Tabs aria-label="Options Detail Category">
            <Tab key="icon" title="Icon">
                <IconTab currentIcon={dataCategory?.icon} />
            </Tab>
            <Tab key="info" title="Info">
                <InfoTab />
            </Tab>
        </Tabs>
    )
}

export default DetailCategory
