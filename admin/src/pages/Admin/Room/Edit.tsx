import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Typography,
  Upload,
  message
} from "antd";
import { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import branchApi, { useGetAllBranchesQuery } from "../../../api/branches";
import { useGetDetailRoomQuery, useUpdateRoomMutation } from "../../../api/room";
import { useGetRoomTypeQuery } from "../../../api/roomTypes";
const { Option } = Select;

const { Title, Text } = Typography;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const { TextArea } = Input;

const EditRoom = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { data, isLoading, refetch } = useGetDetailRoomQuery(id)
  const { data: dataRoomTypes, isLoading: isLoadingTypes } = useGetRoomTypeQuery({})
  const { data: dataBranch, isLoading: isLoadingBranch } = useGetAllBranchesQuery({})
  const [updateData, { isLoading: isLoadingUpdate }] = useUpdateRoomMutation()
  console.log(dataBranch);

  if (isLoadingTypes && isLoadingBranch) {
    return <>loading...</>
  }
  const onFinish = (values: any) => {
    console.log(values)
    const data = {
      ...values,
      room_type_id: values?.room_type_id?.id,
      branch_id: values?.branch_id?.id,
      pay_upon_check_in: 1,
      status: 1,
      price: values.discount
    }
    console.log(data);

    delete data.images


    const dataUpload = {
      id,
      data
    }
    updateData(dataUpload).unwrap().then((item: any) => {
      if (item.status == 'success') {
        toast("Sửa thành công", {
          autoClose: 3000,
          theme: "light",
        });
        navigate("/room")
      } else {
        console.log(item)
        toast(item?.error?.name || "Lỗi rồi bạn", {
          autoClose: 3000,
          theme: "light",
        });
      }
    })

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
  useEffect(() => {
    refetch();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    console.log(data?.data)
    const defaultValue = {
      ...data?.data,
      room_type_id: {
        value: data?.data.type.room_type_name,
        id: data?.data.type.id
      },
      branch_id: {
        value: data?.data?.branch?.name,
        id: data?.data?.branch?.id
      }
    }

    form.setFieldsValue(defaultValue)
  }, [isLoading, data?.data])
  if (isLoading) {
    return <>loading...</>
  }
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
            label="Tên phòng"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên phòng" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Diện tích"
            name="area"
            rules={[{ required: true, message: "Vui lòng nhập diện tích" }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            name="room_type_id"
            label="Loại phòng"
            hasFeedback
            rules={[{ required: true, message: "Vui lòng nhập loại phòng!" }]}
          >
            <Select placeholder="Vui lòng nhập loại phòng!">
              {dataRoomTypes?.data?.map((item: any) => {
                console.log(dataRoomTypes);

                return <Option key={item.id} value={item.id}>{item.room_type_name}</Option>
              })}
            </Select>
          </Form.Item>


          <Form.Item
            label="Người lớn"
            name="adults"
            rules={[{ required: true, message: "Vui lòng nhập tối đa số người lớn" }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            label="Trẻ con"
            name="children"
            rules={[{ required: true, message: "Vui lòng nhập tối đa trẻ em" }]}
          >
            <InputNumber min={1} />
          </Form.Item>


          <Form.Item
            label="Số giường"
            name="num_of_bed"
            rules={[{ required: true, message: "Vui lòng nhập số giường" }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item name="bed_size" label="Số giường">
            <InputNumber min={0} max={1} />
          </Form.Item>

          <Form.Item
            label="Giá tiền"
            name="discount"
            rules={[{ required: true, message: "Vui lòng nhập giá tiền" }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            label="Ảnh"
            name="images"
            valuePropName="fileList"
            getValueFromEvent={normFile}
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
            name="branch_id"
            label="Chi nhánh"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn chi nhánh!",
              },
            ]}
          >
            <Select
            // mode="multiple"
            // placeholder="Vui lòng chọn chi nhánh !"
            >
              {dataBranch?.data.map((item: any) => {
                return <Option key={item.id} value={item.id}>{item.name}</Option>
              })}
            </Select>
          </Form.Item>


          <Form.Item
            label="Mô tả"
            name="description"
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Space className="flex flex-col md:flex-row">
              <Button className="flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-3 py-2.5 text-center" type="default" htmlType="submit">
                {isLoadingUpdate ?
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  :
                  <AiOutlineCheck className="text-[#fff] " />
                }
                <Text className=" text-[#fff] ml-1">Sửa</Text>
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

export default EditRoom;