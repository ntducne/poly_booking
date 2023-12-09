import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  InputNumber,
  Space,
} from "antd";
import { BiReset } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
import { toast } from "react-toastify";
import { useCreateRoomTypeMutation } from "../../../api/roomTypes";
import { useNavigate } from "react-router-dom";
import { useGetAllBranchesQuery } from "../../../api/branches";
// const { Option } = Select;

const { Title, Text } = Typography;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const AddRoomType = () => {
  const { data: dataBranches, isLoading: loadingBranch } = useGetAllBranchesQuery({});

  if(loadingBranch){}
  const navigate = useNavigate()
  const [createRoomsType] = useCreateRoomTypeMutation({})


  const onFinish = (values: any) => {
    createRoomsType(values)
      .unwrap()
      .then((result) => {
        if (result.status === "success") {
          toast.success("Thêm mới loại phòng thành công");
          navigate("/room/type");
        } else {
          toast.error(result.error.message);
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        toast.error("Có lỗi xảy ra khi thêm mới loại phòng");
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
            label="Tên loại phòng"
            name="room_type_name"
            rules={[
              { required: true, message: "Vui lòng nhập tên loại phòng!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá mỗi đêm"
            name="price_per_night"
            rules={[{ required: true, message: "Vui lòng nhập giá mỗi đêm" }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
              label="Chi nhánh"
              name="branch_id"
              rules={[{ required: true, message: "Vui lòng chọn chi nhánh" }]}
            >
              <Select>
                {dataBranches?.data?.map((item: any) => {
                  return (
                    <Select.Option value={item.id} key={item.id}>
                      {item.name}
                    </Select.Option>
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

export default AddRoomType;
