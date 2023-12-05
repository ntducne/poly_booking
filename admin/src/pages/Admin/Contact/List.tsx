import React from "react";
import Page from "../../../component/page";
import { useGetContactQuery } from "../../../api/contact";
import FormSearch from "../../../component/formSearch";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { Table } from "antd";

const ListContact = () => {
  const { data: dataContact, isLoading } = useGetContactQuery({});

    const columns: ColumnsType<any> = [
        {
        title: "ID",
        dataIndex: "key",
        sorter: (a, b) => a.key - b.key,
        sortDirections: ["descend"],
        fixed: "left",
        },
        {
        title: "Họ và tên",
        dataIndex: "name",
        key: "name",
        },
        {
        title: "Email",
        dataIndex: "email",
        key: "email",
        },
        {
        title: "Số điện thoại",
        dataIndex: "phone",
        key: "phone",
        },
        {
        title: "Nội dung",
        dataIndex: "content",
        key: "content",
        },
        {
        title: "Thời gian",
        dataIndex: "created_at",
        key: "created_at",
        },
    ];

    const data = dataContact?.data?.map((item, index) => ({
        key: index + 1,
        name: item.name,
        email: item.email,
        phone: item.phone,
        content: item.content,
        created_at: item.created_at,
    }));
  return (
    <Page title={`Đánh giá`}>
      <div className="flex flex-col-reverse md:flex-row md:justify-between  ">
        <div className="">
          <FormSearch />
        </div>
        <div className="flex flex-col md:flex-row">
          <Link
            to={`/Feedback`}
            className="flex items-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center md:ml-2 my-1 md:my-0"
          >
            <MdOutlineDeleteOutline />
            Thùng rác
          </Link>
        </div>
      </div>
      <Table
        scroll={{ x: true }}
        className="max-w-full mt-3"
        loading={isLoading}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
    </Page>
  );
};

export default ListContact;
