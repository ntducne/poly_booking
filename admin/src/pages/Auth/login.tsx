import { Button, Form, Input, message } from "antd";
import Page from "../../component/page";
import { Navigate, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/auth";
import { cookies } from "../../config/cookies";
import { useState } from "react";
import { convertFromNowToSeconds } from "../../config/convertDate";

export default function LoginAdmin() {
  const userPermissions = JSON.parse(cookies().Get("AuthUser") as any);
  if (userPermissions) {
    return <Navigate to="/" />;
  }
  const [form] = Form.useForm();
  const [Login] = useLoginMutation();
  const navigate = useNavigate();
  const [is_loading, setIsLoading] = useState(false);
  const onFinish = async (values: any) => {
      try {
          setIsLoading(true)
          const data: any = await Login(values);
          const response = data.data
          if(data.error){
              message.error(data.error.data.message)
              setIsLoading(false)
          }

          if(response){
              if (response.status === false) {
                  message.error(response.message)
                  setIsLoading(false)
              }
              if (response.status === true) {
                  message.success('Đăng nhập thành công')
                  cookies().Set('AuthUser', JSON.stringify(Object.values(response)), convertFromNowToSeconds(response.accessToken.expires_at))
                  navigate('/')
              }
          }            
          
      } catch (error) {
          console.log(error);
          setIsLoading(false)

      }
      
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Page title="Đăng nhập admin">
      <div className="flex items-center justify-center h-[125vh] lg:h-screen md:h-screen bg-bgr bg-cover">
        <section className="h-screen">
          <div className="flex items-center justify-center h-full">
            <div className="row md:flex md:gap-4 lg:flex lg:gap-12 h-[580px] w-[320px] lg:w-[950px] lg:h-[550px] md:w-[720px] md:h-[450px] items-center align-items-center justify-content-center h-100 bg-white rounded-md  shadow-2xl  lg:hover:z-10 lg:transition-transform lg:duration-500 ">
              <div className="col-md-8 col-lg-7 col-xl-6">
                <img
                  src="https://res.cloudinary.com/dteefej4w/image/upload/v1697122707/image_login_bobtzs.png"
                  className="mx-auto img-fluid w-[320px] h-[180px] lg:w-[470px] lg:h-[550px] md:h-[450px] md:w-[350px] border rounded-md"
                  alt="ImageLogin"
                />
              </div>
              <div className="mx-5 col-md-7 col-lg-5 col-xl-5 offset-xl-1 w-[280px] lg:w-[350px]">
                <div className="mb-6 flex justify-center">
                  <div className="flex items-center mb-2 text-xl font-semibold text-gray-900">
                    <img
                      className="w-32 h-30 mr-6"
                      src="https://res.cloudinary.com/dteefej4w/image/upload/v1696338661/logo_30_zwmslg.png"
                      alt="logo"
                    />
                    <p className="text-md font-bold leading-tight tracking-tight text-gray-900">
                      Đăng nhập
                      <br />{" "}
                      <span className="text-sm">
                        Hệ thống quản lý khách sạn
                      </span>
                    </p>
                  </div>
                </div>
                <Form
                  name="validateOnly"
                  layout="vertical"
                  autoComplete="off"
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <div className="relative mb-6" data-te-input-wrapper-init>
                    <Form.Item
                      name="email"
                      label={
                        <span className="text-gray-500 text-small">Email</span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập địa chỉ Email!",
                        },
                        {
                          type: "email",
                          message: "Địa chỉ email không hợp lệ!",
                        },
                      ]}
                    >
                      <Input className="bg-transparent border rounded w-full h-[35px]" />
                    </Form.Item>
                  </div>
                  <div className="relative mb-8" data-te-input-wrapper-init>
                    <Form.Item
                      name="password"
                      label={
                        <span className="text-gray-500 text-small">
                          Mật khẩu
                        </span>
                      }
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu!",
                        },
                        {
                          min: 8,
                          message: "Mật khẩu phải có ít nhất 8 ký tự!",
                        },
                      ]}
                    >
                      <Input.Password className="bg-transparent border rounded w-full h-[35px]" />
                    </Form.Item>
                  </div>
                  <div className="text-small lg:text-left flex justify-center">
                    <Button
                      htmlType="submit"
                      type="primary"
                      loading={is_loading}
                      className="bg-primary w-[200px] h-[35px] active:bg-black justify-center flex items-center border rounded-[5px] transition-transform transform hover:scale-95"
                    >
                      {is_loading ? "Đang đăng nhập" : "Đăng nhập"}
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
}
