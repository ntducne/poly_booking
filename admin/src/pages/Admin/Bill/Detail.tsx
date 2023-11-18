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
  Row,
  Card,
  Col,
  Alert,
} from "antd";
import {
  useAddServiceBookingMutation,
  useCancelBookingMutation,
  useCheckinBookingMutation,
  useCheckoutBookingMutation,
  useGetDetailBilingsQuery,
} from "../../../api/billings";
import { useParams } from "react-router-dom";
import { useGetServicesQuery } from "../../../api/services";
import { useForm } from "antd/es/form/Form";
import swal from "sweetalert";
import _ from "lodash";

const BillDetail: React.FC = () => {
  const { id } = useParams();
  const {
    data: dataBill,
    isLoading,
    refetch,
  } = useGetDetailBilingsQuery(id || "");
  const prevServicesRef = useRef();

  const { data: dataServices, isLoading: loadingServer } = useGetServicesQuery(
    {}
  );
  const [form] = Form.useForm();

  useEffect(() => {
    if (!_.isEqual(prevServicesRef.current, dataBill?.data?.services)) {
      refetch();
    }
    prevServicesRef.current = dataBill?.data?.services;
  }, [dataBill?.data?.status, dataBill?.data?.services, isLoading]);
  console.log("dataBill", dataBill?.data);

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };
  // Xu ly ServiceInBill
  const [formChanged, setFormChanged] = useState(false);
  const onValuesChange = (changedValues: any, allValues: any) => {
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
          // Xử lý update
          console.log("OK");
          setOpen(false);
        },
        onCancel() {
          // Xử lý cancel
          form.resetFields();
          setFormChanged(false);
          console.log("Cancel");
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
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="h-[100px] w-full shadow-md grid grid-cols-1 md:grid-cols-2 items-center rounded-lg border">
        <div className="ml-5">
          <div>
            <span className="text-2xl" style={{ fontSize: 20 }}>
              Chi tiết đặt phòng
            </span>{" "}
            - #1231231238
          </div>
        </div>
        <div className="flex items-center md:justify-end justify-start ml-5 md:ml-0 md:mr-3">
          <button
            type="button"
            // onClick={showModalExtend}
            onClick={() => onCheckinBooking(dataBill?.data?.booking?.id)}
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Nhận phòng
          </button>
          <button
            type="button"
            onClick={showModalExtend}
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Gia hạn
          </button>
          <button
            type="button"
            onClick={() => onCheckoutBooking(dataBill?.data?.booking?.id)}
            className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Trả phòng
          </button>
          <button
            type="button"
            onClick={() => onCancelBooking(dataBill?.data?.booking?.id)}
            className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Huỷ phòng
          </button>
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
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Card title="Thông tin khách hàng" bordered={false}>
              <Form
                labelCol={{ span: 6 }}
                layout="horizontal"
                className="mt-5 mb-5"
              >
                <Form.Item label="Tên khách hàng">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Số điện thoại">
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Email">
                  <Input disabled />
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Card title="Thông tin phòng đang đặt" bordered={false}>
              <Form
                labelCol={{ span: 6 }}
                layout="horizontal"
                className="mt-5 mb-5"
              >
                <Form.Item label="Loại phòng">
                  <Select disabled>
                    <Select.Option value="demo">Demo</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Số phòng">
                  <InputNumber
                    disabled
                    min={1}
                    defaultValue={5}
                    className="w-full"
                  />
                </Form.Item>
                <Form.Item label="Ngày">
                  <DatePicker.RangePicker
                    disabled
                    className="w-full"
                    placeholder={["Check in", "Check out"]}
                  />
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Card title="Thông tin gia hạn" bordered={false}>
              <Form
                labelCol={{ span: 6 }}
                layout="horizontal"
                className="mt-5 mb-5"
              >
                <Form.Item label="Loại phòng">
                  <Select>
                    <Select.Option value="demo">Demo</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Số phòng gia hạn">
                  <InputNumber min={1} className="w-full" />
                </Form.Item>
                <Form.Item label="Ngày">
                  <DatePicker.RangePicker
                    className="w-full"
                    placeholder={["Check in", "Check out"]}
                  />
                </Form.Item>
              </Form>
              <Alert message="Còn 1 phòng trống" type="success" />
              <Alert message="Hết phòng" type="error" />
              <div className="flex justify-end mt-5">
                <Button className="mr-2" key={1}>
                  Thanh toán
                </Button>
                <Button key={2}>Kiểm tra</Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Modal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 mb-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow">
          <a href="#">
            <img
              className="rounded-t-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                Noteworthy technology acquisitions 2021
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 ">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className="grid md:grid-rows-1 grid-rows-1 gap-4">
          <div className="grid md:grid-cols-1 gap-4">
            <div className="block h-full p-6 bg-white border border-gray-200 rounded-lg shadow">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                Thông tin đặt phòng
              </h5>
              <div className="font-normal text-gray-700">
                <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside ">
                  <li>Chi nhánh: Đà Nẵng</li>
                  <li>Loại phòng: VIP</li>
                  <li>Check in: 12:00 10/10/2023</li>
                  <li>Check out: 14:00 15/10/2023</li>
                  <li>Số đêm: 6</li>
                  <li>Thời gian thanh toán: 10:51:52 05/09/2023</li>
                  <li>Hình thức thanh toán: Thanh toán qua ví điện tử MoMo</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
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
                  <li>
                    Email: {dataBill?.data?.booking?.representative?.email}
                  </li>
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
                    <Form
                      className="mt-5"
                      name="dynamic_form_nest_item"
                      onFinish={onFinish}
                      style={{ maxWidth: 600 }}
                      autoComplete="off"
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
                                  ]}
                                >
                                  <Input placeholder="Họ tên" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, "cccd"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Vui lòng nhập CCCD/CMTND",
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
        </div>
        <div>
          <div className="block h-full p-6 bg-white border border-gray-200 rounded-lg shadow ">
            <div className="flex justify-between items-center">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                Dịch vụ
              </h5>
              <Button onClick={showDrawer}>Thêm dịch vụ</Button>
            </div>
            <div className="mt-5 font-normal text-gray-700 max-h-[510px] overflow-auto">
              <ol className="relative border-l border-gray-200 ml-3">
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
                          13:00:02 11/10/2023
                        </time>
                        <div className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                          <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside">
                            <li>Dịch vụ: {service?.service_name}</li>
                            <li>Giá : {service?.price}</li>
                          </ul>
                        </div>
                      </li>
                    );
                  })
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
                services: dataBill?.data?.services.map((service: any) => {
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
                      <div>...Loading</div>
                    ) : (
                      dataServices?.data?.map((service: any) => {
                        return (
                          <Checkbox value={service?.id}>
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
                  Giá
                </th>
                <th scope="col" className="px-6 py-3">
                  Tạm tính
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Deluxe Room Horizon View - Room Only - Bf1
                </th>
                <td className="px-6 py-4">4</td>
                <td className="px-6 py-4">1,000,000 VNĐ</td>
                <td className="px-6 py-4">4,000,000 VNĐ</td>
              </tr>
              <tr className="bg-white border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Dịch vụ
                </th>
                <td className="px-6 py-4">4</td>
                <td className="px-6 py-4">500,000 VNĐ</td>
                <td className="px-6 py-4">2,000,000 VNĐ</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-white border-b ">
                <th></th>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4 font-bold">Tổng thanh toán</td>
                <td className="px-6 py-4">6,000,000 VNĐ</td>
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
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nhân viên
                </th>
                <th scope="col" className="px-6 py-3">
                  Thời gian thay đổi
                </th>
                <th scope="col" className="px-6 py-3">
                  Thay đổi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  <div className="flex items-center space-x-4">
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                      alt=""
                    />
                    <div className="font-medium">
                      <div>Jese Leos</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Joined in August 2014
                      </div>
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">12:00:00 12/10/2023</td>
                <td className="px-6 py-4">Thực hiện gia hạn phòng</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BillDetail;
