import CardEvent from "@/components/ui/CardEvent"
import useEvent from "./useEvent"
import { IEvent } from "@/types/Event"
import { useEffect } from "react"
import { useRouter } from "next/router"
import useChangeUrl from "@/hooks/useChangeUrl"
import EventFooter from "./EventFooter"
import EventFilter from "./EventFilter"
import Image from "next/image"

const Event = () => {
    const router = useRouter()
    const { setExplore } = useChangeUrl()
    const {
        dataEvent,
        isLoadingEvent,
        isRefetchingEvent,
        refetchEvent,
    } = useEvent()

    useEffect(() => {
        if (router.isReady) {
            setExplore()
        }
    }, [router.isReady])

    return (
        <div className="flex flex-col w-full justify-center gap-6 px-4 lg:flex-row lg:px-0">
            <EventFilter />
            <div className="min-h-[70vh] w-fit flex-1">
                <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {!isLoadingEvent && !isRefetchingEvent ? dataEvent?.data?.map((event: IEvent) => (
                        <CardEvent event={event} key={`card-event-${event._id}`} />
                    )) : (
                        Array.from({ length: 4 }).map((_, index) => (
                            <CardEvent
                                key={`card-event-loading${index}`}
                                isLoading={true}
                            />
                        ))
                    )}
                </div>
                {!isLoadingEvent && dataEvent?.data?.length > 0 && (
                    <EventFooter totalPages={dataEvent?.pagination?.totalPages} />
                )}

                {dataEvent?.data.length < 1 && !isLoadingEvent && !isRefetchingEvent && (
                    <div className="flex flex-col items-center justify-center gap-4 py-20">
                        <Image src="/images/illustration/no-data.svg" alt="Image No Data" width={200} height={200} />
                        <h2 className="text-center text-2xl font-bold text-danger">Event is empty</h2>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Event