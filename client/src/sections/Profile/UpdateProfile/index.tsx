import { Form, Input, message } from "antd";
import { useEffect } from "react";
import { useUpdateProfileMutation } from "../../../api/User";
type Props = {
  data: {
    address: string;
    email: string;
    image: string;
    name: string;
    phone: string;
    status: number;
    _id: string;
  };
};

export default function UpdateProfile({ data }: Props) {
  const [updateProfile] = useUpdateProfileMutation();

  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    updateProfile(values)
      .unwrap()
      .then((res) => {
        console.log(res);
        message.success("Cập nhật thành công");
        // console.log("sadadasasd");
      })
      .catch((error) => {
        // data?.error.
        message.error("Lỗi không cập nhật được");
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const phonePattern = /^(?:\d{10}|\d{11})$/;
  const validatePhoneNumber = (_: any, value: any) => {
    if (value) {
      if (!phonePattern.test(value)) {
        return Promise.reject("Số điện thoại không hợp lệ!");
      }
    }
    return Promise.resolve();
  };
  useEffect(() => {
    if (Object.keys(data).length) {
      const defaultValue = {
        email: data.email,
        name: data.name,
        phone: data.phone,
      };
      form.setFieldsValue(defaultValue);
    }
  }, [data]);
  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
      <Form.Item
        label="Họ tên"
        name="name"
        rules={[{ required: true, message: "Không bỏ trống" }]}
      >
        <Input className="py-2" placeholder="Họ và tên" />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input className="py-2" readOnly placeholder="something@gmail.com" />
      </Form.Item>

      <Form.Item
        label="Điện thoại"
        name="phone"
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
        <Input className="py-2" placeholder="+842938493043" />
      </Form.Item>

      <Form.Item>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Cập nhật
        </button>
      </Form.Item>
    </Form>
  );
}
