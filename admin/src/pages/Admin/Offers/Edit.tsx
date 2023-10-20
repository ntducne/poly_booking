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
import { AiOutlineCheck, AiOutlineRollback } from "react-icons/ai";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useGetDetailPromotionsQuery,
  useUpdatePromotionsMutation,
} from "../../../api/promotions";
import { useEffect } from "react";
import { useGetAllBranchesQuery } from "../../../api/branches";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const { Option } = Select;

const { Title, Text } = Typography;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const EditOffers = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { data, isLoading } = useGetDetailPromotionsQuery(id || "");
  const [updatePromotions] = useUpdatePromotionsMutation();
  const navigate = useNavigate();
  console.log("data" ,data);
  
  const { data: dataBranches, isLoading: loadingBranch } =
    useGetAllBranchesQuery({});
  useEffect(() => {
    form.setFieldsValue({
      code: data?.data?.code,
      conditions: data?.data?.conditions,
      start_date: dayjs(data?.data?.start_date),
      end_date: dayjs(data?.data?.end_date),
      branch_id: data?.data?.branch_id,
    });
  }, [data?.data]);

  if (isLoading || loadingBranch) {
    return <div>Loading...</div>;
  }
  if(data?.data === null){
    return <div>Không tồn tại ưu đãi này</div>
  }
  const onFinish = (values: any) => {
    const data = {
      id: id,
      data: values,
    };
    updatePromotions(data)
      .unwrap()
      .then((item) => {
        if (item.status == "success") {
          toast("Update thành công", {
            autoClose: 3000,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/offers");
          }, 3000);
        } else {
          console.log(item);
          toast(item?.error?.name || "Lỗi rồi bạn", {
            autoClose: 3000,
            theme: "light",
          });
        }
      });
  };

  return (
    <div>
      <div className="max-w-[80%] mr-auto ml-10">
        <div className="mb-5">
          <Title level={3}>Thêm mới</Title>
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

          <Form.Item label="Ngày bắt đầu" name="start_date">
            <DatePicker value={data?.data?.start_date} />
          </Form.Item>

          <Form.Item label="Ngày kết thúc" name="end_date">
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
                <Text className=" text-[#fff] ml-1">Cập nhật</Text>
              </Button>
              <Link className="text-white" to={`/offers`}>
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

export default EditOffers;
