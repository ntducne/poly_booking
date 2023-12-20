import React, { useEffect, useState } from "react";
import { Button, Pagination, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlineEdit } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface DataType {
  key: React.Key;
  name: string;
  address: string;
  phone: number;
  // status: number
}
import { MdDeleteForever } from "react-icons/md";
// import FormSearch from "../../../component/formSearch";
import swal from "sweetalert";
import Page from "../../../component/page";
import {
  useDeleteBranchMutation,
  useGetAllBranchesQuery,
} from "../../../api/branches";

const ListBranches = () => {
  const [page, setPage] = useState<number>(1);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useGetAllBranchesQuery({ page: page });
  const [dataFetching, setDataFetching] = useState<any>([]);
  const [deleteBranch] = useDeleteBranchMutation();
  const handlePaginationChange = (page: number) => {
    setPage(page);
    navigate(`/branches?page=${page}`);
    refetch();
  };
  useEffect(() => {
    setDataFetching(
      data?.data?.map((item: any) => {
        return {
          key: item.id,
          name: item.name,
          address: item.address,
          phone: item.phone,
          // branch: item.branch,
        };
        // refetch()
      })
    );
  }, [isLoading, data?.data]);

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên chi nhánh",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      fixed: "left",
    },

    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
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
            <Link to={`/branches/edit/${record?.key}`}>
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

  const onChange: TableProps<DataType>["onChange"] = () =>
    // pagination,
    // filters,
    // sorter,
    // extra
    {};

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
            deleteBranch(id)
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

  // useEffect(() => {
  //   refetch();
  //   window.scrollTo(0, 0);
  // }, []);

  // if (isLoading) {
  //   return <>loading...</>
  // }

  return (
    <Page title={`Chi nhánh`}>
      <div className="flex flex-col-reverse md:flex-row md:justify-between ">
        {/* <FormSearch />
        <div className="flex flex-col md:flex-row md:ml-2">
          <Link
            to={`/branches/add`}
            className="flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-2.5 text-center"
          >
            <AiOutlinePlus />
            Thêm chi nhánh
          </Link>
        </div> */}
      </div>
      <Table
        scroll={{ x: true }}
        className="max-w-full mt-3"
        loading={isLoading}
        columns={columns}
        dataSource={dataFetching}
        onChange={onChange}
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

export default ListBranches;
