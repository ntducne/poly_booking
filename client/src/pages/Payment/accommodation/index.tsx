import type { CollapseProps } from "antd";
import { Button, Card, Collapse, Form, Input, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  useGetProfileQuery
} from "../../../api/User";
import { useLoginMutation } from "../../../api/Auth";
import { cookies } from "../../../config/cookie";
import { convertFromNowToSeconds } from "../../../config/convertDate";
import { Link, useNavigate } from "react-router-dom";
import FormatPrice from "../../../utils/FormatPrice";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)




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
  const { data } = useGetProfileQuery({});
  const [Login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()

  useEffect(() => {
    setCookie("paymentPage", 0, { path: "/" });
    if(!cookie?.bookingNow || !cookie?.roomSearch) {
      navigate('/')
    }
    if (cookie?.userInfo) {
      if (data && data.message) {
        setUserName(data.message.name);
        setUserEmail(data.message.email);
        setUserPhone(data.message.phone);
        setCookie(
          "userBook",
          {
            name: data.message.name,
            email: data.message.email,
            phone: data.message.phone,
          },
          { path: "/" }
        );
      } 
      else {
        setUserName(cookie?.userBook?.name);
        setUserEmail(cookie?.userBook?.email);
        setUserPhone(cookie?.userBook?.phone);
        setCookie("userBook", {}, { path: "/" });
      }
    }
  }, []);


  const itemsColapper: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold">Thành tiền</p>
          <p className="text-xl font-bold">{<FormatPrice price={cookie?.bookingNow?.price}/>}</p>
        </div>
      ),
      children: (
        <div className="flex justify-between items-center">
          <p className="text-sm">
            ({cookie?.roomSearch?.soLuong}x) {cookie?.bookingNow?.room_name}
          </p>
          <p className="text-sm">{<FormatPrice price={cookie?.bookingNow?.price}/>}</p>
        </div>
      ),
    },
  ];

  const handleNameChange = (e: any) => {
    setUserName(e.target.value);
    setCookie(
      "userBook",
      { ...cookie?.userBook, name: e.target.value },
      { path: "/" }
    );
  };

  const handlePhoneChange = (e: any) => {
    setUserPhone(e.target.value);
    setCookie(
      "userBook",
      { ...cookie?.userBook, phone: e.target.value },
      { path: "/" }
    );
  };

  const handleEmailChange = (e: any) => {
    setUserEmail(e.target.value);
    setCookie(
      "userBook",
      { ...cookie?.userBook, email: e.target.value },
      { path: "/" }
    );
  };

 
  const showModalLogin = () => {
    setIsModalLogin(true);
  };

  const handleOk = () => {
    setIsModalLogin(false);
  };

  const handleCancel = () => {
    setIsModalLogin(false);
  };


  const onSubmitLogin = (values: any) => { 
    Login(values)
      .unwrap()
      .then((values: any) => {
        if (values.accessToken && values.user) {
          cookies().Set(
            "userInfo",
            JSON.stringify(Object.values(values)),
            convertFromNowToSeconds(values.accessToken.expires_at)
          );
          handleCancel()
          message.success("Đăng nhập thành công");
        } else {
          message.error("Thông tin đăng nhập không đúng. Vui lòng kiểm tra lại.");
        }
      }).catch((error: any) => {
        console.log(error);
        message.error(error?.data?.message || "some thing error");
      })
  }

  const accommodationReview = () => {
    if(userName == '' || userPhone == '' || userEmail == '') {
      message.error("Vui lòng nhập đầy đủ thông tin liên hệ")
      return
    }
    MySwal.fire({
      imageUrl: '/logo_light.png',
      imageWidth: 100,
      imageHeight: 70,

      // title: <p>Hello World</p>,
      // icon: "info",
      html: `
        <div className="text-left">
          <p>Thông tin bạn điền đã chính xác chưa?</p>
          <ul>
            <li>Họ và tên: ${userName}</li>
            <li>Số điện thoại: ${userPhone}</li>
            <li>Email: ${userEmail}</li>
          </ul>
          <p>Vé điện tử/phiếu thanh toán sẽ được gửi qua email và tóm tắt đặt chỗ sẽ được gửi đến số di động của bạn.</p>
        </div>
      `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `
        Thông tin đã chính xác
      `,
      cancelButtonText: `
        Thay đổi
      `,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/accommodation/review')
        setCookie("paymentPage", 1, { path: "/" });
      } else {
        // return MySwal.fire("Cancelled", "", "error");
      }
      // return MySwal.fire(<p>Shorthand works too</p>)
    })
    // navigate('/accommodation/review')
    // setCookie("paymentPage", 1, { path: "/" });
  }

  const cancelBooking = () => { 
    navigate('/rooms')
    removeCookie("paymentPage", { path: "/" });
    removeCookie("bookingNow", { path: "/" });
    removeCookie("roomSearch", { path: "/" });
    removeCookie("userInfo", { path: "/" });
  }

  return (
    <>
      {!cookie?.userInfo && (
        <Modal title="Đăng nhập" open={isModalLogin} onOk={handleOk} onCancel={handleCancel} footer={[]}>
          <Form name="basic" className="mt-5" onFinish={onSubmitLogin} autoComplete="off">
            <Form.Item<FieldType> name="email"
              rules={[
                { required: true, message: "Vui lòng nhập địa chỉ Email!" },
                { type: "email", message: "Địa chỉ email không hợp lệ!" },
              ]}
            >
              <Input type="email" placeholder="Email" />
            </Form.Item>
            <Form.Item<FieldType> name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
              <Input.Password className="w-full" placeholder="Mật khẩu"/>
            </Form.Item>
            <div className="flex justify-between">
              <Form.Item><Button htmlType="submit" className="max-w-[200px]" loading={isLoading}>Đăng nhập</Button></Form.Item>
              <Link to="/auth/forGotPassword">Quên mật khẩu ?</Link>
            </div>
            <div>
              Chưa có tài khoản ? <Link to="/auth/register">Đăng ký ngay</Link>
            </div>
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
            {!cookie?.userInfo && (
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

            <div className={`${!cookie?.userInfo && "mt-6"}`}>
              <h1 className="text-xl font-bold mb-3">
                Chi tiết liên hệ
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
                    <div className="mt-1 text-gray-400 hidden">
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
                      <div className="mt-1 text-gray-400 hidden">
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
                      <div className="mt-1 text-gray-400 hidden">
                        VD: email@example.com
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
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

            <div className="w-full flex justify-end mt-6">
              <button onClick={cancelBooking} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white ">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                  Quay lại
                </span>
              </button>
              <button type="button" onClick={accommodationReview} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-blfont-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Tiếp tục</button>
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
                      {cookie?.bookingNow?.branch}
                    </h5>
                    <p className="font-normal text-gray-700 flex">
                      {cookie?.bookingNow?.branch}
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
                style={{ display: "grid", gridTemplateColumns: "2fr 3fr" }}
              >
                <p className="mb-1">Nhận phòng</p>
                <p className="font-bold text-xs mt-1">
                  {cookie?.roomSearch?.checkin} - Từ 12:00
                </p>
              </div>
              <div
                className="grid"
                style={{ display: "grid", gridTemplateColumns: "2fr 3fr" }}
              >
                <p>Trả phòng</p>
                <p className="font-bold text-xs mt-1">
                  {cookie?.roomSearch?.checkout} - Trước 14:00
                </p>
              </div>
            </Card>
            <Card
              className="mt-2"
              title={
                <div className="flex items-center">
                  <img
                    className="w-14 h-14 rounded-md"
                    src={cookie?.bookingNow?.image}
                    alt=""
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className=" text-md font-bold tracking-tight text-gray-900">
                      {cookie?.bookingNow?.room_name}
                    </h5>
                    <p className="font-normal text-gray-700 flex">
                      ({cookie?.roomSearch?.soLuong}x){" "}
                      {cookie?.bookingNow?.room_name}
                    </p>
                  </div>
                </div>
              }
            >
              <div className="grid" style={{
                display: 'grid',
                gridTemplateColumns: '2fr 3fr',
              }}>
                <p>Khách/phòng</p>
                <p className='font-bold'>2 khách</p>
              </div>
              <div className="grid" style={{
                display: 'grid',
                gridTemplateColumns: '2fr 3fr',
              }}>
                <p>Kiểu giường</p>
                <p className='font-bold'>2 giường đôi</p>
              </div>
            </Card>
          </div>
        </div>
        
      </div>
    </>
  );
}
