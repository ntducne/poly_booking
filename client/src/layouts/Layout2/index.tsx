import { BarsOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useProcessLogoutMutation } from "../../api/User";
import { cookies as cookies2 } from "../../config/cookie";
import Footer from "../Client/Footer";
type Props = {};

export default function LayoutClient2({}: Props) {
  const navigate = useNavigate();
  const headerRef = useRef<any>(null);
  const [cookies] = useCookies(["userInfo"]);
  const [logoutApi] = useProcessLogoutMutation();
  const [toggleBar, setToggleBar] = useState(false);

  const handleToggleBar = () => {
    setToggleBar((prev) => {
      return !prev;
    });
  };
  const closeToggleBar = () => {
    setToggleBar(false);
  };
  const handleLogout = async () => {
    await logoutApi({});
    cookies2().Delete("userInfo");
    navigate("/auth/login");
  };
  const items: MenuProps["items"] = [
    {
      label: <Link to="/user/profile?defaultActive=1">Thông tin cá nhân</Link>,
      key: "0",
    },
    {
      label: <Link to="/user/profile?defaultActive=2">Phòng đã đặt</Link>,
      key: "1",
    },
    {
      label: <Link to="/user/profile?defaultActive=4">Lịch sử đặt phòng</Link>,
      key: "2",
    },
    {
      label: <Link to="/user/profile?defaultActive=3">Đặt lại mật khẩu</Link>,
      key: "3",
    },
    {
      type: "divider",
    },
    {
      label: <p onClick={() => handleLogout()}>Đăng xuất</p>,
      key: "4",
    },
  ];
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setToggleBar(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <div
        ref={headerRef}
        className={` 
          bg-white shadow-lg py-[3px] fixed top-0 z-40 w-full transition-all duration-300`}
      >
        <div className="relative lg:flex-row lg:justify-between lg:gap-y-0 flex justify-between">
          {/* logo */}
          <div className="flex gap-5 items-center  ">
            <Link to="/" className="pl-[20px] md:pl-[50px]">
              <img
                className="w-[120px]"
                src={
                  "https://res.cloudinary.com/dteefej4w/image/upload/v1696338661/logo_30_zwmslg.png"
                }
              />
            </Link>

            <div
              className={`
              text-dark py-6 
              lg:flex lg:gap-2 lg:gap-x-8 md:text-[15px] 
          items-center absolute lg:static lg:flex-row flex-col gap-5 top-[100%] lg:bg-transparent bg-white w-full  ${
            toggleBar ? "flex shadow-lg" : "hidden"
          }
          `}
            >
              <Link
                to="/"
                className="relative transition text-[16px] group"
                onClick={closeToggleBar}
              >
                Trang chủ
                <span className="absolute left-0 w-0 bg-white h-0 bottom-[1%] transition-all duration-750 group-hover:w-full group-hover:h-[1px] "></span>
              </Link>
              <Link
                to="/rooms"
                className="relative transition text-[16px] group"
                onClick={closeToggleBar}
              >
                Phòng
                <span className="absolute left-0 w-0 bg-white h-0 bottom-[1%] transition-all duration-750 group-hover:w-full group-hover:h-[1px] "></span>
              </Link>
              <Link
                to="/contact"
                className="relative transition text-[16px] group"
                onClick={closeToggleBar}
              >
                Liên hệ
                <span className="absolute left-0 w-0 bg-white h-0 bottom-[1%] transition-all duration-750 group-hover:w-full group-hover:h-[1px] "></span>
              </Link>
              <Link
                to="/about"
                className="relative transition text-[16px] group"
                onClick={closeToggleBar}
              >
                Về chúng tôi
                <span className="absolute left-0 w-0 bg-white h-0 bottom-[1%] transition-all duration-750 group-hover:w-full group-hover:h-[1px] "></span>
              </Link>
              {cookies && cookies?.userInfo ? (
                <Link
                  to="/user/profile?defaultActive=1"
                  className="relative transition text-[18px] lg:text-[16px] group md:hidden block"
                  onClick={closeToggleBar}
                >
                  Thông tin cá nhân
                  <span className="absolute md:hidden block left-0 w-0 bg-white h-0 bottom-[1%] transition-all group-hover:w-full group-hover:h-[1px] "></span>
                </Link>
              ) : (
                <Link
                  to="/auth/login"
                  className="relative transition md:hidden block text-[18px] lg:text-[16px] group"
                  onClick={closeToggleBar}
                >
                  Đăng nhập
                  <span className="absolute md:hidden block left-0 w-0 bg-white h-0 bottom-[1%] transition-all group-hover:w-full group-hover:h-[1px] "></span>
                </Link>
              )}
              {cookies && cookies?.userInfo ? (
                <Link
                  to="/about"
                  className="relative transition text-[18px] lg:text-[16px]  md:hidden block  group"
                  onClick={closeToggleBar}
                >
                  Đăng xuất
                  <span className="absolute left-0 w-0 bg-white h-0 bottom-[1%] transition-all group-hover:w-full group-hover:h-[1px] "></span>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>

          <div
            className={`
              text-dark py-6
             flex gap-2 lg:gap-x-8 
             md:text-[15px] 
          items-center
          pr-[20px] md:pr-[50px]
          `}
          >
            {cookies && cookies?.userInfo ? (
              <div className="md:block hidden">
                <Dropdown menu={{ items }} trigger={["click"]}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <UserOutlined className="text-[20px] cursor-pointer" />
                    </Space>
                  </a>
                </Dropdown>
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="relative md:flex hidden transition text-[16px] items-center gap-x-2 group"
              >
                <LockOutlined className="text-[15px] mb-1" />
                <span>Đăng nhập</span>
                <span className="absolute left-0 w-0 bg-white h-0 bottom-[1%] transition-all duration-750 group-hover:w-full group-hover:h-[1px] "></span>
              </Link>
            )}
            <div
              className="relative transition text-[16px] flex items-center gap-x-2 group lg:hidden "
              onClick={handleToggleBar}
            >
              <BarsOutlined className="text-[22px]" />
            </div>
          </div>
        </div>
      </div>
      <Outlet />
      <Footer />
    </div>
  );
}
