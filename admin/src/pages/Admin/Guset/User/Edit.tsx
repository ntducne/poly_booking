import { useEffect } from "react";

import { Form, Input, Button, Typography, Space, Radio, Skeleton } from "antd";
// import { BiReset } from "react-icons/bi";
import { AiOutlineCheck, AiOutlineRollback } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetDetailUsersQuery,
  useUpdateUsersMutation,
} from "../../../../api/account/users";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const EditUser = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetDetailUsersQuery(id);
  const [updateUsers] = useUpdateUsersMutation();
  const [form] = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    form.setFieldsValue(data?.data);
  }, [data?.data]);

  if (isLoading) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

  const onFinish = (values: any) => {
    const data = { ...values };
    const updateData = {
      id: id,
      data: data,
    };
    updateUsers(updateData)
      .unwrap()
      .then((item: any) => {
        if (item.status == true) {
          toast("Sửa thành công", {
            autoClose: 3000,
            theme: "light",
          });
          navigate("/user");
        } else {
          toast(item?.error?.name || "Lỗi khi sửa", {
            autoClose: 3000,
            theme: "light",
          });
        }
      })
      .catch(() => {
        toast("Lỗi khi sửa", {
          autoClose: 3000,
          theme: "light",
        });
      });
  };

  // Xử lý dữ liệu khi nhấn nút Submit

  return (
    <div>
      <div className="max-w-[80%] mr-auto ml-10">
        <div className="mb-5">
          <Title level={3}>Sửa thông tin khách</Title>
        </div>

        <Form
          form={form}
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{
            "input-number": 1,
            status: data?.data?.status,
            "checkbox-group": ["A", "B"],
            rate: 3.5,
            "color-picker": null,
          }}
          style={{ maxWidth: 1000 }}
          className="grid grid-cols-1 xl:grid-cols-2"
        >
          <Form.Item
            label="Tên khách"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email khách"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              {
                pattern: /^(\+84|0)[3|5|7|8|9][0-9]{8}$/,
                message: "Số điện thoại không hợp lệ",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ" },
              {
                validator: (_: any, value: any) =>
                  value.trim().length === 0
                    ? Promise.reject("Vui lòng nhập địa chỉ")
                    : Promise.resolve(),
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item name="status" label="Trạng thái">
            <Radio.Group value={data?.data?.status}>
              <Radio value={0}>Hoạt động</Radio>
              <Radio value={1}>Span</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space className="flex flex-col md:flex-row">
              <Button
                className="flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-2.5 text-center"
                type="default"
                htmlType="submit"
              >
                <AiOutlineCheck className="text-[#fff] " />
                <Text className=" text-[#fff] ml-1">Sửa</Text>
              </Button>
              <Link className="text-white" to={`/services`}>
                <Button
                  className="flex items-center text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2.5"
                  htmlType="reset"
                >
                  <AiOutlineRollback className="text-[#fff]" />
                  <Text className="text-[#fff] ml-1">Quay trở lại</Text>
                </Button>
              </Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditUser;
