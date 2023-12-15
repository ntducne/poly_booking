import React, { useEffect, useRef, useState } from "react";
import {
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Modal,
  Drawer,
  Checkbox,
  Select,
  DatePicker,
  InputNumber,
  Form,
  Card,
  message,
  Table,
  // TableProps,
  Skeleton,
} from "antd";
import {
  useAddPeopleBookingMutation,
  useAddServiceBookingMutation,
  useCancelBookingMutation,
  useCheckinBookingMutation,
  useCheckoutBookingMutation,
  useExtendBookingMutation,
  useGetDetailBilingsQuery,
} from "../../../api/billings";
import { useParams } from "react-router-dom";
import { useGetServicesQuery } from "../../../api/services";
import swal from "sweetalert";
// import _ from "lodash";
import _ from "lodash";
import formatMoneyVN from "../../../config/formatMoneyVN";
import { useGetAllRoomTypeQuery } from "../../../api/roomTypes";
import dayjs from "dayjs";
import moment from "moment";
import { useSearchRoomMutation } from "../../../api/booking";
const BillDetail: React.FC = () => {
  const { id } = useParams();
  const {
    data: dataBill,
    isLoading,
    refetch,
  } = useGetDetailBilingsQuery(id || "");

  const prevServicesRef = useRef();
  const { data: dataRoomType } = useGetAllRoomTypeQuery({});
  const { data: dataServices, isLoading: loadingServer } = useGetServicesQuery(
    {}
  );
  const [searchRoom] = useSearchRoomMutation();

  const [dataRoomSearch, setRoomSearch] = useState([]);
  const [dataRoomBook, setRoomBook] = useState([]);

  const [form] = Form.useForm();
  const [formRoomExtend] = Form.useForm();

  useEffect(() => {
    if (!_.isEqual(prevServicesRef.current, dataBill?.data?.services)) {
      refetch();
    }
    prevServicesRef.current = dataBill?.data?.services;
  }, [dataBill?.data?.status, dataBill?.data?.services, isLoading]);

  // Xử lý addPeople

  const [formPeople] = Form.useForm();
  const [addPeopleBooking] = useAddPeopleBookingMutation();

  const onAddPeople = (values: any) => {
    const dataAddPeople = {
      billing_id: dataBill?.data?.id,
      peoples: values.users,
    };

    addPeopleBooking(dataAddPeople)
      .unwrap()
      .then((res) => {
        if (res.status === "success") {
          setFormChanged(false);
          swal(res.message, {
            icon: "success",
          });
          setIsModalOpen(false);
          formPeople.resetFields();
        } else {
          swal(res.message, {
            icon: "error",
          });
        }
      })
      .catch((err) => {
        swal(err, {
          icon: "error",
        });
      });
  };

  const columnsPeople = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "CCCD",
      dataIndex: "cmtnd",
      key: "cmtnd",
    },
  ];

  //

  // Xu ly ServiceInBill
  const [formChanged, setFormChanged] = useState(false);
  const onValuesChange = () => {
    setFormChanged(true);
  };
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const [addServiceBooking] = useAddServiceBookingMutation();

  const addServiceInBill = async (values: any) => {
    const dataBillNew = {
      billing_id: dataBill?.data?.id,
      ...values,
    };

    addServiceBooking(dataBillNew)
      .unwrap()
      .then((res) => {
        if (res.status === "success") {
          setFormChanged(false);
          setOpen(false);
          swal(res.message, {
            icon: "success",
          });
        } else {
          swal(res.message, {
            icon: "error",
          });
        }
      });
  };

  const onClose = () => {
    if (formChanged === true) {
      Modal.confirm({
        title: "Bạn có muốn lưu thay đổi không?",
        icon: <LoadingOutlined />,
        content: "Thay đổi sẽ không được lưu nếu bạn không lưu lại",
        okText: "Lưu",
        okType: "default",
        cancelText: "Không lưu",
        onOk() {
          const formValuesService = form.getFieldsValue();
          const formValuesPeople = formPeople.getFieldsValue();
          if (Object.keys(formValuesService).length > 0) {
            addServiceInBill(formValuesService);
          } else {
            addPeopleBooking(formValuesPeople);
          }
          setOpen(false);
        },
        onCancel() {
          // Xử lý cancel
          form.resetFields();
          formPeople.resetFields();
          setFormChanged(false);
          setOpen(false);
        },
      });
    }
    setOpen(false);
  };

  // ...

  // Xử lý nhận phòng
  const [checkinBooking] = useCheckinBookingMutation();
  const onCheckinBooking = (data: any) => {
    try {
      swal({
        title: "Thông báo ?",
        text: "Bạn muốn nhận phòng!",
        icon: "success",
        buttons: ["Quay trở lại", "Nhận phòng"],
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            const dataBill = {
              billing_id: data,
            };
            checkinBooking(dataBill)
              .unwrap()
              .then((res) => {
                if (res.status === "success") {
                  swal(res.message, {
                    icon: "success",
                  });
                } else {
                  swal(res.message, {
                    icon: "error",
                  });
                }
              });
          }
        })
        .catch(() => {
          swal("Lỗi", {
            icon: "error",
          });
        });
    } catch (error) {}
  };
  //

  // Xử lý trả phòng
  const [checkoutBooking] = useCheckoutBookingMutation();
  const onCheckoutBooking = (data: any) => {
    try {
      swal({
        title: "Thông báo ?",
        text: "Bạn muốn nhận phòng!",
        icon: "success",
        buttons: ["Quay trở lại", "Trả phòng"],
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            const dataBill = {
              billing_id: data,
            };
            checkoutBooking(dataBill)
              .unwrap()
              .then((res) => {
                if (res.status === "success") {
                  swal(res.message, {
                    icon: "success",
                  });
                } else {
                  swal(res.message, {
                    icon: "error",
                  });
                }
              });
          }
        })
        .catch(() => {
          swal("Lỗi", {
            icon: "error",
          });
        });
    } catch (error) {}
  };
  //

  // Xử lý hủy đặt phòng
  const [cancelBooking] = useCancelBookingMutation();
  const onCancelBooking = (data: any) => {
    try {
      swal({
        title: "Thông báo ?",
        text: "Bạn muốn hủy đặt phòng với hóa đơn này!",
        icon: "warning",
        buttons: ["Quay trở lại", "Hủy phòng"],
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            const dataBill = {
              billing_id: data,
            };
            cancelBooking(dataBill)
              .unwrap()
              .then((res) => {
                if (res.status === "success") {
                  swal(res.message, {
                    icon: "success",
                  });
                }
              });
          }
        })
        .catch(() => {
          swal("Lỗi", {
            icon: "error",
          });
        });
    } catch (error) {}
  };
  //

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalExtendOpen, setIsModalExtendOpen] = useState(false);
  const showModalExtend = () => {
    setIsModalExtendOpen(true);
  };

  const closeModalExtend = () => {
    formRoomExtend.resetFields();
    setIdRoomNewExtend(null);
    setRoomSearch([]);
    setIsModalExtendOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    onClose();
  };
  const checkRoom = (values: any) => {
    setRoomSearch([]);
    if (!values) {
      return;
    }
    const { new_checkout, amount_room_renew, room_type_id, adults, childs } =
      values;
    const new_checkoutDate = dayjs(new_checkout.$d).format("YYYY-MM-DD");
    const dataQuery: Record<string, string> = {
      checkin: dayjs(dataBill?.data?.booking?.checkout).format("YYYY-MM-DD"),
      checkout: new_checkoutDate,
      adult: adults,
      child: childs,
      // branch_id: dataBill?.data?.branch?.id,
      room_type_id: room_type_id,
      amount_room: amount_room_renew,
    };
    searchRoom(dataQuery)
      .unwrap()
      .then((data) => {
        if (data?.message == "Hết phòng !") {
          message.error(data.message);
        }
        if (data?.status == false) {
          message.warning(data?.error?.amount_room || data?.message);
        } else {
          message.success(data?.message);
          setRoomSearch(data?.data);
        }
      })
      .catch((err) => {
        message.error(err?.data?.error?.amount_room);
      });
  };

  // xu lý gia hạn phòng
  const [formRoomIdExtend] = Form.useForm();
  const [extendBooking] = useExtendBookingMutation();
  const [idRoomNewExtend, setIdRoomNewExtend] = useState<any>(null);
  const onSetIdRoomNewExtend = (value: any) => {
    setIdRoomNewExtend(value);
  };

  const onCheckRoomExtend = () => {};

  const onExtendBooking = () => {
    const { adults, childs, amount_room_renew, new_checkout } =
      formRoomExtend.getFieldsValue();
    const new_checkoutDate = dayjs(new_checkout.$d).format("YYYY-MM-DD");
    // TH1: Nếu số phòng gia hạn bằng số phòng hiện tại
    if (
      amount_room_renew === dataBill?.data?.booking?.amount_room &&
      idRoomNewExtend === null
    ) {
      const dataExtendRoom = {
        booking_id: dataBill?.data?.booking?.id,
        billing_id: dataBill?.data?.id,
        amount_room: amount_room_renew,
        room_id: dataBill?.data?.booking?.detail[0].room_id,
        newCheckout: new_checkoutDate,
      };
      extendBooking(dataExtendRoom)
        .unwrap()
        .then((res: any) => {
          if (res.message) {
            swal(res.message, {
              icon: "success",
            });
            closeModalExtend();
          }
          // else if (res.message && res.status === false) {
          //   swal(res.message, {
          //     icon: "error",
          //   });
          // }
        })
        .catch((err) => {
          swal(err, {
            icon: "error",
          });
        });
    }

    // TH2: Nếu số phòng gia hạn nhỏ số phòng hiện tại
    if (
      amount_room_renew < dataBill?.data?.booking?.amount_room &&
      idRoomNewExtend === null
    ) {
      const dataExtendRoom = {
        billing_id: dataBill?.data?.id,
        amount_room: amount_room_renew,
        room_id: dataBill?.data?.booking?.detail[0].room_id,
        newCheckout: new_checkoutDate,
        roomNumberRenew: formRoomIdExtend.getFieldsValue().room_id,
        booking_id: dataBill?.data?.booking?.id,
      };
      extendBooking(dataExtendRoom)
        .unwrap()
        .then((res) => {
          if (res.message) {
            swal(res.message, {
              icon: "success",
            });
            closeModalExtend();
          }
        })
        .catch((err) => {
          swal(err, {
            icon: "error",
          });
        });
    }
    // TH3: Nếu số phòng gia hạn lớn số phòng hiện tại
    if (
      amount_room_renew > dataBill?.data?.booking?.amount_room &&
      idRoomNewExtend === null
    ) {
      const dataExtendRoom = {
        adult: adults,
        children: childs,
        checkin: dayjs(dataBill?.data?.booking?.checkout).format("YYYY-MM-DD"),
        checkout: new_checkoutDate,
        name: dataBill?.data?.booking?.representative?.name,
        email: dataBill?.data?.booking?.representative?.email,
        phone: dataBill?.data?.booking?.representative?.phone,
        billing_id: dataBill?.data?.id,
        amount_room: amount_room_renew,
        room_id: dataBill?.data?.booking?.detail[0].room_id,
        newCheckout: new_checkoutDate,
        booking_id: dataBill?.data?.booking?.id,
      };
      extendBooking(dataExtendRoom)
        .unwrap()
        .then((res) => {
          if (res.message && res.status === true) {
            swal(res.message, {
              icon: "success",
            });
            closeModalExtend();
          } else if (res.message) {
            swal(res.message, {
              icon: "success",
            });
          } else if (res.status === false) {
            swal("Lỗi gia hạn", {
              icon: "error",
            });
          }
        })
        .catch((err) => {
          swal(err, {
            icon: "error",
          });
        });
    }

    // TH4: Gia hạn khác phòng hiện tại
    if (idRoomNewExtend !== null) {
      const dataExtendRoom = {
        adult: adults,
        child: childs,
        checkin: dataBill?.data?.booking?.checkout,
        checkout: new_checkoutDate,
        newCheckout: new_checkoutDate,
        branch_id: dataBill?.data?.branch?.id,
        name: dataBill?.data?.booking?.representative?.name,
        email: dataBill?.data?.booking?.representative?.email,
        phone: dataBill?.data?.booking?.representative?.phone,
        amount_room: amount_room_renew,
        room_id: idRoomNewExtend,
        booking_id: dataBill?.data?.booking?.id,
        billing_id: dataBill?.data?.id,
      };
      extendBooking(dataExtendRoom)
        .unwrap()
        .then((res) => {
          if (res.message) {
            swal(res.message, {
              icon: "success",
            });
            closeModalExtend();
          }
        })
        .catch((err) => {
          swal(err, {
            icon: "error",
          });
        });
    }
  };

  // Table của lịch sử xem phòng
  const columns = [
    {
      title: "Nhân viên",
      dataIndex: "admin",
      key: "admin",
      render: (item: any) => {
        return (
          <div className="flex items-center space-x-4">
            <img
              className="w-10 h-10 rounded-full"
              src={item?.image}
              alt={`ADMIN_IMAGE_${item?.image}`}
            />
            <div className="font-medium">
              <div>{item?.name}</div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Thời gian thay đổi",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Thay đổi",
      dataIndex: "handle",
      key: "handle",
    },
  ];

  const dataHistory = dataBill?.data?.history?.map(
    (history: any, index: number) => {
      return {
        key: index + 1,
        admin: history.admin,
        time: history.time,
        handle: history.handle,
      };
    }
  );

  const changeRoomBook = (value: any) => {
    if (value < dataBill?.data?.booking.amount_room && value !== null) {
      const dataRoomStatus = dataBill?.data?.booking?.detail;
      setRoomBook(dataRoomStatus);
    } else {
      setRoomBook([]);
    }
  };

  if (isLoading) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

  return (
    <>
      <div className="h-[100px] w-full shadow-md grid grid-cols-1 md:grid-cols-2 items-center rounded-lg border">
        <div className="ml-5">
          <div>
            <span className="text-2xl" style={{ fontSize: 20 }}>
              Chi tiết đặt phòng
            </span>{" "}
            - #{dataBill?.data?.billingCode}
          </div>
        </div>
        <div className="flex items-center md:justify-end justify-start ml-5 md:ml-0 md:mr-3">
          {/* {dataBill?.data?.status === 0 && (
            <button
              type="button"
              // onClick={() => onCancelBooking(dataBill?.data?.id)}
              className="text-gray-900 bg-gradient-to-r from-green-200 via-green-300 to-green-400 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Chờ nhận phòng
            </button>
          )} */}
          {dataBill?.data?.status === 1 && (
            <button
              type="button"
              // onClick={showModalExtend}
              onClick={() => onCheckinBooking(dataBill?.data?.id)}
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Nhận phòng
            </button>
          )}
          {dataBill?.data?.status === 3 && (
            <>
              <button
                type="button"
                onClick={showModalExtend}
                className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Gia hạn
              </button>
              <button
                type="button"
                onClick={() => onCheckoutBooking(dataBill?.data?.id)}
                className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Trả phòng
              </button>
            </>
          )}
          {dataBill?.data?.status === 1 && (
            <button
              type="button"
              onClick={() => onCancelBooking(dataBill?.data?.id)}
              className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Huỷ phòng
            </button>
          )}
        </div>
      </div>
      <Modal
        title="Gia hạn phòng"
        open={isModalExtendOpen}
        onOk={closeModalExtend}
        onCancel={closeModalExtend}
        className="w-full"
        footer={[]}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 mb-4">
          <Card title="Thông tin khách hàng" bordered={false}>
            <Form
              labelCol={{ span: 6 }}
              layout="horizontal"
              className="mt-5 mb-5"
            >
              <Form.Item label="Tên khách hàng">
                <Input
                  disabled
                  defaultValue={dataBill?.data?.booking?.representative?.name}
                />
              </Form.Item>
              <Form.Item label="Số điện thoại">
                <Input
                  disabled
                  defaultValue={dataBill?.data?.booking?.representative?.phone}
                />
              </Form.Item>
              <Form.Item label="Email">
                <Input
                  disabled
                  defaultValue={dataBill?.data?.booking?.representative?.email}
                />
              </Form.Item>
            </Form>
          </Card>
          <Card title="Thông tin phòng đang đặt" bordered={false}>
            <Form
              labelCol={{ span: 6 }}
              layout="horizontal"
              className="mt-5 mb-5"
            >
              <Form.Item label="Loại phòng">
                <Select
                  defaultValue={dataBill?.data?.booking?.roomType.id}
                  disabled
                >
                  {dataRoomType?.data?.map((item: any) => {
                    return (
                      <Select.Option value={item.id} key={item.id}>
                        {item.room_type_name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item label="Số phòng">
                <Input
                  defaultValue={dataBill?.data?.booking.amount_room}
                  disabled
                  className="w-full"
                />
              </Form.Item>
              <Form.Item label="Ngày">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    defaultValue={dataBill?.data?.booking.checkin}
                    disabled
                    className="w-full"
                  />
                  <Input
                    defaultValue={dataBill?.data?.booking.checkout}
                    disabled
                    className="w-full"
                  />
                </div>
              </Form.Item>
            </Form>
          </Card>
          <Card title="Thông tin gia hạn" bordered={false}>
            <Form
              form={formRoomExtend}
              labelCol={{ span: 6 }}
              layout="horizontal"
              className="mt-5 mb-5"
              onFinish={checkRoom}
            >
              <Form.Item
                label="Loại phòng"
                name="room_type_id"
                initialValue={dataBill?.data?.booking?.roomType.id}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập loại phòng",
                  },
                ]}
              >
                <Select
                  defaultValue={dataBill?.data?.booking?.roomType.id}
                  disabled
                >
                  {dataRoomType?.data?.map((item: any) => {
                    return (
                      <Select.Option value={item.id} key={item.id}>
                        {item.room_type_name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="Số phòng gia hạn"
                name="amount_room_renew"
                initialValue={dataBill?.data?.booking.amount_room}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số phòng",
                  },
                  {
                    type: "number",
                    min: 1,
                    message: "Số phòng phải lớn hơn 1",
                  },
                ]}
              >
                <InputNumber
                  onChange={changeRoomBook}
                  defaultValue={dataBill?.data?.booking.amount_room}
                  min={1}
                  className="w-full"
                />
              </Form.Item>
              <Form.Item
                label="Người lớn"
                name="adults"
                initialValue={dataBill?.data?.booking?.amount_people.adult}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số người lớn",
                  },
                  {
                    type: "number",
                    min: 1,
                    message: "Số phòng phải lớn hơn 1",
                  },
                ]}
              >
                <InputNumber
                  defaultValue={dataBill?.data?.booking.amount_people.adults}
                  min={1}
                  className="w-full"
                />
              </Form.Item>
              <Form.Item
                label="Trẻ em"
                name="childs"
                initialValue={dataBill?.data?.booking.amount_people.children}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số trẻ em",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Số phòng phải lớn hơn 1",
                  },
                ]}
              >
                <InputNumber
                  defaultValue={dataBill?.data?.booking.amount_people.children}
                  min={0}
                  className="w-full"
                />
              </Form.Item>
              <Form.Item
                label="Ngày"
                name="new_checkout"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập ngày",
                  },
                ]}
              >
                <DatePicker
                  className="w-full"
                  placeholder={"Checkout new"}
                  disabledDate={(current) =>
                    current &&
                    current <= moment(dataBill?.data?.booking?.checkout)
                  }
                />
              </Form.Item>
              <div className="flex justify-end mt-5">
                <Button htmlType="submit">Kiểm tra</Button>
              </div>
            </Form>
          </Card>
        </div>
        {dataRoomBook.length > 0 && (
          <div className="relative flex flex-col overflow-x-auto w-full mb-4">
            <div className="text-center font-medium text-">
              Phòng đang ở hiện tại
            </div>
            <Form
              form={formRoomIdExtend}
              name="validate_other"
              onFinish={onCheckRoomExtend}
              style={{ maxWidth: 600 }}
              className=" w-full flex flex-col text-sm text-left rtl:text-right text-gray-500"
            >
              <Form.Item name="room_id">
                <Checkbox.Group className="flex flex-col">
                  {dataRoomBook.map((room: any) => {
                    return (
                      <Checkbox
                        className="flex "
                        value={room.id}
                        style={{ lineHeight: "32px" }}
                      >
                        {room?.room_name} ({room?.room_number})
                      </Checkbox>
                    );
                  })}
                </Checkbox.Group>
              </Form.Item>
              <button
                type="button"
                onClick={() => onExtendBooking()}
                className="absolute bottom-0 right-0 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Gia hạn
              </button>
            </Form>
          </div>
        )}
        {dataBill?.data?.booking?.amount_room < dataRoomBook.length && (
          <div>Thông tin tìm kiếm</div>
        )}
        <div>
          {dataRoomSearch.length > 0 && (
            <div className="relative overflow-x-auto w-full">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Ảnh phòng
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tên phòng
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Loại phòng
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Giá
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Số lượng
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {dataRoomSearch.map((room: any) => {
                    return (
                      <tr
                        className={` border-b ${
                          dataBill?.data?.booking.detail[0].room_id == room.id
                            ? "bg-gray-100"
                            : "bg-white"
                        }`}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          <img
                            width={50}
                            src={room.image}
                            alt={`Image Room ${room.id}`}
                          />
                        </th>
                        <td className="px-6 py-4">
                          <p className="mb-2">{room.name}</p>
                          {dataBill?.data?.booking.detail[0].room_id ==
                            room.id && (
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              Phòng hiện tại
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {room.room_type.room_type_name}
                        </td>
                        <td className="px-6 py-4">
                          {formatMoneyVN(room.price)}{" "}
                          {room.discount > 0 && room.discount < 95 ? (
                            <>
                              <br />
                              <del>{room.discount} %</del>
                            </>
                          ) : (
                            <>
                              <br />
                              <del>
                                {formatMoneyVN(room.room_type.price_per_night)}
                              </del>
                            </>
                          )}
                        </td>
                        <td className="px-6 py-4">{room.room_empty}</td>
                        <td>
                          {dataRoomBook.length == 0 && dataBill?.data?.booking.detail[0].room_id ==
                            room.id &&
                            idRoomNewExtend == null && (
                              <button
                                type="button"
                                onClick={() => onExtendBooking()}
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                              >
                                Gia hạn
                              </button>
                            )}
                          {idRoomNewExtend == room.id &&
                            dataBill?.data?.booking.detail[0].room_id !=
                              room.id && (
                              <button
                                type="button"
                                onClick={() => onSetIdRoomNewExtend(null)}
                                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                              >
                                Hủy
                              </button>
                            )}
                          {dataBill?.data?.booking.detail[0].room_id !=
                            room.id && (
                            <button
                              type="button"
                              onClick={() => onSetIdRoomNewExtend(room.id)}
                              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                              Chọn phòng mới
                            </button>
                          )}
                          {idRoomNewExtend == room.id &&
                            dataBill?.data?.booking.detail[0].room_id !=
                              room.id && (
                              <button
                                type="button"
                                onClick={() => onExtendBooking()}
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                              >
                                Gia hạn
                              </button>
                            )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Modal>
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2  2xl:grid-rows-1 2xl:grid-cols-3 gap-4 mt-4 mb-4">
        {/* <div className="grid md:grid-rows-1 grid-rows-1 gap-4"> */}

        <div className="col-span-1 row-span-1 md:col-span-1 md:row-span-1 2xl:col-span-1 2xl:row-span-1">
          <div className="block h-full p-6 bg-white border border-gray-200 rounded-lg shadow">
            <h5 className=" mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Thông tin đặt phòng
            </h5>
            <div className="font-normal text-gray-700">
              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside ">
                <li>Chi nhánh: {dataBill?.data?.branch?.name}</li>
                <li>Loại phòng: {dataBill?.data?.booking?.roomType.name}</li>
                <li>Check in: {dataBill?.data?.booking?.checkin}</li>
                <li>Check out: {dataBill?.data?.booking?.checkout}</li>
                <li>
                  Giá: {formatMoneyVN(dataBill?.data?.booking.provisional)}{" "}
                  <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                    Paid
                  </span>
                </li>
                <li>Thời gian thanh toán: {dataBill?.data?.payment_date}</li>
                <li>Hình thức thanh toán: {dataBill?.data?.payment_method}</li>
                <li>
                  Trạng thái:{" "}
                  <span className="font-bold">
                    {dataBill?.data?.status_name}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-span-1 row-span-1 md:col-span-1 md:row-span-1 2xl:col-span-1 2xl:row-span-1">
          <div className="block h-full p-6 bg-white border border-gray-200 rounded-lg shadow">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Thông tin khách hàng
            </h5>
            <div className="font-normal text-gray-700">
              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside">
                <li>
                  Tên khách đặt phòng:{" "}
                  {dataBill?.data?.booking?.representative?.name}
                </li>
                <li>Email: {dataBill?.data?.booking?.representative?.email}</li>
                <li>
                  Số điện thoại:{" "}
                  {dataBill?.data?.booking?.representative?.phone}
                </li>
                {/* <li>CCCD/CMTND: 123412312</li> */}
              </ul>
            </div>
            <div className="mt-1 mb-3"></div>
            <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900">
              Thông tin khách khác
            </h5>
            <div className="font-normal text-gray-700">
              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside">
                {/* <li>Số khách: 10</li> */}
                <li>
                  <Button onClick={showModal}>Chi tiết</Button>
                </li>
                <Modal
                  title="Chi tiết các khách hàng"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  footer={[]}
                >
                  <Table
                    columns={columnsPeople}
                    dataSource={dataBill?.data?.booking?.people}
                    pagination={false}
                  />{" "}
                  <Form
                    form={formPeople}
                    className="mt-5"
                    name="dynamic_form_nest_item"
                    onFinish={onAddPeople}
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                    onValuesChange={onValuesChange}
                  >
                    <Form.List name="users">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <Space
                              key={key}
                              style={{ display: "flex", marginBottom: 8 }}
                              align="baseline"
                            >
                              <Form.Item
                                {...restField}
                                name={[name, "name"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng nhập tên",
                                  },
                                  {
                                    pattern: /^\S.*\S$/,
                                    message:
                                      "Không được để khoảng trắng ở đầu hoặc cuối",
                                  },
                                  {
                                    min: 5,
                                    message: "Tên phải có ít nhất 5 ký tự",
                                  },
                                ]}
                              >
                                <Input placeholder="Họ tên" />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, "cmtnd"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng nhập CCCD/CMTND",
                                  },
                                  {
                                    pattern: /^[0-9]{9}$|^[0-9]{12}$/,
                                    message:
                                      "CCCD/CMTND phải là số và gồm 9 hoặc 12 chữ số",
                                  },
                                ]}
                              >
                                <Input placeholder="CCCD/CMTND" />
                              </Form.Item>
                              <MinusCircleOutlined
                                onClick={() => remove(name)}
                              />
                            </Space>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Thêm khách hàng
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                    <Form.Item className="flex justify-end">
                      <Button htmlType="submit">Lưu</Button>
                    </Form.Item>
                  </Form>
                </Modal>
              </ul>
            </div>
          </div>
        </div>
        {/* </div> */}

        <div className="col-span-1 row-span-1 md:col-span-2 md:row-span-1 2xl:col-span-1 2xl:row-span-1">
          <div className="block h-full p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <div className="flex justify-between items-center">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                Dịch vụ
              </h5>
              {dataBill?.data?.status === 3 && (
                <Button
                  className="h-full text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={showDrawer}
                >
                  Thêm dịch vụ
                </Button>
              )}
            </div>
            <div className="mt-5 font-normal text-gray-700 max-h-[510px] overflow-auto">
              <ol className="relative border-l border-gray-200 ml-3">
                {dataBill?.data?.services !== null && (
                  <>
                    {dataBill?.data?.services.length == 0 ? (
                      <div className="">Không có dịch vụ nào</div>
                    ) : (
                      dataBill?.data?.services.map((service: any) => {
                        return (
                          <li className="mb-10 ml-6">
                            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                              <svg
                                className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                              </svg>
                            </span>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                              {service?.time
                                ? service?.time
                                : "Không có thời gian"}
                            </time>
                            <div className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                              <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside">
                                <li>Dịch vụ: {service?.service_name}</li>
                                <li>Giá : {formatMoneyVN(service?.price)}</li>
                              </ul>
                            </div>
                          </li>
                        );
                      })
                    )}
                  </>
                )}
              </ol>
            </div>
          </div>
          <Drawer
            title="Dịch vụ"
            placement="right"
            onClose={onClose}
            open={open}
          >
            <Form
              form={form}
              name="validate_other"
              onFinish={addServiceInBill}
              onValuesChange={onValuesChange}
              initialValues={{
                services:
                  dataBill?.data?.services &&
                  dataBill?.data?.services.map((service: any) => {
                    return service?.service_id;
                  }),
              }}
            >
              <Form.Item name="services">
                <Checkbox.Group>
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ display: "flex" }}
                  >
                    {loadingServer ? (
                      <div>
                        <LoadingOutlined />
                      </div>
                    ) : (
                      dataServices?.data?.map((service: any) => {
                        return (
                          <Checkbox key={service?.id} value={service?.id}>
                            {service?.service_name}
                          </Checkbox>
                        );
                      })
                    )}
                  </Space>
                </Checkbox.Group>
              </Form.Item>
              <Form.Item>
                <Button htmlType="reset" className="mr-3" onClick={onClose}>
                  Đóng
                </Button>
                <Button htmlType="submit" key="submit">
                  Cập nhật
                </Button>
              </Form.Item>
            </Form>
          </Drawer>
        </div>
      </div>
      <div className="block h-full bg-white border border-gray-200 rounded-lg shadow">
        <h5 className="mb-2 p-6 text-2xl font-bold tracking-tight text-gray-900">
          Thông tin hoá đơn
        </h5>
        <div className="relative overflow-x-auto rounded-xl ">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase ">
              <tr>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3">
                  Số lượng
                </th>
                <th scope="col" className="px-6 py-3">
                  Thời gian
                </th>
                <th scope="col" className="px-6 py-3">
                  Ngày hết
                </th>
                <th scope="col" className="px-6 py-3">
                  Giá
                </th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {dataBill?.data?.booking?.detail?.map((room: any) => {
                return (
                  <tr key={room?.id} className="bg-white border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      <div>
                        {room?.room_name} ({room?.room_number}){" "}
                      </div>
                    </th>
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">
                      {dataBill?.data?.booking?.checkin}
                    </td>
                    <td className="px-6 py-4">
                      {room?.is_checkout
                        ? room?.is_checkout
                        : dataBill?.data?.booking?.checkout}
                    </td>

                    <td className="px-6 py-4">{formatMoneyVN(room?.price)}</td>
                    <td>
                      {(() => {
                        switch (room?.status) {
                          case 0:
                            return (
                              <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                Đã đặt
                              </span>
                            );
                          case 1:
                            return (
                              <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                Đang ở
                              </span>
                            );
                          case 2:
                            return (
                              <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                Đã trả
                              </span>
                            );
                          case 3:
                            return (
                              <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                                Đã huỷ
                              </span>
                            );
                          default:
                            return null;
                        }
                      })()}
                    </td>
                  </tr>
                );
              })}
              {dataBill?.data?.services?.map((service: any) => {
                return (
                  <tr className="bg-white border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {service?.service_name}
                    </th>
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">{formatMoneyVN(service.time)}</td>
                    <td></td>
                    <td className="px-6 py-4">
                      {formatMoneyVN(service.price)}
                    </td>
                    <td>
                      <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">
                        Chưa thanh toán
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-white border-b ">
                <th className="px-6 py-4"></th>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="font-bold">Tổng thanh toán</td>
                <td className="px-6 py-4">
                  {formatMoneyVN(
                    dataBill?.data.total - dataBill?.data?.booking.provisional
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="block h-full mt-4 bg-white border border-gray-200 rounded-lg shadow">
        <h5 className="mb-2 p-6 text-2xl font-bold tracking-tight text-gray-900">
          Lịch sử thay đổi
        </h5>
        <div className="relative overflow-x-auto rounded-xl ">
          <Table
            columns={columns}
            dataSource={dataHistory}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </>
  );
};

export default BillDetail;
