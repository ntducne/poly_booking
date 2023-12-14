// import React from "react";
import { Image, Rate, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
// interface DataType {
//   key: React.Key;
//   name: string;
//   age: number;
//   address: string;
// }
// import { MdOutlineDeleteOutline } from "react-icons/md";
// import FormSearch from "../../../component/formSearch";
import Page from "../../../component/page";
import { useGetRatesQuery } from "../../../api/rate";

const ListFeedback = () => {
  const { data: dataRates, isLoading } = useGetRatesQuery({});
  

  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "key",
      sorter: (a, b) => a.key - b.key,
      sortDirections: ["descend"],
      fixed: "left",
    },
    {
      title: "Người đánh giá",
      dataIndex: "user",
      render: (user_id) => (
        <div className="flex items-center">
          {/* <img className="" src="https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_PDLK_02.jpg" alt="" /> */}
          <Image className="rounded-3xl " width={70} src={user_id?.image} />
          <div className="ml-3 text-gray-500">
            <p>Tên : {user_id?.name}</p>
            <p>Email : {user_id?.email}</p>
            <p>SĐT : {user_id?.phone}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Tên phòng",
      dataIndex: "room",
      key: "room",
      render: (room) => (
         <div>{room?.name}</div>
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <Image
          width={200}
          src={images}
        />
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Số sao",
      dataIndex: "star",
      key: "star",
      render: (star) => <Rate disabled allowHalf defaultValue={star} />,
    },
    {
      title: "Ngày đánh giá",
      dataIndex: "rate_at",
      key: "rate_at",
    },
  ];

  const data: any = dataRates?.data?.map((item: any, index: number) => ({
    key: index + 1,
    ...item,
  }));

  return (
    <Page title={`Đánh giá`}>
      <div className="flex flex-col-reverse md:flex-row md:justify-between  ">
        <div className="">
          {/* <FormSearch /> */}
        </div>
        {/* <div className="flex flex-col md:flex-row">
          <Link
            to={`/Feedback`}
            className="flex items-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center md:ml-2 my-1 md:my-0"
          >
            <MdOutlineDeleteOutline />
            Thùng rác
          </Link>
        </div> */}
      </div>
      <Table
        scroll={{ x: true }}
        className="max-w-full mt-3"
        loading={isLoading}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        />
    </Page>
  );
};

export default ListFeedback;
