// import React from "react";
import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
// import { Col, Row } from "antd";
// interface DataType {
//   key: React.Key;
//   name: string;
//   age: number;
//   address: string;
// }
import FormSearch from "../../../component/formSearch";
// import swal , { } from "sweetalert";
import Page from "../../../component/page";
import { useGetBilingsQuery } from "../../../api/billings";

const BillList = () => {
  const { data: dataBilings, isLoading } = useGetBilingsQuery({});

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "key",
      sorter: (a, b) => a.key - b.key,
      sortDirections: ["descend"],
      fixed: "left",
    },
    {
      title: "Giá tiền",
      dataIndex: "total",
      key: "total",
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "payment_date",
      key: "payment_date",
    },
    {
      title: "Phương thức",
      dataIndex: "payment_method",
      filters: [
        {
          text: "Tiền mặt",
          value: "Tiền mặt",
        },
        {
          text: "Chuyển khoản",
          value: "Chuyển khoản",
        },
      ],
      render: (text) => (
        <div className="font-semibold">
          {text === "Tiền mặt" ? (
            <span className="border px-5 py-2 rounded-xl text-[#fff]   bg-[#43e674]">
              Tiền mặt
            </span>
          ) : (
            <span className="border px-5 py-2 rounded-xl text-[#e46868] bg-[#eed6d6]">
              Chuyển khoản
            </span>
          )}
        </div>
      ),
      onFilter: (value: any, record) =>
        record.payment_method.indexOf(value) === 0,
    },

    {
      title: "Trạng thái thanh toán",
      dataIndex: "status",
      key: "status",
      render: (status: any) => {
        let statusText;
        let statusClass;

        switch (status) {
          case 0:
            statusText = "Đã đặt";
            statusClass = "text-green-500";
            break;
          case 1:
            statusText = "Chờ nhận phòng";
            statusClass = "text-blue-500";
            break;
          case 2:
            statusText = "Hủy Đặt phòng";
            statusClass = "text-red-500";
            break;
          case 3:
            statusText = "Đã nhận phòng";
            statusClass = "text-yellow-500";
            break;
          case 4:
            statusText = "Đã trả phòng";
            statusClass = "text-purple-500";
            break;
          case 5:
            statusText = "Đã thanh toán";
            statusClass = "text-indigo-500";
            break;
          case 6:
            statusText = "Hủy Thanh Toán";
            statusClass = "text-pink-500";
            break;
          case 7:
            statusText = "Thanh toán lỗi";
            statusClass = "text-orange-500";
            break;
          case 8:
            statusText = "Hoạt động";
            statusClass = "text-teal-500";
            break;
          case 9:
            statusText = "Tạm đóng";
            statusClass = "text-gray-500";
            break;
          case 10:
            statusText = "Cấm";
            statusClass = "text-black";
            break;
          default:
            statusText = "Không tồn tại trạng thái nào";
            statusClass = "text-red-500";
        }
        return (
          <div className={`font-semibold text-base ${statusClass}`}>
            {statusText}
          </div>
        );
      },
    },
    {
      title: "Chi nhánh",
      dataIndex: "branch",
      key: "branch",
      render: (text) => <div>{text?.name}</div>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2.5"
          >
            <Link to={`/billing/${record?.id}`}>
              <AiOutlineEdit />
            </Link>
          </Button>
          {/* <Button
            onClick={() => remove(record?.key)}
            type="primary"
            style={{ backgroundColor: "#e23428" }}
          >
            <MdDeleteForever />
          </Button> */}
        </Space>
      ),
      // fixed: "right",
    },
  ];

  const data = dataBilings?.data?.map((item: any, index: number) => ({
    key: index + 1,
    id: item.id,
    booking: item.booking,
    services: item.services.length,
    total: item.total,
    payment_method: item.payment_method,
    payment_date: item.payment_date,
    branch: item.branch,
    status: item.status,
  }));

  return (
    <Page title={`Hóa đơn`}>
      <div className="flex flex-col-reverse md:flex-row md:justify-between ">
        <div className="mb-3">
          <FormSearch />
        </div>
        <div className="flex flex-col md:flex-row"></div>
      </div>
      <Table
        scroll={{ x: true }}
        className="max-w-full mt-3"
        loading={isLoading}
        columns={columns}
        dataSource={data}
      />
    </Page>
  );
};

export default BillList;
