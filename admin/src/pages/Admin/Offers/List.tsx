import React from "react";
import { Button, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
// import { Col, Row } from "antd";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
import { MdDeleteForever, MdOutlineDeleteOutline } from "react-icons/md";
import FormSearch from "../../../component/formSearch";
import swal , { } from "sweetalert";
import Page from "../../../component/page";

const ListOffers = () => {


  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "promotion_id",
      sorter: (a, b) => a.promotion_id - b.promotion_id,
      sortDirections: ["descend"],
      fixed: "left",
    },
    {
      title: "Mã code",
      dataIndex: "code",
      key: "code",

    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "Điều kiện",
      dataIndex: "conditions",
      key: "conditions",
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
            <Link to={`/offers/edit/${record?.key}`}>
              <AiOutlineEdit />
            </Link>
          </Button>
          <Button
            onClick={() => remove(record?.key)}
            type="primary"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2.5 "
          >
            <MdDeleteForever />
          </Button>
        </Space>
      ),
      // fixed: "right",
    },
  ];

  const data : any = [
    {
      key: "1",
      promotion_id: 1,
      code: "DUCGA",
      start_date: "2021-09-01",
      end_date: "2021-09-30",
      conditions: "Ngày lễ",
    },
    {
      key: "2",
      promotion_id: 2,
      code: "CONKEC",
      start_date: "2021-09-01",
      end_date: "2021-09-30",
      conditions: "Ngày nhà giáo Việt Nam",
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    // pagination,
    // filters,
    // sorter,
    // extra
  ) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  const remove = (id: any) => {
    console.log(id);
    try {
      swal({
        title: "Are you sure you want to delete?",
        text: "You cannot undo after deleting!",
        icon: "warning",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            // removeComment(id);
            swal("You have successfully deleted", {
              icon: "success",
            });
          }
        })
        .catch(() => {
          swal("Error", {
            icon: "error",
          });
        });
    } catch (error) {}
  };

  return (
    <Page title={`Ưu đãi - Khuyến mại`}>
      <div className="flex flex-col-reverse md:flex-row md:justify-between ">
      <FormSearch />
        <div className="flex flex-col md:flex-row md:ml-2">
          <Link
            to={`/offers/add`}
            className="flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-2.5 text-center"
          >
            <AiOutlinePlus />
            Thêm ưu đãi
          </Link>
          <Link
            to={`/offers`}
            className="flex items-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-3 py-2.5 text-center md:ml-2 my-1 md:my-0"
          >
            <MdOutlineDeleteOutline />
            Thùng rác
          </Link>
        </div>
      </div>
      <Table
        scroll={{x : true}}
        className="max-w-full mt-3"
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </Page>
  );
};

export default ListOffers;
