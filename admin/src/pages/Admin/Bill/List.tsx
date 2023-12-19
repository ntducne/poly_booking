// import React from "react";
import { Button, Pagination, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { AiOutlineEdit } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import swal , { } from "sweetalert";
import Page from "../../../component/page";
import { useGetBilingsQuery } from "../../../api/billings";
import formatMoneyVN from "../../../config/formatMoneyVN";
import { pusherInstance } from "../../../config/pusher";
import { useEffect, useState } from "react";

const BillList = () => {
  const [page, setPage] = useState<number>(1);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { data: dataBilings, isLoading, refetch } = useGetBilingsQuery<any>(page);
  const [billings, setBillings] = useState<any[]>([]);
  const navigate = useNavigate();
  const handlePaginationChange = (page: number) => {
    setPage(page);
    navigate(`/billing?page=${page}`);
    refetch();
  };
  useEffect(() => {
    setBillings(dataBilings?.data);
    const unsubscribe = pusherInstance().getData(
      "booking",
      "processBooking",
      (data: any) => {
        setBillings((prevBillings) => [...prevBillings, data.data]);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [dataBilings?.data]);

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "key",
      sorter: (a, b) => a.key - b.key,
      sortDirections: ["descend"],
      fixed: "left",
    },
    {
      title: "Thông tin người đặt",
      dataIndex: "representative",
      key: "representative",
      render: (text: any) => {
        return (
          <div className="flex flex-col">
            <div>Email : {text?.email}</div>
            <div>
              <div>Tên : {text?.name}</div>
              <div>Số điện thoại : {text?.phone}</div>
            </div>
          </div>
        );
      },
      sorter: (a, b) =>
        a.representative.name.localeCompare(b.representative.name),
    },
    {
      title: "Giá tiền",
      dataIndex: "total",
      key: "total",
      render: (text: any) => <div>{formatMoneyVN(text)} VNĐ</div>,
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: "Phương thức",
      dataIndex: "payment_method",
      key: "payment_method",
      render: (text: any) => (
        <div>{text === null ? "Thanh toán tại quầy" : `${text}`}</div>
      ),
    },
    {
      title: "Thời gian thanh toán",
      dataIndex: "payment_date",
      key: "payment_date",
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "status",
      key: "status",
      render: (status: any) => {
        let statusText;
        let statusClass;

        switch (status) {
          case 0:
            statusText = "Giữ phòng";
            statusClass = "text-green-500";
            break;
          case 1:
            statusText = "Chờ nhận phòng";
            statusClass = "text-blue-500";
            break;
          case 2:
            statusText = "Hủy Đặt phòng";
            statusClass = "text-red-500";
            break;
          case 3:
            statusText = "Đã nhận phòng";
            statusClass = "text-yellow-500";
            break;
          case 4:
            statusText = "Đã trả phòng";
            statusClass = "text-purple-500";
            break;
          case 5:
            statusText = "Đã thanh toán";
            statusClass = "text-indigo-500";
            break;
          case 6:
            statusText = "Hủy Thanh Toán";
            statusClass = "text-pink-500";
            break;
          case 7:
            statusText = "Thanh toán lỗi";
            statusClass = "text-orange-500";
            break;
          case 8:
            statusText = "Hoạt động";
            statusClass = "text-teal-500";
            break;
          case 9:
            statusText = "Tạm đóng";
            statusClass = "text-gray-500";
            break;
          case 10:
            statusText = "Cấm";
            statusClass = "text-black";
            break;
          default:
            statusText = "Không tồn tại trạng thái nào";
            statusClass = "text-red-500";
        }
        return (
          <div className={`font-semibold text-base ${statusClass}`}>
            {statusText}
          </div>
        );
      },
    },
    {
      title: "Chi nhánh",
      dataIndex: "branch",
      key: "branch",
      render: (text) => <div>{text?.name}</div>,
    },
    {
      title: "Ngày đặt",
      dataIndex: "booking",
      key: "booking",
      render: (text) => <div>{text?.booking_date}</div>,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            <Link to={`/billing/${record?.billingCode}`}>
              <AiOutlineEdit />
            </Link>
          </Button>
          {/* {record?.status === 0 && (
            <Button
              onClick={() => onComfirm(record?.id)}
              type="primary"
              className="text-gray-900 bg-gradient-to-r from-green-200 via-green-300 to-green-400 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              <GiConfirmed />
            </Button>
          )} */}
        </Space>
      ),
      // fixed: "right",
    },
  ];

  const data = billings?.map((item: any, index: number) => ({
    key: index + 1,
    id: item.id,
    booking: item.booking,
    billingCode: item.billingCode,
    representative: item.booking.representative,
    services: item.services ? item.services : [],
    total: item.total,
    payment_method: item.payment_method,
    payment_date: item.payment_date,
    branch: item.branch,
    status: item.status,
  }));

  useEffect(() => {
    if (queryParams.get("page")) {
      const page: any = queryParams.get("page");
      setPage(+page);
    }
  }, [location?.search]);

  return (
    <Page title={`Hóa đơn`}>
      <div className="flex flex-col-reverse md:flex-row md:justify-between ">
        <div className="flex flex-col md:flex-row"></div>
      </div>
      <Table
        scroll={{ x: true }}
        className="max-w-full mt-3"
        loading={isLoading}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
       <div className="flex justify-end items-center mt-5">
        <Pagination
          defaultCurrent={1}
          total={+dataBilings?.meta?.last_page * 10}
          onChange={handlePaginationChange}
          current={page}
        />
      </div>
    </Page>
  );
};

export default BillList;
