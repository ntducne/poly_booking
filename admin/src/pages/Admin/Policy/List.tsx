import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
interface DataType {
  key: React.Key;
  conditions: string;
  penalty: string;
  room_id: string;
}
import { MdDeleteForever } from "react-icons/md";
// import swal from "sweetalert";
import Page from "../../../component/page";
import { useGetAllPolicyQuery } from "../../../api/policy";
// import { useGetRoomsQuery } from "../../../api/room";

const ListPolicy = () => {
  // const { data: dataRooms } = useGetRoomsQuery({})

  const { data, isLoading } = useGetAllPolicyQuery({});
  const [dataFetching, setDataFetching] = useState<any>([]);

  useEffect(() => {
    setDataFetching(
      data?.data?.data?.map((item: any, index: number) => {
        return {
          stt: index + 1,
          key: item?._id,
          id: item?._id,
          conditions: item?.conditions,
          penalty: item?.penalty,
          room_id: item?.room_id,
        };
        // refetch()
      })
    );
  }, [isLoading, data?.data?.data]);

  const columns: ColumnsType<any> = [
    {
      title: "Id",
      dataIndex: "stt",
      sorter: (a, b) => a?.stt - b?.stt,
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
      render: (_, record) => <p>{record?.room_id}</p>,
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
          <Button
            type="primary"
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2.5"
          >
            <Link to={`/policy/edit/${record?.key}`}>
              <AiOutlineEdit />
            </Link>
          </Button>
          <Button
            // onClick={() => remove(record?.key)}
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

  const onChange: TableProps<DataType>["onChange"] = () => {};

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
    <Page title={`Chính sách`}>
      <Table
        scroll={{ x: true }}
        className="max-w-full mt-3"
        loading={isLoading}
        columns={columns}
        dataSource={dataFetching}
        onChange={onChange}
        pagination={{ pageSize: 10 }}
      />
    </Page>
  );
};

export default ListPolicy;
