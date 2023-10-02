import { useContext } from "react";
import {
  Col,
  MenuProps,
  Row,
  Timeline,
  Typography,
} from "antd";
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

const { Text } = Typography;


const Head = () => {

  const title:any = useContext(LayoutContext)

  const menu: MenuProps["items"] = [
    {
      label: (
        <Menu items={[
          {key: "profile", label: <Link to={`/admin`}><UserOutlined /> Thông tin cá nhân</Link>},
          {key: "message", label: <Link to={`/admin`}><MessageOutlined className="bg-sky" /> Tin nhắn</Link>},
          // {key: "notification", label: <Link className="hidden" to={`/admin`}><MessageOutlined className="bg-sky" />Thông báo</Link>},
          {key: "logout", label: <a href="/logout"><LogoutOutlined /> Đăng xuất</a>},

        ]}>
        </Menu>
      ),
      key: "0",
    }
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
    <Row className="flex justify-center items-center mx-4 ">
      <Col span={12}>
        <p className="md:text-3xl  ">{title}</p>
      </Col>
      <Col span={12} className="flex justify-end ">
        <Space size="large">
          <Dropdown className="hover:cursor-pointer hidden md:block" menu={{ items : bell}} trigger={["click"]}>
            <Badge count={99}>
              <Avatar className="bg-white" size={38} icon={<BellFilled  className="text-blue-400 font-black"/>} />
            </Badge>
          </Dropdown>
          <Dropdown className="hover:cursor-pointer hidden md:block" menu={{ items : message}} trigger={["click"]}>
            <Badge count={99}>
              <Avatar className="bg-white" size={38} icon={<MessageOutlined  className="text-blue-400 font-black"/>} />
            </Badge>
          </Dropdown>
          <Dropdown className="hover:cursor-pointer" menu={{items : menu}} trigger={["click"]}>
            <Avatar size={40} icon={<UserOutlined />} />
          </Dropdown>
        </Space>
      </Col>
    </Row>
  );
};

export default Head;
