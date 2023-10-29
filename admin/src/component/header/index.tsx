import { useContext, useEffect } from "react";
import { MenuProps, Typography } from "antd";
import { Avatar, Badge, Space } from "antd";
import { Dropdown } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  BellFilled,
  LockOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { LayoutContext } from "../../layout/LayoutAdmin";
import { cookies } from "../../config/cookies";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const { Text } = Typography;

const Head = () => {
  const title: any = useContext(LayoutContext);
  const navigate = useNavigate();
  const token = JSON.parse(cookies().Get("AuthUser") as any)[2].token;
  const user = JSON.parse(cookies().Get("AuthUser") as any)[1];

  function logout() {
<<<<<<< HEAD
    fetch("https://api.polydevhotel.site/auth/admin/logout", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        
        // if (res.status === true) {
        //   cookies().Delete("AuthUser");
        //   toast("Đăng xuất thành công");
        //   navigate("/login");
        // }
      });
    // cookies().Delete("AuthUser");
    // toast("Đăng xuất thành công");
    // navigate("/login");
=======
    fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken.token}`,
      },
    });
    cookies().Delete("AuthUser");
    toast("Đăng xuất thành công");
    navigate("/login");
>>>>>>> f89a41a3de09710349eb476112347519bd547458
  }

  const profile: MenuProps["items"] = [
    {
      label: (
        <Link rel="noopener noreferrer" to="/profile">
          <UserOutlined /> Thông tin tài khoản
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link rel="noopener noreferrer" to="/changePass">
          <LockOutlined /> Đổi mật khẩu
        </Link>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      onClick: logout,
      label: (
        <a onClick={logout}>
          <LogoutOutlined /> Đăng xuất
        </a>
      ),
      key: "3",
      danger: true,
    },
  ];
  const bell: MenuProps["items"] = [
    {
      label: (
        <div className="flex items-center rounded-2xl p-2 hover:bg-slate-100">
          <div>
            <img
              className="w-10 h-10 rounded-full"
              src="https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg"
              alt=""
            />
          </div>
          <div className="ml-2">
            <p className="font-medium		">Dr sultads Send you Photo</p>
            <>
              <Text type="secondary">29 July 2022 - 02:26 PM</Text>
            </>
          </div>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div className="flex items-center rounded-2xl p-2 hover:bg-slate-100">
          <div>
            <img
              className="w-10 h-10 rounded-full"
              src="https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg"
              alt=""
            />
          </div>
          <div className="ml-2">
            <p className="font-medium		">Dr sultads Send you Photo</p>
            <>
              <Text type="secondary">29 July 2022 - 02:26 PM</Text>
            </>
          </div>
        </div>
      ),
      key: "1",
    },
  ];
  return (
    <div className="flex justify-between items-center mx-4">
      <div>
        <p className="md:text-3xl">{title}</p>
      </div>
      <div>
        <Space size="large">
          <Dropdown
            className="hover:cursor-pointer hidden md:block"
            menu={{ items: bell }}
            trigger={["click"]}
          >
            <Badge count={bell.length}>
              <Avatar
                className="bg-white"
                size={40}
                icon={<BellFilled className="text-blue-400 font-black" />}
              />
            </Badge>
          </Dropdown>
          <Dropdown menu={{ items: profile }} placement="bottomRight">
            <div className="flex items-center justify-center">
              <Avatar src={<img src={user.image} alt="avatar" />} />
              <div className=" rounded-t-lg ml-3">
                <p className="text-sm ">Xin chào</p>
                <p className="text-sm font-medium ">{user.name}</p>
              </div>
            </div>
          </Dropdown>
        </Space>
      </div>
    </div>
  );
};
export default Head;
