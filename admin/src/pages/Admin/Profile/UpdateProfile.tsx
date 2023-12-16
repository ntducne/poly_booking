import { Form, Input, message } from "antd";


const UpdateProfile = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    // updateProfile(values)
    //   .unwrap()
    //   .then(() => {
    //     message.success("Cập nhật thành công");
    //   })
    //   .catch((error) => {
    //     message.error("Lỗi không cập nhật được");
    //     console.log(error);
    //   });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

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
};
export default UpdateProfile;
