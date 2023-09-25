import React, { useState } from "react";
import {
  Form,
  Input,
  Upload,
  Button,
  Select,
  message,
  Breadcrumb,
  Typography,
  InputNumber,
  Switch,
  Checkbox,
  Row,
  Col,
  Rate,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { GrAdd } from "react-icons/gr";
import { BiReset } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
const { Option } = Select;

const { Title, Text } = Typography;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const AddRoomType = () => {
  const onFinish = (values: any) => {
    console.log(values.image);
    // Xử lý dữ liệu khi nhấn nút Submit
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
      <div className="max-w-[80%] mr-auto m-10">
        <div className="mb-5">
          <Title level={3}>Thêm mới</Title>
        </div>

        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{
            "input-number": 1,
            "checkbox-group": ["A", "B"],
            rate: 3.5,
            "color-picker": null,
          }}
          style={{ maxWidth: 1000 }}
          className="grid grid-cols-1 xl:grid-cols-2"
        >
          <Form.Item
            label="Tên loại phòng"
            name="room_type_name"
            rules={[
              { required: true, message: "Vui lòng nhập tên loại phòng!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá mỗi đêm"
            name="price_per_night"
            rules={[{ required: true, message: "Vui lòng nhập giá mỗi đêm" }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng nhập trạng thái loại phòng!",
              },
            ]}
          >
            <Select placeholder="Vui lòng nhập loại phòng!">
              <Option value="BinhDan">Còn</Option>
              <Option value="V.I.P">Hết</Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space className="flex flex-col md:flex-row">
              <Button
                className="flex items-center w-30 bg-[rgb(76,167,68)]  py-5 rounded-3xl hover:bg-sky-500"
                type="default"
                htmlType="submit"
              >
                <AiOutlineCheck className="text-[#fff] " />
                <Text className=" text-[#fff] ml-2">Thêm</Text>
              </Button>
              <Button
                className="flex items-center max-w-30 bg-[rgb(119,145,115)]  py-5 rounded-3xl hover:bg-indigo-400"
                htmlType="reset"
              >
                <BiReset className="text-[#fff]" />
                <Text className="text-[#fff] ml-3">Làm mới</Text>
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddRoomType;
