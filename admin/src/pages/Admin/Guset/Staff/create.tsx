import { useState } from "react";
import { Form, Input, Upload, Button, message, Typography, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { BiReset } from "react-icons/bi";
import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCreateStaffsMutation } from "../../../../api/account/staffs";

const { Title, Text } = Typography;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const CreateStaff = () => {
  const navigate = useNavigate();

  const [createStaffs, { isLoading: isLoadingCreate }] =
    useCreateStaffsMutation();

  const onFinish = (values: any) => {
    const formUpload = new FormData();
    const uploadedFiles = values.images.map(
      (fileInfo: any) => fileInfo.originFileObj
    );
    for (let i = 0; i < uploadedFiles.length; i++) {
      formUpload.append("image", uploadedFiles[i]);
    }

    const data = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      password: values.password,
      image: values.images[0].originFileObj,
      role: "staff",
    };
    delete data.image;

    for (const [key, value] of Object.entries(data)) {
      formUpload.append(`${key}`, `${value}`);
    }
    createStaffs(formUpload)
      .unwrap()
      .then((item: any) => {
        if (item.status == "success") {
          toast("Thêm mới thành công", {
            autoClose: 3000,
            theme: "light",
          });
          navigate("/staff");
        } else {
          console.log(item);
          toast(item?.error?.name || "Lỗi", {
            autoClose: 3000,
            theme: "light",
          });
        }
      });
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const [fileList, setFileList] = useState([]);

  const dummyRequest = ({ onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleBeforeUpload = (file: any) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Bạn chỉ có thể tải lên file JPG/PNG!");
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error("Kích thước hình ảnh không được vượt quá 10MB!");
    }
    return isJpgOrPng && isLt10M;
  };

  const handleOnChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  return (
    <div>
      <div className="max-w-[80%] mr-auto ml-10">
        <div className="mb-5">
          <Title level={3}>Thêm nhân viên</Title>
        </div>

        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          className="mx-auto max-w-3xl grid grid-cols-1 xl:grid-cols-1"
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên!" },
              { min: 2, message: "Tên phải có ít nhất 2 ký tự!" },
              { max: 50, message: "Tên không được vượt quá 50 ký tự!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^(\+84|0)[3|5|7|8|9][0-9]{8}$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ảnh"
            name="images"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Vui lòng tải lên ảnh!" }]}
          >
            <Upload
              name="image"
              beforeUpload={handleBeforeUpload}
              customRequest={dummyRequest}
              onChange={handleOnChange}
              listType="picture"
              maxCount={1}
              fileList={fileList}
            >
              {fileList.length === 1 ? (
                ""
              ) : (
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              )}
            </Upload>
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
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu"
            name="re_password"
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu" },
              ({ getFieldValue }) => ({
                validator(_, value: any) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu nhập lại không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space className="flex md:flex-row">
              <Button
                className="flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-2.5 text-center"
                type="default"
                htmlType="submit"
              >
                {isLoadingCreate ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  <AiOutlineCheck className="text-[#fff] " />
                )}
                <Text className=" text-[#fff] ml-1">Đăng ký</Text>
              </Button>
              <Button
                className="flex items-center text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2.5"
                htmlType="reset"
              >
                <BiReset className="text-[#fff]" />
                <Text className="text-[#fff] ml-1">Làm mới</Text>
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateStaff;