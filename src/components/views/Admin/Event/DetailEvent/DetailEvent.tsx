import { Tab, Tabs } from "@heroui/react"
import CoverTab from "./CoverTab"
import useDetailEvent from "./useDetailEvent"
import InfoTab from "./InfoTab"
import LocationTab from "./LocationTab"

const DetailEvent = () => {
  const {
    dataEvent,
    handleUpdateEvent,
    isPendingMutateEvent,
    isSuccessMutateEvent,

    dataDefaultRegion,
    isPendingUpdateRegion,
  } = useDetailEvent()

  return (
    <Tabs>
      <Tab key="banner" title="Cover">
        <CoverTab
          currentCover={dataEvent?.banner}
          onUpdate={handleUpdateEvent}
          isPendingUpdateEvent={isPendingMutateEvent}
          isSuccessUpdateEvent={isSuccessMutateEvent}
        />
      </Tab>

      <Tab key="info" title="Info">
        <InfoTab
          dataEvent={dataEvent}
          onUpdate={handleUpdateEvent}
          isPendingUpdateEvent={isPendingMutateEvent}
          isSuccessUpdateEvent={isSuccessMutateEvent}
        />
      </Tab>

      <Tab key="location" title="Location">
        <LocationTab
          dataEvent={dataEvent}
          onUpdate={handleUpdateEvent}
          dataDefaultRegion={dataDefaultRegion?.data?.data[0]?.name}
          isPendingUpdateRegion={isPendingUpdateRegion}
          isPendingUpdateEvent={isPendingMutateEvent}
          isSuccessUpdateEvent={isSuccessMutateEvent}
        />
      </Tab>
    </Tabs>
  )
}

export default DetailEvent