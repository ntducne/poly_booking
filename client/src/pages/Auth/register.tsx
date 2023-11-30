import { Button, Form, Input, message } from "antd";
import Page from "../../components/Page";
import { useRegisterMutation } from "../../api/Auth";
import { Link, useNavigate } from "react-router-dom";

type Props = {};

export default function Register({}: Props) {
  const [Register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Dữ liệu biểu mẫu:", values);
    // Thực hiện logic đăng ký ở đây
    if (values) {
      Register(values)
        .unwrap()
        .then((response) => {
          if (
            response.status === false &&
            response.message === "Validation errors"
          ) {
            // Có lỗi validation
            const errorData = response.error;

            if (errorData.email) {
              // Email đã được sử dụng
              message.error(errorData.email);
            } else {
            }
          } else {
            console.log(response);
            message.success("Đăng ký thành công");
            setTimeout(() => {
              navigate("/auth/login");
            }, 1000);
          }
        })
        .catch((error) => {
          console.log(error);
          message.error(error?.data?.error?.email || "some thing error");
        });
    }
  };

  const passwordValidator = (_: any, value: any) => {
    if (value && value.length <= 7) {
      return Promise.reject("Mật khẩu phải có ít nhất 8 ký tự");
    }
    return Promise.resolve();
  };

  const phonePattern = /^(?:\d{10}|\d{11})$/;
  const validatePhoneNumber = (_: any, value: any) => {
    if (!phonePattern.test(value)) {
      return Promise.reject("Số điện thoại không hợp lệ!");
    }
    return Promise.resolve();
  };

  const confirmPasswordValidator = (_: any, value: any) => {
    if (value && value !== form.getFieldValue("password")) {
      return Promise.reject("Không trùng khớp với mật khẩu.");
    }
    return Promise.resolve();
  };

  return (
    <Page title="Đăng ký">
      <div className="flex items-center justify-center h-[115vh] bg-bgr">
        <section className="h-screen">
          <div className="flex items-center justify-center">
            <div className="h-[730px] w-[290px] lg:h-[700px] lg:w-[950px] md:h-[650px] md:w-[700px] bg-white rounded-md shadow-2xl hover:shadow-2xl">
              <div className="g-6 flex h-[22px] flex-wrap items-center gap-12">
                <div className="card rounded-3">
                  <img
                    src="https://bizweb.dktcdn.net/100/456/685/themes/865471/assets/img_banner_col_1.jpg?1668419812840"
                    className="w-[290px] lg:h-[300px] lg:w-[950px] md:h-[250px] md:w-[700px] border rounded-t-md"
                    alt="Sample image"
                  />
                  <div className="flex justify-center">
                    <div className="mt-8 ">
                      <Form
                        name="validateOnly"
                        layout="vertical"
                        autoComplete="off"
                        form={form}
                        onFinish={onFinish}
                      >
                        <div className="lg:flex lg:gap-8 md:flex md:gap-8">
                          <div className="relative" data-te-input-wrapper-init>
                            <Form.Item
                              name="name"
                              label={
                                <span className="text-gray-500 text-small">
                                  Tên
                                </span>
                              }
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập tên!",
                                },
                              ]}
                            >
                              <Input className="bg-transparent border rounded w-[250px] h-[35px] lg:w-[350px]" />
                            </Form.Item>
                          </div>
                          <div className="relative" data-te-input-wrapper-init>
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
                                  message: "Vui lòng nhập địa chỉ email!",
                                },
                                {
                                  type: "email",
                                  message: "Địa chỉ email không hợp lệ!",
                                },
                              ]}
                            >
                              <Input className="bg-transparent border rounded w-[250px] h-[35px] lg:w-[350px]" />
                            </Form.Item>
                          </div>
                        </div>
                        <div className="lg:flex lg:gap-8 md:flex md:gap-8">
                          <div className="relative" data-te-input-wrapper-init>
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
                                  validateTrigger: ["onBlur"],
                                },
                                {
                                  validator: passwordValidator,
                                },
                              ]}
                            >
                              <Input.Password className="bg-transparent border rounded w-[250px] h-[35px] lg:w-[350px]" />
                            </Form.Item>
                          </div>

                          <div className="relative" data-te-input-wrapper-init>
                            <Form.Item
                              name="password_confirmation"
                              label={
                                <span className="text-gray-500 text-small">
                                  Nhập lại mật khẩu
                                </span>
                              }
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng xác nhận mật khẩu!",
                                },
                                {
                                  validator: confirmPasswordValidator,
                                },
                              ]}
                            >
                              <Input.Password className="bg-transparent border rounded w-[250px] h-[35px] lg:w-[350px]" />
                            </Form.Item>
                          </div>
                          {/* <div className="col-md-6 mb-4">
                                                        <h6 className="mb-2 pb-1 text-gray-500 text-small">Gender: </h6>
                                                        <div className="flex gap-8">
                                                            <div className="flex items-center">
                                                                <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <input checked id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <input checked id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Other</label>
                                                            </div>
                                                        </div>
                                                    </div> */}
                        </div>
                        <div className="lg:flex lg:gap-8 md:flex md:gap-8">
                          <div className="relative" data-te-input-wrapper-init>
                            <Form.Item
                              name="phone"
                              label={
                                <span className="text-gray-500 text-small">
                                  Số điện thoại
                                </span>
                              }
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập số điện thoại!",
                                },
                                {
                                  validator: validatePhoneNumber,
                                },
                              ]}
                            >
                              <Input className="bg-transparent border rounded w-[250px] h-[35px] lg:w-[350px]" />
                            </Form.Item>
                          </div>
                          <div className="text-center lg:text-left mt-[34px]">
                            <div className="text-small lg:text-left flex justify-center">
                              <Button
                                htmlType="submit"
                                loading={isLoading}
                                className="bg-primary hover:border hover:border-black-500 text-white !hover:text-white !hover:bg-black-500 active:bg-black w-[200px] h-[35px] justify-center flex items-center border rounded-[5px] transition-transform transform hover:scale-95"
                              >
                                <div className="text-white hover:text-red block ">
                                  {isLoading ? "Đang đăng ký" : "Đăng ký"}
                                </div>
                              </Button>
                            </div>

                            <p className="mb-0 lg:mt-[10px] md:mt-[10px] text-sm font-semibold flex gap-2">
                              Bạn đã có tài khoản?
                              <Link
                                to="/auth/login"
                                className="text-danger text-blue-500 transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                              >
                                Đăng nhập
                              </Link>
                            </p>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Page>
  );
}
