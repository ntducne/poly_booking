import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetHistoryBookingQuery } from "../../../api/User";
import FormatPrice from "../../../utils/FormatPrice";
import { StatusOrders } from "../../../utils/status";
import dayjs from "dayjs";

type Props = {};

const orderedStatus = [
  StatusOrders.STATUS_6,
  StatusOrders.STATUS_4,
  StatusOrders.STATUS_2,
  StatusOrders.STATUS_7,
];

export default function HistoryRoom({}: Props) {
  const [data, setData] = useState<any>([]);
  const {
    data: dataRoom,
    isLoading,
    refetch,
  } = useGetHistoryBookingQuery({
    userId: "someUserId",
  });
  useEffect(() => {
    const fetchData = async () => {
      await refetch();
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (!isLoading && data) {
      const filteredData = dataRoom?.data.filter(
        (item: any) => ![1, 3, 0, 5].includes(item.status)
      );
      setData(filteredData);
    }
  }, [isLoading, dataRoom?.data]);

  if (isLoading) return <>loading...</>;
  return (
    <div>
      {data && data?.length ? (
        <div>
          {data?.map((item: any) => (
            <div className="px-5">
              <div className="border-t pt-[30px] flex flex-col md:flex-row gap-[30px] pb-[30px] ">
                <Link to={`/user/profile/roomBooked/${item?.id}`}>
                  <img
                    className="w-full md:max-w-[200px] max-h-[200px] overflow-hidden object-cover rounded-[10px]"
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
                  {orderedStatus
                    .filter((status: any) => status?.id === item?.status)
                    .map((status: any) => {
                      return (
                        <div className="mt-2">
                          <h2 className="text-[16px] font-medium">
                            Được đặt vào ngày{" "}
                            {dayjs(item?.booking?.booking_date).format(
                              "DD/MM/YYYY"
                            )}
                          </h2>
                          <div className="flex items-center gap-2">
                            <span>Trạng thái: </span>
                            <h2
                              className={`font-medium  ${
                                status.id == 4
                                  ? "text-[#b3b3b3]"
                                  : "text-[#ff000099]"
                              } `}
                            >
                              {" "}
                              {status?.value}
                            </h2>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ))}
          {/* <div className="flex justify-end mt-10">
            <Pagination defaultCurrent={6} total={500} />
          </div> */}
        </div>
      ) : (
        <span>
          Bạn chưa có phòng nào đã đặt. <Link to="/rooms">Đặt phòng ngay</Link>
        </span>
      )}
    </div>
  );
}
