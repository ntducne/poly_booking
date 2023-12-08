import Page from "../../../component/page";
import { useGetContactQuery } from "../../../api/contact";
import FormSearch from "../../../component/formSearch";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { Table } from "antd";
import moment from "moment";
// import { ColumnsType } from "antd/es/table";

const ListContact = () => {
  const { data: dataContact, isLoading } = useGetContactQuery({});

  const columns : any = [
    {
      title: "ID",
      dataIndex: "key",
      sorter: (a :any, b:any) => a.key - b.key,
      sortDirections: ["descend"],
      fixed: "left",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Nội dung",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
  ];

  const data = dataContact?.map((item :any, index : any) => ({
    key: index + 1,
    name: item.name,
    email: item.email,
    message: item.message,
    time: moment(item.time).format("h:mm:ss    DD/MM/YYYY"),
  }));
  return (
    <Page title={`Đánh giá`}>
      <div className="flex flex-col-reverse md:flex-row md:justify-between  ">
        <div className="">
          <FormSearch />
        </div>
        <div className="flex flex-col md:flex-row">
          <Link
            to={`/Feedback`}
            className="flex items-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center md:ml-2 my-1 md:my-0"
          >
            <MdOutlineDeleteOutline />
            Thùng rác
          </Link>
        </div>
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

export default ListContact;
