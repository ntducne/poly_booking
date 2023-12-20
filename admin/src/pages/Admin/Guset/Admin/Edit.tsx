// import React from "react";
import { useEffect } from "react";
import { Form, Input, Button, Typography, Space, Skeleton, Radio } from "antd";
import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetDetailAdminsQuery,
  useUpdateAdminsMutation,
} from "../../../../api/account/admin";
const { Title, Text } = Typography;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const EditAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const { data: dataStaff, isLoading } = useGetDetailAdminsQuery(id || "");
  useEffect(() => {
    if (dataStaff) {
      form.setFieldsValue({
        name: dataStaff?.data?.information?.name,
        phone: dataStaff?.data?.information?.phone,
        email: dataStaff?.data?.information?.email,
        // image: dataStaff?.data?.information?.image,
        status: dataStaff?.data?.information?.status || '0'
      });
    }
  }, [dataStaff]);

  const [updateStaffs, { isLoading: isLoadingUpdate }] =
    useUpdateAdminsMutation();
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
        new_password: values.new_password,
        confirm_password: values.confirm_password,
        status: values.status,
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
            <Input disabled />
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
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input disabled />
          </Form.Item>

          <div className="mt-6 grid grid-cols-1 gap-x-6 ">
            <Form.Item
              label="Mật khẩu mới"
              name="new_password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Nhập lại mật khẩu mới"
              name="confirm_password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lại mật khẩu mới!",
                },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>

          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
          >
            <Radio.Group>
              <Radio value="0">Hoạt động</Radio>
              <Radio value="1">Span</Radio>
            </Radio.Group>
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
