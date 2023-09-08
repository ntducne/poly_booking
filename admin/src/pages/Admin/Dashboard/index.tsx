import React from "react";
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
const { Title } = Typography;

type Props = {};

const Dashboard = (props: Props) => {
  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return (
    <div>
      <div className="grid 2xl:grid-cols-4 2xl:gap-4 md:grid-cols-2 md:gap-5 sm:grid-cols-1">
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
      <div className="grid 2xl:grid-cols-2">
        <div>
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
        </div>
        <div className="bg-gray-100">
          {/* <h1 className="text-2xl font-bold mb-4">Hotel Statistics</h1>
          <canvas id="chart"></canvas> */}
        </div>
      </div>
      <div className="border rounded-2xl bg-white p-6 mt-8">
        <div>
          <Title level={4}>Đánh giá mới của khách hàng</Title>
        </div>
        <div className="grid gap-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          <div className="border rounded-xl p-7 text-base	text-[#6e6e6e] ">
            <div className="mb-4">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Itaque, animi.
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex ">
                <img
                  className="w-12 h-12 rounded-xl"
                  src="https://hinhnen4k.com/wp-content/uploads/2023/01/anh-trai-cute-dau-nam-5.jpg"
                  alt=""
                />
                <div className="mx-4 ">
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
          <div className="border rounded-xl p-7 text-base	text-[#6e6e6e]">
            <div className="mb-4">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Itaque, animi.
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex ">
                <img
                  className="w-12 h-12 rounded-xl"
                  src="https://hinhnen4k.com/wp-content/uploads/2023/01/anh-trai-cute-dau-nam-5.jpg"
                  alt=""
                />
                <div className="mx-4 ">
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
          <div className="border rounded-xl p-7 text-base	text-[#6e6e6e]">
            <div className="mb-4">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Itaque, animi.
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex ">
                <img
                  className="w-12 h-12 rounded-xl"
                  src="https://hinhnen4k.com/wp-content/uploads/2023/01/anh-trai-cute-dau-nam-5.jpg"
                  alt=""
                />
                <div className="mx-4 ">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
