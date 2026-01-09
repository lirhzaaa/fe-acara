import { Skeleton } from "@heroui/react"
import HomeEvent from "./HomeEvent"
import HomeSlider from "./HomeSlider"
import useHome from "./useHome"
import Image from "next/image"
import HomeCategory from "./HomeCategory"

const Home = () => {
  const {
    dataBanner,
    isLoadingBanner,

    dataFeaturedEvent,
    isLoadingFeaturedEvent,

    dataLatestEvent,
    isLoadingLatestEvent,

    dataCategories,
    isLoadingCategories
  } = useHome()

  return (
    <div>
      <HomeSlider banners={dataBanner?.data} isLoadingBanners={isLoadingBanner} />
      <HomeEvent title="Featured Event" events={dataFeaturedEvent?.data} isLoading={isLoadingFeaturedEvent} />
      <Skeleton isLoaded={!isLoadingBanner} className="mb-16 h-[20vw] w-full rounded-2xl">
        <Image src={dataBanner && dataBanner?.data[0]?.image} alt="Banner" className="h-[20vw] w-full rounded-2xl" width={1920} height={800} />
      </Skeleton>
      <HomeEvent title="Lates Event" events={dataLatestEvent?.data} isLoading={isLoadingLatestEvent} />
      <HomeCategory categories={dataCategories?.data} isLoading={isLoadingCategories} />
    </div>
  )
}

export default Home
