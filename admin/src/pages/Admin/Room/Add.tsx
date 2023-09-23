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

const AddRoom = () => {
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
            label="Khu vực"
            name="area"
            rules={[{ required: true, message: "Vui lòng nhập khu vực!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Tên phòng"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="room_type_id"
            label="Loại phòng"
            hasFeedback
            rules={[{ required: true, message: "Vui lòng nhập loại phòng!" }]}
          >
            <Select placeholder="Vui lòng nhập loại phòng!">
              <Option value="BinhDan">Bình dân</Option>
              <Option value="V.I.P">V.I.P</Option>
            </Select>
          </Form.Item>


          <Form.Item
            label="Số người"
            name="num_of_people"
            rules={[{ required: true, message: "Vui lòng nhập số người" }]}
          >
            <InputNumber min={1} max={10} />
          </Form.Item>

          <Form.Item
            label="Số giường"
            name="num_of_bed"
            rules={[{ required: true, message: "Vui lòng nhập số giường" }]}
          >
            <InputNumber min={1} max={10} />
          </Form.Item>

          <Form.Item name="bed_size" label="Số giường">
            <Checkbox.Group>
              <Row className="flex items-center sm:flex-col">
                <Col >
                  <Checkbox value="A" style={{ lineHeight: "32px" }}>
                    2 lớn , 1 nhỏ
                  </Checkbox>
                </Col>
                <Col >
                  <Checkbox value="C" style={{ lineHeight: "32px" }}>
                    1 lớn , 2 nhỏ
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item
            label="Ảnh"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Vui lòng tải lên ảnh!" }]}
          >
            <Upload
              name="avatar"
              beforeUpload={handleBeforeUpload}
              customRequest={dummyRequest}
              onChange={handleOnChange}
              listType="picture"
              maxCount={4}
              fileList={fileList}
              multiple
            >
              {fileList.length === 4 ? (
                ""
              ) : (
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            name="policies_and_information"
            label="Chính sách"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn chính sách phòng!",
                type: "array",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Vui lòng chọn chính sách phòng!"
            >
              <Option value="red">Chính sách 1</Option>
              <Option value="green">Chính sách 2</Option>
              <Option value="blue">Chính sách 3</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Giảm giá">
            <Form.Item name="discount" noStyle>
              <InputNumber min={1} max={10} />
            </Form.Item>
            <span className="ant-form-text" style={{ marginLeft: 8 }}>
              
            </span>
          </Form.Item>


          <Form.Item name="rate" label="Đánh giá">
            <Rate />
          </Form.Item>


          <Form.Item
            name="branch_id"
            label="Chi nhánh"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn chi nhánh!",
                type: "array",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Vui lòng chọn chi nhánh !"
            >
              <Option value="red">Hà Đông</Option>
              <Option value="green">Cầu Giấy</Option>
              <Option value="blue">Trịnh Văn Bô</Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space className="flex flex-col md:flex-row">
              <Button  className="flex items-center w-30 bg-[rgb(76,167,68)]  py-5 rounded-3xl hover:bg-sky-500" type="default" htmlType="submit">
                <AiOutlineCheck className="text-[#fff] "/>
                <Text className=" text-[#fff] ml-2">Thêm</Text>
              </Button>
              <Button className="flex items-center max-w-30 bg-[rgb(119,145,115)]  py-5 rounded-3xl hover:bg-indigo-400" htmlType="reset">
                 <BiReset className="text-[#fff]"/> 
                 <Text className="text-[#fff] ml-3">Làm mới</Text>
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddRoom;
