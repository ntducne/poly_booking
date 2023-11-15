import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Collapse,
  Form,
  Image,
  Modal,
  Skeleton,
  Table,
} from "antd";
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
import { CheckboxValueType } from "antd/es/checkbox/Group";

const ListAdmin = () => {
  const { data: staffs, isLoading } = useGetAllStaffsQuery({});

  const { data: valuePermission } = useGetPermissonQuery([]);

  const [isStaff, setIsStaff] = useState("");
  const [dataStaff, setDataStaff] = useState({});
  const { data: staff, isLoading: loadingStaff } = useGetDetailStaffsQuery(
    isStaff || ""
  );
  useEffect(() => {
    if (isStaff) {
      setDataStaff(staff);
    }
  }, [isStaff]);

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
          // console.log("key", key);
          // console.log("permissionUser", staff?.data?.permissions);
          if (loadingStaff) {
            return <>...........</>;
          }
          console.log("data", dataStaff);

          if (dataStaff?.data?.permissions) {
            const check = dataStaff?.data?.permissions.find(
              (item: any) => item === key
            );
            if (check) {
              return (
                <Checkbox key={index} defaultChecked>
                  {value}
                </Checkbox>
              );
            } else {
              return <Checkbox key={index}>{value}</Checkbox>;
            }
          }

          // // const permissionUser = staff?.data?.staff_permission?.map(
          // //   (item: any) => {}
          // // );
          // // if (loadingStaff) {
          // //   return <>...Loading</>;
          // // }
          // return <Checkbox key={index}>{value}</Checkbox>;
          // return <CheckboxGroup key={index} options={valuePermission} />
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
      title: "Trạng thái",
      dataIndex: "status",
      filters: [
        {
          text: "Hoạt động",
          value: 0,
        },
        {
          text: "Không hoạt động",
          value: 1,
        },
      ],
      render: (text) => (
        <div className="font-semibold">
          {text === 1 ? (
            <button className="cursor-auto border px-5 py-2 rounded-xl text-[#fff]   bg-[#43e674]">
              Hoạt động
            </button>
          ) : (
            <button className="cursor-auto border px-5 py-2 rounded-xl text-[#e46868] bg-[#eed6d6]">
              Không hoạt động
            </button>
          )}
        </div>
      ),
      onFilter: (value: any, record) => record.status === value,
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
          <button
            type="button"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
          >
            Xoá
          </button>
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

  const onChange: TableProps<DataType>["onChange"] = () =>
    // pagination,
    // filters,
    // sorter,
    // extra
    {
      // console.log("params", pagination, filters, sorter, extra);
    };

  const [checkedValues, setCheckedValues] = useState({});

  const handleCheckboxChange = (key: string, checked: boolean) => {
    setCheckedValues((prevState) => ({ ...prevState, [key]: checked }));
  };

  const handleSubmit = () => {
    // Call API to update the permissions in the database
    // The API call will depend on your backend
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
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="flex flex-col-reverse md:flex-row md:justify-between ">
        <div className="mb-3">
          <FormSearch />
        </div>
        <div className="flex flex-col md:flex-row"></div>
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
