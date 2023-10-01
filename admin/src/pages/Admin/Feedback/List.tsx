// import React from "react";
import { Button, Image, Rate, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
// interface DataType {
//   key: React.Key;
//   name: string;
//   age: number;
//   address: string;
// }
import { MdDeleteForever, MdOutlineDeleteOutline } from "react-icons/md";
import FormSearch from "../../../component/formSearch";
import swal , { } from "sweetalert";
import Page from "../../../component/page";

const ListFeedback = () => {
 
  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "review_id",
      sorter: (a, b) => a.review_id - b.review_id,
      sortDirections: ["descend"],
      fixed: "left",
    },
    {
      title: "Người đánh giá",
      dataIndex: "user_id",
      render: (user_id) => (
        <div className="flex items-center">
          {/* <img className="" src="https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_PDLK_02.jpg" alt="" /> */}
          <Image
            className="rounded-3xl "
            width={150}
            src={user_id?.image}
          />
          <div className="ml-3 text-gray-500">
            <p>{user_id?.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Số sao",
      dataIndex: "star",
      key: "star",
      render: (star) => (
        <Rate allowHalf defaultValue={star} />
      )
    },
    {
      title: "Ngày đánh giá",
      dataIndex: "rate_at",
      key: "rate_at",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
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

  const data : any= [
    {
      key: "1",
      review_id: 1,
      user_id: {
        image: "https://img1.kienthucvui.vn/uploads/2021/01/23/anh-chang-bac-si-han-quoc-dep-nhat_032531512.jpg",
        email: "huynguyen@gmail.com"
      },
      content: "Đẹp quá nè",
      rate_at: "2021-09-20",
      images: "",
      star: 5
    },
    {
      key: "2",
      review_id: 2,
      user_id: {
        image: "https://img1.kienthucvui.vn/uploads/2021/01/23/anh-chang-bac-si-han-quoc-dep-nhat_032531512.jpg",
        email: "huynguyen123@gmail.com"
      },
      content: "Đẹp quá nè ahihi",
      rate_at: "2021-09-20",
      images: "",
      star: 4
    },
  ];


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
        scroll={{x : true}}
        className="max-w-full mt-3"
        columns={columns}
        dataSource={data}
      />
    </Page>
  );
};

export default ListFeedback;
