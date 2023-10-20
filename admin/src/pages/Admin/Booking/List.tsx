import React from "react";
import { Button, Space, Table } from "antd";
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
// import swal , { } from "sweetalert";
import Page from "../../../component/page";
import { useGetBookingQuery } from "../../../api/booking";

const ListBooking = () => {
  const {data : dataBooking , isLoading } = useGetBookingQuery({});
  
  console.log(dataBooking, "dataBooking");
  
  if(isLoading){
    return <div>Loading...</div>
  }
  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "key",
      sorter: (a :any, b:any) => a.key - b.key,
      sortDirections: ["descend"],
      fixed: "left",
    },
    // {
    //   title: "Người đặt",
    //   dataIndex: "user_id",
    //   render: (user :any) => (
    //     <div className="flex items-center">
    //       {/* <img className="" src="https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_PDLK_02.jpg" alt="" /> */}
    //       <Image
    //         className="rounded-3xl "
    //         width={150}
    //         src={user?.image}
    //       />
    //       <div className="ml-3 text-gray-500">
    //         <p>{user?.name}</p>
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   title: "Người đặt",
    //   dataIndex: "user_id",
    //   key: "user_id",
    //   sorter: (a, b) => a.user_id.length - b.user_id.length,
    // },
    {
      title: "Số người lớn",
      dataIndex: "adults",
      key: "adults",
      sorter: (a, b) => a.adults.length - b.adults.length,
    },
    {
      title: "Số trẻ em",
      dataIndex: "childrens",
      key: "childrens",
      sorter: (a, b) => a.childrens.length - b.childrens.length,
    },
    {
      title: "Giá phòng",
      dataIndex: "price_per_night",
      key: "price_per_night",
      sorter: (a, b) => a.price_per_night - b.price_per_night,
    },
    {
      title: "Người đại diện",
      dataIndex: "representative",
      key: "representative"
    },
    {
      title: "Ngày nhận",
      dataIndex: "checkin",
      key: "checkin",
    },
    {
      title: "Ngày trả",
      dataIndex: "checkout",
      key: "checkout",
    },
    {
      title: "Ngày đặt",
      dataIndex: "booking_date",
      key: "booking_date",
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "pay_date",
      key: "pay_date",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" 
          className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2.5" 
          >
            <Link to={`/booking/detail/${record?._id}`}>
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

  const data : any = dataBooking?.data?.data?.map((item : any , index : number) => ({
    key: index + 1,
    _id: item._id,
    user_id: item.user_id,
    checkin: item.checkin,
    checkout: item.checkout,
    booking_date: item.booking_date,
    pay_date: item.pay_date,
    adults : item.adults,
    childrens : item?.children,
    representative : item.representative,
    price_per_night : item.price_per_night,
  }))
  console.log("data" , data);
  

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
    <Page title={`Đặt phòng`} >
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
