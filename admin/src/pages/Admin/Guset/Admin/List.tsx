import React, { useEffect, useState } from "react";
import { Button, Checkbox, Collapse, Form, Image, Modal, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Link } from "react-router-dom";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
import FormSearch from "../../../../component/formSearch";
import Page from "../../../../component/page";
import {
  useGetAllStaffsQuery,
  useGetDetailStaffsQuery,
} from "../../../../api/account/staffs";
import { useGetPermissonQuery } from "../../../../api/permission";
import { AiOutlinePlus } from "react-icons/ai";
import { skipToken } from "@reduxjs/toolkit/query";

const ListAdmin = () => {
  const { data: staffs, isLoading } = useGetAllStaffsQuery({});

  const { data: valuePermission } = useGetPermissonQuery([]);

  const [isStaff, setIsStaff] = useState("");
  const [dataStaff, setDataStaff] = useState<any>({});

  const { data: staff, isLoading: loadingStaff } = useGetDetailStaffsQuery(
    isStaff || skipToken
  );

  useEffect(() => {
    if (isStaff && staff) {
      setDataStaff(staff);
    }
  }, [isStaff, staff]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (id: any) => {
    setIsStaff(id);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items = valuePermission?.map((item: any, index: number) => ({
    key: `${index}`,
    label: item?.label,
    children: (
      <>
        {item?.permissions?.map((permission: any, index: any) => {
          const key = Object.keys(permission)[0];
          const value = permission[key];
          if (loadingStaff) {
            return <></>;
          }
          if (dataStaff?.data?.permissions) {
            const check = dataStaff?.data?.permissions.find(
              (item: any) => item === key
            );
            if (check) {
              return (
                <Checkbox
                  value={permission}
                  key={index}
                  defaultChecked
                  name="permissions[]"
                >
                  {value}
                </Checkbox>
              );
            } else {
              return (
                <Checkbox value={permission} key={index} name="permissions[]">
                  {value}
                </Checkbox>
              );
            }
          }
        })}
      </>
    ),
  }));
  // console.log(items);
  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "key",
      sorter: (a, b) => a.key - b.key,
      sortDirections: ["descend"],
      fixed: "left",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "userAvatar",
      render: (_, record) => (
        <div className="flex items-center">
          <Image className="rounded-3xl " width={80} src={record?.image} />
          <div className="ml-3 text-gray-500">
            <p>{record?.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <button
            type="button"
            onClick={() => showModal(record?.id)}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Quyền
          </button>
          <Link
            to={`/staff/edit/${record?.id}`}
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-brfont-medium rounded-lg text-sm px-5 py-2.5 text-center ml-1"
          >
            Sửa
          </Link>
          &nbsp;
        </>
      ),
    },
  ];

  const data: any = staffs?.data?.map((item: any, index: number) => ({
    key: index + 1,
    id: item?.id,
    name: item?.name,
    email: item?.email,
    image: item?.image,
    phone: item?.phone,
    status: item?.status,
    branch_id: item?.branch_id,
    // address: item?.address,
  }));

  const onChange: TableProps<DataType>["onChange"] = () => {};

  const handleSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <Page title={`Tài khoản quản trị`}>
      <Modal
        title="Danh sách quyền"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[]}
        style={{ minWidth: "60%" }}
      >
        <Form onFinish={handleSubmit}>
          <Collapse
            destroyInactivePanel={true}
            accordion={true}
            ghost
            items={items}
          />
          <Form.Item>
            <Button htmlType="submit">Cập nhật</Button>
          </Form.Item>
        </Form>
      </Modal>

      <div className="flex flex-col-reverse md:flex-row md:justify-between ">
        {/* <FormSearch /> */}
        <div></div>
        <div className="flex flex-col md:flex-row md:ml-2">
          <Link
            to={`/staff/add`}
            className="flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-2.5 text-center"
          >
            <AiOutlinePlus />
            <div className="ml-1">Thêm nhân viên</div>
          </Link>
        </div>
      </div>
      <Table
        scroll={{ x: true }}
        className="max-w-full mt-3"
        columns={columns}
        loading={isLoading}
        dataSource={data}
        onChange={onChange}
      />
    </Page>
  );
};

export default ListAdmin;
