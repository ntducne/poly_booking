import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { Form, Input, message } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSearchOrdersMutation } from "../../api/Order";
import FormatPrice from "../../utils/FormatPrice";
import dayjs from "dayjs";
type Props = {};

export default function SearchDetailOrder({}: Props) {
  const [searchBillingId, { isLoading }] = useSearchOrdersMutation();
  const [dataSearch, setDataSearch] = useState<any>({});
  console.log(dataSearch);

  const onFinish = (values: any) => {
    if (values) {
      searchBillingId({ billing_id: values.billing_id })
        .unwrap()
        .then((req) => {
          if (req.status == "error") {
            setDataSearch({});
            return message.error(req?.message);
          }
          message.success(req?.message);
          setDataSearch(req.data);
        });
    }
  };

  function getCountNights(checkin: any, checkout: any) {
    const checkinDate = dayjs(checkin);
    const checkoutDate = dayjs(checkout);
    return checkoutDate.diff(checkinDate, "day");
  }

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
          <button className="bg-blue-500 hover:bg-blue-700 flex gap-2 items-center text-white font-bold py-2 px-4 border border-blue-700 rounded">
            <span>Tra cứu</span>
            {isLoading ? <LoadingOutlined /> : <SearchOutlined />}
          </button>
        </Form.Item>
      </Form>
      {Object.keys(dataSearch).length ? (
        <div className="pt-[30px] pb-[100px] bg-bgr">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 mb-4 ">
            <div className="bg-bgr border border-gray-200 rounded-lg shadow">
              <Link to="#">
                <img
                  className="rounded-t-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                  alt=""
                />
              </Link>
              <div className="p-5">
                <Link to="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {dataSearch?.booking?.detail?.[0].room_name}
                  </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 ">
                  Chúng tôi luôn mong muốn đem đến cho bạn những giá trị, dịch
                  vụ, lợi ích tốt nhất
                </p>
              </div>
            </div>
            <div className="grid md:grid-rows-1 grid-rows-1 gap-4">
              <div className="grid md:grid-cols-1 gap-4">
                <div className="block h-full p-6 bg-bgr border border-gray-200 rounded-lg shadow">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    Thông tin đặt phòng
                  </h5>
                  <div className="font-normal text-gray-700">
                    <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside ">
                      <li>Chi nhánh: {dataSearch?.branch?.name}</li>
                      <li>Loại phòng: {dataSearch?.booking?.roomType?.name}</li>
                      <li>
                        Nhận phòng:{" "}
                        {dayjs(dataSearch?.booking?.checkin).format(
                          "HH:mm DD/MM/YYYY"
                        )}{" "}
                      </li>
                      <li>
                        Dự kiến trả phòng:{" "}
                        {dayjs(dataSearch?.booking?.checkout).format(
                          "HH:mm DD/MM/YYYY"
                        )}
                      </li>
                      <li>
                        Số đêm:{" "}
                        {getCountNights(
                          dataSearch?.booking?.checkin.split(" ")?.[0],
                          dataSearch?.booking?.checkout.split(" ")?.[0]
                        )}
                      </li>
                      <li>
                        Thời gian thanh toán:{" "}
                        {dayjs(dataSearch.payment_date).format(
                          "HH:mm DD/MM/YYYY"
                        )}
                      </li>
                      <li>Hình thức thanh toán: {dataSearch.payment_method}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <div className="block h-full p-6 bg-bgr border border-gray-200 rounded-lg shadow">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    Thông tin khách hàng
                  </h5>
                  <div className="font-normal text-gray-700">
                    <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside">
                      <li>
                        Tên khách đặt phòng:{" "}
                        {dataSearch?.booking?.representative?.name}
                      </li>
                      <li>
                        Email: {dataSearch?.booking?.representative?.email}
                      </li>
                      <li>
                        Số điện thoại:{" "}
                        {dataSearch?.booking?.representative?.phone}
                      </li>
                    </ul>
                  </div>
                  <div className="mt-1 mb-3"></div>
                  <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900">
                    Thông tin khách khác
                  </h5>
                  <div className="font-normal text-gray-700">
                    <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside">
                      <li>
                        Số khách: {dataSearch?.booking?.amount_people?.total}
                      </li>
                    </ul>
                  </div>
                  <div className="mt-1 mb-3"></div>
                  <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900">
                    Trạng thái đơn hàng
                  </h5>
                  <div className="font-normal text-gray-700">
                    <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside">
                      <li>Đơn hàng: {dataSearch?.status_name}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="block h-full p-6 bg-bgr border border-gray-200 rounded-lg shadow ">
                <div className="flex justify-between items-center">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    Dịch vụ
                  </h5>
                </div>
                <div className="mt-5 font-normal text-gray-700 max-h-[510px] overflow-auto">
                  <ol className="relative border-l border-gray-200 ml-3 mt-8">
                    {dataSearch?.services.length
                      ? dataSearch?.services.map((item: any) => (
                          <li className="mb-10 ml-6">
                            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                              <svg
                                className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                              </svg>
                            </span>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                              {item?.time}
                            </time>
                            <div className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside">
                                <li>Dịch vụ: {item?.service_name}</li>
                                <li>
                                  Giá : <FormatPrice price={item?.price} />
                                </li>
                              </ul>
                            </div>
                          </li>
                        ))
                      : "Không có đặt thêm dịch vụ nào"}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="block h-full bg-bgr border border-gray-200 rounded-lg shadow">
            <h5 className="mb-2 p-6 text-2xl font-bold tracking-tight text-gray-900">
              Thông tin hoá đơn
            </h5>
            <div className="relative overflow-x-auto rounded-xl ">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase ">
                  <tr>
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3">
                      Số lượng
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Giá
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tạm tính
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-bgr border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {dataSearch?.booking?.detail?.[0].room_name}
                    </th>
                    <td className="px-6 py-4">
                      {" "}
                      {dataSearch?.booking?.amount_room}
                    </td>
                    <td className="px-6 py-4">
                      <FormatPrice
                        price={dataSearch?.booking?.detail?.[0].price}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <FormatPrice
                        price={
                          +dataSearch?.booking?.detail?.[0].price *
                          +dataSearch?.booking?.amount_room
                        }
                      />
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="bg-bgr border-b ">
                    <th></th>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4 font-bold">Tổng thanh toán</td>
                    <td className="px-6 py-4">
                      <FormatPrice price={dataSearch?.total} />
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
