import HeroSlide from "../../components/HeroSlide";
import Page from "../../components/Page";
import SearchDetailOrder from "../../sections/SearchOrder/SearchDetailOrder";

type Props = {};

export default function SearchOrder({}: Props) {
  return (
    <Page title="Tra cứu đơn hàng">
      <HeroSlide />
      <div className="w-full py-[60px] bg-bgr">
        <div className="px-[50px] bg-bgr max-w-[1200px] rounded-xl flex flex-col mx-auto">
          <div className="mb-6">
            <div
              className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              id="tabs-home"
              role="tabpanel"
              aria-labelledby="tabs-home-tab"
              data-te-tab-active
            >
              <SearchDetailOrder />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
