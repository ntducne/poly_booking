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

const ListRoomExtend = () => {
 
  const columns: ColumnsType<any> = [
    {
      title: "ID đặt phòng",
      dataIndex: "booking_id",
      sorter: (a, b) => a.booking_id - b.booking_id,
      sortDirections: ["descend"],
      fixed: "left",
    },
    {
      title: "Người đặt",
      dataIndex: "user_id",
      render: (user) => (
        <div className="flex items-center">
          {/* <img className="" src="https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_PDLK_02.jpg" alt="" /> */}
          <Image
            className="rounded-3xl "
            width={150}
            src={user?.image}
          />
          <div className="ml-3 text-gray-500">
            <p>{user?.name}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "booking_date",
      key: "booking_date",
      sorter: (a, b) => a.booking_date - b.booking_date,
    },
    {
      title: "Loại phòng",
      dataIndex: "room_type",
      key: "room_type",
    },
    {
      title: "Số người",
      dataIndex: "amount_of_people",
      key: "amount_of_people",
    },
    // {
    //   title: "Trạng thái",
    //   dataIndex: "address",
    //   filters: [
    //     {
    //       text: "Còn trống",
    //       value: "Còn",
    //     },
    //     {
    //       text: "Hết phòng",
    //       value: "Hết",
    //     },
    //   ],
    //   render: (text) => (
    //     <div className="font-semibold">
    //       {text === "Còn" ? (
    //         <span className="border px-5 py-2 rounded-xl text-[#fff]   bg-[#43e674]">
    //           Còn
    //         </span>
    //       ) : (
    //         <span className="border px-5 py-2 rounded-xl text-[#e46868] bg-[#eed6d6]">
    //           Hết
    //         </span>
    //       )}
    //     </div>
    //   ),
    //   onFilter: (value: any, record) => record.address.indexOf(value) === 0,
    // },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" style={{ backgroundColor: "#68e365" }}>
            <Link to={`/room/edit/${record?.key}`}>
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

  const data : any = [
    {
      key: "1",
      booking_id: 1,
      user_id: {
        name: "Nguyễn Huy",
        image: "https://static2.yan.vn/YanNews/2167221/202008/bang-xep-hang10-my-nam-han-dep-trai-nhat-chau-a-exo-va-bts-dan-dau-d2073ea4.jpg"
      },
      booking_date: "2021-09-20",
      check_in: "2021-09-20",
      check_out: "2021-09-20",
      pay_date: "2021-09-20",
      room_type: "Phòng đơn",
      amount_of_people : 2,
    },
    {
      key: "2",
      booking_id: 2,
      user_id: {
        name: "Nguyễn Đức",
        image: "https://static2.yan.vn/YanNews/2167221/202008/bang-xep-hang10-my-nam-han-dep-trai-nhat-chau-a-exo-va-bts-dan-dau-d2073ea4.jpg"
      },
      booking_date: "2021-09-20",
      check_in: "2021-09-20",
      check_out: "2021-09-20",
      pay_date: "2021-09-20",
      room_type: "Phòng đôi",
      amount_of_people : 4,
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
          {/* <Button
            className="bg-teal-700	text-[#fff] hover:drop-shadow-2xl mb-2"
            type="default"
            icon={<AiOutlinePlus />}
          >
            <Link to={`/room/add`}>Thêm phòng</Link>
          </Button> */}
          <Button
            className="bg-red-400	text-[#fff] hover:drop-shadow-2xl mb-2 md:ml-4"
            type="default"
            icon={<MdOutlineDeleteOutline />}
          >
            <Link to={`/booking`}>Thùng rác</Link>
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

export default ListRoomExtend;
