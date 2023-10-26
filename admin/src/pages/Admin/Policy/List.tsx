import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
interface DataType {
  key: React.Key;
  conditions: string;
  penalty: string;
  room_id: number
}
import { MdDeleteForever, MdOutlineDeleteOutline } from "react-icons/md";
import FormSearch from "../../../component/formSearch";
import swal from "sweetalert";
import Page from "../../../component/page";
import { useDeletePolicyMutation, useGetAllPolicyQuery } from "../../../api/policy";
// import { useGetRoomsQuery } from "../../../api/room";

const ListPolicy = () => {
  // const { data: dataRooms } = useGetRoomsQuery({})
  const { data, isLoading, refetch } = useGetAllPolicyQuery({});
  const [dataFetching, setDataFetching] = useState<any>([])
  console.log(data?.data?.data);
  // console.log(dataFetching);
  const [deletePolicy] = useDeletePolicyMutation()

  useEffect(() => {
    setDataFetching(data?.data?.data?.map((item: any) => {
      return {
        key: item._id,
        conditions: item.conditions,
        penalty: item.penalty,
        room_id: item.room_id,
      }
      // setDataFetching(updatedData);
      refetch()
    }))
  }, [isLoading, data?.data?.data])

  const columns: ColumnsType<any> = [
    {
      title: "Id",
      dataIndex: "policy_id",
      sorter: (a, b) => a.policy_id - b.policy_id,
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
      title: "Điều kiện",
      dataIndex: "conditions",
      key: "conditions",
    },
    {
      title: "Phạm lỗi",
      dataIndex: "penalty",
      key: "penalty",
    },
    {
      title: "Tên phòng",
      dataIndex: "room_id",
      key: "room_id",
      render: (_, record) => (
        <p>{record?.room_id}</p>
      ),
    },
    // {
    //   title: "Loại phòng",
    //   dataIndex: "room_id",
    //   render: (room) => (
    //     <div className="flex items-center">
    //       {/* <img className="" src="https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_PDLK_02.jpg" alt="" /> */}
    //       <Image className="rounded-3xl " width={150} src={room?.image} />
    //       <div className="ml-3 text-gray-500">
    //         <p>{room?.name}</p>
    //       </div>
    //     </div>
    //   ),
    // },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary"
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2.5"
          >
            <Link to={`/policy/edit/${record?.key}`}>
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
      fixed: "right",
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
            deletePolicy(id).unwrap().then((data: any) => {
              console.log(id);
              console.log(data);
              if (data.status === "success") {
                refetch();
                swal("You have successfully deleted", {
                  icon: "success",
                });
              }
            })
          }
        })
        .catch(() => {
          swal("Error", {
            icon: "error",
          });
        });
    } catch (error) { }
  };

  return (
    <Page title={`Chính sách`}>
      <div className="flex flex-col-reverse md:flex-row md:justify-between ">
        <FormSearch />
        <div className="flex flex-col md:flex-row md:ml-2">
          <Link
            to={`/policy/add`}
            className="flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-2.5 text-center"
          >
            <AiOutlinePlus />
            Thêm chính sách
          </Link>
          <Link
            to={`/policy`}
            className="flex items-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-3 py-2.5 text-center md:ml-2 my-1 md:my-0"
          >
            <MdOutlineDeleteOutline />
            Thùng rác
          </Link>
        </div>
      </div>
      {/* {dataFetching.length > 0 ? ( */}
      <Table
        scroll={{ x: true }}
        className="max-w-full mt-3"
        columns={columns}
        dataSource={dataFetching}
        onChange={onChange}
      />
      {/* ) : (
        // Hiển thị một thông báo hoặc biểu tượng tải trong trường hợp dataFetching là mảng rỗng.
        <p>Loading...</p>
      )} */}
    </Page>
  );
};

export default ListPolicy;
