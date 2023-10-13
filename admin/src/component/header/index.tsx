import { useContext } from "react";
import { MenuProps, Timeline, Typography } from "antd";
import { Avatar, Badge, Space } from "antd";
import { Menu, Dropdown } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  MessageOutlined,
  BellFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { LayoutContext } from "../../layout/LayoutAdmin";
import { cookies } from "../../config/cookies";
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"

const { Text } = Typography;

const Head = () => {
  const title: any = useContext(LayoutContext);
  const navigate = useNavigate()

  const user = JSON.parse(cookies().Get('AuthUser') as any)[1]

  function logout() {
    cookies().Delete('AuthUser')
    toast("Đăng xuất thành công")
    navigate('/login')
  }

  const profile: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <>
          <div className="p-1 py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Xin chào</p>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-300">{user.name}</p>
          </div>
          <div className="mt-2 py-2 first:pt-0 last:pb-0">
            <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
              <svg className="flex-none" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
              </svg>
              Đổi mật khẩu
            </a>
            <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
              <svg className="flex-none" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
              </svg>
              Thông tin cá nhân
            </a>
          </div>
          <div className="py-2 first:pt-0 last:pb-0">
            <a type="button" onClick={logout} className="text-red-500 flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
              <i className="fa-solid fa-right-from-bracket"></i>&nbsp;Đăng xuất
            </a>
          </div>
        </>
      ),
    },
  ]
  const menu: MenuProps["items"] = [
    {
      label: (
        <Menu
          items={[
            {
              key: "profile",
              label: (
                <Link to={`/admin`}>
                  <UserOutlined /> Thông tin cá nhân
                </Link>
              ),
            },
            {
              key: "message",
              label: (
                <Link to={`/admin`}>
                  <MessageOutlined className="bg-sky" /> Tin nhắn
                </Link>
              ),
            },
            // {key: "notification", label: <Link className="hidden" to={`/admin`}><MessageOutlined className="bg-sky" />Thông báo</Link>},
            {
              key: "logout",
              label: (
                <a href="/logout">
                  <LogoutOutlined /> Đăng xuất
                </a>
              ),
            },
          ]}
        ></Menu>
      ),
      key: "0",
    },
  ];
  const message: MenuProps["items"] = [
    {
      label: (
        <Timeline
          items={[
            {
              color: "green",
              children: "Create a services site 2015-09-01",
            },
            {
              color: "green",
              children: "Create a services site 2015-09-01",
            },
            {
              color: "red",
              children: (
                <>
                  <p>Solve initial network problems 1</p>
                  <p>Solve initial network problems 2</p>
                  <p>Solve initial network problems 3 2015-09-01</p>
                </>
              ),
            },
          ]}
        />
      ),
      key: "0",
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
      <div >
        <p className="md:text-3xl">{title}</p>
      </div>
      <div>
        <Space size="large">
          <Dropdown
            className="hover:cursor-pointer hidden md:block"
            menu={{ items: bell }}
            trigger={["click"]}
          >
            <Badge count={99}>
              <Avatar
                className="bg-white"
                size={38}
                icon={<BellFilled className="text-blue-400 font-black" />}
              />
            </Badge>
          </Dropdown>
          <Dropdown
            className="hover:cursor-pointer hidden md:block"
            menu={{ items: message }}
            trigger={["click"]}
          >
            <Badge count={99}>
              <Avatar
                className="bg-white"
                size={38}
                icon={<MessageOutlined className="text-blue-400 font-black" />}
              />
            </Badge>
          </Dropdown>
          <Dropdown
            className="hover:cursor-pointer"
            menu={{ items: menu }}
            trigger={["click"]}
          >
            <Avatar size={40} icon={<UserOutlined />} />
          </Dropdown>
          <Dropdown menu={{ items: profile }} placement="bottomRight">
            <Avatar src={<img src={user.image} alt="avatar" />} />
          </Dropdown>
        </Space>
      </div>
    </div>
  );
};
export default Head;