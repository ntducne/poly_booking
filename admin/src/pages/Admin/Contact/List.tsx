import Page from "../../../component/page";
import { useGetContactQuery } from "../../../api/contact";
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

  const data = dataContact?.data?.map((item :any, index : any) => ({
    key: index + 1,
    name: item.name,
    email: item.email,
    message: item.message,
    time: moment(item.time, "DD/MM/YYYY HH:mm:ss").format("HH:mm:ss DD/MM/YYYY"),
  }));
  return (
    <Page title={`Đánh giá`}>
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
