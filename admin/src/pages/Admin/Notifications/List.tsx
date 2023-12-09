import { Skeleton, Table } from "antd";
import { useGetNotificationsQuery } from "../../../api/notifications";
import { ColumnsType } from "antd/es/table";

const ListNotifications = () => {
  const { data, isLoading } = useGetNotificationsQuery({});
  if (isLoading)
    return (
      <p>
        <Skeleton />
      </p>
    );
  console.log("data", data);

  // const items: CollapseProps["items"] = data?.map((item: any) => ({
  //   key: item.id,
  //   label: item.message,
  //   children: <p>{item.time}</p>,
  // }));
  const dataNotifications = data?.map((item: any, index: number) => ({
    key: index + 1,
    message: item.message,
    time: item.time,
  }));
  const columns: ColumnsType<any> = [
    {
      title: "Tiêu đề",
      dataIndex: "message",
      key: "message",
      render: (text: any) => <div>{text}</div>,
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
    },
  ];
  const expandableRowRender = (record: any) => {
    return <div>{record?.message}</div>;
  };

  return (
    <div>
      {/* <Collapse accordion items={items} /> */}
      <Table
        columns={columns}
        dataSource={dataNotifications}
        expandable={{ expandedRowRender: expandableRowRender }}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ListNotifications;
