import { Card } from "antd";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import FormatPrice from "../../../utils/FormatPrice";
import FormatPriceUs from "../../../utils/FormatPriceUs";

const itemsPolicy: CollapseProps["items"] = [
  {
    key: "1",
    label: (
      <div className="">
        <div className="flex">
          <img
            src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/4/490736fd267a2218e286f4e02312f7f7.svg"
            alt=""
          />
          <p className="ml-3 text-xl font-bold">
            Chính sách huỷ phòng & đổi lịch
          </p>
        </div>
        <p className="mt-2 text-md font-bold">Không hoàn tiền không đổi lịch</p>
      </div>
    ),
    children: (
      <>
        <div className="mb-4">
          Đặt phòng này <span className="font-bold">không thể hoàn tiền</span>{" "}
          và <span className="font-bold">không thể đổi lịch.</span>
        </div>
      </>
    ),
  },
];
export default function AccommodationReview() {
  const [cookie, setCookie] = useCookies([
    "paymentPage",
    "bookingNow",
    "roomSearch",
    "userInfo",
    "userBook",
    "paymentMethod",
  ]);
  const [totalNight, setTotalNight] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookie?.bookingNow || !cookie?.roomSearch) {
      navigate("/");
    }
    setTotalNight(
      Math.ceil(
        (new Date(cookie?.roomSearch?.checkout).getTime() -
          new Date(cookie?.roomSearch?.checkin).getTime()) /
          (1000 * 3600 * 24)
      )
    );
    setCookie("paymentPage", 1, { path: "/" });
    setCookie("paymentMethod", "vnpay", { path: "/" });
  }, []);

  const selectPaymentMethod = (e: any) => {
    setCookie("paymentMethod", e.target.value, { path: "/" });
  };

  const itemsColapper: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold">Thành tiền</p>
          <p className="text-xl font-bold">
            {cookie["paymentMethod"] == "paypal" ? (
              <FormatPriceUs price={cookie?.bookingNow?.price} />
            ) : (
              <FormatPrice price={cookie?.bookingNow?.price} />
            )}
          </p>
        </div>
      ),
      children: (
        <div className="flex justify-between items-center">
          <p className="text-sm">
            ({cookie?.roomSearch?.soLuong}x) {cookie?.bookingNow?.room_name}
          </p>
          <p className="text-sm">
            {cookie["paymentMethod"] == "paypal" ? (
              <FormatPriceUs price={cookie?.bookingNow?.price} />
            ) : (
              <FormatPrice price={cookie?.bookingNow?.price} />
            )}
          </p>
        </div>
      ),
    },
  ];

  const accommodationBook = () => {
    setCookie("paymentPage", 0, { path: "/" });
    navigate("/accommodation/book");
  };

  const processBooking = () => {
    setCookie("paymentPage", 2, { path: "/" });
    navigate("/payment/process");
  };

  useEffect(() => {
    setCookie("paymentMethod", "vnpay", { path: "/" });
  }, []);

  return (
    <>
      <div
        className="container mx-auto"
        style={{
          maxWidth: 1000,
        }}
      >
        <div className="mt-12 mb-8">
          <h1 className="text-2xl font-bold mb-3">
            Kiểm tra lại đặt chỗ và thanh toán
          </h1>
          <h5 className="text-md font-bold text-gray-500">
            Quý khách vui lòng xem lại chi tiết đặt phòng của bạn trước khi
            thanh toán
          </h5>
        </div>
        <div
          className="grid pb-4"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gridGap: "1rem",
          }}
        >
          <div>
            <div className=" bg-white border border-gray-200 rounded-lg shadow ">
              <div className="flex flex-col items-center md:flex-row">
                <img
                  className="object-cover w-full rounded-t-lg h-60 md:h-auto md:w-36 md:rounded-none md:rounded-l-lg ml-5"
                  src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/334a43706b543daaa27995a60d895f2a.png"
                  alt=""
                />
                <div className="flex flex-col justify-between p-4 leading-normal w-full">
                  <p className="mb-3 font-bold text-xl text-gray-700 flex ">
                    <img
                      className="mr-2"
                      src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/6aa2fd01a9460e1a71bb0efb713f0212.svg"
                      alt=""
                    />
                    {cookie?.bookingNow?.branch}
                  </p>
                  <hr className="mb-3" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="">
                      <p className="mb-2 font-bold text-sm text-gray-500">
                        Ngày nhận phòng:
                      </p>
                      <p className="mb-2 font-bold text-sm">
                        {cookie?.roomSearch?.checkin}
                      </p>
                      <p>Từ 14:00</p>
                    </div>
                    <div className="">
                      <p className="mb-2 font-bold text-sm text-gray-500">
                        Ngày trả phòng:
                      </p>
                      <p className="mb-2 font-bold text-sm">
                        {cookie?.roomSearch?.checkout}
                      </p>
                      <p>Trước 12:00</p>
                    </div>
                    <div className="">
                      <p className="mb-2 font-bold text-sm text-gray-500">
                        Số đêm nghỉ:
                      </p>
                      <p className="mb-2 font-bold text-sm">{totalNight}</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="ml-5 mr-5 mx-auto" />
              <p className="font-bold text-xl ml-5 mb-3 mt-3">
                {cookie?.bookingNow?.room_name}
              </p>
              <div className="grid grid-cols-2 gap-4 pl-5">
                <div className="">
                  <div className="grid grid-cols-2 mb-2">
                    <p>Khách/phòng</p>
                    <p className="font-bold">4 khách</p>
                  </div>
                  <div className="grid grid-cols-2">
                    <p>Khách/phòng</p>
                    <p className="font-bold">4 khách</p>
                  </div>
                </div>
                <div className="mb-5">
                  <div className="flex">
                    <img
                      className="rounded-md w-20"
                      src={cookie?.bookingNow?.image}
                      alt=""
                    />
                    <div className="ml-3">
                      <div className="flex mb-2">
                        <img
                          className="mr-2"
                          src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/812d6f19a9d1ceb30728acbce11f709a.svg"
                          alt=""
                        />
                        <p className="font-bold">Không gồm bữa sáng</p>
                      </div>
                      <div className="flex">
                        <img
                          className="mr-2"
                          src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/0/01cf1090e2f434a7d63f1cbca912ef44.svg"
                          alt=""
                        />
                        <p className="font-bold text-green-500">
                          Wifi miễn phí
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Card
              className="mt-6 hidden"
              title={
                <p className="font-bold text-xl">
                  Chính sách khách sạn & phòng
                </p>
              }
            >
              <Collapse expandIconPosition="end" ghost items={itemsPolicy} />
            </Card>
            <Card
              className="mt-6 shadow"
              title={<p className="font-bold text-xl">Chính Sách Lưu Trú</p>}
            >
              <div className="flex items-center mb-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  data-id="IcSystemClock"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#687176"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12 6V12L16 14"
                    stroke="#687176"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <span
                  style={{ fontSize: 16 }}
                  className="ml-2 font-bold text-md"
                >
                  Thời gian nhận phòng/trả phòng
                </span>
              </div>
              <span className="text-md text-gray-400 font-bold">
                Giờ nhận phòng:{" "}
              </span>
              Từ 14:00{" "}
              <span className="ml-5 text-md text-gray-400 font-bold">
                Giờ trả phòng:
              </span>{" "}
              Trước 12:00
            </Card>
            <div className="mt-6 ">
              {/* <h1 className="text-xl font-bold mb-3">Chi tiết giá</h1> */}
              <div className="w-full h-auto border rounded-md shadow">
                <Collapse
                  defaultActiveKey={["1"]}
                  expandIconPosition="end"
                  ghost
                  items={itemsColapper}
                />
              </div>
            </div>
            <div className="w-full flex justify-end mt-6">
              <button
                onClick={accommodationBook}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white "
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                  Quay lại
                </span>
              </button>
              <button
                type="button"
                onClick={processBooking}
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                disabled={!cookie?.paymentMethod}
              >
                Tiến hành thanh toán
              </button>
            </div>
          </div>
          <div>
            <Card
              className="mb-4 shadow"
              title={
                <p className="font-bold text-xl">Chi tiết người liên lạc</p>
              }
            >
              <p className="font-medium text-xl">{cookie?.userBook.name}</p>
              <p className="font-medium text-xl">{cookie?.userBook.phone}</p>
              <p className="font-medium text-xl">{cookie?.userBook.email}</p>
            </Card>
            <Card
              className="shadow"
              title={
                <div className="pb-2">
                  <p className="font-semibold text-xl mt-2">
                    Phương thức thanh toán
                  </p>
                </div>
              }
            >
              <ul className="w-full">
                <li className="mb-2">
                  <input
                    type="radio"
                    id="method_one"
                    onClick={selectPaymentMethod}
                    name="payment_method"
                    value="vnpay"
                    className="hidden peer"
                    required
                    defaultChecked={cookie?.paymentMethod === "vnpay"}
                  />
                  <label
                    htmlFor="method_one"
                    className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        style={{
                          width: 30,
                        }}
                      >
                        <img
                          src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png"
                          alt=""
                          width={30}
                        />
                      </div>
                      <h3 className="text-base font-semibold text-heading">
                        VNPAY
                      </h3>
                    </div>
                  </label>
                </li>
                <li className="mb-2">
                  <input
                    type="radio"
                    id="method_two"
                    onClick={selectPaymentMethod}
                    name="payment_method"
                    value="momo"
                    className="hidden peer"
                    defaultChecked={cookie?.paymentMethod === "momo"}
                  />
                  <label
                    htmlFor="method_two"
                    className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        style={{
                          width: 30,
                        }}
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                          alt=""
                          width={30}
                        />
                      </div>
                      <h3 className="text-base font-semibold text-heading">
                        Momo
                      </h3>
                    </div>
                  </label>
                </li>
                <li className="mb-2">
                  <input
                    type="radio"
                    id="method_three"
                    onClick={selectPaymentMethod}
                    name="payment_method"
                    value="paypal"
                    className="hidden peer"
                    defaultChecked={cookie?.paymentMethod === "paypal"}
                  />
                  <label
                    htmlFor="method_three"
                    className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        style={{
                          width: 30,
                        }}
                      >
                        <img
                          src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
                          alt=""
                          width={30}
                        />
                      </div>
                      <h3 className="text-base font-semibold text-heading">
                        PayPal
                      </h3>
                    </div>
                  </label>
                </li>
              </ul>
            </Card>
            {/* <Card title={<p className='font-bold text-xl'>Chi tiết khách ở</p>}>
                            <p className='font-bold text-gray-500 text-md'>Room 1 Guest Name</p>
                            <p className='font-medium text-xl'>{cookie?.userBook.name}</p> */}
            {/* <div className='mt-2 mb-5'></div> */}
            {/* <p className='font-bold text-gray-500 text-md'>Yêu cầu đặc biệt</p>
                            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                <li className='mb-2 mt-2'>

                                </li>
                            </ul>
                            <p className='text-xs'>Các yêu cầu đặc biệt sẽ tùy thuộc vào tính sẵn có và không được bảo đảm. Một số yêu cầu có thể phát sinh phụ phí.</p> */}
            {/* </Card> */}
          </div>
        </div>
      </div>
    </>
  );
}
