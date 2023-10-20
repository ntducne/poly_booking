import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import FormatPrice from "../../../utils/FormatPrice";

interface DataType {
  key: React.Key;
  room_type_name: string;
  description: string;
  price_per_night: number;
  status: number
}
import { MdDeleteForever, MdOutlineDeleteOutline } from "react-icons/md";
import FormSearch from "../../../component/formSearch";
import swal from "sweetalert";
import Page from "../../../component/page";
import { useDeleteRoomTypeMutation, useGetRoomTypeQuery } from "../../../api/roomTypes";

const ListRoomType = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch } = useGetRoomTypeQuery({ page: currentPage || 1 }); // Sử dụng trang hiện tại hoặc mặc định là trang 1
  const [deleteRoomType] = useDeleteRoomTypeMutation()
  // Số lượng mục trên mỗi trang
  const ITEMS_PER_PAGE = 10;
  const totalItems = data?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const [dataFetching, setDataFetching] = useState<any>([])
  console.log(data?.data)

  useEffect(() => {
    setDataFetching(data?.data?.map((item: any) => {
      return {
        key: item.id,
        room_type_name: item.room_type_name,
        description: item.description,
        price_per_night: item.price_per_night,
        status: item.status,
      }
      refetch()
    }))
  }, [isLoading, data?.data])

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên loại phòng",
      dataIndex: "room_type_name",
      key: "room_type_name",
      sorter: (a, b) => a.room_type_name.length - b.room_type_name.length,
      fixed: "left",
    },
    {
      title: "Giá mỗi đêm",
      dataIndex: "price_per_night",
      key: "price_per_night",
      sorter: (a, b) => a.room_type_name.length - b.room_type_name.length,
      render: (text) => {
        // Sử dụng hàm định dạng (format) ở đây để định dạng giá phòng theo ý muốn
        return <span className="font-bold">{FormatPrice({ price: text })}</span>
      }
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.room_type_name.length - b.room_type_name.length,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
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
      render: (_, record) => (
        < div className="font-semibold" >
          {record.status !== 0 ? (
            <span className="border px-5 py-2 rounded-xl text-[#fff]   bg-[#43e674]">
              Còn
            </span>
          ) : (
            <span className="border px-5 py-2 rounded-xl text-[#e46868] bg-[#eed6d6]">
              Hết
            </span>
          )}
        </div >
      ),
      // onFilter: (value: any, record) => record.address.indexOf(value) === 0,
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
            <Link to={`/roomType/edit/${record?.key}`}>
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

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    // filters,
    // sorter,
    // extra
  ) => {
    setCurrentPage(pagination.current || 1);
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
            deleteRoomType(id).unwrap().then((data) => {
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
  if (isLoading) {
    return <>loading...</>
  }

  return (
    <Page title={`Loại phòng`}>
      <div className="flex flex-col-reverse md:flex-row md:justify-between ">
        <FormSearch />
        <div className="flex flex-col md:flex-row md:ml-2">
          <Link
            to={`/roomType/add`}
            className="flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-2.5 text-center"
          >
            <AiOutlinePlus />
            Thêm loại phòng
          </Link>
          <Link
            to={`/roomType`}
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
      />
    </Page>
  );
};

export default ListRoomType;
