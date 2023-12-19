import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Form, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useGetBranchesQuery } from "../../api/Branch";
import "./style.css";

type Props = {};
const { RangePicker } = DatePicker;

export default function BookForm({}: Props) {
  const [, setCookie] = useCookies(["bookingNow", "roomSearch"]);
  const { data: dataBranches } = useGetBranchesQuery({});
  const [form] = useForm();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    if (!values) {
      return;
    }

    const { time, branch_id, adults, child, soLuong } = values;
    if (adults < soLuong) {
      form.setFieldsValue({
        adults: undefined,
        soLuong: undefined,
      });

      return message.error("Số phòng không thể lớn hơn số người lớn");
    }
    const formattedDates = time?.map((item: any) =>
      dayjs(item.$d).format("YYYY-MM-DD")
    );
    const dataQuery = {
      adult: adults,
      child: child,
      branch_id,
      soLuong: soLuong,
      checkin: formattedDates?.[0],
      checkout: formattedDates?.[1],
    };

    setCookie("roomSearch", dataQuery, { path: "/" });

    navigate(
      `/rooms?checkin=${dataQuery.checkin}&checkout=${dataQuery.checkout}&adult=${dataQuery.adult}&child=${dataQuery.child}&branch_id=${dataQuery.branch_id}&soLuong=${dataQuery.soLuong}`
    );
  };

  const disabledDate = (current: any) => {
    const today = dayjs().startOf("day");
    return current && current < today;
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("error", errorInfo);
  };
  return (
    <div className="container mx-auto relative w-full md:w-[75%] bg-white">
      <div className=" md:pt-4 md:px-5 md:py-10  w-full items-center  lg:shadow-xl lg:absolute lg:left-0 lg:-top-[90px]  lg:right-0 lg:p-0 lg:z-30">
        <Form
          className="bg-white min-h-[200px] flex py-[40px] px-[40px]"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
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
                name="branch_id"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn chi nhánh",
                  },
                ]}
              >
                <Select
                  size={window.innerWidth < 768 ? "large" : "middle"}
                  placeholder="Chi nhánh"
                  className="rounded-none min-h-[50px] w-full"
                >
                  {dataBranches &&
                    dataBranches?.data.map((item: any) => {
                      return (
                        <Select.Option value={item?.id}>
                          {item?.name}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Form.Item>

              <Form.Item
                className=""
                name="adults"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn số người lớn",
                  },
                ]}
              >
                <Select
                  size={window.innerWidth < 768 ? "large" : "middle"}
                  placeholder="Người lớn"
                  className="rounded-none min-h-[50px] w-full"
                >
                  {Array.from({ length: 30 }, (_, index) => (
                    <Select.Option
                      key={index + 1}
                      value={(index + 1).toString()}
                    >
                      {index + 1}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="lg:grid lg:grid-cols-[1fr,1fr,2fr] gap-3 grid-cols-0 grid-rows-1">
              <Form.Item
                className=""
                name="soLuong"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn số lượng phòng muốn",
                  },
                ]}
              >
                <Select
                  size={window.innerWidth < 768 ? "large" : "middle"}
                  placeholder="Số lượng phòng"
                  className="rounded-none min-h-[50px] w-full"
                >
                  {Array.from({ length: 30 }, (_, index) => (
                    <Select.Option
                      key={index + 1}
                      value={(index + 1).toString()}
                    >
                      {index + 1}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                className=""
                name="child"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng số trẻ em",
                  },
                ]}
              >
                <Select
                  size={window.innerWidth < 768 ? "large" : "middle"}
                  placeholder="Trẻ em"
                  className="rounded-none min-h-[50px] w-full"
                >
                  {Array.from({ length: 6 }, (_, index) => (
                    <Select.Option
                      key={index + 1}
                      value={(index + 1).toString()}
                    >
                      {index + 1}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item className="w-full">
                <button className="bg-blue-500 w-full min-h-[50px] rounded text-white text-sm font-bold flex justify-center items-center gap-2">
                  <span>
                    <SearchOutlined />
                  </span>
                  <span>Tìm kiếm</span>
                </button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
