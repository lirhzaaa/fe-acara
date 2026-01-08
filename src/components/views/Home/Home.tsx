import HomeSlider from "./HomeSlider"
import useHome from "./useHome"

const Home = () => {
  const {
    dataBanner,
    isLoadingBanner,
  } = useHome()

  return (
    <div>
      <HomeSlider banners={dataBanner?.data} isLoadingBanners={isLoadingBanner} />
    </div>
  )
}

export default Home
