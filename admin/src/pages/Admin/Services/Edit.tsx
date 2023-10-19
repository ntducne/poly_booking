// import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  InputNumber,
  Space,
} from "antd";
// import { BiReset } from "react-icons/bi";
import { AiOutlineCheck, AiOutlineRollback } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetAllBranchesQuery } from "../../../api/branches";
import { useGetDetailServicesQuery, useUpdateServicesMutation } from "../../../api/services";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { toast } from "react-toastify";
const { Option } = Select;

const { Title, Text } = Typography;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const EditServices = () => {
  const {  data:dataBranches , isLoading : loadingBranch } = useGetAllBranchesQuery({});
  const { id }  = useParams();
  const { data : serviceDetail  , isLoading : loadingData } = useGetDetailServicesQuery(id || "")
  const [form] = useForm();
  const [updateServices] = useUpdateServicesMutation();
  const navigate = useNavigate();

  
  useEffect(() => {
    form.setFieldsValue(serviceDetail?.data)
  }, [serviceDetail?.data])

  const onFinish = (values: any) => {
    const data = {
      id: id,
      data: values
    }
    updateServices(data).unwrap().then((item) => {
      if (item.status == 'success') {
        toast("Update thành công", {
          autoClose: 3000,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/services")
        }, 3000)
      } else {
        console.log(item)
        toast(item?.error?.name || "Lỗi rồi bạn", {
          autoClose: 3000,
          theme: "light",
        });
      }
      
    })
  };

  if(loadingData && loadingBranch){
    return <div>Loading...</div>
  }


  return (
    <div>
      <div className="max-w-[80%] mr-auto ml-10">
        <div className="mb-5">
          <Title level={3}>Sửa dịch vụ</Title>
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
            label="Tên dịch vụ"
            name="service_name"
            rules={[{ required: true, message: "Vui lòng nhập dịch vụ!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá dịch vụ"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={5}/>
          </Form.Item>

          <Form.Item
            name="branch_id"
            label="Chi nhánh"
            rules={[{ required: true, message: "Vui lòng chọn chi nhánh!" }]}
          >
            <Select
            //  placeholder="Vui lòng chọn chi nhánh!"
             >
              {dataBranches?.data?.data?.map((item: any) => {
                return  <Option key={item?._id} value={item?._id}>{item?.name}</Option>
              }
              )}
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
                <Text className=" text-[#fff] ml-1">Update</Text>
              </Button>
              <Link className="text-white" to={`/services`}>
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

export default EditServices;
