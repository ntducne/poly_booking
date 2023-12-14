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
  Modal,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import {
  useBookingRoomMutation,
  useSearchRoomMutation,
} from "../../../api/booking";
import { useGetAllRoomTypeQuery } from "../../../api/roomTypes";
import { RoomInterface } from "../../../Interface/RoomInterface";
import Page from "../../../component/page";
import formatMoneyVN from "../../../config/formatMoneyVN";
import { DetailRoomModal } from "../../../component/Modal/DetailRoomModal";
import moment from "moment";
// import { useGetAllBranchesQuery } from "../../../api/branches";
// import { role } from "../../../hoc/withAuthorization";

export default function RoomBooking() {
  const [form] = Form.useForm();
  const [formBooking] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalBookingOpen, setIsModalBookingOpen] = useState(false);

  const [isLoadingData, setLoading] = useState(false);
  const [isDisabledForm, setDisableForm] = useState(false);
  const [searchRoom] = useSearchRoomMutation();
  const { data: dataRoomtype, isLoading } = useGetAllRoomTypeQuery({});
  // const { data: dataBranches, isLoading: loadingBranch } =
  //   useGetAllBranchesQuery({});
  const [dataDetailRoom, setDataDetailRoom] = useState(null);
  const [dataRoom, setDataRoom] = useState([] as RoomInterface[]);

  const [bookingRoom] = useBookingRoomMutation();

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalAddPeople = (data_room: RoomInterface) => {
    // console.log("1");
    setDataDetailRoom(null);

    setDataDetailRoom(data_room as any);

    setIsModalBookingOpen(true);
  };
  const handleOkeAddPeople = () => {
    setIsModalBookingOpen(true);
  };
  const handleCancelAddPeople = () => {
    setIsModalBookingOpen(false);
  };

  const setDetailRoom = (data_room: RoomInterface) => {
    setDataDetailRoom(null);

    setDataDetailRoom(data_room as any);
    setIsModalOpen(true);
  };

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
          <Button shape="round" onClick={() => showModalAddPeople(record)}>
            Đặt phòng
          </Button>
        </>
      ),
    },
  ];

  const onFinish = async (values: any) => {
    setLoading(true);
    setDisableForm(true);
    setDataRoom([]);
    console.log("1");

    searchRoom({
      room_type_id: values.room_type,
      amount_room: values.amount_room,
      checkin: values.days[0].format("YYYY-MM-DD"),
      checkout: values.days[1].format("YYYY-MM-DD"),
      adult: values.adult,
      child: values.childrens,
    })
      .unwrap()
      .then((res: any) => {
        console.log("111111111");
        if (res.status === "success") {
          const valueRoom = res.data;
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
        } else {
          message.error(res.message);
        }
      })
      .catch((err: any) => {
        console.log(err);        
        message.error(err?.data?.error?.amount_room);
      })
      .finally(() => {
        setLoading(false);
        setDisableForm(false);
      });
  };

  const onBooking = (values: any) => {
    console.log("Received values of form:", values);
    console.log("data", form.getFieldsValue());
    const dataSearch = form.getFieldsValue();

    const dataBooking = {
      room_id: dataDetailRoom?.id,
      checkin: dataSearch?.days[0].format("YYYY-MM-DD"),
      checkout: dataSearch?.days[1].format("YYYY-MM-DD"),
      amount_room: dataSearch?.amount_room,
      // branch_id: dataSearch?.branch_id,
      adult: dataSearch?.adult,
      child: dataSearch?.childrens,
      email: values?.email,
      phone: values?.phone,
      name: values?.name,
    };
    bookingRoom(dataBooking)
      .unwrap()
      .then((res: any) => {
        setVisible(true);
        setCodeQR(
          `https://img.vietqr.io/image/mb-0823565831-compact2.jpg?amount=${res?.amount}&addInfo=POLYDEVHOTELHD${res?.billingCode}&accountName=NGUYEN%20THIEN%20DUC`
        );
      });
  };
  const [codeQR, setCodeQR] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <Page title={`Đặt phòng`}>
      {dataDetailRoom !== null ? (
        <>
          <DetailRoomModal
            room={dataDetailRoom}
            setIsModalOpen={handleCancel}
            isOpen={isModalOpen}
          />
        </>
      ) : (
        <></>
      )}
      <Modal
        title="Thông tin của khách hàng"
        open={isModalBookingOpen}
        onOk={handleOkeAddPeople}
        onCancel={handleCancelAddPeople}
        footer={[]}
      >
        <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}
        >
          <div className="flex justify-center items-center h-full">
            <Image src={codeQR} width={300} />
          </div>
          {/* <Button  onClick={() => setVisible(false)}>Đóng</Button> */}
        </Modal>
        <Form
          form={formBooking}
          className="mt-5"
          name="dynamic_form_nest_item"
          onFinish={onBooking}
          style={{ maxWidth: 600 }}
          autoComplete="off"
        >
          <Form.Item
            label="Tên khách hàng"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên!" },
              {
                pattern: /^.*\S+.*$/,
                message: "Vui lòng không nhập chỉ toàn khoảng trắng!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              {
                pattern: /^(\+84|0)[3|5|7|8|9][0-9]{8}$/,
                message: "Số điện thoại không hợp lệ",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item className="flex justify-end">
            <Button htmlType="submit">Đặt phòng</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Form
        disabled={isDisabledForm}
        form={form}
        labelCol={{ span: 6 }}
        layout="horizontal"
        className={`${isLoading && "mt-5 mb-5"}`}
        onFinish={onFinish}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 gap-4">
          <Card title="Thông tin phòng" bordered={false} loading={isLoading}>
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
                disabledDate={(current: any) =>
                  current && current < moment().startOf("day")
                }
              />
            </Form.Item>
          </Card>
          <Card title="Thông tin khác" loading={isLoading} bordered={false}>
            <Form.Item
              label="Người lớn"
              name="adult"
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
