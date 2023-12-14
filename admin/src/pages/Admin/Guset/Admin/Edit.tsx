// import React from "react";
import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Upload,
  Button,
  message,
  Typography,
  Space,
  Skeleton,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { BiReset } from "react-icons/bi";
import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetDetailStaffsQuery,
  useUpdateStaffsMutation,
} from "../../../../api/account/staffs";
const { Title, Text } = Typography;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const EditAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const { data: dataStaff, isLoading } = useGetDetailStaffsQuery(id || "");
  console.log("dataStaff", dataStaff);

  useEffect(() => {
    if (dataStaff) {
      form.setFieldsValue({
        name: dataStaff?.data?.information?.name,
        phone: dataStaff?.data?.information?.phone,
        email: dataStaff?.data?.information?.email,
        // image: dataStaff?.data?.information?.image,
      });
    }
  }, [dataStaff]);

  const [updateStaffs, { isLoading: isLoadingUpdate }] =
    useUpdateStaffsMutation();
  if (isLoading) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }
  const onFinish = (values: any) => {
    const data = {
      idStaff: id,
      data: {
        name: values.name,
        phone: values.phone,
        email: values.email,
        password: values.password,
        image: dataStaff?.data?.information?.image,
        role: "staff",
      },
    };
    
    updateStaffs(data)
      .unwrap()
      .then((item: any) => {
        if (item.status == "success") {
          toast("sửa thành công", {
            autoClose: 3000,
            theme: "light",
          });
          navigate("/staff");
        } else {
          toast(item?.error?.name || "Lỗi", {
            autoClose: 3000,
            theme: "light",
          });
        }
      });
  };
  return (
    <div>
      <div className="max-w-[80%] mr-auto ml-10">
        <div className="mb-5">
          <Title level={3}>Sửa thông nhân viên</Title>
        </div>

        <Form
          form={form}
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

          {/* <Form.Item
            hidden
            label="Ảnh"
            name="images"
            valuePropName="fileList"
            rules={[{ required: true, message: "Vui lòng tải lên ảnh!" }]}
          >
            <Upload name="image" listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item> */}
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
          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space className="flex md:flex-row">
              <Button
                className="flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-2.5 text-center"
                type="default"
                htmlType="submit"
              >
                {isLoadingUpdate ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  <AiOutlineCheck className="text-[#fff] " />
                )}
                <Text className=" text-[#fff] ml-1">Sửa thông tin</Text>
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditAdmin;
