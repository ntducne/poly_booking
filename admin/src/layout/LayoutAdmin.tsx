import React, { createContext, useState } from "react";
import { MenuOutlined, PieChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import Head from "../component/header";
import Footer from "../component/footer";
import { ToastContainer } from "react-toastify";
const { Header, Content, Sider } = Layout;
import { Navigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
import { VscFeedback } from "react-icons/vsc";
import {
  AiFillBank,
  AiFillPushpin,
  AiOutlineCrown,
  AiOutlineUserSwitch,
  AiTwotoneGift,
  AiTwotonePrinter,
  AiFillLock,
} from "react-icons/ai";
import { BsBuildingFillCheck } from "react-icons/bs";
import { BiSolidBed } from "react-icons/bi";
import { cookies } from "../config/cookies";
import "react-toastify/dist/ReactToastify.css";

export const LayoutContext = createContext("");

const LayoutAdmin = () => {
  const checkLogin = JSON.parse(cookies().Get('AuthUser') as any);
  if(!checkLogin) {
    return <Navigate to='/login' />
  }
  const items: MenuItem[] = [
    getItem(
      "Thống kê",
      "1",
      <Link onClick={() => handleTitleChange("Thống kê")} to={`dashboard`}>
        <PieChartOutlined />
      </Link>
    ),
    getItem(
      "Đánh giá",
      "2",
      <Link onClick={() => handleTitleChange("Đánh giá")} to={`feedback`}>
        <VscFeedback />
      </Link>
    ),
    getItem("Phòng", "sub1", <BiSolidBed />, [
      getItem(
        "Phòng",
        "3",
        <Link onClick={() => handleTitleChange("Phòng")} to={`room`} />
      ),
      getItem(
        "Loại Phòng",
        "4",
        <Link onClick={() => handleTitleChange("Loại phòng")} to={`roomType`} />
      ),
      getItem(
        "Tiện ích Phòng",
        "5",
        <Link
          onClick={() => handleTitleChange("Tiện ích")}
          to={`roomUtilities`}
        />
      ),
    ]),
    getItem(
      "Phòng Đặt",
      "6",
      <Link onClick={() => handleTitleChange("Phòng đặt")} to={`booking`}>
        {" "}
        <BsBuildingFillCheck />
      </Link>
    ),
    getItem(
      "Gia hạn Phòng",
      "7",
      <Link onClick={() => handleTitleChange("Gia hạn")} to={`roomExtend`}>
        <AiFillPushpin />
      </Link>
    ),
    getItem(
      "Hóa đơn",
      "8",
      <Link onClick={() => handleTitleChange("Hóa đơn")} to={`bill`}>
        <AiFillBank />
      </Link>
    ),
    getItem(
      "Dịch vụ",
      "9",
      <Link onClick={() => handleTitleChange("Dịch vụ")} to={`services`}>
        <AiOutlineCrown />
      </Link>
    ),
    getItem(
      "Ưu đãi-Khuyến Mãi",
      "10",
      <Link onClick={() => handleTitleChange("Ưu đãi")} to={`offers`}>
        <AiTwotoneGift />
      </Link>
    ),
    getItem(
      "Chính sách",
      "11",
      <Link onClick={() => handleTitleChange("Chính sách")} to={`policy`}>
        <AiTwotonePrinter />
      </Link>
    ),
    getItem("Tài khoản", "sub2", <AiOutlineUserSwitch />, [
      getItem(
        "Nhân viên",
        "12",
        <Link
          onClick={() => handleTitleChange("Nhân viên")}
          to={`auth/admin`}
        />
      ),
      getItem(
        "Người dùng",
        "13",
        <Link
          onClick={() => handleTitleChange("Người dùng")}
          to={`auth/user`}
        />
      ),
    ]),
    getItem("Phân quyền", "sub3", <AiFillLock />, [
      getItem(
        "Vai trò",
        "14",
        <Link onClick={() => handleTitleChange("Danh sách")} to={`role`} />
      ),
      getItem(
        "Thêm vai trò",
        "15",
        <Link
          onClick={() => handleTitleChange("Thêm vai trò")}
          to={`role/create`}
        />
      ),
    ]),
  ];
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggleSider = () => {
    setCollapsed(!collapsed);
  };

  const [title, setTitle] = useState("Dashboard");
  const handleTitleChange = (title: any) => {
    setTitle(title);
  };

  return (
    <LayoutContext.Provider value={title}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          theme="light"
          breakpoint="xs"
          collapsedWidth="1"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          className={(!collapsed ? 'fixed z-10' : '') + ' h-screen'}
        >
          {/* <div className="demo-logo-vertical" /> */}
          <img
            className="p-2 w-[80%]"
            src={`https://res.cloudinary.com/dteefej4w/image/upload/v1696338661/logo_30_zwmslg.png?fbclid=IwAR10Y-hXzDQPpRouXISq1hQq8Za9BjkHEEdJHbppdUkJc-bfdOm47C_O-P4`}
            alt=""
          />
          <Menu
            className="text-[#737b8b] "
            theme="light"
            // defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        {!collapsed ? <div className='fixed top-0 right-0 z-[1] w-screen h-full bg-[rgba(0,0,0,0.1)] md:hidden md:opacity-0 md:invisible'></div> : ''}
        <Layout className={!collapsed ? 'md:pl-[200px]' : ''}>
          <Header
            className="flex items-center p-5"
            style={{ padding: 0, background: colorBgContainer }}
          >
            <Button
              className="flex-none w-8"
              icon={<MenuOutlined />}
              onClick={toggleSider}
            />
            <div className="flex-initial w-full">
              <Head />
            </div>
          </Header>
          <Content style={{ margin: "16px" }}>
            {/* <div
              style={{
                padding: 24,
                minHeight: 50,
                background: colorBgContainer,
                marginBottom: "16px",
              }}
              className="rounded-lg"
            >
              <div className="flex justify-between items-center">
                <BreadCrumb pageName="Role" path="/role" action="Thêm"/>
                <Link to='/role/create' className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center">Thêm vai trò +</Link>
              </div>
            </div> */}
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
              className="rounded-lg"
            >
              {/* Bill is a cat. */}
              <Outlet />
              <ToastContainer />
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </LayoutContext.Provider>
  );
};
export default LayoutAdmin;