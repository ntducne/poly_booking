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
import { MdDeleteForever } from "react-icons/md";
// import swal from "sweetalert";
import Page from "../../../component/page";
import {
  useDeleteUtilitieMutation,
  useGetAllUtilitieQuery,
} from "../../../api/utilities";
import swal from "sweetalert";
import { useSelector } from "react-redux";

const ListRoomUtilities = () => {
  const { data, isLoading } = useGetAllUtilitieQuery({});
  const [dataFetching, setDataFetching] = useState<any>([]);
  const [deleteUtilitie] = useDeleteUtilitieMutation();
  const permission1 = useSelector((state: any) => state.role).permission;
  const [permissions, setPermissions] = useState<any>(permission1);
  useEffect(() => {
    setDataFetching(
      data?.data?.data?.map((item: any, index: number) => {
        return {
          stt: index + 1,
          key: item._id,
          name: item.name,
          room_id: item.room_id,
        };
        // refetch()
      })
    );
    setPermissions(permission1);
  }, [isLoading, data?.data?.data, permission1]);

  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "stt",
      sorter: (a, b) => a.stt - b.stt,
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
          {permissions?.includes("admin.utilities.destroy") && (
            <Button
              onClick={() => remove(record?.key)}
              type="primary"
              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2.5 "
            >
              <MdDeleteForever />
            </Button>
          )}
        </Space>
      ),
      // fixed: "right",
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = () => {};

  const remove = (id: any) => {
    try {
      swal({
        title: "Bạn chắc chắn muốn xóa chứ?",
        text: "Bạn không thể hoàn tác sau khi xóa!",
        icon: "warning",
        buttons: ["Hủy", "Xóa"],
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            deleteUtilitie(id);
            swal("Bạn đã xóa thành công", {
              icon: "success",
            });
          }
        })
        .catch(() => {
          swal("Error", {
            icon: "error",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page title={`Tiện ích phòng`}>
      <div className="flex flex-col-reverse md:flex-row md:justify-between ">
        <div></div>
        <div className="flex flex-col md:flex-row md:ml-2">
          <Link
            to={`/room/utilities/add`}
            className="flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-2.5 text-center"
          >
            <AiOutlinePlus />
            Thêm tiện ích phòng
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
        loading={isLoading}
      />
    </Page>
  );
};

export default ListRoomUtilities;
