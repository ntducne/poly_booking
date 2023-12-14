import { Button, Form, Input, message } from "antd";
import Page from "../../components/Page";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../api/Auth";
import { cookies } from "../../config/cookie";
import { convertFromNowToSeconds } from "../../config/convertDate";

type Props = {};

export default function Login({}: Props) {
  const navigate = useNavigate();
  const [Login, { isLoading }] = useLoginMutation();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    if (values) {
      Login(values)
        .unwrap()
        .then((values: any) => {
          if (values.accessToken && values.user) {
            cookies().Set(
              "userInfo",
              JSON.stringify(Object.values(values)),
              convertFromNowToSeconds(values.accessToken.expires_at)
            );
            message.success("Đăng nhập thành công");
            setTimeout(() => {
              navigate("/");
            }, 1000);
          } else {
            message.error(
              "Thông tin đăng nhập không đúng. Vui lòng kiểm tra lại."
            );
          }
        })
        .catch((error: any) => {
          console.log(error);
          message.error(error?.data?.message || "some thing error");
          setTimeout(() => {
            form.resetFields();
          }, 1000);
        });
    }
  };

  const loginGoogle = () => {
    location.href = `${import.meta.env.VITE_URL_AUTH}/login/google`;
  };

  return (
    <Page title="Đăng nhập">
      <div className="flex items-center justify-center h-[100vh] lg:h-full md:h-screen bg-bgr">
        <section className=" h-screen pt-12">
          <div className="  items-center justify-center">
            <div className=" w-[300px] h-[600px] lg:h-[600px] lg:w-[1050px] md:h-[450px] md:w-[725px] bg-white rounded-md shadow-2xl">
              <div className="md:flex md:flex-wrap md:items-center lg:flex lg:flex-wrap lg:items-center lg:gap-5 md:gap-2">
                <div className="shrink-1 mb-12 grow-0 basis-auto lg:w-6/12 xl:w-6/12 md:w-6/12">
                  <img
                    src="https://cdn.alongwalk.info/vn/wp-content/uploads/2022/03/12183725/image-7-khach-san-5-sao-vung-tau-view-bien-cuc-dep-164705984460476.jpg"
                    className=" h-[150px] w-[300px] lg:w-full lg:h-[600px] md:h-[450px] md:w-full border rounded-md"
                    alt="Sample image"
                  />
                </div>

                <div className="w-5/6 mx-6 md:mb-12 lg:w-5/12 xl:w-5/12 md:w-5/12">
                  <Form
                    name="validateOnly"
                    layout="vertical"
                    autoComplete="off"
                    form={form}
                    onFinish={onFinish}
                  >
                    <div className="flex flex-row items-center justify-center lg:justify-start">
                      <p className="mb-0 mr-4 text-normal">Đăng nhập bằng</p>
                      <button
                        onClick={loginGoogle}
                        type="button"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        className="mx-1 h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 hover:text-blue-500 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mx-auto"
                          x="0px"
                          y="0px"
                          width="25"
                          height="25"
                          viewBox="0 0 48 48"
                        >
                          <path
                            fill="#FFC107"
                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                          ></path>
                          <path
                            fill="#FF3D00"
                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                          ></path>
                          <path
                            fill="#4CAF50"
                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                          ></path>
                          <path
                            fill="#1976D2"
                            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                          ></path>
                        </svg>
                      </button>
                    </div>

                    <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                      <p className="mx-4 mb-0 text-center text-small font-semibold dark:text-white">
                        Hoặc
                      </p>
                    </div>

                    <div className="relative mb-6" data-te-input-wrapper-init>
                      <Form.Item
                        name="email"
                        label={
                          <span className="text-gray-500 text-small">
                            Email
                          </span>
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

                    <div className="relative mb-6" data-te-input-wrapper-init>
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
                        <Input.Password className="bg-transparent border rounded w-full h-[35px] " />
                      </Form.Item>
                    </div>

                    <div className="mb-6 flex items-center justify-between">
                      <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                        <input
                          className=" relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          type="checkbox"
                          value=""
                          id="exampleCheck2"
                        />
                        <label className=" inline-block hover:cursor-pointer">
                          Nhớ tôi cho lần đăng nhập sau
                        </label>
                      </div>

                      <Link to="/auth/forGotPassword">Quên mật khẩu?</Link>
                    </div>

                    <div className="text-small lg:text-left">
                      <div className="text-small lg:text-left flex justify-center">
                        <Button
                          htmlType="submit"
                          loading={isLoading}
                          className="bg-primary hover:border hover:border-black-500 text-white !hover:text-white !hover:bg-black-500 active:bg-black w-[200px] h-[35px] justify-center flex items-center border rounded-[5px] transition-transform transform hover:scale-95"
                        >
                          <div className="text-white hover:text-red block ">
                            {isLoading ? "Đang đăng nhập" : "Đăng nhập"}
                          </div>
                        </Button>
                      </div>

                      <p className="mb-0 mt-2 pt-1 text-sm font-semibold flex gap-2">
                        Bạn chưa có tài khoản?
                        <Link
                          to="/auth/register"
                          className="text-danger text-blue-500 transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                        >
                          Đăng ký
                        </Link>
                      </p>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
}
