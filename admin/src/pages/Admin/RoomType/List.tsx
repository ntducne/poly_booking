import React, { useEffect, useState } from "react";
import { Button, Pagination, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormatPrice from "../../../utils/FormatPrice";

interface DataType {
  key: React.Key;
  room_type_name: string;
  description: string;
  price_per_night: number;
  status: number;
}
import { MdDeleteForever } from "react-icons/md";
import swal from "sweetalert";
import Page from "../../../component/page";
import {
  useDeleteRoomTypeMutation,
  useGetRoomTypeQuery,
} from "../../../api/roomTypes";
import { useSelector } from "react-redux";

const ListRoomType = () => {
  const [page, setPage] = useState<number>(1);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useGetRoomTypeQuery(page);
  const [deleteRoomType] = useDeleteRoomTypeMutation();

  const permission1 = useSelector((state: any) => state.role).permission;
  const [permissions, setPermissions] = useState<any>(permission1);
  

  const [dataFetching, setDataFetching] = useState<any>([]);
  useEffect(() => {
    setDataFetching(
      data?.data?.map((item: any, index: number) => {
        return {
          stt: index + 1,
          key: item.id,
          room_type_name: item.room_type_name,
          description: item.description,
          price_per_night: item.price_per_night,
          branch: item.branch,
        };
        refetch();
      })
    );
    setPermissions(permission1);
  }, [isLoading, data?.data, permission1]);

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a: any, b: any) => a.stt - b.stt,
      fixed: "left",
    },
    {
      title: "Tên loại phòng",
      dataIndex: "room_type_name",
      key: "room_type_name",
    },
    {
      title: "Giá mỗi đêm",
      dataIndex: "price_per_night",
      key: "price_per_night",
      sorter: (a, b) => a.price_per_night - b.price_per_night,
      render: (text) => {
        // Sử dụng hàm định dạng (format) ở đây để định dạng giá phòng theo ý muốn
        return (
          <span className="font-bold">{FormatPrice({ price: text })}</span>
        );
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.room_type_name.length - b.room_type_name.length,
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
            <Link to={`/room/type/edit/${record?.key}`}>
              <AiOutlineEdit />
            </Link>
          </Button>
          {permissions?.includes("admin.types.destroy") && (
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
        title: "Bạn chắc chắn muốn xóa chứ ?",
        text: "Bạn không thể hoàn tác sau khi xóa!",
        icon: "warning",
        buttons: ["Hủy", "Xóa"],
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            deleteRoomType(id)
              .unwrap()
              .then((data) => {
                if (data.status === "success") {
                  refetch();
                  swal("Bạn đã xóa thành công", {
                    icon: "success",
                  });
                }
              });
          }
        })
        .catch(() => {
          swal("Lỗi", {
            icon: "error",
          });
        });
    } catch (error) {}
  };
  // if (isLoading) {
  //   return <>loading...</>
  // }
  const handlePaginationChange = (page: number) => {
    setPage(page);
    navigate(`/room/type?page=${page}`);
    refetch();
  };


  useEffect(() => {
    if (queryParams.get("page")) {
      const page: any = queryParams.get("page");
      setPage(+page);
    }
  }, [location?.search]);

  return (
    <Page title={`Loại phòng`}>
      <div className="flex flex-col-reverse md:flex-row md:justify-between ">
        {/* <FormSearch /> */}
        {/* <div className="flex flex-col md:flex-row">
          <input
            className="border border-gray-300 rounded-lg px-3 py-2 mr-2"
            placeholder="Tìm kiếm..."
            onChange={handleSearchChange}
          />
        </div> */}
        <div></div>
        <div className="flex flex-col md:flex-row md:ml-2">
          <Link
            to={`/room/type/add`}
            className="flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-2.5 text-center"
          >
            <AiOutlinePlus />
            Thêm loại phòng
          </Link>
          {/* <Link
            to={`/roomType`}
            className="flex items-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-3 py-2.5 text-center md:ml-2 my-1 md:my-0"
          >
            <MdOutlineDeleteOutline />
            Thùng rác
          </Link> */}
        </div>
      </div>
      <Table
        scroll={{ x: true }}
        className="max-w-full mt-3"
        columns={columns}
        dataSource={dataFetching}
        onChange={onChange}
        loading={isLoading}
        pagination={false}
      />
      <div className="flex justify-end items-center mt-5">
        <Pagination
          defaultCurrent={1}
          total={+data?.meta?.last_page * 10}
          onChange={handlePaginationChange}
          current={page}
        />
      </div>
    </Page>
  );
};

export default ListRoomType;
