// import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  // Select,
  Typography,
  Space,
  Skeleton,
} from "antd";
import { AiOutlineCheck, AiOutlineRollback } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  useGetDetailBranchesQuery,
  useUpdateBranchesMutation,
} from "../../../api/branches";
// const { Option } = Select;

const { Title, Text } = Typography;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const EditBranche = () => {
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { data, isLoading, refetch } = useGetDetailBranchesQuery(id);
  console.log(data);

  const [updateData] = useUpdateBranchesMutation();

  const onFinish = (values: any) => {
    console.log(values);
    // Xử lý dữ liệu khi nhấn nút Submit
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
          navigate("/branches");
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
    return <><Skeleton/></>;
  }

  return (
    <div>
      <div className="max-w-[80%] mr-auto ml-10">
        <div className="mb-5">
          <Title level={3}>Sửa chi nhánh</Title>
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
            label="Tên chi nhánh"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên chi nhánh!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              {
                pattern: /^(\+84|0)[3|5|7|8|9][0-9]{8}$/,
                message: "Số điện thoại phải có đúng 10 số",
              },
            ]}
          >
            <Input />
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
              <Link className="text-white" to={`/branches`}>
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

export default EditBranche;
