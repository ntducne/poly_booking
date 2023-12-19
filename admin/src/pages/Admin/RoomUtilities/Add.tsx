// import React, { useState } from "react";
import { Form, Input, Button, Select, Typography, Space, Skeleton } from "antd";
import { BiReset } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useCreateUtilitieMutation } from "../../../api/utilities";
import { useGetRoomsQuery } from "../../../api/room";
import { toast } from "react-toastify";
const { Option } = Select;

const { Title, Text } = Typography;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const AddRoomUtilities = () => {
  const navigate = useNavigate();
  // const { data, isLoading } = useGetRoomTypeQuery({})
  const { data: dataRooms, isLoading } = useGetRoomsQuery({});
  const [createUtilitie, { isLoading: isLoadingCreate }] =
    useCreateUtilitieMutation();
  if (isLoading && isLoadingCreate) {
    return <div><Skeleton/></div>;
  }

  const onFinish = (values: any) => {
    createUtilitie(values)
      .unwrap()
      .then((result: any) => {
        if (result.status === "success") {
          toast.success("Thêm mới tiện ích phòng thành công");
          setTimeout(() => {
            navigate("/room/utilities");
          }, 3000);
        } else {
          toast.error(result.error.message);
        }
      })
      .catch((error: any) => {
        toast.error("Có lỗi xảy ra khi thêm tiện tích phòng");
        console.log(error);
      });
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
          className="grid grid-cols-1"
        >
          <Form.Item
            label="Tên tiện ích phòng"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên tiện ích phòng!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="room_id"
            label="Tên phòng"
            hasFeedback
            rules={[{ required: true, message: "Vui lòng nhập tên phòng!" }]}
          >
            <Select mode="multiple">
              {dataRooms?.data?.map((item: any) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space className="flex flex-col md:flex-row">
              <Button
                className="flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-2.5 text-center"
                type="default"
                htmlType="submit"
              >
                <AiOutlineCheck className="text-[#fff] " />
                <Text className=" text-[#fff] ml-1">Thêm</Text>
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

export default AddRoomUtilities;
