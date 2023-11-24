import {
  MinusCircleOutlined,
  MinusOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Pagination,
  Select,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetBranchesQuery } from "../../api/Branch";
import { useGetRoomsQuery } from "../../api/Room";
import dayjs from "dayjs";
import {
  SlideRooms1,
  SlideRooms2,
  SlideRooms3,
  SlideRooms4,
  SlideRooms5,
} from "../../assets/images/Rooms/Slides";
import Page from "../../components/Page";
import Room from "../../components/Room";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import PcLoading from "../../components/RoomLoading/PcLoading";
type Props = {};

const { RangePicker } = DatePicker;
export default function Rooms({}: Props) {
  const [width, setWidth] = useState(0);
  const navigate = useNavigate();
  const [dataQuery, setDataQuery] = useState({});
  const { data, isLoading, refetch } = useGetRoomsQuery(dataQuery);
  const { data: dataBranches } = useGetBranchesQuery({});
  const [childs, setChilds] = useState<number>(0);
  const [adults, setAdults] = useState<number>(0);
  const [countRoom, setCountRoom] = useState<number>(0);
  const [, setCookie] = useCookies(["bookingNow", "roomSearch"]);

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

    setDataQuery(dataQuery);
    if (!isLoading && !data?.data?.length) {
      message.error("Không có phòng nào phù hợp");
    }
    setCookie("roomSearch", dataQuery, { path: "/" });
  };

  const handleBookingNow = (item: any) => {
    console.log(Object.keys(dataQuery).length);
    if (Object.keys(dataQuery).length) {
      console.log(item);

      const { id, name, images, price, branch, bed_size } = item;
      // const price = type.price_per_night - discount;

      const bookingData = {
        room_id: id,
        room_name: name,
        image: images?.[0]?.image,
        price,
        branch: branch?.name,
        bed_size,
      };

      setCookie("bookingNow", bookingData, { path: "/" });
      navigate("/accommodation/book");
    } else {
      navigate("/rooms/" + item?.slug);
    }
  };
  const disabledDate = (current: any) => {
    const today = dayjs().startOf("day");
    return current && current < today;
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [window.innerWidth]);
  useEffect(() => {
    refetch();
    if (data?.message === "Tìm thành công !") {
      message.success("Tìm phòng thành công !!");
    }
  }, [isLoading, data]);
  return (
    <Page title="Phòng">
      <div className="pb-[100px] bg-bgr">
        <div
          className="relative h-[500px] lg:h-[760px] bg-black bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url("https://png.pngtree.com/thumb_back/fw800/background/20230609/pngtree-resort-hotels-in-vancouver-image_2922772.jpg")`,
          }}
        >
          <div className="relative h-full flex justify-center items-center">
            <div className="absolute w-full h-full bg-black/50"></div>
            <div className="z-20 text-white text-center">
              <div className="uppercase tracking-[6px] mb-5">
                Just enjoy and relax
              </div>
              <h1
                className="text-[32px] font-extralight uppercase tracking-[3px] 
                        max-w-[920px] lg:text-[68px] leading-tight mb-6"
              >
                Retreat Hotel at Santorini
              </h1>
              <span className=" font-extralight tracking-[3px]  ">
                Unwind the clock of modern life. Unlock the door to a wonder of
                the world.
              </span>
            </div>
          </div>
        </div>
        <div className="pt-primary px-6 md:px-[120px]">
          <div className="container mx-auto w-full flex flex-col justify-start lg:px-0">
            <div className="mb-[20px] font-bold text-[18px]">
              Đã tìm được tổng cộng là {data?.data.length} phòng
            </div>
            <div className="flex lg:flex-row lg:justify-center flex-col-reverse justify-start lg:max-w-none lg:px-2 relative">
              <div className="flex flex-col gap-[30px]">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <PcLoading key={index} />
                  ))
                ) : data?.data.length ? (
                  data?.data?.map((room: any) => (
                    <Room
                      key={room.id}
                      data={room}
                      handleBooking={handleBookingNow}
                    />
                  ))
                ) : (
                  <div>
                    <img
                      src="https://1987giasi.com/files/assets/tam_het_cam.png"
                      alt=""
                    />
                  </div>
                )}
              </div>
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
          <div className="flex justify-end mt-[50px] md:mt-[90px]">
            <Pagination defaultCurrent={6} total={10} />
          </div>
        </div>
        <div className="mt-primary">
          <div className="flex justify-center  font-text_2nd mb-[60px]">
            <div className="text-center">
              <h2 className="text-[30px] md:text-h1 max-w-[780px] text-center  font-medium">
                Get Ready to live for unlimited living experience
              </h2>
            </div>
          </div>
          <Swiper
            slidesPerView={width <= 768 ? 1 : 4}
            mousewheel={true}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                className="h-[600px] w-[100%] object-cover"
                src={SlideRooms1}
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="h-[600px] w-[100%] object-cover"
                src={SlideRooms2}
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="h-[600px] w-[100%] object-cover"
                src={SlideRooms3}
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="h-[600px] w-[100%] object-cover"
                src={SlideRooms4}
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="h-[600px] w-[100%] object-cover"
                src={SlideRooms5}
                alt=""
              />
            </SwiperSlide>
          </Swiper>
          <div className="flex justify-center mt-[60px]">
            <h2 className="text-[23px] text-center text-[#202020] max-w-[600px] font-text font-light">
              Tune Hotels tells potential customers what they can expect when
              they visit – a beautiful and luxurious 5-star sleeping experience,
              at a very affordable 1-star price.
            </h2>
          </div>
        </div>
      </div>
    </Page>
  );
}
