import React, { useEffect, useState } from "react";
import { Checkbox, Collapse, Image, Modal, Table } from "antd";
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
import { useGetAllStaffsQuery } from "../../../../api/account/staffs";

const ListAdmin = () => {
  const { data: staffs } = useGetAllStaffsQuery([]);

  const [valuePermission, setPermission] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.polydevhotel.site/api/permission"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPermission(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const items = valuePermission.map((item: any, index) => ({
    key: `${index}`,
    label: item.label,
    children: (
      <>
        {item.permissions.map((permission: any, index: number) => {
          const key = Object.keys(permission)[0];
          const value = permission[key];
          return <Checkbox key={index}>{value}</Checkbox>;
        })}
      </>
    ),
  }));
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
      sorter: (a, b) => a.address.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "userAvatar",
      render: (_, record) => (
        <div className="flex items-center">
          {/* <img className="" src="https://www.hotelgrandsaigon.com/wp-content/uploads/sites/227/2017/12/GRAND_PDLK_02.jpg" alt="" /> */}
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
          value: 1,
        },
        {
          text: "Không hoạt động",
          value: 0,
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
      render: () => (
        <>
          <button
            type="button"
            onClick={showModal}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Quyền
          </button>
          <Link
            to="/role/edit"
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
          <Modal
            title="Danh sách quyền"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[]}
            style={{ minWidth: "60%" }}
          >
            <Collapse ghost items={items} />
          </Modal>
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

  // const remove = (id: any) => {
  //   try {
  //     swal({
  //       title: "Are you sure you want to delete?",
  //       text: "You cannot undo after deleting!",
  //       icon: "warning",
  //       buttons: ["Cancel", "Delete"],
  //       dangerMode: true,
  //     })
  //       .then((willDelete) => {
  //         if (willDelete) {
  //           // removeComment(id);
  //           swal("You have successfully deleted", {
  //             icon: "success",
  //           });
  //         }
  //       })
  //       .catch(() => {
  //         swal("Error", {
  //           icon: "error",
  //         });
  //       });
  //   } catch (error) {}
  // };

  return (
    <Page title={`Tài khoản quản trị`}>
      <div className="flex flex-col-reverse md:flex-row md:justify-between ">
        <div className="mb-3">
          <FormSearch />
        </div>
        <div className="flex flex-col md:flex-row">
          {/* <Button
            className="bg-teal-700	text-[#fff] hover:drop-shadow-2xl mb-2"
            type="default"
            icon={<AiOutlinePlus />}
          >
            <Link to={`/room/add`}>Thêm phòng</Link>
          </Button>
          <Button
            className="bg-red-400	text-[#fff] hover:drop-shadow-2xl mb-2 md:ml-4"
            type="default"
            icon={<MdOutlineDeleteOutline />}
          >
            <Link to={`/room/add`}>Thùng rác</Link>
          </Button> */}
        </div>
      </div>
      <Table
        scroll={{ x: true }}
        className="max-w-full mt-3"
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </Page>
  );
};

export default ListAdmin;
