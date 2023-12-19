import React, { useEffect, useState } from "react";
import { Button, Image, Pagination, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteForever, MdOutlineDeleteOutline } from "react-icons/md";
import FormSearch from "../../../component/formSearch";
import swal from "sweetalert";
import Page from "../../../component/page";
import { useDeleteRoomMutation, useGetRoomsQuery } from "../../../api/room";
import FormatPrice from "../../../utils/FormatPrice";
import { useLocation } from "react-router-dom";
interface DataType {
  key: React.Key;
  name: string;
  num_of_bed: number;
  address: string;
  status: number;
  area: string;
  images: any;
}

const ListRoom = () => {
  const [page, setPage] = useState<number>(1);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { data, isLoading, refetch } = useGetRoomsQuery(page);
  const navigate = useNavigate();
  const [dataFetching, setDataFetching] = useState<any>([]);
  const [deleteRoom] = useDeleteRoomMutation();
  const handlePaginationChange = (page: number) => {
    setPage(page);
    navigate(`/room?page=${page}`);
    refetch();
  };
  useEffect(() => {
    setDataFetching(
      data?.data.map((item: any, index: number) => {
        return {
          stt: index + 1,
          key: item.id,
          name: item.name,
          num_of_bed: item.num_of_bed,
          price: item.price,
          discount: item.discount,
          status: item.status,
          area: item.area,
          address: item?.branch?.address,
          images: item?.images?.map((item: any) => item.image),
        };
      })
    );
  }, [isLoading, data?.data]);
  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "stt",
      sorter: (a: any, b: any) => a.stt - b.stt,
      sortDirections: ["descend"],
      fixed: "left",
    },
    {
      title: "Tên phòng",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Ảnh phòng",
      dataIndex: "imageType",
      render: (_, record) => {
        return (
          <div className="flex items-center ">
            <Image
              className="rounded-3xl max-h-[200px] max-w-[150px] object-cover"
              src={record?.images?.[0]}
            />
            <div className="ml-3 text-gray-500">
              <p>#68e365</p>
              <p>{record?.num_of_bed} giường ngủ</p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Giá phòng",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text) => {
        return (
          <span className="font-bold">{FormatPrice({ price: text })}</span>
        );
      },
    },
    {
      title: "Diện tích (m2)",
      dataIndex: "area",
      key: "area",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Địa điểm",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a.name.length - b.name.length,
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
        <div className="font-semibold">
          {record?.status != 0 ? (
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
          <Button
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2.5"
            type="primary"
          >
            <Link to={`/room/edit/${record.key}`}>
              <AiOutlineEdit />
            </Link>
          </Button>
          <Button
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2.5 "
            onClick={() => remove(record.key)}
            type="primary"
          >
            <MdDeleteForever />
          </Button>
        </Space>
      ),
    },
  ];

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
            deleteRoom(id)
              .unwrap()
              .then((data) => {
                if (data.status === "success") {
                  refetch();
                  swal("You have successfully deleted", {
                    icon: "success",
                  });
                }
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
  useEffect(() => {
    if (queryParams.get("page")) {
      const page: any = queryParams.get("page");
      setPage(+page);
    }
  }, [location?.search]);
  useEffect(() => {
    refetch();
  }, []);

  return (
    <Page title={`Phòng`}>
      <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center ">
        <FormSearch />
        <div className="flex flex-col md:flex-row md:ml-2">
          <Link
            to={`/room/add`}
            className="flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-2.5 text-center"
          >
            <AiOutlinePlus />
            Thêm phòng
          </Link>
          <Link
            to={`/room`}
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

export default ListRoom;
