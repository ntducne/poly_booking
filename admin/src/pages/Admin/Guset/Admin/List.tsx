import React from "react";
import { Button, Image, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
// import { MdDeleteForever, MdOutlineDeleteOutline } from "react-icons/md";
import FormSearch from "../../../../component/formSearch";
import swal , { } from "sweetalert";
import Page from "../../../../component/page";

const ListAdmin = () => {
 

  const columns: ColumnsType<any> = [
    {
      title: "ID Người dùng",
      dataIndex: "user_id",
      sorter: (a, b) => a.user_id - b.user_id,
      sortDirections: ["descend"],
      fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "userAvatar",
      render: (_, record) => (
        <div className="flex items-center">
          {/* <img className="" src="https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_PDLK_02.jpg" alt="" /> */}
          <Image
            className="rounded-3xl "
            width={150}
            src={record?.image}
          />
          <div className="ml-3 text-gray-500">
            <p>{record?.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthdate",
      key: "birthdate",
      sorter: (a, b) =>  a.birthdate - b.birthdate,
    },
    {
      title: "Trạng thái",
      dataIndex: "active",
      filters: [
        {
          text: "Hoạt động",
          value: "Online",
        },
        {
          text: "Không hoạt động",
          value: "Offline",
        },
      ],
      render: (text) => (
        <div className="font-semibold">
          {text === "Online" ? (
            <button className="cursor-auto border px-5 py-2 rounded-xl text-[#fff]   bg-[#43e674]">
              Hoạt động
            </button>
          ) : (
            <button className="cursor-auto border px-5 py-2 rounded-xl text-[#e46868] bg-[#eed6d6]">
              Không hoạt động
            </button>
          )}
        </div>
      ),
      onFilter: (value: any, record) => record.active.indexOf(value) === 0,
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" 
          className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2.5" 
          >
            <Link to={`/admin/${record?.key}`}>
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

  const data :any = [
    {
      key: "1",
      user_id: 1,
      name: "John Brown",
      email: "Nguyen@gamil.com",
      image: "https://antimatter.vn/wp-content/uploads/2022/05/anh-trai-han-quoc-moi-nhat.jpg",
      phone: "012345678",
      birthdate: "12/12/1999",
      active: "Online",
      role: "Admin",
      // address: "Còn",
    },
    {
      key: "2",
      user_id : 2,
      name: "John Brown",
      email: "NguyenABC@gamil.com",
      image: "https://antimatter.vn/wp-content/uploads/2022/05/anh-trai-han-quoc-moi-nhat.jpg",
      phone: "012345678",
      birthdate: "12/15/1999",
      active: "Offline",
      role: "Admin",
      // address: "Còn",
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
    <Page title={`Tài khoản quản trị`}>
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
          </Button>
          <Button
            className="bg-red-400	text-[#fff] hover:drop-shadow-2xl mb-2 md:ml-4"
            type="default"
            icon={<MdOutlineDeleteOutline />}
          >
            <Link to={`/room/add`}>Thùng rác</Link>
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
    </Page>
  );
};

export default ListAdmin;
