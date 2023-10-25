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

const BillList = () => {
  
  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "booking_id",
      sorter: (a, b) => a.booking_id - b.booking_id,
      sortDirections: ["descend"],
      fixed: "left",
    },
    {
      title: "Dịch vụ",
      dataIndex: "services",
      key: "services",
    },
    {
      title: "Giá tiền",
      dataIndex: "total",
      key: "total",
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: "Thời gian",
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
      onFilter: (value: any, record) => record.payment_method.indexOf(value) === 0,
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
            <Link to={`/bill/edit/${record?.key}`}>
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

  const data = [
    {
      key: "1",
      booking_id: 1,
      services: "Thuê phòng",
      total: 1200000,
      payment_method: "Tiền mặt",
      payment_date: "2021-09-20",
      branch_id: 1,
    },
    {
      key: "2",
      booking_id: 2,
      services: "Thuê phòng",
      total: 1600000,
      payment_method: "Chuyển khoản",
      payment_date: "2021-09-20",
      branch_id: 2,
    },
  ];



  // const remove = (id: any) => {
  //   try {
  //     swal({
  //       title: "Are you sure you want to delete?",
  //       text: "You cannot undo after deleting!",
  //       icon: "warning",
  //       buttons: ["Cancel", "Delete"],
  //       dangerMode: true,
  //     })
  //       .then((willDelete) => {
  //         if (willDelete) {
  //           // removeComment(id);
  //           swal("You have successfully deleted", {
  //             icon: "success",
  //           });
  //         }
  //       })
  //       .catch(() => {
  //         swal("Error", {
  //           icon: "error",
  //         });
  //       });
  //   } catch (error) {}
  // };

  return (
    <Page title={`Hóa đơn`}>
      <div className="flex flex-col-reverse md:flex-row md:justify-between ">
        <div className="mb-3">
          <FormSearch />
        </div>
        <div className="flex flex-col md:flex-row">
        </div>
      </div>
      <Table
        scroll={{x : true}}
        className="max-w-full mt-3"
        columns={columns}
        dataSource={data}
      />
    </Page>
  );
};

export default BillList;
