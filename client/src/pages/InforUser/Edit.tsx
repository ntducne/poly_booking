import type { TabsProps } from "antd";
import { Tabs } from "antd";
import { useGetProfileQuery } from "../../api/User";
import HeroSlide from "../../components/HeroSlide";

const onChange = (key: string) => {
  console.log(key);
};

export default function Edit() {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Danh sách đơn hàng",
      children: <></>,
    },
    {
      key: "2",
      label: "Cập nhật thông tin cá nhân",
      children: <></>,
    },
    {
      key: "3",
      label: "Cập nhật mật khẩu",
      children: <></>,
    },
    {
      key: "4",
      label: (
        <span className="flex items-center text-red-500">
          <span>Xóa tài khoản</span>
        </span>
      ),
      children: <></>,
    },
  ];

  const { data } = useGetProfileQuery({});
  console.log("data", data);
  const { address, email, name, phone, image } = data?.message;
  if (!data && !data?.message) {
    return <>loading..</>;
  }
  return (
    <div>
      <HeroSlide />
      <div title="Profile" />
      <div className="">
        <div className="container mx-auto my-5 p-5">
          <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2">
              <div className="bg-white shadow-md rounded-xl p-3 border-t-8 border-b-8 border-gray-400">
                <div className="image overflow-hidden">
                  <img className="h-auto w-36 mx-auto" alt="" src={image} />
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 text-center">
                  {name}
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
              <div className="bg-white p-3 shadow-md rounded-xl border border-gray-100">
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
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Họ tên</div>
                      <div className="px-4 py-2">{name}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email</div>
                      <div className="px-4 py-2">{email}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Số điện thoại
                      </div>
                      <div className="px-4 py-2">{phone}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Địa chỉ</div>
                      <div className="px-4 py-2">{address}</div>
                    </div>
                  </div>
                  <Tabs defaultActiveKey="1" items={items} size={"large"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
