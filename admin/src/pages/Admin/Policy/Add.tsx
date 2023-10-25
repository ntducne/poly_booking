// import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  Space,
} from "antd";
import { BiReset } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
import { useGetRoomTypeQuery } from "../../../api/roomTypes";
import { useCreatePolicyMutation } from "../../../api/policy";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetRoomsQuery } from "../../../api/room";
const { Option } = Select;

const { Title, Text } = Typography;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const AddPolicy = () => {
  const navigate = useNavigate()
  // const { data, isLoading } = useGetRoomTypeQuery({})
  const { data: dataRooms, isLoading } = useGetRoomsQuery({})
  const [createPolicy, { isLoading: isLoadingCreate }] = useCreatePolicyMutation()

  console.log(dataRooms);

  if (isLoading && isLoadingCreate) {
    return <div>Loading...</div>
  }

  const onFinish = (values: any) => {
    // console.log(values.image);
    createPolicy(values)
      .unwrap()
      .then((result: any) => {
        if (result.status === "success") {
          toast.success("Thêm mới chính sách thành công");
          navigate("/policy");
        } else {
          toast.error(result.error.message);
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        toast.error("Có lỗi xảy ra khi thêm mới loại phòng");
        console.log(error);
      });
    // Xử lý dữ liệu khi nhấn nút Submit
  };


  return (
    <div>
      <div className="max-w-[80%] mr-auto ml-10">
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
            label="Điều kiện"
            name="conditions"
            rules={[{ required: true, message: "Vui lòng nhập điện kiện!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Vi phạm"
            name="penalty"
            rules={[{ required: true, message: "Vui lòng nhập vi phạm!" }]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            name="room_type_id"
            label="Loại phòng"
            hasFeedback
            rules={[{ required: true, message: "Vui lòng nhập loại phòng!" }]}
          >
            <Select>
              {data?.data?.map((item: any) => {
                return <Option key={item.id} value={item.id}>{item.room_type_name}</Option>
              })}
            </Select>
          </Form.Item> */}

          <Form.Item
            name="room_id"
            label="Tên phòng"
            hasFeedback
            rules={[{ required: true, message: "Vui lòng nhập tên phòng!" }]}
          >
            <Select>
              {dataRooms?.data?.map((item: any) => {
                return <Option key={item.id} value={item.id}>{item.name}</Option>
              })}
            </Select>
          </Form.Item>


          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space className="flex flex-col md:flex-row">
              <Button className="flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-2.5 text-center" type="default" htmlType="submit">
                <AiOutlineCheck className="text-[#fff] " />
                <Text className=" text-[#fff] ml-1">Thêm</Text>
              </Button>
              <Button className="flex items-center text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2.5" htmlType="reset">
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

export default AddPolicy;
