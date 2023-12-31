// import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  InputNumber,
  Space,
  Skeleton,
} from "antd";
import { AiOutlineCheck, AiOutlineRollback } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetDetailRoomTypeQuery,
  useUpdateRoomTypeMutation,
} from "../../../api/roomTypes";
import { toast } from "react-toastify";
import { useEffect } from "react";

const { Title, Text } = Typography;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const EditRoomType = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { data, isLoading, refetch } = useGetDetailRoomTypeQuery(id);

  const [updateData] = useUpdateRoomTypeMutation();

  const onFinish = (values: any) => {
    const data = {
      ...values,
    };
    const dataUpload = {
      id,
      ...data,
    };

    updateData(dataUpload)
      .unwrap()
      .then((result) => {
        if (result.status === "success") {
          toast.success("Cập nhật thông tin loại phòng thành công");
          navigate("/room/type");
        } else {
          toast.error(result.error.message);
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có lỗi xảy ra trong quá trình gọi mutation hoặc xử lý kết quả
        toast.error("Có lỗi xảy ra khi cập nhật thông tin loại phòng");
        console.error(error);
      });
  };

  useEffect(() => {
    refetch();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    form.setFieldsValue(data?.data);
  }, [isLoading, data?.data]);
  if (isLoading) {
    return (
      <>
        <Skeleton />
      </>
    );
  }

  return (
    <div>
      <div className="max-w-[80%] mr-auto ml-10">
        <div className="mb-5">
          <Title level={3}>Sửa loại phòng</Title>
        </div>

        <Form
          form={form}
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{
          }}
          style={{ maxWidth: 1000 }}
          className="grid grid-cols-1 "
        >
          <Form.Item
            label="Tên loại phòng"
            name="room_type_name"
            rules={[
              { required: true, message: "Vui lòng nhập tên loại phòng!" },
              { min: 2, message: "Tên loại phòng phải có ít nhất 2 ký tự!" },
              {
                max: 50,
                message: "Tên loại phòng không được vượt quá 50 ký tự!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá mỗi đêm"
            name="price_per_night"
            rules={[
              { required: true, message: "Vui lòng nhập giá mỗi đêm" },
              {
                type: "number",
                min: 1,
                message: "Giá mỗi đêm phải là một số dương",
              },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả" },
              { max: 500, message: "Mô tả không được vượt quá 500 ký tự" },
            ]}
          >
            <Input.TextArea />
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
              <Link className="text-white" to={`/roomType`}>
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

export default EditRoomType;
