import { Tab, Tabs } from "@heroui/react"
import IconTab from "./IconTab"
import InfoTab from "./InfoTab"
import useDetailCategory from "./useDetailCategory"

const DetailCategory = () => {
    const {
        dataCategory,
        handleUpdateCategory,
        isPendingMutateUpdateCategory,
        isSuccessMutateUpdateCategory,
    } = useDetailCategory()
    return (
        <Tabs aria-label="Options Detail Category">
            <Tab key="icon" title="Icon">
                <IconTab
                    currentIcon={dataCategory?.icon}
                    onUpdate={handleUpdateCategory}
                    isPendingUpdateCategory={isPendingMutateUpdateCategory}
                    isSuccessUpdateCategory={isSuccessMutateUpdateCategory} />
            </Tab>
            <Tab key="info" title="Info">
                <InfoTab
                    dataCategory={dataCategory}
                    onUpdate={handleUpdateCategory}
                    isPendingUpdateCategory={isPendingMutateUpdateCategory}
                    isSuccessUpdateCategory={isSuccessMutateUpdateCategory} />
            </Tab>
        </Tabs>
    )
}

export default DetailCategory
