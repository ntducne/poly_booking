import React from "react";
import { Image, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
// import FormSearch from "../../../../component/formSearch";
import Page from "../../../../component/page";
import { useGetAllUsersQuery } from "../../../../api/account/users";

const ListUser = () => {
  const { data: users, isLoading } = useGetAllUsersQuery([]);

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "key",
      sorter: (a, b) => a.key - b.key,
      sortDirections: ["descend"],
      fixed: "left",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.address.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "userAvatar",
      render: (_, record) => (
        <div className="flex items-center">
          {/* <img className="" src="https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_PDLK_02.jpg" alt="" /> */}
          <Image className="rounded-3xl " width={80} src={record?.image} />
          <div className="ml-3 text-gray-500">
            <p>{record?.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            type="button"
            className=" bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-brfont-medium rounded-lg  px-5 py-2.5 ml-1"
          >
            <Link
              className="text-white text-sm text-center"
              to={`/user/edit/${record?.id}`}
            >
              <AiOutlineEdit />
            </Link>
          </button>
        </Space>
      ),
      // fixed: "right",
    },
  ];

  const data: any = users?.data?.map((item: any, index: number) => ({
    key: index + 1,
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    image: item.image,
    address: item.address,
    status: item.status,
  }));

  const onChange: TableProps<DataType>["onChange"] = () => {};

  return (
    <Page title={`Tài khoản người dùng`}>
      <div className="flex flex-col-reverse md:flex-row md:justify-between ">
        <div className="mb-3">{/* <FormSearch /> */}</div>
        <div className="flex flex-col md:flex-row"></div>
      </div>
      <Table
        scroll={{ x: true }}
        className="max-w-full mt-3"
        columns={columns}
        loading={isLoading}
        dataSource={data}
        onChange={onChange}
        pagination={{ pageSize: 10 }}
      />
    </Page>
  );
};

export default ListUser;
