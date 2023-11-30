import { Pagination } from "antd";
import { Link } from "react-router-dom";
import { useGetHistoryBookingQuery } from "../../../api/User";
import FormatPrice from "../../../utils/FormatPrice";

type Props = {};

export default function HistoryBooking({}: Props) {
  const { data, isLoading } = useGetHistoryBookingQuery({});
  console.log(data);

  if (isLoading) return <>loading...</>;
  return (
    <div>
      {data?.data.map((item: any) => (
        <div className="px-5">
          <div className="border-t pt-[30px] flex gap-[30px] pb-[30px] ">
            <Link to={`/user/profile/roomBooked/${item?.id}`}>
              <img
                className="max-w-[200px] max-h-[200px] overflow-hidden object-cover rounded-[10px]"
                src={
                  "https://www.imgacademy.com/sites/default/files/legacy-hotel-rendering-guest-room.jpg"
                }
                alt=""
              />
            </Link>
            <div className="mb-2 w-full">
              <Link
                to={`/user/profile/roomBooked/${item?.id}`}
                className="text-[20px] font-bold"
              >
                {item?.booking?.detail?.[0]?.room_name}
              </Link>
              <p className="text-[18px] font-bold mb-2">
                <FormatPrice price={item?.total} />
              </p>
              <p className="text-[#6B7280] w-full tracking-[1px] text-[16px]">
                Rất hân hạnh được đón tiếp bạn
              </p>
              <div className="w-full border-[#cccc] border-b h-[1px] py-2"></div>
              <div className="mt-2">
                <h2 className="text-[16px] font-medium">
                  Được đặt vào ngày nào đó
                </h2>
                <div className="flex mt-3 h-[13px] rounded-lg bg-[#E5E7EB]">
                  <div className="w-[20%] h-[13px] rounded-lg bg-[#4F46B5]">
                    <h2 className="mt-5 font-medium text-[14px] text-[#4F46B5]">
                      Chờ
                    </h2>
                  </div>
                  <div className="w-[20%] h-[13px] rounded-lg bg-[#E5E7EB]">
                    <h2 className="mt-5 font-medium text-[14px]">Tiếp nhập</h2>
                  </div>
                  <div className="w-[20%] h-[13px] rounded-lg bg-[#E5E7EB]">
                    <h2 className="mt-5 font-medium text-[14px]">Đang giao</h2>
                  </div>
                  <div className="w-[20%] h-[13px] rounded-lg bg-[#E5E7EB]">
                    <h2 className="mt-5 font-medium text-[14px]">
                      Giao thành công
                    </h2>
                  </div>
                  <div className="w-[20%] h-[13px] rounded-lg bg-[#E5E7EB]">
                    <h2 className="mt-5 font-medium text-[14px]">
                      Đã nhận hàng
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-end mt-10">
        <Pagination defaultCurrent={6} total={500} />
      </div>
    </div>
  );
}
