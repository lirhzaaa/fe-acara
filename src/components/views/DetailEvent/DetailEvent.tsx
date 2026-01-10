import { BreadcrumbItem, Breadcrumbs, Skeleton, Tab, Tabs } from "@heroui/react"
import useDetailEvent from "./useDetailEvent"
import { FaClock, FaLocationDot } from "react-icons/fa6"
import { converTime } from "@/utils/date"
import Image from "next/image"
import { ITicket } from "@/types/Ticket"
import DetailTicket from "./DetailTicket"
import DetailCart from "./DetailCart"

const DetailEvent = () => {
  const {
    dataDetailEvent,
    dataTicket,

    isLoadingDetailEvent,
    isLoadingTicket,

    cart,
    dataTicketInCart,
    handleAddToCart,
    handleChangeQuantity
  } = useDetailEvent()

  console.log(dataDetailEvent)

  return (
    <div className="px-8 md:px-0">
      <Skeleton isLoaded={!!dataDetailEvent?.name} className="h-5 full">
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/event">Event</BreadcrumbItem>
          <BreadcrumbItem>{dataDetailEvent?.name}</BreadcrumbItem>
        </Breadcrumbs>
      </Skeleton>

      <section className="mt-8 flex flex-col gap-18 lg:flex-row">
        <div className="w-full lg:w-4/6">
          <div className="flex flex-col gap-2">
            <Skeleton isLoaded={!!dataDetailEvent?.name} className="h-8">
              <h1 className="text-2xl font-semibold text-danger">
                {dataDetailEvent?.name}
              </h1>
            </Skeleton>
            <Skeleton isLoaded={!!dataDetailEvent?.startDate || !!dataDetailEvent?.endDate} className="h-4">
              <div className="flex items-center gap-2 text-default-500 text-sm">
                <FaClock width={16} />
                <span>{converTime(dataDetailEvent?.startDate)} - {converTime(dataDetailEvent?.endDate)}</span>
              </div>
            </Skeleton>
            <Skeleton isLoaded={!!dataDetailEvent?.isOnline || !!dataDetailEvent?.location} className="h-4 mb-4">
              <div className="flex items-center gap-2 text-default-500 text-sm">
                <FaLocationDot width={16} />
                <span>
                  {dataDetailEvent?.isOnline ? "Online" : "Offline"}
                  {dataDetailEvent?.isOnline ? "" : `- ${dataDetailEvent?.location?.address}`}
                </span>
              </div>
            </Skeleton>
            <Skeleton isLoaded={!!dataDetailEvent?.banner} className="aspect-video w-full mb-4 rounded-xl">
              <Image src={dataDetailEvent?.banner} alt="Cover Image" width={1920} height={1080} className="aspect-video w-full rounded-lg object-cover" />
            </Skeleton>
            <Tabs aria-label="Tab Detail Event" fullWidth>
              <Tab key="Description" title="Description" className="flex flex-col gap-2">
                <Skeleton isLoaded={dataDetailEvent?.description} className="h-6">
                  <h2 className="text-xl font-semibold text-foreground-700">About Event</h2>
                </Skeleton>
                <Skeleton isLoaded={dataDetailEvent?.description} className="h-4">
                  <p className="text-foreground-500">{dataDetailEvent?.description}</p>
                </Skeleton>
              </Tab>
              <Tab key="Ticket" title="Ticket" className="flex flex-col gap-2">
                <Skeleton isLoaded={dataDetailEvent?.description} className="h-6">
                  <h2 className="text-xl font-semibold text-foreground-700">Ticket</h2>
                </Skeleton>
                <div className="flex flex-col gap-8">
                  {dataTicket?.map((ticket: ITicket) => <DetailTicket
                    key={`${ticket._id}`}
                    ticket={ticket}
                    cart={cart}
                    handleAddToCart={() => handleAddToCart(`${ticket._id}`)}
                  />)}
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
        <div className="w-full lg:w-2/6">
          <DetailCart cart={cart} dataTicketInCart={dataTicketInCart} onChangeQuantity={handleChangeQuantity} />
        </div>
      </section>
    </div>
  )
}

export default DetailEvent