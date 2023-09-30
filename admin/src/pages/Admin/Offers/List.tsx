import React, { useState } from "react";
import { Button, Carousel, Image, Space, Table, Tabs } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
import { MdDeleteForever, MdOutlineDeleteOutline } from "react-icons/md";
import FormSearch from "../../../component/formSearch";
import swal , { } from "sweetalert";

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
          <Button type="primary" style={{ backgroundColor: "#68e365" }}>
            <Link to={`/offers/edit/${record?.key}`}>
              <AiOutlineEdit />
            </Link>
          </Button>
          <Button
            onClick={() => remove(record?.key)}
            type="primary"
            style={{ backgroundColor: "#e23428" }}
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
    pagination,
    filters,
    sorter,
    extra
  ) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  const remove = (id: any) => {
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
    <div className="">
      <div className="flex flex-col-reverse md:flex-row md:justify-between ">
        <div className="mb-3">
          <FormSearch />
        </div>
        <div className="flex flex-col md:flex-row">
          <Button
            className="bg-teal-700	text-[#fff] hover:drop-shadow-2xl mb-2"
            type="default"
            icon={<AiOutlinePlus />}   
          >
            <Link to={`/services/add`}>Thêm dịch vụ</Link>
          </Button>
          <Button
            className="bg-red-400	text-[#fff] hover:drop-shadow-2xl mb-2 md:ml-4"
            type="default"
            icon={<MdOutlineDeleteOutline />}
          >
            <Link to={`/services/add`}>Thùng rác</Link>
          </Button>
          {/* <Button className=" bg-red-400 text-[#fff] hover:drop-shadow-2xl md:ml-auto">
            <Link className="flex items-center px-10" to={`/admin`}>
              <MdOutlineDeleteOutline />
              <span className="ml-2">Thùng rác</span>
            </Link> 
          </Button> */}
        </div>
      </div>
      <Table
        scroll={{x : true}}
        className="max-w-full mt-3"
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
};

export default ListOffers;
