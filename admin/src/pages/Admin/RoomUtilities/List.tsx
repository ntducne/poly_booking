import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
interface DataType {
  key: React.Key;
  name: string;
  room_id: string;
}
import { MdDeleteForever, MdOutlineDeleteOutline } from "react-icons/md";
import FormSearch from "../../../component/formSearch";
import swal from "sweetalert";
import Page from "../../../component/page";
import { useGetAllUtilitieQuery } from "../../../api/utilities";

const ListRoomUtilities = () => {
  const { data, isLoading } = useGetAllUtilitieQuery({});
  const [dataFetching, setDataFetching] = useState<any>([]);
  useEffect(() => {
    setDataFetching(
      data?.data?.data?.map((item: any) => {
        return {
          key: item._id,
          name: item.name,
          room_id: item.room_id,
        };
        // refetch()
      })
    );
  }, [isLoading, data?.data?.data]);

  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "_id",
      sorter: (a, b) => a._id - b._id,
      sortDirections: ["descend"],
      fixed: "left",
    },

    {
      title: "Tên tiện ích",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2.5"
          >
            <Link to={`/room/utilities/edit/${record?.key}`}>
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
      // fixed: "right",
    },
  ];

  // const data1: any = [
  //   {
  //     key: "1",
  //     _id: "1",
  //     name: "John Brown",
  //     room_id: "1",
  //   },
  //   {
  //     key: "2",
  //     _id: "2",
  //     name: "John Brown 123",
  //     room_id: "2",
  //   },
  // ];

  const onChange: TableProps<DataType>["onChange"] = () => {};

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
    <Page title={`Tiện ích phòng`}>
      <div className="flex flex-col-reverse md:flex-row md:justify-between ">
        <FormSearch />
        <div className="flex flex-col md:flex-row md:ml-2">
          <Link
            to={`/room/utilities/add`}
            className="flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-2.5 text-center"
          >
            <AiOutlinePlus />
            Thêm tiện ích phòng
          </Link>
          <Link
            to={`/roomUtilities`}
            className="flex items-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-3 py-2.5 text-center md:ml-2 my-1 md:my-0"
          >
            <MdOutlineDeleteOutline />
            Thùng rác
          </Link>
        </div>
      </div>
      <Table
        scroll={{ x: true }}
        className="max-w-full mt-3"
        columns={columns}
        dataSource={dataFetching}
        onChange={onChange}
        pagination={{ pageSize: 10 }}
      />
    </Page>
  );
};

export default ListRoomUtilities;
