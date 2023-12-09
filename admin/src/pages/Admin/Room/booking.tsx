import {
  Input,
  Select,
  DatePicker,
  InputNumber,
  Form,
  Card,
  Button,
  message,
  Image,
  Table,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSearchRoomMutation } from "../../../api/booking";
import { useGetAllRoomTypeQuery } from "../../../api/roomTypes";
import { RoomInterface } from "../../../Interface/RoomInterface";
import Page from "../../../component/page";
import formatMoneyVN from "../../../config/formatMoneyVN";
import { DetailRoomModal } from "../../../component/Modal/DetailRoomModal";
// import { useGetAllBranchesQuery } from "../../../api/branches";
// import { role } from "../../../hoc/withAuthorization";

export default function RoomBooking() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingData, setLoading] = useState(false);
  const [isDisabledForm, setDisableForm] = useState(false);
  const [searchRoom] = useSearchRoomMutation();
  const { data: dataRoomtype, isLoading } = useGetAllRoomTypeQuery({});
  // const { data: dataBranches, isLoading: loadingBranch } =
  //   useGetAllBranchesQuery({});
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

  // const newData = dataRoom?.map((room: any, index) => ({
  //   key: index + 1,
  //   name: room?.name,
  //   images: room?.images,
  //   room_type_name: room?.type?.room_type_name,
  //   child: room?.children,
  //   area: room?.area,
  //   bed_size: room?.bed_size,
  //   description: room?.description,
  //   adults: room?.adults,
  //   branch: room?.branch,
  //   price: room?.type?.price_per_night,
  //   // discount: room?.discount,
  // }));

  const columns = [
    {
      title: "Ảnh",
      key: "image",
      width: "7%",
      dataIndex: "image",
      render: (item: any) => (
        <>
          <Image width={50} height={50} className="rounded-md" src={item} />
        </>
      ),
    },
    {
      title: "Loại phòng",
      key: "room_type",
      width: "20%",
      render: (item: any) => {
        return <>{item?.room_type?.room_type_name}</>;
      },
    },
    { title: "Tên phòng", key: "name", dataIndex: "name" },
    { title: "Người lớn", key: "adult", dataIndex: "adult" },
    { title: "Trẻ con", key: "child", dataIndex: "child" },
    {
      title: "Chi nhánh",
      key: "branch",
      dataIndex: "branch",
      render: (item: any) => <> {item?.name}</>,
    },
    {
      title: "Giá phòng",
      key: "price",
      dataIndex: "price",
      render: (item: any) => <>{formatMoneyVN(item)}</>,
    },
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
  ];

  const onFinish = async (values: any) => {
    setLoading(true);
    setDisableForm(true);
    setDataRoom([]);
    try {
      const res = await searchRoom({
        room_type_id: values.room_type,
        branch_id: values.branch_id,
        amount_room: values.amount_room,
        check_in: values.days[0].format("YYYY-MM-DD"),
        check_out: values.days[1].format("YYYY-MM-DD"),
        adults: values.adults,
        children: values.childrens,
      }).unwrap();

      if (res.status === "success") {
        message.success(res.message);
        const valueRoom = res.data;
        console.log(valueRoom);
        setDataRoom((prevDataRoom) => [
          ...prevDataRoom,
          ...valueRoom.map((room: any) => ({
            id: room.id,
            name: room.name,
            amount: room.amount,
            discount: room.discount,
            price: room.price,
            adult: room.adults,
            child: room.children,
            description: room.description,
            room_type: room.room_type,
            branch: room.branch,
            image: room.image,
            room_empty: room.room_empty,
          })),
        ]);
        console.log(dataRoom);
      } else if (res.status === "error") {
        message.error(res.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error appropriately (e.g., show an error message to the user)
    } finally {
      setLoading(false);
      setDisableForm(false);
    }
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
            loading={isLoading}
          >
            {/* {role === "super_admin" && (
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
            )} */}
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
        className={`${isLoading && "hidden"} mt-5`}
        loading={isLoadingData}
        columns={columns}
        dataSource={dataRoom}
        pagination={false}
      />
      {/* <TableCustom loading={isLoadingData} columns={columns} data={dataRoom}/> */}
    </Page>
  );
}
