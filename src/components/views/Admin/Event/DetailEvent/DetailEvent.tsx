import { Tab, Tabs } from "@heroui/react"
import CoverTab from "./CoverTab"
import useDetailEvent from "./useDetailEvent"
import InfoTab from "./InfoTab"

const DetailEvent = () => {
  const {
    dataEvent,
    handleUpdateEvent,
    isPendingMutateEvent,
    isSuccessMutateEvent
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
      </Tab>
    </Tabs>
  )
}

export default DetailEvent