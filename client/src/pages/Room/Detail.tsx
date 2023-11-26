import dayjs from "dayjs";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Pagination,
  Rate,
  Select,
  message,
  Avatar,
  Tooltip,
} from "antd";
import { useGetBranchesQuery } from "../../api/Branch";
import {
  MinusOutlined,
  PlusOutlined,
  SearchOutlined,
  StarFilled,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;
const Detail = () => {
  const { slug } = useParams();
  const [childs, setChilds] = useState<number>(0);
  const [adults, setAdults] = useState<number>(0);
  const [countRoom, setCountRoom] = useState<number>(0);
  const { data: dataBranches } = useGetBranchesQuery({});
  const disabledDate = (current: any) => {
    const today = dayjs().startOf("day");
    return current && current < today;
  };
  const onFinishComment = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailedComment = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = (values: any) => {
    if (!values) {
      return;
    }

    const { time, branch_id } = values;
    const formattedDates = time?.map((item: any) =>
      dayjs(item.$d).format("YYYY-MM-DD")
    );

    const dataQuery = {
      adult: adults,
      child: childs,
      branch_id,
      soLuong: countRoom,
      checkin: formattedDates?.[0],
      checkout: formattedDates?.[1],
    };

    // setDataQuery(dataQuery);
    // if (!isLoading && !data?.data?.length) {
    //   message.error("Không có phòng nào phù hợp");
    // }
    // setCookie("roomSearch", dataQuery, { path: "/" });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div>
        <div className="mb-[160px] mt-[140px] flex justify-center gap-3">
          <div className="flex flex-col gap-3 max-w-[800px]">
            <img
              src="https://themewagon.github.io/sona/img/room/room-details.jpg"
              alt=""
            />
            <div>
              <div className="flex justify-between items-center flex-wrap">
                <h1 className="text-3xl font-bold">Premium King Room</h1>
                <div className="flex gap-3 items-center">
                  <Rate
                    allowHalf
                    disabled
                    defaultValue={2.5}
                    className="text-[18px]"
                  />
                  <button className="py-3 px-4 bg-blue-500 text-white font-bold">
                    Đặt phòng ngay
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h3>
                <span className="text-[24px] font-bold">159vnd</span>/đêm
              </h3>
              <ul className="flex flex-col gap-3 text-[16px] text-gray-500 mt-[20px]">
                <li>Size: </li>
                <li>Capacity: </li>
                <li>Bed: </li>
                <li>Services: </li>
              </ul>
              <div className="mt-[20px] text-gray-500 w-full">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam
                dicta a, sapiente iste quo odit illum sequi consectetur quam
                officia dolorum quibusdam optio provident voluptates nostrum,
                inventore quia, nisi voluptatibus. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Deleniti incidunt repellat labore,
                eos dolor pariatur, doloribus mollitia deserunt numquam quaerat,
                dolore quo odit recusandae corporis nihil facere! Veniam, dolore
                repudiandae. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Libero distinctio odio magni quae non dolores, alias quis
                atque ipsa in unde impedit nobis corrupti ratione nisi
                perspiciatis quas minus veritatis. Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. Laudantium quidem magni natus
                optio perspiciatis rerum illo, provident impedit nesciunt
                quibusdam nihil asperiores hic dolor, ut dolore consequuntur
                ratione corporis ea? Lorem, ipsum dolor sit amet consectetur
                adipisicing elit. Totam dicta a, sapiente iste quo odit illum
                sequi consectetur quam officia dolorum quibusdam optio provident
                voluptates nostrum, inventore quia, nisi voluptatibus. Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Deleniti
                incidunt repellat labore, eos dolor pariatur, doloribus mollitia
                deserunt
              </div>
            </div>
          </div>
          <div>
            <div className="lg:!w-[350px] w-full top-[10px] mb-[60px] md:mb-0 lg:ml-[40px]">
              <div
                className="w-full shadow-lg p-4"
                style={{ position: "sticky", top: "100px" }}
              >
                <h3 className="font-text_2nd text-[23px] font-bold">
                  Chọn phòng của bạn
                </h3>
                <p className="mt-[15px] text-[12px] italic">
                  Chọn trường dưới đây để tìm kiếm
                </p>
                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="mt-[20px] w-full"
                  name="dynamic_form_item"
                  initialValues={{
                    adult: adults,
                    soLuong: countRoom,
                    child: childs,
                  }}
                >
                  <Form.Item
                    label="Thời gian đặt phòng"
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
                      className="w-full"
                      placeholder={["Nhận phòng", "Trả phòng"]}
                      disabledDate={disabledDate}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Chi nhánh"
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
                      className="rounded-none"
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
                    name="soLuong"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn số lượng phòng muốn",
                      },
                      {
                        validator: (_, value) => {
                          if (countRoom < 1) {
                            return Promise.reject(
                              new Error("Vui lòng chọn ít 1 phòng")
                            );
                          }
                          if (countRoom > adults) {
                            return Promise.reject(
                              new Error(
                                "Số phòng không thể lớn hơn số người lớn"
                              )
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                    validateTrigger="onChange"
                  >
                    <div className="flex gap-x-4 gap-y-2 items-center flex-wrap">
                      <p>Số phòng: </p>
                      <div className="flex gap-3 items-center">
                        <MinusOutlined
                          className="py-2 px-3 text-blue-600 rounded-xl bg-[rgba(229,226,226,0.84)]"
                          onClick={() => {
                            if (countRoom > 0) {
                              setCountRoom((prev) => prev - 1);
                            }
                          }}
                        />
                        <InputNumber
                          min={0}
                          max={30}
                          value={countRoom}
                          readOnly
                          className=""
                        />

                        <PlusOutlined
                          className="py-2 px-3 text-blue-600 rounded-xl bg-[rgba(229,226,226,0.84)]"
                          onClick={() => {
                            if (countRoom < 30) {
                              setCountRoom((prev) => prev + 1);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </Form.Item>
                  <Form.Item
                    name="adult"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn số lượng phòng muốn",
                      },
                      {
                        validator: (_, value) => {
                          if (adults < 1) {
                            return Promise.reject(
                              new Error("Vui lòng chọn ít nhất một người lớn")
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                    validateTrigger="onChange"
                  >
                    <div className="flex gap-x-4 gap-y-2 items-center flex-wrap">
                      <p>Người lớn: </p>
                      <div className="flex gap-3 items-center">
                        <MinusOutlined
                          className="py-2 px-3 text-blue-600 rounded-xl bg-[rgba(229,226,226,0.84)]"
                          onClick={() => {
                            if (adults > 0) {
                              setAdults((prev) => prev - 1);
                            }
                          }}
                        />
                        <InputNumber
                          min={0}
                          max={30}
                          value={adults}
                          readOnly
                          className=""
                        />

                        <PlusOutlined
                          className="py-2 px-3 text-blue-600 rounded-xl bg-[rgba(229,226,226,0.84)]"
                          onClick={() => {
                            if (adults < 30) {
                              setAdults((prev) => prev + 1);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </Form.Item>
                  <Form.List name="child">
                    {(fields, { add, remove }, { errors }) => (
                      <>
                        <Form.Item>
                          <div className="flex gap-4 items-center flex-wrap">
                            <p>Số trẻ em: </p>
                            <div className="flex gap-3 items-center">
                              <MinusOutlined
                                className="py-2 px-3 text-blue-600 rounded-xl bg-[rgba(229,226,226,0.84)]"
                                onClick={() => {
                                  if (childs > 0) {
                                    setChilds((prev) => prev - 1);
                                    remove(fields.length - 1);
                                  }
                                }}
                              />
                              <InputNumber
                                min={0}
                                max={6}
                                value={childs}
                                onChange={(value) => {
                                  console.log(value);
                                }}
                                readOnly
                                className=""
                              />

                              <PlusOutlined
                                className="py-2 px-3 text-blue-600 rounded-xl bg-[rgba(229,226,226,0.84)]"
                                onClick={() => {
                                  if (childs < 6) {
                                    setChilds((prev) => prev + 1);
                                    add();
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </Form.Item>
                        <div className="grid grid-cols-2 gap-2 ">
                          {fields.map((field, index) => (
                            <Form.Item
                              required={false}
                              key={field.key}
                              className=""
                              style={{ width: "100%" }}
                              label="Trẻ em"
                            >
                              <div className="flex items-center gap-2">
                                <Form.Item
                                  {...field}
                                  validateTrigger={["onChange", "onBlur"]}
                                  noStyle
                                  rules={[
                                    {
                                      required: true,
                                      message: "Vui lòng số tuổi",
                                    },
                                  ]}
                                >
                                  <Select
                                    placeholder="Trẻ em"
                                    className="rounded-none"
                                    size={
                                      window.innerWidth < 768
                                        ? "large"
                                        : "middle"
                                    }
                                  >
                                    {Array.from({ length: 17 }, (_, index) => (
                                      <Select.Option
                                        key={index + 1}
                                        value={index + 1}
                                      >
                                        {index + 1}
                                      </Select.Option>
                                    ))}
                                  </Select>
                                </Form.Item>
                              </div>
                            </Form.Item>
                          ))}
                        </div>
                      </>
                    )}
                  </Form.List>
                  <Form.Item>
                    <Button
                      type="primary"
                      className="bg-blue-500 flex py-5 w-full justify-center md:py-4 px-7 gap-1 items-center"
                      htmlType="submit"
                    >
                      <SearchOutlined />
                      <p>Tìm kiếm</p>
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Divider className="w-[800px]" /> */}
      <div className="max-w-[1000px] flex justify-center w-full">
        <Form
          name="basic"
          onFinish={onFinishComment}
          onFinishFailed={onFinishFailedComment}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Comment
            </Button>
          </Form.Item>
        </Form>

        <Comment
          actions={actions}
          author={<a>Han Solo</a>}
          avatar={
            <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
          }
          content={
            <p>
              We supply a series of design principles, practical patterns and
              high quality design resources (Sketch and Axure), to help people
              create their product prototypes beautifully and efficiently.
            </p>
          }
          datetime={
            <Tooltip title="2016-11-22 11:22:33">
              <span>8 hours ago</span>
            </Tooltip>
          }
        />
      </div>
    </div>
  );
};

export default Detail;
