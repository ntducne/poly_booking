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
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useGetRoomsQuery } from "../../../api/room";
import { useGetDetailUtilitieQuery, useUpdateUtilitieMutation } from "../../../api/utilities";

const { Option } = Select;

const { Title, Text } = Typography;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const EditRoomUtilities = () => {
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { data: dataRooms } = useGetRoomsQuery({})
  const { data, refetch } = useGetDetailUtilitieQuery(id)
  console.log(data);

  const [updateData] = useUpdateUtilitieMutation()

  const onFinish = (values: any) => {
    console.log(values);
    // Xử lý dữ liệu khi nhấn nút Submit
    const data = {
      ...values,
    }
    const dataUpload = {
      id,
      ...data
    }
    // Xử lý dữ liệu khi nhấn nút Submit
    updateData(dataUpload)
      .unwrap()
      .then((result) => {
        if (result.status === 'success') {
          toast.success('Cập nhật thông tin loại phòng thành công');
          navigate('/room/utilities');
        } else {
          toast.error(result.error.message);
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình gọi mutation hoặc xử lý kết quả
        toast.error('Có lỗi xảy ra khi cập nhật thông tin loại phòng');
        console.error(error);
      });
  };

  useEffect(() => {
    refetch();
    window.scrollTo(0, 0);
  }, [id]);

  // useEffect(() => {
  //   form.setFieldsValue(data?.data)
  // }, [isLoading, data?.data])
  // if (isLoading) {
  //   return <>loading...</>
  // }



  return (
    <div>
      <div className="max-w-[80%] mr-auto ml-10">
        <div className="mb-5">
          <Title level={3}>Chỉnh sửa</Title>
        </div>

        <Form
          form={form}
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
            label="Tiện ích phòng"
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

export default EditRoomUtilities;
