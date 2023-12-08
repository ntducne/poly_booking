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
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetBranchesQuery } from "../../api/Branch";
import { useGetDetailQuery, useSearchRoomsMutation } from "../../api/Room";
import { useProcessReviewMutation } from "../../api/User";
import Page from "../../components/Page";
import PcLoading from "../../components/RoomLoading/PcLoading";
import FormatPrice from "../../utils/FormatPrice";

const { RangePicker } = DatePicker;
const Detail = () => {
  const { slug } = useParams();
  const { data, isLoading, refetch } = useGetDetailQuery(slug);
  const [cookies] = useCookies(["userInfo"]);
  const [postComment] = useProcessReviewMutation();
  const [form] = useForm();
  const [commentForm] = useForm();
  const [childs, setChilds] = useState<number>(0);
  const [adults, setAdults] = useState<number>(0);
  const [countRoom, setCountRoom] = useState<number>(0);
  const [searchRoom] = useSearchRoomsMutation();
  const [dataSearch, setDataSearch] = useState<any>({});
  const { data: dataBranches, isLoading: branchLoading } = useGetBranchesQuery(
    {}
  );
  const [cookie, setCookie] = useCookies(["bookingNow", "roomSearch"]);
  const navigate = useNavigate();
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
          commentForm.resetFields();
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

    const { time, branch_id } = values;
    const formattedDates = time?.map((item: any) =>
      dayjs(item.$d).format("YYYY-MM-DD")
    );

    const dataQuery = {
      adult: adults,
      child: childs,
      branch_id: branch_id?.value,
      amount_room: countRoom,
      checkin: formattedDates?.[0],
      checkout: formattedDates?.[1],
    };

    searchRoom(dataQuery)
      .unwrap()
      .then((response) => {
        console.log(response);
        if (response.status) {
          message.success("Có phòng trống");
          setDataSearch(dataQuery);
          setCookie("roomSearch", dataQuery, { path: "/" });
        } else {
          message.error("Đã hết phòng");
          form.resetFields();
          setChilds(0);
          setAdults(0);
          setCountRoom(0);
        }
      });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const handleBookingNow = (item: any) => {
    if (Object.keys(dataSearch).length) {
      const { id, name, images, price, branch, bed_size } = item;
      const checkinDate = dayjs(cookie.roomSearch.checkin);
      const checkoutDate = dayjs(cookie.roomSearch.checkout);
      const dateDiff = checkoutDate.diff(checkinDate, "day");
      console.log("item", dataSearch);
      const bookingData = {
        room_id: id,
        room_name: name,
        image: images?.[0]?.image,
        price: +price * +dateDiff * dataSearch.amount_room,
        branch: branch?.name,
        bed_size,
      };
      setCookie("bookingNow", bookingData, { path: "/" });
      navigate("/accommodation/book");
    } else {
      message.error("Vui lòng chọn số ngày ở");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Page title={data?.room?.name || "Chi tiết phòng"}>
      <div className="px-[160px] bg-bgr">
        <div>
          <div className="pt-[140px] flex flex-col-reverse lg:flex-row justify-center gap-3">
            {isLoading && branchLoading ? (
              <div className="flex flex-col gap-2">
                {Array.from({ length: 8 }).map((_, index) => (
                  <PcLoading key={index} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3 ">
                <img
                  src="https://themewagon.github.io/sona/img/room/room-details.jpg"
                  alt=""
                />
                <div>
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <h1 className="text-3xl font-bold">{data?.room?.name}</h1>
                    <div className="flex gap-3 items-center justify-between flex-wrap">
                      <Rate
                        allowHalf
                        disabled
                        defaultValue={2.5}
                        className="text-[18px]"
                      />
                      <button
                        className="py-3 px-4 bg-blue-500 text-white font-bold rounded-md"
                        onClick={() => handleBookingNow(data?.room)}
                      >
                        Đặt phòng ngay
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <h3>
                    <span className="text-[24px] font-bold">
                      <FormatPrice price={data?.room?.price} />
                    </span>
                    /đêm
                  </h3>
                  <ul className="flex flex-col gap-3 text-[16px] text-gray-500 mt-[20px]">
                    <li>Người lớn: {data?.room?.adults}</li>
                    <li>Diện tích: {data?.room?.area}</li>
                    <li>Trẻ em: {data?.room?.children}</li>
                    <li>Chi nhánh: {data?.room?.branch.name}</li>
                  </ul>
                  <div className="mt-[20px] text-gray-500 w-full">
                    {data?.room?.description} Lorem ipsum dolor sit, amet
                    consectetur adipisicing elit. Tempore amet maiores suscipit.
                    Excepturi adipisci in architecto eaque eligendi molestiae
                    hic optio, eius ipsa, cupiditate itaque natus eum id harum
                    asperiores.
                  </div>
                </div>
              </div>
            )}
            <div>
              <div className="lg:!w-[350px] w-full top-[10px] pb-[60px] md:mb-0 lg:ml-[40px]">
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
                    form={form}
                    name="dynamic_form_item"
                    initialValues={{
                      adult: adults,
                      soLuong: countRoom,
                      child: childs,
                      branch_id: {
                        label: data?.room?.branch?.name,
                        value: data?.room?.branch?.id,
                      },
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
                    <Form.Item label="Chi nhánh" name="branch_id">
                      <Select
                        size={window.innerWidth < 768 ? "large" : "middle"}
                        placeholder="Chi nhánh"
                        className="rounded-none"
                        disabled={true}
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
                                      {Array.from(
                                        { length: 17 },
                                        (_, index) => (
                                          <Select.Option
                                            key={index + 1}
                                            value={index + 1}
                                          >
                                            {index + 1}
                                          </Select.Option>
                                        )
                                      )}
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
        <Swiper
          slidesPerView={1}
          mousewheel={true}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation]}
          className="mySwiper mt-5"
        >
          {data &&
            data?.room?.images?.map((item: any) => {
              return (
                <SwiperSlide>
                  <img
                    className="h-[600px] w-[100%] object-cover"
                    src={item?.image}
                    alt=""
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
        <Divider className="my-[50px]" />
        <div className="w-full pb-[60px]">
          {cookies?.userInfo ? (
            <Form
              name="basic"
              onFinish={onFinishComment}
              onFinishFailed={onFinishFailedComment}
              autoComplete="off"
              form={commentForm}
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
          ) : (
            <span>
              Bàn cần đăng nhập để có thể đánh giá.{" "}
              <Link className="text-blue-500" to="/auth/login">
                Đăng nhập ngay
              </Link>
            </span>
          )}
          {data?.room?.rate.length > 0 &&
            data?.room?.rate.map((item: any) => (
              <section className="bg-bgr  py-8 m-auto">
                <div className="w-70% mx-auto ">
                  <article className="text-base bg-bgr rounded-lg ">
                    <footer className="flex justify-between items-center pb-2">
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
                        className="hidden z-10 w-36 bg-bgr rounded divide-y divide-gray-100 shadow "
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
                    <div className=" pb-2">
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
    </Page>
  );
};

export default Detail;
