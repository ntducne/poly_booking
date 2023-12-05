import { Steps } from "antd";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, Outlet } from "react-router-dom";
type Props = {};

const steps = [
  {
    title: "Đặt phòng",
    content: "room-book",
  },
  {
    title: "Xác nhận",
    content: "accept",
  },
  {
    title: "Xử lý",
    content: "process",
  },
  {
    title: "Hoàn tất",
    content: "success",
  },
];

const PaymentLayout = ({}: Props) => {
  const [current, setCurrent] = useState(0);
  const [cookie] = useCookies(["paymentPage"]);
  useEffect(() => {
    setCurrent(cookie?.paymentPage);
  });
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  return (
    <div className="bg-white">
      <nav className="bg-white sticky w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto container p-3">
          <Link to="/" className="flex items-center">
            <img src="/logo_light.png" className="h-10 mr-3" />
          </Link>
          <div className="w-1/2">
            <Steps current={current} items={items} size="small" />
          </div>
        </div>
      </nav>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};
export default PaymentLayout;
