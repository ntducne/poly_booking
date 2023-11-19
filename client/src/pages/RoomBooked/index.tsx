import { Divider, Pagination } from "antd";
import { ImageStyle1 } from "../../assets/images/Home/ImsViews";
import HeroSlide from "../../components/HeroSlide";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

type Props = {};

export default function RoomBooked({}: Props) {
  const [cookie, setCookie] = useCookies(["userInfo"]);
  console.log(cookie);

  return (
    <div>
      <HeroSlide />
      <div className="my-[100px] lg:mx-[150px] mx-2">
        <h2 className="text-[25px] font-bold mb-5">Phòng đã đặt</h2>
        <div>
          <div className="border-t pt-[30px] flex gap-[30px] pb-[30px] ">
            <Link to="">
              <img
                className="max-w-[300px] max-h-[300px] overflow-hidden object-cover rounded-[10px]"
                src={
                  "https://www.imgacademy.com/sites/default/files/legacy-hotel-rendering-guest-room.jpg"
                }
                alt=""
              />
            </Link>
            <div className="mb-2">
              <Link to="" className="text-[20px] font-bold">
                Distant Mountains Artwork Tee
              </Link>
              <p className="text-[20px] font-bold mb-2">$36.00</p>
              <p className="text-[#6B7280] tracking-[1px] text-[16px]">
                You awake in a new, mysterious land. Mist hangs low along the
                distant mountains. What does it mean?
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
          <div className="flex justify-end mt-10">
            <Pagination defaultCurrent={6} total={500} />
          </div>
        </div>
      </div>
    </div>
  );
}
