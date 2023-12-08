import React from "react";
import { Image, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
import { MdDeleteForever } from "react-icons/md";
import FormSearch from "../../../../component/formSearch";
import swal , { } from "sweetalert";
import Page from "../../../../component/page";
import { useGetAllUsersQuery } from "../../../../api/account/users";

const ListUser = () => {

  const { data: users  , isLoading} = useGetAllUsersQuery([]);
  
 

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "key",
      sorter: (a, b) => a.key - b.key,
      sortDirections: ["descend"],
      fixed: "left",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.address.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "userAvatar",
      render: (_, record) => (
        <div className="flex items-center">
          {/* <img className="" src="https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_PDLK_02.jpg" alt="" /> */}
          <Image
            className="rounded-3xl "
            width={80}
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
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      filters: [
        {
          text: "Hoạt động",
          value: 1,
        },
        {
          text: "Không hoạt động",
          value: 0,
        },
      ],
      render: (text) => (
        <div className="font-semibold">
          {text === "Hoạt động" ? (
            <button className="cursor-auto border px-5 py-2 rounded-xl text-[#fff] bg-[#43e674]">
              Hoạt động
            </button>
          ) : (
            <button className="cursor-auto border px-5 py-2 rounded-xl text-[#e46868] bg-[#eed6d6]">
              Không hoạt động
            </button>
          )}
        </div>
      ),
      onFilter: (value: any, record) => record?.status === value,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <button type="button" 
          className=" bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-brfont-medium rounded-lg  px-5 py-2.5 ml-1" 
          >
            <Link className="text-white text-sm text-center" to={`/user/edit/${record?.id}`}>
              <AiOutlineEdit />
            </Link>
          </button>
          <button
            onClick={() => remove(record?.key)}
            type="button"
            className="flex items-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
          >
            <MdDeleteForever />
            {/* Xóa */}
          </button>
        </Space>
      ),
      // fixed: "right",
    },
  ];

  const data :any = users?.data?.map((item: any, index : number) => ({
    key: index + 1,
    id: item.id,
    name: item.name,
    email: item.email,
    phone: item.phone,
    image: item.image,
    address: item.address,
    status: item.status,
  }))

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
            console.log(id);
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
    <Page title={`Tài khoản người dùng`}>
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
        loading={isLoading}
        dataSource={data}
        onChange={onChange}
      />
    </Page>
  );
};

export default ListUser;
