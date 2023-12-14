import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetHistoryBookingQuery } from "../../../api/User";
import FormatPrice from "../../../utils/FormatPrice";

type Props = {};

export default function HistoryBooking({}: Props) {
  const [data, setData] = useState<any>([]);
  const {
    data: dataRoom,
    isLoading,
    refetch,
  } = useGetHistoryBookingQuery({
    userId: "someUserId",
  });
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      await refetch();
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (!isLoading && data) {
      const filteredData = dataRoom?.data.filter(
        (item: any) => ![4, 6, 2].includes(item.status)
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
              <div className="border-t pt-[30px] flex-col md:flex-row  flex gap-[30px] pb-[30px] ">
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
                  <div className="mt-2">
                    <h2 className="text-[16px] font-medium">
                      Được đặt vào ngày {item?.booking?.booking_date}
                    </h2>
                    <div className="">Trạng thái: {item?.status_name}</div>
                  </div>
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
