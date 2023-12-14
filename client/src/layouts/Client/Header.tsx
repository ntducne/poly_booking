import { BarsOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useProcessLogoutMutation } from "../../api/User";
import { cookies as cookies2 } from "../../config/cookie";

type Props = {};

export default function Header({}: Props) {
  const navigate = useNavigate();
  const headerRef = useRef<any>(null);
  const [cookies] = useCookies(["userInfo"]);
  const [header, setHeader] = useState(false);
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
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    });
  });

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
    <div
      ref={headerRef}
      className={` ${
        header ? "bg-white shadow-lg py-[3px]" : "bg-transparent py-[3px]"
      } fixed top-0 z-40 w-full transition-all  ${
        toggleBar ? "bg-white " : ""
      } `}
    >
      <div className="lg:flex-row lg:justify-between lg:gap-y-0 flex justify-between relative">
        {/* logo */}
        <div className="flex gap-5 items-center ">
          <Link to="/" className="pl-[20px] md:pl-[50px]">
            <img
              className="w-[120px]"
              src={`/logo_${
                toggleBar ? "light" : header ? "light" : "dark"
              }.png`}
            />
          </Link>
          <div
            className={`${
              toggleBar
                ? "text-dark py-6"
                : header
                ? "text-dark py-6"
                : "text-white  py-4"
            } lg:flex lg:gap-2 lg:gap-x-8  md:text-[15px] 
          items-center absolute lg:static lg:flex-row flex-col gap-5 top-[100%] lg:bg-transparent bg-white w-full   ${
            toggleBar ? "flex shadow-lg" : "hidden"
          }
          `}
          >
            <Link
              to="/"
              className="relative transition text-[18px] lg:text-[16px] group"
              onClick={closeToggleBar}
            >
              Trang chủ
              <span className="absolute left-0 w-0 bg-white h-0 bottom-[1%] transition-all group-hover:w-full group-hover:h-[1px] "></span>
            </Link>
            <Link
              to="/rooms"
              className="relative transition text-[18px] lg:text-[16px] group"
              onClick={closeToggleBar}
            >
              Phòng
              <span className="absolute left-0 w-0 bg-white h-0 bottom-[1%] transition-all group-hover:w-full group-hover:h-[1px] "></span>
            </Link>
            <Link
              to="/contact"
              className="relative transition text-[18px] lg:text-[16px] group"
              onClick={closeToggleBar}
            >
              Liên hệ
              <span className="absolute left-0 w-0 bg-white h-0 bottom-[1%] transition-all group-hover:w-full group-hover:h-[1px] "></span>
            </Link>
            <Link
              to="/about"
              className="relative transition text-[18px] lg:text-[16px] group"
              onClick={closeToggleBar}
            >
              Về chúng tôi
              <span className="absolute left-0 w-0 bg-white h-0 bottom-[1%] transition-all group-hover:w-full group-hover:h-[1px] "></span>
            </Link>
          </div>
        </div>

        <div
          className={`${
            toggleBar
              ? "text-dark py-6"
              : header
              ? "text-dark py-6"
              : "text-white  py-4"
          } flex gap-2 lg:gap-x-8  md:text-[15px] pr-[20px] md:pr-[50px]
          items-center 
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
              to="auth/login"
              className="relative transition text-[16px] flex items-center gap-x-2 group"
            >
              <LockOutlined className="text-[15px] mb-1" />
              <span>Đăng nhập</span>
              <span className="absolute left-0 w-0 bg-white h-0 bottom-[1%] transition-all group-hover:w-full group-hover:h-[1px] "></span>
            </Link>
          )}
          <div
            className=" transition text-[16px] flex items-center gap-x-2 group lg:hidden"
            onClick={handleToggleBar}
          >
            <BarsOutlined className="text-[22px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
