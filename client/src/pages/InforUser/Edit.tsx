import type { TabsProps } from "antd";
import { Tabs } from "antd";
import { useGetProfileQuery } from "../../api/User";
import HeroSlide from "../../components/HeroSlide";
import Page from "../../components/Page";
import HistoryBooking from "../../sections/Profile/HistoryBooking";
import UpdateProfile from "../../sections/Profile/UpdateProfile";
import UpdatePassword from "../../sections/Profile/UpdatePassword";
import PcLoading from "../../components/RoomLoading/PcLoading";
import { cookies } from "../../config/cookie";

export default function Edit() {
  const { data, isLoading } = useGetProfileQuery({});
  console.log(data);
  console.log(`${JSON.parse(cookies().Get("userInfo") as any)[2].token}`);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Thông tin cá nhân",
      children: (
        <UpdateProfile
          data={data && Object.keys(data)?.length ? data?.message : {}}
        />
      ),
    },
    {
      key: "2",
      label: "Danh sách đơn hàng",
      children: <HistoryBooking />,
    },
    {
      key: "3",
      label: "Cập nhật mật khẩu",
      children: <UpdatePassword />,
    },
  ];
  console.log(isLoading);
  return (
    <Page title="Thông tin người dùng">
      <HeroSlide />
      <div title="Profile" />
      {isLoading ? (
        <div className="mt-5 w-full">
          {Array.from({ length: 5 }).map((_, index) => (
            <PcLoading key={index} />
          ))}
        </div>
      ) : (
        <div className="">
          <div className="container mx-auto my-5 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">
              <div className="w-full md:w-3/12 md:mx-2">
                <div className="bg-white shadow-md rounded-xl p-3 border-t-8 border-b-8 border-gray-400">
                  <div>
                    <div className="image overflow-hidden">
                      <img
                        className="h-auto w-36 mx-auto"
                        alt=""
                        src={data?.message?.image}
                      />
                    </div>
                  </div>
                  <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 text-center">
                    {data?.message?.name}
                  </h1>
                  <ul className=" text-gray-600 py-2 px-3 mt-3">
                    <li className="flex items-center py-3">
                      <span>Trạng thái tài khoản</span>
                      <span className="ml-auto">
                        <span className="bg-green-500 py-1 px-2 rounded-md text-white text-sm">
                          Hoạt động
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center py-3">
                      <span>Member since</span>
                      {/*<span className="ml-auto">{auth.user.created_at}</span>*/}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full md:w-9/12 lg:ml-2 mt-6 md:mt-0 overflow-hidden transition-all duration-500 ease-in-out">
                <div className="bg-white px-5 py-4 shadow-md rounded-xl border border-gray-100">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span className="text-gray-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">Thông tin cá nhân</span>
                  </div>
                  <div className="text-gray-700">
                    <div className="grid md:grid-cols-2 mb-5">
                      <div className="flex gap-2">
                        <div className="py-2 font-semibold">Họ tên: </div>
                        <div className="py-2">{data?.message?.name}</div>
                      </div>
                      <div className="flex gap-2">
                        <div className="py-2 font-semibold">Email: </div>
                        <div className="py-2">{data?.message?.email}</div>
                      </div>
                      <div className="flex gap-2">
                        <div className="py-2 font-semibold">
                          Số điện thoại:{" "}
                        </div>
                        <div className="py-2">{data?.message?.phone}</div>
                      </div>
                    </div>
                    <Tabs defaultActiveKey="1" items={items} size={"large"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
}
