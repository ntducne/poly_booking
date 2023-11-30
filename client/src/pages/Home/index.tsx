import { HomeOutlined } from "@ant-design/icons";
import { MdBed } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdOutlineSportsKabaddi } from "react-icons/md";
import {
  ImageStyle1,
  ImageStyle10,
  ImageStyle11,
  ImageStyle2,
  ImageStyle3,
  ImageStyle4,
  ImageStyle5,
  ImageStyle6,
  ImageStyle7,
  ImageStyle8,
  ImageStyle9,
} from "../../assets/images/Home/ImsViews";
import ImageRestaurant from "../../assets/images/Home/Restaurant/Img2.jpg";
import BookForm from "../../components/BookForm";
import HeroSlide from "../../components/HeroSlide";
import ObserverAnimate from "../../components/ObserverAnimation";
import Page from "../../components/Page";
import RoomsView from "../../sections/Home/RoomsView";
type Props = {};

export default function Home({}: Props) {
  return (
    <Page title="Trang chủ">
      <HeroSlide />
      <BookForm />
      <div
        className={`py-[90px] lg:py-[190px] bg-[#f9f8f6]" transition-all duration-300`}
      >
        <div className="px-4 flex flex-col justify-center items-center lg:flex-row ">
          <ObserverAnimate position={{ y: 70 }}>
            <div className="md:grid md:grid-cols-[1.5fr,2fr] gap-5">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <img
                    src="https://themewagon.github.io/seapalace/img/home/welcomeBanner1.png"
                    alt=""
                  />
                  <img
                    src="https://themewagon.github.io/seapalace/img/home/welcomeBanner2.png"
                    alt=""
                  />
                </div>
                <img
                  src="https://themewagon.github.io/seapalace/img/home/welcomeBanner3.png"
                  alt=""
                />
              </div>
              <div className="ml-[30px]">
                <div className="flex flex-col text-[40px] font-text_2nd font-bold">
                  <p>Welcome</p>
                  <p>to our residence</p>
                </div>
                <p className="max-w-[500px] mt-[30px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                  veritatis dignissimos ducimus laboriosam, eaque quod
                  aspernatur cumque unde fuga culpa ex dolore cupiditate minus,
                  esse atque. Aut ipsa cupiditate non.
                </p>
                <p className="max-w-[500px] mt-[30px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                  veritatis dignissimos ducimus laboriosam, eaque quod
                  aspernatur cumque unde fuga culpa ex dolore cupiditate minus,
                  esse atque. Aut ipsa cupiditate non.
                </p>
                <button className="mt-[30px] px-6 py-2 rounded-md bg-blue-500 text-white font-medium font-text_2nd text-[20px]">
                  Learn more
                </button>
              </div>
            </div>
          </ObserverAnimate>
          <div className="text-white mt-[30px] flex flex-col lg:hidden items-center">
            <div className="mb-5">
              <span className="text-desc">For luxury seekers</span>
            </div>
            <h2 className="text-[25px] text-center">
              Discover a hotel that defines a new dimension of luxury. Emotional
              luxury.
            </h2>
            <Link to="#" className="underline text-[24px] mt-[30px]">
              View More
            </Link>
          </div>
        </div>

        <RoomsView />
        {/* restaurant */}
        <div className="mt-primary">
          <div className="flex justify-center  font-text_2nd mb-[40px]">
            <ObserverAnimate position={{ y: 50, duration: 1.5 }}>
              <div className="text-center">
                <h2 className="text-h3 md:text-h1 max-w-[780px] text-center  font-medium">
                  We put a smile back on your face. Pleasing people the world
                  over. The best surprise is no surprise.
                </h2>
                <Link to="" className="border-b text-[20px] md:text-h3">
                  Views our rooms
                </Link>
              </div>
            </ObserverAnimate>
          </div>
          <div className=" bg-[#111111] relative font-text_2nd lg:h-[675px] flex flex-col-reverse gap-5 lg:gap-0 lg:flex-row items-center justify-center text-white">
            <ObserverAnimate position={{ x: 100, duration: 1.5 }}>
              <div className="absolute md:static z-50">
                <p className="text-desc">Restaurant</p>
                <h3 className="text-h3 md:text-h1 font-medium max-w-[300px] md:max-w-[580px] mb-4">
                  The art of meeting your highest expectations. Life’s better at
                  the Garden
                </h3>
                <Link to="" className="border-b text-[20px] md:text-h3">
                  Views our restaurant
                </Link>
              </div>
            </ObserverAnimate>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="max-w-[600px]">
              <img src={ImageRestaurant} className="w-full" alt="" />
            </div>
          </div>
        </div>
        {/* art */}
        <div className="mt-primary px-4">
          <div className="flex justify-center mb-[40px]">
            <ObserverAnimate position={{ y: 50, duration: 1.5 }}>
              <h2 className="text-[40px] flex flex-col items-center text-[#202020] max-w-[600px] font-text_2nd font-bold">
                <p>
                  <MdOutlineSportsKabaddi className="text-[50px]" />
                </p>
                <p> Special Facilities</p>
              </h2>
            </ObserverAnimate>
          </div>
          <div className="flex flex-col px-[60px] gap-8">
            <div className="flex items-center flex-col">
              <img
                className="max-w-[1530px] w-full"
                src="https://themewagon.github.io/seapalace/img/home/special.png"
                alt="swiming"
              />
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              <div className="flex justify-center flex-col lg:max-w-[500px] p-[50px] shadow-lg">
                <h1 className="flex gap-2 text-[25px] font-text_2nd">
                  <span>
                    <HomeOutlined />
                  </span>
                  <span>Conference Room</span>
                </h1>
                <p className="">
                  Built purse maids cease her ham new seven among and. Pulled
                  coming wooded tended it answer remain
                </p>
              </div>
              <div className="flex justify-center flex-col lg:max-w-[500px] p-[50px] shadow-lg">
                <h1 className="flex gap-2 text-[25px] font-text_2nd">
                  <span>
                    <HomeOutlined />
                  </span>
                  <span>Conference Room</span>
                </h1>
                <p className="">
                  Built purse maids cease her ham new seven among and. Pulled
                  coming wooded tended it answer remain
                </p>
              </div>
              <div className="flex justify-center flex-col lg:max-w-[500px] p-[50px] shadow-lg">
                <h1 className="flex gap-2 text-[25px] font-text_2nd">
                  <span>
                    <HomeOutlined />
                  </span>
                  <span>Conference Room</span>
                </h1>
                <p className="">
                  Built purse maids cease her ham new seven among and. Pulled
                  coming wooded tended it answer remain
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* imgs */}
        <div className="mt-primary ">
          <ObserverAnimate position={{ y: -50, duration: 1 }}>
            <div className="flex flex-col justify-center items-center">
              <h3 className="max-w-[800px] font-text_2nd text-center text-h3  md:text-h1 font-medium">
                Enjoy and join the handful of guests who already sent their best
                photographic memories of their stay.
              </h3>
            </div>
          </ObserverAnimate>
          <div className="max-w-[1530px] md:columns-3 column-1 sm:columns-2 px-4 mt-[60px] mx-auto lg:columns-4 column gap-[30px]">
            <div className="w-full mb-[30px] break-inside-avoid">
              <img className="w-full" src={ImageStyle1} alt="" />
            </div>
            <div className="w-full mb-[30px] break-inside-avoid">
              <img className="w-full" src={ImageStyle5} alt="" />
            </div>
            <div className="w-full mb-[30px] break-inside-avoid">
              <img className="w-full" src={ImageStyle9} alt="" />
            </div>
            <div className="w-full mb-[30px] break-inside-avoid">
              <img className="w-full" src={ImageStyle2} alt="" />
            </div>
            <div className="w-full mb-[30px] break-inside-avoid">
              <img className="w-full" src={ImageStyle6} alt="" />
            </div>
            <div className="w-full mb-[30px] break-inside-avoid">
              <img className="w-full" src={ImageStyle10} alt="" />
            </div>
            <div className="w-full mb-[30px] break-inside-avoid">
              <img className="w-full" src={ImageStyle3} alt="" />
            </div>
            <div className="w-full mb-[30px] break-inside-avoid">
              <img className="w-full" src={ImageStyle7} alt="" />
            </div>
            <div className="w-full mb-[30px] break-inside-avoid">
              <img className="w-full" src={ImageStyle11} alt="" />
            </div>
            <div className="w-full mb-[30px] break-inside-avoid">
              <img className="w-full" src={ImageStyle4} alt="" />
            </div>
            <div className="w-full mb-[30px] break-inside-avoid">
              <img className="w-full" src={ImageStyle8} alt="" />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
