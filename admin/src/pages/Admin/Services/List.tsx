import React from "react";
import { Button, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
import { MdDeleteForever,  } from "react-icons/md";
import swal from "sweetalert";
import {
  useDeleteServicesMutation,
  useGetServicesQuery,
} from "../../../api/services";
import FormatPrice from "../../../utils/FormatPrice";
import Page from "../../../component/page";
import { permissions } from "../../../hoc/withAuthorization";
const ListServices = () => {
  const { data: dataServices, isLoading } = useGetServicesQuery({});

  const [deleteServices] = useDeleteServicesMutation();

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
      title: "Địa điểm",
      dataIndex: "branch_id",
      key: "branch_id",
      sorter: (a, b) => a.branch_id.length - b.branch_id.length,
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

  const onChange: TableProps<DataType>["onChange"] = () =>
    // pagination,
    // filters,
    // sorter,
    // extra
    {
      // console.log("params", pagination, filters, sorter, extra);
    };

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

  return (
    <Page title={`Dịch vụ`}>
      <Table
        scroll={{ x: true }}
        className="max-w-full mt-3"
        loading={isLoading}
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={{ pageSize: 10 }}
      />
    </Page>
  );
};

export default ListServices;
