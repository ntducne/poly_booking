import { MinusOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  InputNumber,
  Rate,
  Select,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetBranchesQuery } from "../../api/Branch";
import { useGetDetailQuery } from "../../api/Room";
import { useProcessReviewMutation } from "../../api/User";

const { RangePicker } = DatePicker;
const Detail = () => {
  const { slug } = useParams();
  const { data, refetch } = useGetDetailQuery(slug);
  const [postComment] = useProcessReviewMutation();

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
    if (values) {
      postComment({ ...values, room_id: data.room.id })
        .unwrap()
        .then((req) => {
          console.log(req);
          message.success("Đánh giá thành công");
          refetch();
        })
        .catch((error) => {
          console.log(error);
          message.error("Đánh giá thành ôcng");
        });
    }
  };

  const onFinishFailedComment = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = (values: any) => {
    if (!values) {
      return;
    }

    // const { time, branch_id } = values;
    // const formattedDates = time?.map((item: any) =>
    //   dayjs(item.$d).format("YYYY-MM-DD")
    // );

    // const dataQuery = {
    //   adult: adults,
    //   child: childs,
    //   branch_id,
    //   soLuong: countRoom,
    //   checkin: formattedDates?.[0],
    //   checkout: formattedDates?.[1],
    // };

    // setDataQuery(dataQuery);
    // if (!isLoading && !data?.data?.length) {
    //   message.error("Không có phòng nào phù hợp");
    // }
    // setCookie("roomSearch", dataQuery, { path: "/" });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  if (!data) {
    return <>loading...</>;
  }

  return (
    <div className="px-[160px]">
      <div>
        <div className="mt-[140px] flex justify-center gap-3">
          <div className="flex flex-col gap-3 ">
            <img
              src="https://themewagon.github.io/sona/img/room/room-details.jpg"
              alt=""
            />
            <div>
              <div className="flex justify-between items-center flex-wrap">
                <h1 className="text-3xl font-bold">{data?.room?.name}</h1>
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
                <li>Người lớn: {data?.room?.adults}</li>
                <li>Diện tích: {data?.room?.area}</li>
                <li>Trẻ em: {data?.room?.children}</li>
                <li>Chi nhánh: {data?.room?.branch.name}</li>
              </ul>
              <div className="mt-[20px] text-gray-500 w-full">
                {data?.room?.description}
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
                        validator: (_) => {
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
                        validator: (_) => {
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
                    {(fields, { add, remove }) => (
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
                          {fields.map((field) => (
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
      <Divider className="my-[50px]" />
      <div className="w-full mb-[60px]">
        <Form
          name="basic"
          onFinish={onFinishComment}
          onFinishFailed={onFinishFailedComment}
          autoComplete="off"
        >
          <Form.Item
            name="rate"
            rules={[{ required: true, message: "Đánh giá sao" }]}
          >
            <Rate allowHalf />
          </Form.Item>
          <Form.Item
            name="comment"
            rules={[{ required: true, message: "Vui lòng nhập bình luận" }]}
          >
            <TextArea
              rows={4}
              placeholder="Đánh giá của bạn...."
              className="pt-3"
            />
          </Form.Item>

          <Form.Item>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Đánh giá
            </button>
          </Form.Item>
        </Form>
        {data?.room?.rate.length > 0 &&
          data?.room?.rate.map((item: any) => (
            <section className="bg-white  py-8 m-auto">
              <div className="w-70% mx-auto ">
                <article className="text-base bg-white rounded-lg ">
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                        <img
                          className="mr-2 w-6 h-6 rounded-full"
                          src={item?.user?.image}
                          alt={item?.user?.name}
                        />
                        {item?.user?.name}
                      </p>
                      <p className="text-sm text-gray-600 ">
                        <time title="February 8th, 2022">Feb. 8, 2022</time>
                      </p>
                    </div>

                    <div
                      id="dropdownComment1"
                      className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow "
                    >
                      <ul
                        className="py-1 text-sm text-gray-700 "
                        aria-labelledby="dropdownMenuIconHorizontalButton"
                      >
                        <li>
                          <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100 "
                          >
                            Edit
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100 "
                          >
                            Remove
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100 "
                          >
                            Report
                          </a>
                        </li>
                      </ul>
                    </div>
                  </footer>
                  <div className=" mb-2">
                    <div className="flex items-center space-x-1 ">
                      <Rate allowHalf disabled defaultValue={item.star} />
                    </div>
                  </div>
                  <p className="text-gray-500 ">{item.content}</p>
                </article>
              </div>
            </section>
          ))}
      </div>
    </div>
  );
};

export default Detail;
