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

const ListRoomType = () => {

  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "room_type_id",
      sorter: (a, b) => a.room_type_id - b.room_type_id,
      sortDirections: ["descend"],
      fixed: "left",
    },
    // {
    //   title: "Loại phòng",
    //   dataIndex: "imageType",
    //   render: (_, record) => (
    //     <div className="flex items-center">
    //       {/* <img className="" src="https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_PDLK_02.jpg" alt="" /> */}
    //       <Image
    //         className="rounded-3xl "
    //         width={150}
    //         src="https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_PDLK_02.jpg"
    //       />
    //       <div className="ml-3 text-gray-500">
    //         <p>#68e365</p>
    //         <p>2 giường ngủ</p>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      title: "Tên loại phòng",
      dataIndex: "room_type_name",
      key: "room_type_name",
      sorter: (a, b) => a.room_type_name.length - b.room_type_name.length,
    },
    {
      title: "Giá mỗi đêm",
      dataIndex: "price_per_night",
      key: "price_per_night",
      sorter: (a, b) => a.price_per_night - b.price_per_night,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      filters: [
        {
          text: "Còn trống",
          value: "Còn",
        },
        {
          text: "Hết phòng",
          value: "Hết",
        },
      ],
      render: (text) => (
        <div className="font-semibold">
          {text === "Còn" ? (
            <span className="border px-5 py-2 rounded-xl text-[#fff]   bg-[#43e674]">
              Còn
            </span>
          ) : (
            <span className="border px-5 py-2 rounded-xl text-[#e46868] bg-[#eed6d6]">
              Hết
            </span>
          )}
        </div>
      ),
      onFilter: (value: any, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" style={{ backgroundColor: "#68e365" }}>
            <Link to={`/roomType/edit/${record?.key}`}>
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
      room_type_id: 1,
      room_type_name: "Phòng V.I.P",
      description: "Phòng đẹp nhất",
      price_per_night: 1560000,
      status: "Còn",
    },
    {
      key: "2",
      room_type_id: 2,
      room_type_name: "Phòng bình dân",
      description: "Phòng giá rẻ",
      price_per_night: 2060000,
      status: "Hết",
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
            <Link to={`/roomType/add`}>Thêm loại phòng</Link>
          </Button>
          <Button
            className="bg-red-400  text-[#fff] hover:drop-shadow-2xl mb-2 md:ml-4"
            type="default"
            icon={<MdOutlineDeleteOutline />}
          >
            <Link to={`/roomType`}>Thùng rác</Link>
          </Button>
        
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

export default ListRoomType;
