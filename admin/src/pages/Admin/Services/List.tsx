import React, { useEffect, useState } from "react";
import { Button, Pagination, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
import { MdDeleteForever } from "react-icons/md";
import swal from "sweetalert";
import {
  useDeleteServicesMutation,
  useGetServicesQuery,
} from "../../../api/services";
import FormatPrice from "../../../utils/FormatPrice";
import Page from "../../../component/page";
import { useSelector } from "react-redux";
const ListServices = () => {
  const permission1 = useSelector((state: any) => state.role).permission;
  const [permissions, setPermissions] = useState<any>(permission1);
  useEffect(() => {
    setPermissions(permission1);
  }, [permission1]);

  const [page, setPage] = useState<number>(1);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const { data: dataServices, isLoading, refetch } = useGetServicesQuery(page);

  const [deleteServices] = useDeleteServicesMutation();

  const handlePaginationChange = (page: number) => {
    setPage(page);
    navigate(`/services?page=${page}`);
    refetch();
  };

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "key",
      sorter: (a, b) => a.key - b.key,
      sortDirections: ["descend"],
      fixed: "left",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "service_name",
      key: "service_name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
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
            <Link to={`/services/edit/${record?._id}`}>
              <AiOutlineEdit />
            </Link>
          </Button>
          {permissions?.includes("admin.services.destroy") && (
            <Button
              onClick={() => removeServices(record?._id)}
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

  const data: any = dataServices?.data?.map((item: any, index: number) => ({
    key: index + 1,
    _id: item?.id,
    service_name: item?.service_name,
    price: item?.price,
    description: item?.description,
    branch_id: item?.branch_id,
  }));

  const onChange: TableProps<DataType>["onChange"] = () => {};

  const removeServices = (id: any) => {
    try {
      swal({
        title: "Bạn có chắc muốn xóa ?",
        text: "Bạn có chắc muốn xóa dịch vụ này không ?",
        icon: "warning",
        buttons: ["Quay lại", "Xóa"],
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            deleteServices(id)
              .unwrap()
              .then((res: any) => {
                if (res.status === "success") {
                  swal(res.message, {
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
    } catch (error) {
      console.log(error);
      swal("Lỗi", {
        icon: "error",
      });
    }
  };

  useEffect(() => {
    if (queryParams.get("page")) {
      const page: any = queryParams.get("page");
      setPage(+page);
    }
  }, [location?.search]);
  return (
    <Page title={`Dịch vụ`}>
      <div className="flex flex-col-reverse md:flex-row md:justify-between ">
        <div></div>
        <div className="flex flex-col md:flex-row md:ml-2">
          <Link
            to={`/services/add`}
            className="flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-2.5 text-center"
          >
            <AiOutlinePlus />
            Thêm dịch vụ
          </Link>
        </div>
      </div>
      <Table
        scroll={{ x: true }}
        className="max-w-full mt-3"
        loading={isLoading}
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={false}
      />
      <div className="flex justify-end items-center mt-5">
        <Pagination
          defaultCurrent={1}
          total={+dataServices?.meta?.last_page * 10}
          onChange={handlePaginationChange}
          current={page}
        />
      </div>
    </Page>
  );
};

export default ListServices;
