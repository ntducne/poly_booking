import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useCancelBookingMutation,
  useGetDetailHistoryBookingQuery,
} from "../../api/User";
import dayjs from "dayjs";
import FormatPrice from "../../utils/FormatPrice";
import Page from "../../components/Page";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import { message } from "antd";
const BillDetail: React.FC = () => {
  const { id } = useParams();
  const { data, refetch } = useGetDetailHistoryBookingQuery(id);
  const [cancelBookingRoom] = useCancelBookingMutation();
  function getCountNights(checkin: any, checkout: any) {
    const checkinDate = dayjs(checkin);
    const checkoutDate = dayjs(checkout);
    return checkoutDate.diff(checkinDate, "day");
  }

  const cancelBooking = () => {
    if (![0, 1].includes(data?.data?.status)) {
      return;
    }

    MySwal.fire({
      imageUrl: "/logo_light.png",
      imageWidth: 100,
      imageHeight: 70,

      html: `
        <div className="text-left">
          <p>Bạn có chắc là muốn hủy đặt phòng</p>
        </div>
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `
        Xác nhận
      `,
      cancelButtonText: `
        Hủy
      `,
    }).then((result) => {
      if (result.isConfirmed) {
        cancelBookingRoom(data?.data?.id)
          .unwrap()
          .then((res: any) => {
            console.log("re", res);
            message.success("Hủy phòng thành công");
          });
      } else {
      }
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Page title={data?.data?.booking?.detail?.[0].room_name}>
      <div className="pt-[100px] pb-[100px] bg-bgr">
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
                  {data?.data?.booking?.detail?.[0].room_name}
                </h5>
              </Link>
              <p className="mb-3 font-normal text-gray-700 ">
                Chúng tôi luôn mong muốn đem đến cho bạn những giá trị, dịch vụ,
                lợi ích tốt nhất
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
                    <li>Chi nhánh: {data?.data?.branch?.address}</li>
                    <li>Loại phòng: {data?.data?.booking?.roomType?.name}</li>
                    <li>
                      Nhận phòng:
                      {dayjs(data?.data?.booking?.checkin).format(
                        "HH:mm DD/MM/YYYY"
                      )}
                    </li>
                    <li>
                      Dự kiến trả phòng:{" "}
                      {dayjs(data?.data?.booking?.checkout).format(
                        "HH:mm DD/MM/YYYY"
                      )}{" "}
                    </li>
                    <li>
                      Số đêm:{" "}
                      {getCountNights(
                        data?.data?.booking?.checkin.split(" ")?.[0],
                        data?.data?.booking?.checkout.split(" ")?.[0]
                      )}
                    </li>
                    <li>
                      Thời gian thanh toán:{" "}
                      {dayjs(data?.data?.payment_date).format(
                        "HH:mm DD/MM/YYYY"
                      )}{" "}
                    </li>
                    <li>Hình thức thanh toán: {data?.data?.payment_method}</li>
                    <li>
                      Số phòng: {data?.data?.booking?.detail?.[0]?.room_number}
                    </li>
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
                      {data?.data?.booking?.representative?.name}
                    </li>
                    <li>Email: {data?.data?.booking?.representative?.email}</li>
                    <li>
                      Số điện thoại:{" "}
                      {data?.data?.booking?.representative?.phone}
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
                      Số khách: {data?.data?.booking?.amount_people?.total}
                    </li>
                  </ul>
                </div>
                <div className="mt-1 mb-3"></div>
                <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900">
                  Trạng thái đơn hàng
                </h5>
                <div className="font-normal text-gray-700">
                  <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside">
                    <li>Đơn hàng: {data?.data?.status_name}</li>
                  </ul>
                </div>
                <div className="mt-1 mb-3"></div>
                <div className="font-normal text-gray-700">
                  <button
                    className={` hover:bg-red-500
                   hover:text-white  bg-transparent text-red-500 border border-red-500  text-[15px] py-1 px-4 rounded ${
                     [0, 1].includes(data?.data?.status)
                       ? ""
                       : "cursor-not-allowed !bg-gray-200 !border-gray-200 !text-gray-500"
                   }`}
                    onClick={cancelBooking}
                  >
                    Hủy đặt phòng
                  </button>
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
                  {data?.data?.services.length
                    ? data?.data?.services.map((item: any) => (
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
                    {data?.data?.booking?.detail?.[0].room_name}
                  </th>
                  <td className="px-6 py-4">
                    {" "}
                    {data?.data?.booking?.amount_room}
                  </td>
                  <td className="px-6 py-4">
                    <FormatPrice
                      price={data?.data?.booking?.detail?.[0].price}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <FormatPrice
                      price={
                        +data?.data?.booking?.detail?.[0].price *
                        +data?.data?.booking?.amount_room
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
                    <FormatPrice price={data?.data?.total} />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default BillDetail;
