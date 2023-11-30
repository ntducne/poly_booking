import { Divider, Form, Input, message } from "antd";
import { useState } from "react";
import { useSearchOrdersMutation } from "../../api/Order";
import FormatPrice from "../../utils/FormatPrice";
import { StatusOrders } from "../../utils/status";
import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
type Props = {};

export default function SearchDetailOrder({}: Props) {
  const [searchBillingId, { isLoading }] = useSearchOrdersMutation();
  const [dataSearch, setDataSearch] = useState<any>({});
  const onFinish = (values: any) => {
    if (values) {
      searchBillingId({ billing_id: values.billing_id })
        .unwrap()
        .then((req) => {
          message.success(req?.message);
          setDataSearch(req.data);
        })
        .catch((err) => {
          setDataSearch({});
          message.error(err?.data.message);
        });
    }
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex items-center flex-col justify-center">
      <h1 className="text-2xl font-bold text-center">
        Tra cứu đơn hàng gần đây
      </h1>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        className="w-full mt-2 max-w-[600px]"
      >
        <Form.Item
          label="Nhập mã đơn hàng"
          name="billing_id"
          rules={[{ required: true, message: "Nhập mã đơn hàng của bạn" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item className="flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Tra cứu
            {isLoading ? <LoadingOutlined /> : <SearchOutlined />}
          </button>
        </Form.Item>
      </Form>
      {Object.keys(dataSearch).length ? (
        <div className="min-h-[100px] mb-[100px] lg:mx-[150px] mx-2">
          <Divider />
          <div className="flex gap-5 md:flex-row flex-col">
            <div className="md:max-h-[200px]">
              <img
                className="w-full max-w-[400px] h-full overflow-hidden object-cover rounded-[10px]"
                src={
                  "https://www.imgacademy.com/sites/default/files/legacy-hotel-rendering-guest-room.jpg"
                }
                alt=""
              />
            </div>
            <div>
              <h3 className="text-[20px] font-bold mb-3">
                {dataSearch.booking.roomType.name}
              </h3>
              <p className="text-[20px] font-bold mb-3">
                <FormatPrice price={dataSearch.total} />
              </p>
              <p className="text-[#6B7280] tracking-[1px] text-[16px]">
                Trải nghiệm một kỳ nghỉ tại khách sạn chúng tôi với những dịch
                vụ xuất sắc, tiện nghi.
              </p>
              <div className="flex mt-[30px] gap-6 flex-wrap">
                <div>
                  <p className="text-[16px] font-medium">
                    Phương thức thanh toán
                  </p>
                  <p className="max-w-[300px] text-[#6B7280] text-[16px]">
                    {dataSearch.payment_method}
                  </p>
                </div>
                <div>
                  <p className="text-[16px] font-medium">Thông tin người đặt</p>
                  <p className="text-[#6B7280] text-[16px]">
                    {dataSearch.booking.representative.email}
                  </p>
                  <p className="text-[#6B7280] text-[16px]">
                    {dataSearch.booking.representative.phone}
                  </p>
                </div>
                <div>
                  <p className="text-[16px] font-medium">Dịch vụ</p>
                  <p className="max-w-[300px] text-[#6B7280] text-[16px]">
                    {dataSearch.services.map((item: any, index: any) => {
                      return <p key={index}>{item.service_name}</p>;
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-[16px] font-medium">Khách sạn</p>
                  <p className="max-w-[300px] text-[#6B7280] text-[16px]">
                    {dataSearch.branch.name}
                  </p>
                </div>
                {/* <div>
                  <p className="text-[16px] font-medium">Thời gian</p>
                  <p className="max-w-[300px] text-[#6B7280] text-[16px]">
                    <p>Đặt phòng: {dataSearch.booking.booking_date.split(" ")[0]} </p>
                    <p>Nhận phòng: {dataSearch.booking.checkin}</p>
                    <p>Trả phòng: {dataSearch.booking.checkout} </p>
                  </p>
                </div> */}
              </div>
            </div>
          </div>
          <Divider />
          <div className="mt-3">
            <h2 className="text-[16px] font-medium">
              Đặt phòng vào ngày{" "}
              <span className="font-bold">
                {dataSearch.booking.booking_date.split(" ")[0]} {""}
              </span>
              - Nhận phòng{" "}
              <span className="font-bold">{dataSearch.booking.checkin} </span> -
              Trả phòng {""}
              <span className="font-bold">{dataSearch.booking.checkout} </span>
            </h2>
            <div className="flex mt-3 h-[13px] rounded-lg bg-[#E5E7EB]">
              {Object.values(StatusOrders).map((status) => (
                <div
                  key={status.id}
                  className={`w-[20%] h-[13px] ${
                    status.id <= dataSearch.status
                      ? "bg-[#4F46B5]"
                      : "bg-[#E5E7EB]"
                  }`}
                >
                  <h2
                    className={`mt-5 font-medium text-[14px] ${
                      status.id <= dataSearch.status ? "text-[#4F46B5]" : ""
                    } ${
                      window.innerWidth < 768 && status.id !== dataSearch.status
                        ? "hidden"
                        : ""
                    }`}
                  >
                    {status.id == dataSearch.status ? status.value : ""}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
