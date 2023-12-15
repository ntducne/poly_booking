import React from "react";
import { Button, Image, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Link } from "react-router-dom";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
import { MdDeleteForever, MdOutlineDeleteOutline } from "react-icons/md";
import FormSearch from "../../../component/formSearch";
import swal from "sweetalert";

const ListReview = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Tên phòng",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
      fixed: "left",
    },
    {
      title: "Loại phòng",
      dataIndex: "imageType",
      render: (_, record: any) => (
        <div className="flex items-center">
          {/* <img className="" src="https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_PDLK_02.jpg" alt="" /> */}
          <Image
            className="rounded-3xl "
            width={150}
            src="https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_PDLK_02.jpg"
          />
          <div className="ml-3 text-gray-500">
            <p>#68e365</p>
            <p>2 record ngủ , {record?.key}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Giá phòng",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Tầng phòng",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Trạng thái",
      dataIndex: "address",
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
          {/* <Button type="primary" style={{ backgroundColor: "#68e365" }}>
            <Link to={`/room/edit/${record?.key}`}>
              <AiOutlineEdit />
            </Link>
          </Button> */}
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

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "Còn",
    },
    {
      key: "2",
      name: "John Brown 123",
      age: 35,
      address: "Hết",
    },
  ];

<<<<<<< HEAD
  const onChange: TableProps<DataType>["onChange"] = () => {};

  const remove = (id: any) => {
=======
  const onChange: TableProps<DataType>["onChange"] = () =>
    // pagination,
    // filters,
    // sorter,
    // extra
    {
      // console.log("params", pagination, filters, sorter, extra);
    };

  const remove = (id: any) => {
    console.log(id);

>>>>>>> f88c6d114a1bbde46a0eea6b9d71a5ad3cae46b1
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
<<<<<<< HEAD
=======
            // removeComment(id);
            console.log(id);

>>>>>>> f88c6d114a1bbde46a0eea6b9d71a5ad3cae46b1
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
            <Link to={`/review/add`}>Thùng rác</Link>
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
        scroll={{ x: true }}
        className="max-w-full mt-3"
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ListReview;
