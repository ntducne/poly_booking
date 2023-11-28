import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Form, Select } from "antd";
import "./style.css";
import dayjs from "dayjs";

type Props = {};
const { RangePicker } = DatePicker;

export default function BookForm({}: Props) {
  const onFinish = (values: any) => {
    console.log(values);
  };

  const disabledDate = (current: any) => {
    const today = dayjs().startOf("day");
    return current && current < today;
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };
  return (
    <div className="container mx-auto relative w-[75%] bg-bgr">
      <div className=" pt-4  px-5 py-10  w-full items-center  lg:shadow-xl lg:absolute lg:left-0 lg:-top-[90px]  lg:right-0 lg:p-0 lg:z-30">
        <Form
          className="bg-bgr min-h-[200px] flex py-[40px] px-[40px]"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="w-full">
            <div className="lg:columns-3">
              <Form.Item
                name="time"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày",
                  },
                ]}
              >
                <RangePicker
                  size={window.innerWidth < 768 ? "large" : "middle"}
                  placeholder={["Nhận phòng", "Trả phòng"]}
                  disabledDate={disabledDate}
                  className="min-h-[50px] w-full"
                />
              </Form.Item>

              <Form.Item
                className=""
                name="branch"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày",
                  },
                ]}
              >
                <Select
                  size={window.innerWidth < 768 ? "large" : "middle"}
                  placeholder="Chi nhánh"
                  className="rounded-none min-h-[50px] w-full"
                >
                  <Select.Option value={""}>1</Select.Option>
                  <Select.Option value={""}>2</Select.Option>
                  <Select.Option value={""}>3</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                className=""
                name="adults"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày",
                  },
                ]}
              >
                <Select
                  size={window.innerWidth < 768 ? "large" : "middle"}
                  placeholder="Người lớn"
                  className="rounded-none min-h-[50px] w-full"
                >
                  <Select.Option value={""}>1</Select.Option>
                  <Select.Option value={""}>2</Select.Option>
                  <Select.Option value={""}>3</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="lg:grid lg:grid-cols-[1fr,1fr,2fr] gap-3 grid-cols-0 grid-rows-1">
              <Form.Item
                className=""
                name="adults"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày",
                  },
                ]}
              >
                <Select
                  size={window.innerWidth < 768 ? "large" : "middle"}
                  placeholder="Người lớn"
                  className="rounded-none min-h-[50px] w-full"
                >
                  <Select.Option value={""}>1</Select.Option>
                  <Select.Option value={""}>2</Select.Option>
                  <Select.Option value={""}>3</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                className=""
                name="adults"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn ngày",
                  },
                ]}
              >
                <Select
                  size={window.innerWidth < 768 ? "large" : "middle"}
                  placeholder="Người lớn"
                  className="rounded-none min-h-[50px] w-full"
                >
                  <Select.Option value={""}>1</Select.Option>
                  <Select.Option value={""}>2</Select.Option>
                  <Select.Option value={""}>3</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item className="w-full">
                <button className="bg-blue-500 w-full min-h-[50px] rounded text-white text-sm font-bold">
                  Submit
                </button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
