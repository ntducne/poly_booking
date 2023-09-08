import React, { useState } from "react";
import { Button, Carousel, Space, Table, Tabs } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Col, Row } from "antd";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Tên phòng",
    dataIndex: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value: any, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Loại phòng",
    dataIndex: "age",
    key : "age"
  },
  {
    title: "Giá phòng",
    dataIndex: "age",
    key: "age",
    sorter: (a, b) => a.name.length - b.name.length,

  },
  {
    title: "Tầng phòng",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Trạng thái",
    dataIndex: "address",
    filters: [
      {
        text: "Còn trống",
        value: "Con",
      },
      {
        text: "Hết phòng",
        value: "Het",
      },
    ],
    onFilter: (value: any, record) => record.address.indexOf(value) === 0,
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary" style={{backgroundColor:'#68e365'}}>Sửa</Button>
        <Button type="primary" style={{backgroundColor:'#e23428'}}>Xóa</Button>
      </Space>
    ),    
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "John Brown 123",
    age: 35,
    address: "New York No. 1 Lake Park",
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

// const operations = <Button>Extra Action</Button>;

const items = new Array(3).fill(null).map((_, i) => {
  const id = String(i + 1);
  return {
    label: `Tab ${id}`,
    key: id,
    children: `Content of tab ${id}`,
  };
});



const ListPolicy = () => {
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 2000);
  };

  return (
    <div className="">
      <Row className="flex justify-around">
        <Col span={8}>

          <Tabs className="w-10%" items={items} />

        </Col>
        <Col className=""  span={8} offset={8}>
          <Button
            className="bg-teal-700	text-[#fff]"
            type="default"
            icon={<AiOutlinePlus />}
            loading={loadings[1]}
            onClick={() => enterLoading(1)}
          >
            <Link to={`/room/add`}>Thêm phòng</Link>
          </Button>
        </Col>
      </Row>
      <Table
        className="mt-3"
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  );
};

export default ListPolicy;
