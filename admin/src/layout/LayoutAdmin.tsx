import React, { createContext, useEffect, useState } from "react";
import { MenuOutlined, PieChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import Head from "../component/header";
import Footer from "../component/footer";
import { ToastContainer } from "react-toastify";
const { Header, Content, Sider } = Layout;
import { Navigate } from "react-router-dom";

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
  AiOutlineCrown,
  AiOutlineUserSwitch,
  AiTwotoneGift,
} from "react-icons/ai";
import { BiSolidBed } from "react-icons/bi";
import { cookies } from "../config/cookies";
import "react-toastify/dist/ReactToastify.css";
import { MdContactPhone } from "react-icons/md";
// import { role } from "../hoc/withAuthorization.tsx";

export const LayoutContext = createContext("");

const LayoutAdmin = () => {
  const location = useLocation();
  const checkLogin = JSON.parse(cookies().Get("AuthUser") as any);
  if (!checkLogin) {
    return <Navigate to="/login" />;
  }
  const [role, setRole] = useState<any>(null);
  const [permissions, setPermissions] = useState<any>(null);
  useEffect(() => {
    const authUser = cookies().Get("AuthUser");
    if (authUser) {
      const parsed = JSON.parse(cookies().Get("AuthUser") as any);
      setRole(parsed ? parsed[1].role : null);
      setPermissions(parsed ? parsed[3] : null);
    }
  }, []);
  console.log("role",role);
  console.log("permissions",permissions);
  


  const [title, setTitle] = useState<any>(" ");
  useEffect(() => {
    location.pathname === "/" && setTitle("Trang chủ");
    location.pathname === "/branches" && setTitle("Chi nhánh");
    location.pathname === "/room" && setTitle("Phòng");
    location.pathname === "/room/add" && setTitle("Thêm phòng");
    location.pathname === "/room/type" && setTitle("Loại phòng");
    location.pathname === "/room/utilities" && setTitle("Tiện ích");
    location.pathname === "/room/utilities/add" && setTitle("Thêm tiện ích");
    location.pathname === "/room/booking" && setTitle("Đặt Phòng");
    location.pathname === "/billing" && setTitle("Hóa đơn");
    location.pathname === "/services" && setTitle("Dịch vụ");
    location.pathname === "/services/add" && setTitle("Thêm dịch vụ");
    location.pathname === "/policy" && setTitle("Chính sách");
    location.pathname === "/staff" && setTitle("Nhân viên");
    location.pathname === "/staff/add" && setTitle("Thêm nhân viên");
    location.pathname === "/user" && setTitle("Người dùng");
    location.pathname === "/feedback" && setTitle("Đánh giá");
    location.pathname === "/contact" && setTitle("Liên hệ");
    location.pathname === "/profile" && setTitle("Thông tin");
  }, [location.pathname]);

  const items: MenuItem[] = [
    getItem(
      "Trang chủ",
      "/",
      <Link to={`/`}>
        <PieChartOutlined />
      </Link>
    ),

    // getItem(
    //   "Chi nhánh",
    //   "/branches",
    //   <Link to={`branches`}>
    //     <AiTwotoneGift />
    //   </Link>
    // ),

    ...(role === "super_admin"
      ? [
          getItem(
            "Chi nhánh",
            "/branches",
            <Link to={`branches`}>
              <AiTwotoneGift />
            </Link>
          ),
          getItem(
            "Tài khoản quản lý",
            "/staff",
            <Link to={`staff`}>
              <AiOutlineUserSwitch />
            </Link>
          ),
        ]
      : []),
        
    ...(role !== "super_admin"
      ? [
          ...(permissions?.includes("admin.rooms.index") || permissions?.includes("admin.types.index") || permissions?.includes("admin.utilities.index") || permissions?.includes("admin.bookings.store")
          ? [
            getItem("Phòng", "sub1", <BiSolidBed />, [
              ...(permissions?.includes("admin.rooms.index")
                ? [
                    getItem(
                      "Danh sách Phòng",
                      "/room",
                      <Link to={`room`} />
                    ),
                  ]
                : []),
              ...(permissions?.includes("admin.types.index")
                ? [
                    getItem(
                      "Loại Phòng",
                      "/room/type",
                      <Link to={`room/type`} />
                    ),
                  ]
                : []),
              ...(permissions?.includes("admin.utilities.index")
                ? [
                    getItem(
                      "Tiện ích",
                      "/room/utilities",
                      <Link to={`room/utilities`} />
                    ),
                  ]
                : []),
              ...(permissions?.includes("admin.bookings.store")
                ? [
                    getItem(
                      "Đặt Phòng",
                      "/room/booking",
                      <Link to={`room/booking`} />
                    ),
                  ]
                : []),
            ]),
            ]
          : []),
          ...(permissions?.includes("admin.billings.index")
            ? [
                getItem(
                  "Hoá đơn",
                  "/billing",
                  <Link to={`billing`}>
                    <AiFillBank />
                  </Link>
                ),
              ]
            : []),
          ...(permissions?.includes("admin.services.index")
            ? [
                getItem(
                  "Dịch vụ",
                  "/services",
                  <Link to={`services`}>
                    <AiOutlineCrown />
                  </Link>
                ),
              ]
            : []),

          ...(permissions?.includes("admin.users.index") ||
          permissions?.includes("admin.staffs.index")
            ? [
                getItem("Tài khoản", "sub2", <AiOutlineUserSwitch />, [
                  ...(permissions?.includes("admin.staffs.index")
                    ? [getItem("Nhân viên", "/staff", <Link to={`staff`} />)]
                    : []),
                  ...(permissions?.includes("admin.users.index")
                    ? [getItem("Người dùng", "/user", <Link to={`user`} />)]
                    : []),
                ]),
              ]
            : []),

          ...(permissions?.includes("admin.rates.index")
            ? [
                getItem(
                  "Đánh giá",
                  "/feedback",
                  <Link to={`feedback`}>
                    <VscFeedback />
                  </Link>
                ),
              ]
            : []),
          getItem(
            "Liên hệ",
            "/contact",
            <Link to={`contact`}>
              <MdContactPhone />
            </Link>
          ),
        ]
      : []),
  ];
  const [collapsed, setCollapsed] = useState<any>(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const toggleSider = () => {
    setCollapsed(!collapsed);
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
          className={(!collapsed ? "fixed z-50" : "") + " h-screen"}
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
            defaultSelectedKeys={[location.pathname]}
            defaultOpenKeys={[location.pathname]}
            mode="inline"
            items={items}
          />
        </Sider>
        {!collapsed ? (
          <div className="fixed top-0 right-0 z-[1] w-screen h-full bg-[rgba(0,0,0,0.1)] md:hidden md:opacity-0 md:invisible"></div>
        ) : (
          ""
        )}
        <Layout className={!collapsed ? "md:pl-[200px]" : ""}>
          <Header
            className="flex items-center p-5 shadow-md"
            style={{
              padding: 0,
              background: colorBgContainer,
              position: "sticky",
              top: 0,
              zIndex: 40,
            }}
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
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
              className="rounded-lg"
            >
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
