import React from "react";
import { Button, Image, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
// import { Col, Row } from "antd";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
import { MdOutlineDeleteOutline } from "react-icons/md";
import FormSearch from "../../../component/formSearch";
import swal , { } from "sweetalert";
import Page from "../../../component/page";

const ListBooking = () => {
 
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
          <Button type="primary" 
          className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2.5" 
          >
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
    // pagination,
    // filters,
    // sorter,
    // extra
  ) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

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
    <Page title={`Đặt phòng`}>
      <div className="flex flex-col-reverse md:flex-row md:justify-between ">
        <FormSearch />
        <div className="flex flex-col md:flex-row md:ml-2">
          
          <Link
            to={`/booking`}
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

export default ListBooking;
