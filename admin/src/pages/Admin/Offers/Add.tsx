// import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  Space,
  DatePicker,
} from "antd";
import { BiReset } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
import { useCreatePromotionsMutation } from "../../../api/promotions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGetAllBranchesQuery } from "../../../api/branches";
const { Option } = Select;

const { Title, Text } = Typography;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const AddOffers = () => {
  const navigate = useNavigate();
  const [createPromotions] = useCreatePromotionsMutation();
  const { data: dataBranches, isLoading: loadingBranch } =
    useGetAllBranchesQuery({});

  if (loadingBranch) {
    return <div>Loading...</div>;
  }

  const onFinish = (values: any) => {
    console.log(values.image);
    // Xử lý dữ liệu khi nhấn nút Submit
    createPromotions(values)
      .unwrap()
      .then((result) => {
        if (result.status === "success") {
          toast.success("Thêm mới ưu đãi thành công sau 3s");
          setTimeout(() => {
            navigate("/offers");
          }, 3000);
        } else {
          toast.error(result.error.message);
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        toast.error("Có lỗi xảy ra khi thêm ưu đãi mới");
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
          className="grid grid-cols-1 xl:grid-cols-2"
        >
          <Form.Item
            label="Mã Code"
            name="code"
            rules={[{ required: true, message: "Vui lòng nhập mã Code!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Điều kiện"
            name="conditions"
            rules={[{ required: true, message: "Vui lòng nhập điều kiện" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ngày bắt đầu"
            name="start_date"
            rules={[
              {
                type: "object" as const,
                required: true,
                message: "Please select time!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Ngày kết thúc"
            name="end_date"
            rules={[
              {
                type: "object" as const,
                required: true,
                message: "Please select time!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="branch_id"
            label="Chi nhánh"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn chi nhánh!",
              },
            ]}
          >
            <Select placeholder="Vui lòng chọn chi nhánh !">
              {dataBranches?.data?.data?.map((item: any) => {
                return (
                  <Option key={item?._id} value={item?._id}>
                    {item?.name}
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

export default AddOffers;
