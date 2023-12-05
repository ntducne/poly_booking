import { useContext, useEffect, useState } from "react";
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
import { pusherInstance } from "../../config/pusher";
import { FaEye } from "react-icons/fa";

const { Text } = Typography;

const Head = () => {
  const [newMessage, setNewMessage] = useState(0);
  const [notifications, setNotifications] = useState<any[]>([]);

  const title: any = useContext(LayoutContext);
  const navigate = useNavigate();
  const token = JSON.parse(cookies().Get("AuthUser") as any)[2].token;
  const user = JSON.parse(cookies().Get("AuthUser") as any)[1];
  const notificationSound = new Audio("./src/utils/telegram.mp3");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_API}/notifications`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(cookies().Get("AuthUser") as any)[2].token
        }`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setNotifications([]);
        setNewMessage(0);
        res.forEach((item: any, key: number) => {
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            {
              label: (
                <div className="flex items-center rounded-2xl p-2 hover:bg-slate-100">
                  <div className="ml-2">
                    <p className="font-medium">{item.message}</p>
                    <Text type="secondary">{item.time}</Text>
                  </div>
                </div>
              ),
              key: `${key}`,
            },
          ]);
        });
      });
    const unsubscribe = pusherInstance().getData(
      "chat",
      "message",
      (data: any) => {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          {
            label: (
              <div className="flex items-center rounded-2xl p-2 hover:bg-slate-100">
                <div className="ml-2">
                  <p className="font-medium">{data.data.message}</p>
                  <>
                    <Text type="secondary">{data.data.time}</Text>
                  </>
                </div>
              </div>
            ),
            key: `${Math.random()}`,
          },
        ]);
        setNewMessage(notifications.length + 1);
        notificationSound.play()
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  const removeNotification = () => {
    setNewMessage(0);
  };

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_URL_API}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        cookies().Delete("AuthUser");
        toast("Đăng xuất thành công");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      });
  };

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
        <a>
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
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">Thông báo</p>
          <Badge count={newMessage} />
        </div>
      ),
      key: "10",
    },
    {
      label: (
        <div className="bg-white overflow-scroll overflow-x-auto max-h-72">
          {notifications?.map((item: any) => {
            return (
              <div>
                <div>{item?.label}</div>
              </div>
            );
          })}
        </div>
        // <div>Hello</div>
      ),
      key: "11",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link to={`/notifications`}>
          <button
            type="button"
            className="text-white flex justify-center items-center border px-3 py-1 rounded-md bg-slate-400"
          >
            <FaEye />
            <div className="ml-2 text-white font-semibold">Xem tất cả</div>
          </button>
        </Link>
      ),
      key: "12",
    },
  ];


  return (
    <div className="flex justify-between items-center mx-4">
      <button className="text-black">Chuông nè</button>
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
            <Badge count={newMessage}>
              <Avatar
                onClick={removeNotification}
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
