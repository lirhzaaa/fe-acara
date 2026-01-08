import { Skeleton } from "@heroui/react"
import HomeList from "./HomeList"
import HomeSlider from "./HomeSlider"
import useHome from "./useHome"
import Image from "next/image"

const Home = () => {
  const {
    dataBanner,
    isLoadingBanner,

    dataFeaturedEvent,
    isLoadingFeaturedEvent,

    dataLatestEvent,
    isLoadingLatestEvent
  } = useHome()

  console.log(dataFeaturedEvent)
  return (
    <div>
      <HomeSlider banners={dataBanner?.data} isLoadingBanners={isLoadingBanner} />
      <HomeList title="Featured Event" events={dataFeaturedEvent?.data} isLoading={isLoadingFeaturedEvent} />
      <Skeleton isLoaded={!isLoadingBanner} className="mb-16 h-[20vw] w-full rounded-2xl">
        <Image src={dataBanner && dataBanner?.data[0]?.image} alt="Banner" className="h-[20vw] w-full rounded-2xl" width={1920} height={800} />
      </Skeleton>
      <HomeList title="Lates Event" events={dataLatestEvent?.data} isLoading={isLoadingLatestEvent} />
    </div>
  )
}

export default Home
