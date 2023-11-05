import {
  Input,
  Select,
  DatePicker,
  InputNumber,
  Form,
  Card,
  Button,
  Modal,
  message,
  Image,
  Row,
  Col,
  Table,
} from "antd";
import TableCustom from "../../../component/Table";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useSearchRoomMutation } from "../../../api/booking";
import { useGetAllRoomTypeQuery } from "../../../api/roomTypes";
import { RoomInterface } from "../../../Interface/RoomInterface";
import Page from "../../../component/page";
import formatMoneyVN from "../../../config/formatMoneyVN";
import { DetailRoomModal } from "../../../component/Modal/DetailRoomModal";
import { useGetAllBranchesQuery } from "../../../api/branches";

export default function RoomBooking() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingData, setLoading] = useState(false);
  const [isDisabledForm, setDisableForm] = useState(false);
  const [searchRoom] = useSearchRoomMutation();
  const { data: dataRoomtype, isLoading } = useGetAllRoomTypeQuery({});
  const { data: dataBranches, isLoading: loadingBranch } =
    useGetAllBranchesQuery({});
  const [dataDetailRoom, setDataDetailRoom] = useState(null);
  const [dataRoom, setDataRoom] = useState([] as RoomInterface[]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const setDetailRoom = (data_room: RoomInterface) => {
    setDataDetailRoom(null);
    setDataDetailRoom(data_room as any);
    setIsModalOpen(true);
  };

  const newData = dataRoom?.map((room: any, index) => ({
    key: index + 1,
    name: room?.name,
    images: room?.images,
    room_type_name: room?.type?.room_type_name,
    childrend: room?.children,
    area: room?.area,
    bed_size: room?.bed_size,
    description: room?.description,
    adults: room?.adults,
    branch: room?.branch,
    price : room?.type?.price_per_night
    // discount: room?.discount,
  }));

  console.log("dataRoom", dataRoom);

  const columns = [
    { title: "STT", key: "key", dataIndex: "key" },
    {
      title: "Ảnh",
      key: "images",
      width: "7%",
      dataIndex: "images",
      render: (item: any) => (
        <>
          <Image
            width={50}
            height={50}
            className="rounded-md"
            src={item[0].image}
          />
        </>
      ),
    },
    // {
    //   title: "Loại phòng",
    //   key: "discount",
    //   width: "20%",
    //   render: (item: any) => <>{item}</>,
    // },

    { title: "Tên phòng", key: "name", dataIndex: "name" },
    { title: "Khu vực", key: "area", dataIndex: "area" },
    { title: "Người lớn", key: "adults", dataIndex: "adults" },
    { title: "Trẻ con", key: "childrend", dataIndex: "childrend" },
    { title: "Số giường ngủ", key: "bed_size", dataIndex: "bed_size" },
    { title: "Số giường", key: "description", dataIndex: "description" },
    {
      title: "Chi nhánh",
      key: "branch",
      //   width: "20%",
      dataIndex: "branch",
      render: (item: any) => <>{item?.name}</>,
    },
    {
      title: "Giá phòng",
      key: "price",
      //   width: "20%",
      dataIndex: "price",
      render: (item: any) => <>{formatMoneyVN(item)}</>,
    },
    // {
    //   title: "Giá ( 1 đêm )",
    //   key: "price",
    //   width: "20%",
    //   dataIndex: "price",
    //   render: (record: any) => {
    //     if (record?.type?.price_per_night > record?.discount) {
    //       return (
    //         <>
    //           {formatMoneyVN(record?.type?.price_per_night - record?.discount)}
    //         </>
    //       );
    //     }
    //     return <>{formatMoneyVN(record?.type?.price_per_night)}</>;
    //   },
    // },
    {
      title: "Lựa chọn",
      key: "action",
      render: (record: any) => (
        <>
          <Button
            shape="round"
            className="mr-3"
            onClick={() => {
              setDetailRoom(record);
            }}
          >
            Chi tiết phòng
          </Button>
          <Button shape="round" onClick={showModal}>
            Chọn phòng
          </Button>
        </>
      ),
    },

    // {
    //   title: "Giá ( 1 đêm )",
    //   key: "price",
    //   width: "20%",
    //   render: (record: any) => {
    //     if (record?.type?.price_per_night > record?.discount) {
    //       return (
    //         <>
    //           {formatMoneyVN(record?.type?.price_per_night - record?.discount)}
    //         </>
    //       );
    //     }
    //     return <>{formatMoneyVN(record?.type?.price_per_night)}</>;
    //   },
    // },
    // {
    //   title: "Chi nhánh",
    //   key: "branch",
    //   width: "20%",
    //   render: (record: any) => <>{record?.branch?.name}</>,
    // },
    // {
    //   title: "",
    //   key: "action",
    //   render: (record: any) => (
    //     <>
    //       <Button
    //         shape="round"
    //         className="mr-3"
    //         onClick={() => {
    //           setDetailRoom(record);
    //         }}
    //       >
    //         Chi tiết phòng
    //       </Button>
    //       <Button shape="round" onClick={showModal}>
    //         Chọn phòng
    //       </Button>
    //     </>
    //   ),
    // },
  ];

  const onFinish = async (values: any) => {
    setLoading(true);
    setDisableForm(true);
    setDataRoom([]);
    const value = {
      room_type_id: values.room_type,
      branch_id: values.branch_id,
      amount_room: values.amount_room,
      check_in: values.days[0].format("YYYY-MM-DD"),
      check_out: values.days[1].format("YYYY-MM-DD"),
      adults: values.adults,
      children: values.childrens,
    };
    // console.log("value Search", value);

    searchRoom(value)
      .unwrap()
      .then((res) => {
        if (res.status == "success") {
          message.success(res.message);
          setDataRoom(res.data);
        } else if (res.status == "error") {
          message.error(res.message);
        }
        setLoading(false);
        setDisableForm(false);
      });
  };

  return (
    <Page title={`Đặt phòng`}>
      {dataDetailRoom !== null ? (
        <DetailRoomModal
          room={dataDetailRoom}
          setIsModalOpen={handleCancel}
          isOpen={isModalOpen}
        />
      ) : (
        <></>
      )}
      <Form
        disabled={isDisabledForm}
        form={form}
        labelCol={{ span: 6 }}
        layout="horizontal"
        className={`${isLoading && "mt-5 mb-5"}`}
        onFinish={onFinish}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            title="Thông tin phòng"
            bordered={false}
            loading={isLoading && loadingBranch}
          >
            <Form.Item
              label="Chi nhánh"
              name="branch_id"
              rules={[{ required: true, message: "Vui lòng chọn chi nhánh" }]}
            >
              <Select>
                {dataBranches?.data?.map((item: any) => {
                  return (
                    <Select.Option value={item.id} key={item.id}>
                      {item.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Loại phòng"
              name="room_type"
              rules={[{ required: true, message: "Vui lòng chọn loại phòng" }]}
            >
              <Select>
                {dataRoomtype?.data?.map((item: any) => {
                  return (
                    <Select.Option value={item.id} key={item.id}>
                      {item.room_type_name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Số phòng"
              name="amount_room"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng phòng" },
              ]}
            >
              <InputNumber min={1} className="w-full" />
            </Form.Item>
            <Form.Item
              label="Ngày"
              name="days"
              rules={[
                { required: true, message: "Vui lòng nhập checkin checkout" },
              ]}
            >
              <DatePicker.RangePicker
                className="w-full"
                placeholder={["Ngày ở", "Ngày trả"]}
              />
            </Form.Item>
          </Card>
          <Card title="Thông tin khác" loading={isLoading} bordered={false}>
            <Form.Item
              label="Người lớn"
              name="adults"
              rules={[
                { required: true, message: "Vui lòng nhập số người lớn" },
              ]}
            >
              <InputNumber min={1} className="w-full" />
            </Form.Item>
            <Form.Item
              label="Trẻ em"
              name="childrens"
              rules={[{ required: true, message: "Vui lòng nhập số trẻ em" }]}
            >
              <InputNumber min={1} className="w-full" />
            </Form.Item>
            <div className="flex items-center justify-end">
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l font-medium rounded-lg text-sm px-8  text-center mb-2"
                  icon={<SearchOutlined />}
                >
                  Tìm
                </Button>
              </Form.Item>
            </div>
          </Card>
          <Card
            title="Thông tin khách hàng"
            loading={isLoading}
            bordered={false}
          >
            <Form.Item label="Tên khách hàng" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phone">
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Địa chỉ email không hợp lệ!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Card>
        </div>
      </Form>
      <Table
        className={`${isLoading && "hidden"}`}
        loading={isLoadingData}
        columns={columns}
        dataSource={newData}
        pagination={false}
      />
      {/* <TableCustom loading={isLoadingData} columns={columns} data={dataRoom}/> */}
    </Page>
  );
}
