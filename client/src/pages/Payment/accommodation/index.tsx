import type { CollapseProps } from "antd";
import { Button, Card, Checkbox, Col, Collapse, Form, Input, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  useGetProfileQuery
} from "../../../api/User";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

export default function AccommodationBook() {
  const [isModalLogin, setIsModalLogin] = useState(false);
  // const [isModalRegister, setIsModalRegister] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies([
    "paymentPage",
    "bookingNow",
    "roomSearch",
    "userInfo",
    "userBook",
  ]);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [, setUserBook] = useState({});
  const { data } = useGetProfileQuery({});
  const itemsColapper: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold">Thành tiền</p>
          <p className="text-xl font-bold">{cookie.bookingNow.price} VNĐ</p>
        </div>
      ),
      children: (
        <div className="flex justify-between items-center">
          <p className="text-sm">
            ({cookie.roomSearch.soLuong}x) {cookie.bookingNow.room_name}
          </p>
          <p className="text-sm">{cookie.bookingNow.price} VNĐ</p>
        </div>
      ),
    },
  ];

  const handleNameChange = (e: any) => {
    setUserName(e.target.value);
    setCookie(
      "userBook",
      { ...cookie.userBook, name: e.target.value },
      { path: "/" }
    );
    setUserBook(cookie.userBook);
  };

  const handlePhoneChange = (e: any) => {
    setUserPhone(e.target.value);
    setCookie(
      "userBook",
      { ...cookie.userBook, phone: e.target.value },
      { path: "/" }
    );
    setUserBook(cookie.userBook);
  };

  const handleEmailChange = (e: any) => {
    setUserEmail(e.target.value);
    setCookie(
      "userBook",
      { ...cookie.userBook, email: e.target.value },
      { path: "/" }
    );
    setUserBook(cookie.userBook);
  };

  useEffect(() => {
    removeCookie("paymentPage", { path: "/" });

    if (cookie.userInfo) {
      if (data && data.message) {
        setUserName(data.message.name);
        setUserEmail(data.message.email);
        setUserPhone(data.message.phone);
        setUserBook({
          name: data.message.name,
          email: data.message.email,
          phone: data.message.phone,
        });
        setCookie(
          "userBook",
          {
            name: data.message.name,
            email: data.message.email,
            phone: data.message.phone,
          },
          { path: "/" }
        );
      } else {
        setUserName("");
        setUserEmail("");
        setUserPhone("");
        setUserBook({});
        setCookie("userBook", {}, { path: "/" });
      }
    }
  }, []);

  const showModalLogin = () => {
    setIsModalLogin(true);
  };

  const handleOk = () => {
    setIsModalLogin(false);
  };

  const handleCancel = () => {
    setIsModalLogin(false);
  };

  return (
    <>
      {!cookie.userInfo && (
        <Modal
          title="Đăng nhập"
          open={isModalLogin}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[]}
        >
          <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập địa chỉ Email!" },
                { type: "email", message: "Địa chỉ email không hợp lệ!" },
              ]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item<FieldType>
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item className="flex justify-around">
              <Button htmlType="submit" className="max-w-[200px]">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
      <div className="container mx-auto" style={{ maxWidth: 1000 }}>
        <div className="mt-12 mb-8">
          <h1 className="text-2xl font-bold mb-3">Đặt phòng khách sạn</h1>
          <h5 className="text-md font-bold text-gray-500">
            Hãy chắc chắn rằng tất cả thông tin trên trang này là chính xác
            trước khi tiến hành thanh toán.
          </h5>
        </div>
        <div
          className="grid pb-4"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gridGap: "1rem",
          }}
        >
          <div>
            {!cookie.userInfo && (
              <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row">
                <img
                  className="object-cover w-full rounded-t-lg h-60 md:h-auto md:w-20 md:rounded-none md:rounded-l-lg ml-5"
                  src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/334a43706b543daaa27995a60d895f2a.png"
                  alt=""
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900">
                    Đăng nhập hoặc Đăng ký và tận hưởng ưu đãi dành riêng cho
                    thành viên
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 flex">
                    <img
                      className="mr-2"
                      src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/5/513ab8104dcf3ae7a42419cba432351d.svg"
                      alt=""
                    />{" "}
                    Đặt chỗ nhanh và dễ dàng hơn với Passenger Quick Pick
                  </p>
                  <Button className="max-w-[200px]" onClick={showModalLogin}>
                    Đăng nhập hoặc đăng ký
                  </Button>
                </div>
              </div>
            )}

            <div className={`${!cookie.userInfo && "mt-6"}`}>
              <h1 className="text-xl font-bold mb-3">
                Chi tiết liên hệ (cho Vé điện tử/Phiếu xác nhận)
              </h1>
              <div className="bg-white rounded-md border border-gray-200 shadow-sm">
                <div className="p-5">
                  <div className="mb-3">
                    <label
                      htmlFor="text"
                      className="font-bold block mb-2 text-sm text-gray-900"
                    >
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={handleNameChange}
                      id="text"
                      className="border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                    />
                    <div className="mt-1 text-gray-400">
                      *Nhập tên như trên CMND/hộ chiếu (không dấu)
                    </div>
                  </div>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="font-bold block mb-2 text-sm text-gray-900"
                      >
                        Số điện thoại
                      </label>
                      <input
                        type="phone"
                        value={userPhone}
                        onChange={handlePhoneChange}
                        id="phone"
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                      />
                      <div className="mt-1 text-gray-400">
                        VD: +84 901234567 trong đó (+84) là mã quốc gia còn
                        901234567 là số di động
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="font-bold block mb-2 text-sm text-gray-900"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        value={userEmail}
                        onChange={handleEmailChange}
                        id="email"
                        className="border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                      />
                      <div className="mt-1 text-gray-400">
                        VD: email@example.com
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>

            <div className="mt-6">
              <h1 className="text-xl font-bold mb-3">Yêu cầu đặc biệt</h1>
              <div className="">
                <Card
                  title={
                    <div className="text-xs">
                      Cơ sở lưu trú sẽ cố gắng đáp ứng yêu cầu của bạn dựa trên
                      tình trạng sẵn có. <br /> Lưu ý rằng bạn có thể phải trả
                      thêm phí cho một số yêu cầu và bạn không thể sửa yêu cầu
                      sau khi đã gửi.
                    </div>
                  }
                  headStyle={{
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <div className="">
                    <Checkbox.Group style={{ width: "100%" }}>
                      <Row>
                        <Col span={8}>
                          <Checkbox value="A">Phòng không hút thuốc</Checkbox>
                        </Col>
                        <Col span={8}>
                          <Checkbox value="B">Tầng lầu</Checkbox>
                        </Col>
                        <Col span={8}>
                          <Checkbox value="C">Phòng liên thông</Checkbox>
                        </Col>
                        <Col span={8}>
                          <Checkbox value="D">Loại giường</Checkbox>
                        </Col>
                        <Col span={8}>
                          <Checkbox value="E">Giờ nhận phòng</Checkbox>
                        </Col>
                        <Col span={8}>
                          <Checkbox value="F">Giờ trả phòng</Checkbox>
                        </Col>
                        <Col span={8}>
                          <Checkbox value="G">Khác</Checkbox>
                        </Col>
                      </Row>
                    </Checkbox.Group>
                  </div>
                </Card>
              </div>
            </div>

            <div className="mt-6 ">
              <h1 className="text-xl font-bold mb-3">
                Chính sách hủy đặt phòng
              </h1>
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <div className="mb-5">
                  <p className="text-md font-bold mb-1">
                    Có áp dụng chính sách hủy phòng
                  </p>
                  <p className="text-gray-500">
                    Hủy đặt phòng này có thể phải chịu một khoản phí hủy phòng
                    nhất định.
                  </p>
                </div>
                <div>
                  <p className="text-md font-bold mb-1">Có thể đổi lịch</p>
                  <p className="text-gray-500">
                    Đặt phòng này có thể đổi lịch nhưng bạn có thể phải chịu một
                    khoản phí hủy.
                  </p>
                  <ul className="mt-2 space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                    <li>
                      Bất kỳ mã giảm giá hoặc điểm đã sử dụng trong đặt phòng
                      ban đầu sẽ không thể áp dụng cho đặt phòng mới.
                    </li>
                    <li>
                      Phí đổi lịch có thể được áp dụng dựa trên sự chênh lệch
                      giá giữa đặt phòng cũ và mới.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h1 className="text-xl font-bold mb-3">
                Tiện Ích Bổ Sung cho Kỳ Nghỉ Của Bạn
              </h1>
              <div className="">
                <Card
                  title={
                    <div className="">
                      <Checkbox value="AFF">
                        Bảo hiểm Du lịch Chubb - Hotel Protect
                      </Checkbox>
                      <p className="text-gray-500 text-xs">
                        Bảo vệ kỳ nghỉ của Quý khách khỏi rủi ro bị hủy, mất đặt
                        phòng khách sạn, và hơn thế nữa
                      </p>
                    </div>
                  }
                >
                  <div className="">
                    <ul className="space-y-4 text-left">
                      <li className="flex items-center space-x-3">
                        <svg
                          className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 16 12"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5.917 5.724 10.5 15 1.5"
                          />
                        </svg>
                        <span>
                          Bảo hiểm lên đến tối đa VND 850,000/phòng/đêm cho
                          Quyền lợi Hủy hoặc Gián đoạn Đặt phòng khách sạn.
                        </span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <svg
                          className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 16 12"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5.917 5.724 10.5 15 1.5"
                          />
                        </svg>
                        <span>
                          Bảo hiểm lên đến tối đa VND 850,000/phòng/đêm cho
                          Quyền lợi Đặt phòng khách sạn.
                        </span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <svg
                          className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 16 12"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5.917 5.724 10.5 15 1.5"
                          />
                        </svg>
                        <span>
                          Bảo hiểm lên đến VND 210,000,000 cho Quyền lợi Tai nạn
                          cá nhân
                        </span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <svg
                          className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 16 12"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5.917 5.724 10.5 15 1.5"
                          />
                        </svg>
                        <span>
                          Bảo hiểm lên đến VND 20,000,000 cho Quyền lợi Mất hoặc
                          hư hại hành lý, quần áo và vật dụng cá nhân
                        </span>
                      </li>
                    </ul>
                  </div>
                </Card>
              </div>
            </div>

            <div className="mt-6">
              <h1 className="text-xl font-bold mb-3">Chi tiết giá</h1>
              <div className="w-full h-auto border rounded-md">
                <Collapse
                  expandIconPosition="end"
                  ghost
                  items={itemsColapper}
                />
              </div>
            </div>
          </div>
          <div>
            <Card
              title={
                <div className="flex">
                  <img
                    src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/6aa2fd01a9460e1a71bb0efb713f0212.svg"
                    alt=""
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className=" text-md font-bold tracking-tight text-gray-900">
                      {cookie.bookingNow.branch}
                    </h5>
                    <p className="font-normal text-gray-700 flex">
                      {cookie.bookingNow.branch}
                    </p>
                  </div>
                </div>
              }
              bodyStyle={{
                backgroundColor: "#f5f5f5",
              }}
            >
              <div
                className="grid"
                style={{ display: "grid", gridTemplateColumns: "3fr 3fr" }}
              >
                <p>Ngày nhận phòng</p>
                <p className="font-bold">
                  {cookie.roomSearch.checkin} - Từ 12:00
                </p>
              </div>
              <div
                className="grid"
                style={{ display: "grid", gridTemplateColumns: "3fr 3fr" }}
              >
                <p>Ngày trả phòng</p>
                <p className="font-bold">
                  {cookie.roomSearch.checkout} - Trước 14:00
                </p>
              </div>
            </Card>
            <Card
              className="mt-2"
              title={
                <div className="flex items-center">
                  <img
                    className="w-14 h-14 rounded-md"
                    src={cookie.bookingNow.image}
                    alt=""
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className=" text-md font-bold tracking-tight text-gray-900">
                      {cookie.bookingNow.room_name}
                    </h5>
                    <p className="font-normal text-gray-700 flex">
                      ({cookie.roomSearch.soLuong}x){" "}
                      {cookie.bookingNow.room_name}
                    </p>
                  </div>
                </div>
              }
            >
              {/* <div className="grid" style={{
                                display: 'grid',
                                gridTemplateColumns: '2fr 3fr',
                            }}>
                                <p>khách/phòng</p>
                                <p className='font-bold'>2 khách</p>
                            </div>

                            <div className="grid" style={{
                                display: 'grid',
                                gridTemplateColumns: '2fr 3fr',
                            }}>
                                <p>Kiểu giường</p>
                                <p className='font-bold'>2 giường đôi</p>
                            </div> */}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
