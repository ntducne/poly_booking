import React, { useState } from "react";
import type { Dayjs } from "dayjs";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineExport,
  AiOutlineImport,
} from "react-icons/ai";
import { BiBed } from "react-icons/bi";
import { Calendar, Typography, theme } from "antd";
import type { CalendarProps } from "antd";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Page from "../../../component/page";

const { Title } = Typography;
const Dashboard = () => {

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return (
    <Page title={`Dashboard`}>
      <div className="grid grid-cols-1 gap-5 2xl:grid-cols-4 2xl:gap-4 md:grid-cols-2 ">
        <button className="border rounded-xl sm:mb-4 drop-shadow-md hover:drop-shadow-xl">
          <div className="flex items-center">
            <div className=" rounded-xl m-5 p-2 bg-red-100  text-red-600  hover:bg-red-400 hover:text-white">
              <BiBed className="w-12 h-12 " />
            </div>
            <div className="">
              <p className="font-semibold">8,461</p>
              <p className="">Đặt phòng mới</p>
            </div>
          </div>
        </button>
        <button className="border rounded-xl sm:mb-4 drop-shadow-md hover:drop-shadow-xl">
          <div className="flex items-center">
            <div className="border rounded-xl m-5 p-2 bg-red-100  text-red-600  hover:bg-red-400 hover:text-white">
              <BiBed className="w-12 h-12   " />
            </div>
            <div className="">
              <p className="font-semibold">8,461</p>
              <p className="">Phòng dư</p>
            </div>
          </div>
        </button>
        <button className="border rounded-xl sm:mb-4 drop-shadow-md hover:drop-shadow-xl">
          <div className="flex items-center">
            <div className="border rounded-xl m-5 p-2 bg-red-100  text-red-600  hover:bg-red-400 hover:text-white">
              <AiOutlineExport className="w-12 h-12  " />
            </div>
            <div className="">
              <p className="font-semibold">8,461</p>
              <p className="">Phòng đang sử dụng</p>
            </div>
          </div>
        </button>
        <button className="border rounded-xl sm:mb-4 drop-shadow-md hover:drop-shadow-xl">
          <div className="flex items-center">
            <div className="border rounded-xl m-5 p-2 bg-red-100  text-red-600  hover:bg-red-400 hover:text-white">
              <AiOutlineImport className="w-12 h-12   " />
            </div>
            <div className="">
              <p className="font-semibold">8,461</p>
              <p className="">Phòng đã trả</p>
            </div>
          </div>
        </button>
      </div>
      <div className="grid grid-col-1 md:grid-cols-2">
        <div>
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </div>
        <div className="bg-gray-100 md:bg-gray-100">
          {/* <h1 className="text-2xl font-bold mb-4">Hotel Statistics</h1>
          <canvas id="chart"></canvas> */}
        </div>
      </div>
      <div className="border rounded-2xl bg-white p-6 mt-8">
        <div>
          <Title level={4}>Đánh giá mới của khách hàng</Title>
        </div>
        <Swiper
          autoplay={{delay: 2000}}
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="border rounded-xl p-2 pb-9 xl:p-7 text-base	text-[#6e6e6e] ">
              <div className="">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Itaque, animi.
                </p>
              </div>
              <div className="flex flex-col xl:flex-row md:items-center md:justify-between">
                <div className="flex flex-col xl:flex-row xl:items-center">
                  <img
                    className="hidden xl:w-12 xl:h-12 xl:rounded-xl xl:block"
                    src="https://hinhnen4k.com/wp-content/uploads/2023/01/anh-trai-cute-dau-nam-5.jpg"
                    alt=""
                  />
                  <div className="my-3 ml-2">
                    <div>Nguyễn Quốc Huy</div>
                    <div>4 phút trước</div>
                  </div>
                </div>
                <div className="flex">
                  <button className="border border-[#68e365] rounded-[50%] p-1 text-[#68e365] mr-1">
                    <AiOutlineCheck className="w-4 h-4 " />
                  </button>
                  <button className="border border-[#e23428] rounded-[50%] p-1 ml-2 text-[#e23428]">
                    <AiOutlineClose className="w-4 h-4 " />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="border rounded-xl p-2 pb-9 xl:p-7 text-base	text-[#6e6e6e] ">
              <div className="">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Itaque, animi.
                </p>
              </div>
              <div className="flex flex-col xl:flex-row md:items-center md:justify-between">
                <div className="flex flex-col xl:flex-row xl:items-center">
                  <img
                    className="hidden xl:w-12 xl:h-12 xl:rounded-xl xl:block"
                    src="https://hinhnen4k.com/wp-content/uploads/2023/01/anh-trai-cute-dau-nam-5.jpg"
                    alt=""
                  />
                  <div className="my-3 ml-2">
                    <div>Nguyễn Quốc Huy</div>
                    <div>4 phút trước</div>
                  </div>
                </div>
                <div className="flex">
                  <button className="border border-[#68e365] rounded-[50%] p-1 text-[#68e365] mr-1">
                    <AiOutlineCheck className="w-4 h-4 " />
                  </button>
                  <button className="border border-[#e23428] rounded-[50%] p-1 ml-2 text-[#e23428]">
                    <AiOutlineClose className="w-4 h-4 " />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="border rounded-xl p-2 pb-9 xl:p-7 text-base	text-[#6e6e6e] ">
              <div className="">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Itaque, animi.
                </p>
              </div>
              <div className="flex flex-col xl:flex-row md:items-center md:justify-between">
                <div className="flex flex-col xl:flex-row xl:items-center">
                  <img
                    className="hidden xl:w-12 xl:h-12 xl:rounded-xl xl:block"
                    src="https://hinhnen4k.com/wp-content/uploads/2023/01/anh-trai-cute-dau-nam-5.jpg"
                    alt=""
                  />
                  <div className="my-3 ml-2">
                    <div>Nguyễn Quốc Huy</div>
                    <div>4 phút trước</div>
                  </div>
                </div>
                <div className="flex">
                  <button className="border border-[#68e365] rounded-[50%] p-1 text-[#68e365] mr-1">
                    <AiOutlineCheck className="w-4 h-4 " />
                  </button>
                  <button className="border border-[#e23428] rounded-[50%] p-1 ml-2 text-[#e23428]">
                    <AiOutlineClose className="w-4 h-4 " />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="border rounded-xl p-2 pb-9 xl:p-7 text-base	text-[#6e6e6e] ">
              <div className="">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Itaque, animi.
                </p>
              </div>
              <div className="flex flex-col xl:flex-row md:items-center md:justify-between">
                <div className="flex flex-col xl:flex-row xl:items-center">
                  <img
                    className="hidden xl:w-12 xl:h-12 xl:rounded-xl xl:block"
                    src="https://hinhnen4k.com/wp-content/uploads/2023/01/anh-trai-cute-dau-nam-5.jpg"
                    alt=""
                  />
                  <div className="my-3 ml-2">
                    <div>Nguyễn Quốc Huy</div>
                    <div>4 phút trước</div>
                  </div>
                </div>
                <div className="flex">
                  <button className="border border-[#68e365] rounded-[50%] p-1 text-[#68e365] mr-1">
                    <AiOutlineCheck className="w-4 h-4 " />
                  </button>
                  <button className="border border-[#e23428] rounded-[50%] p-1 ml-2 text-[#e23428]">
                    <AiOutlineClose className="w-4 h-4 " />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="border rounded-xl p-2 pb-9 xl:p-7 text-base	text-[#6e6e6e] ">
              <div className="">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Itaque, animi.
                </p>
              </div>
              <div className="flex flex-col xl:flex-row md:items-center md:justify-between">
                <div className="flex flex-col xl:flex-row xl:items-center">
                  <img
                    className="hidden xl:w-12 xl:h-12 xl:rounded-xl xl:block"
                    src="https://hinhnen4k.com/wp-content/uploads/2023/01/anh-trai-cute-dau-nam-5.jpg"
                    alt=""
                  />
                  <div className="my-3 ml-2">
                    <div>Nguyễn Quốc Huy</div>
                    <div>4 phút trước</div>
                  </div>
                </div>
                <div className="flex">
                  <button className="border border-[#68e365] rounded-[50%] p-1 text-[#68e365] mr-1">
                    <AiOutlineCheck className="w-4 h-4 " />
                  </button>
                  <button className="border border-[#e23428] rounded-[50%] p-1 ml-2 text-[#e23428]">
                    <AiOutlineClose className="w-4 h-4 " />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="border rounded-xl p-2 pb-9 xl:p-7 text-base	text-[#6e6e6e] ">
              <div className="">
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Itaque, animi.
                </p>
              </div>
              <div className="flex flex-col xl:flex-row md:items-center md:justify-between">
                <div className="flex flex-col xl:flex-row xl:items-center">
                  <img
                    className="hidden xl:w-12 xl:h-12 xl:rounded-xl xl:block"
                    src="https://hinhnen4k.com/wp-content/uploads/2023/01/anh-trai-cute-dau-nam-5.jpg"
                    alt=""
                  />
                  <div className="my-3 ml-2">
                    <div>Nguyễn Quốc Huy</div>
                    <div>4 phút trước</div>
                  </div>
                </div>
                <div className="flex">
                  <button className="border border-[#68e365] rounded-[50%] p-1 text-[#68e365] mr-1">
                    <AiOutlineCheck className="w-4 h-4 " />
                  </button>
                  <button className="border border-[#e23428] rounded-[50%] p-1 ml-2 text-[#e23428]">
                    <AiOutlineClose className="w-4 h-4 " />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide> */}
        </Swiper>
      </div>
    </Page>
  );
};

export default Dashboard;
