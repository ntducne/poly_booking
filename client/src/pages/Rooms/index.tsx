import {
  LoadingOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Form, Pagination, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetBranchesQuery } from "../../api/Branch";
import { useGetRoomsQuery, useSearchRoomsMutation } from "../../api/Room";
import {
  SlideRooms1,
  SlideRooms2,
  SlideRooms3,
  SlideRooms4,
  SlideRooms5,
} from "../../assets/images/Rooms/Slides";
import Page from "../../components/Page";
import Room from "../../components/Room";
import PcLoading from "../../components/RoomLoading/PcLoading";
type Props = {};

const { RangePicker } = DatePicker;

export const useQueryParams = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  return {
    get: (param: any) => queryParams.get(param),
    getAll: () => Object.fromEntries(queryParams.entries()),
  };
};
export default function Rooms({}: Props) {
  const { getAll } = useQueryParams();
  const [isSpinning, setIsSpinning] = useState(false);
  const [form] = useForm();
  const [page, setPage] = useState<number>(1);
  const queryParams = useMemo(() => getAll(), [getAll]);
  const [width, setWidth] = useState(0);
  const navigate = useNavigate();
  const [dataQuery, setDataQuery] = useState<any>(queryParams || {});
  const [data, setData] = useState<any>({});
  const { data: dataAll, isLoading, refetch } = useGetRoomsQuery(page);
  const [searchRooms, { isLoading: loadingSearch }] = useSearchRoomsMutation();
  const { data: dataBranches, refetch: refetchBranch } = useGetBranchesQuery(
    {}
  );
  const [cookie, setCookie] = useCookies(["bookingNow", "roomSearch"]);
  const onFinish = (values: any) => {
    const { time, branch_id, adult, child, soLuong } = values;
    if (+soLuong > +adult) {
      form.setFieldsValue({
        soLuong: undefined,
        adult: undefined,
      });
      return message.error("Số phòng không thể lớn hơn số người lớn");
    }

    const formattedDates = time?.map((item: any) =>
      dayjs(item.$d).format("YYYY-MM-DD")
    );
    const dataQuery = {
      adult: adult,
      child: child || 0,
      branch_id,
      soLuong: soLuong,
      checkin: formattedDates?.[0],
      checkout: formattedDates?.[1],
    };
    navigate(
      `/rooms?checkin=${dataQuery.checkin}&checkout=${dataQuery.checkout}&adult=${dataQuery.adult}&child=${dataQuery.child}&branch_id=${dataQuery.branch_id}&soLuong=${dataQuery.soLuong}`
    );
    setDataQuery(dataQuery);
    setCookie("roomSearch", dataQuery, { path: "/" });
  };

  const handleValidateDate = (_: any, value: any) => {
    const formattedDates = value?.map((item: any) =>
      dayjs(item.$d).format("YYYY-MM-DD")
    );
    if (formattedDates[0] === formattedDates[1]) {
      return Promise.reject("Ngày trả phòng không trùng với ngày nhận");
    }
    return Promise.resolve();
  };

  const handleClickReset = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      navigate(`/rooms?page=${page}`);
      setData(dataAll);
      setCookie("bookingNow", {}, { path: "/" });
      setDataQuery({});
      form.setFieldsValue({
        time: undefined,
        branch_id: undefined,
        adult: undefined,
        child: undefined,
        soLuong: undefined,
      });
    }, 1000);
  };

  const handlePaginationChange = (page: number) => {
    setPage(page);
    navigate(`/rooms?page=${page}`);
    refetch();
  };
  const validateQueryParams = (params: any) => {
    const requiredParams = [
      "checkin",
      "checkout",
      "adult",
      "branch_id",
      "soLuong",
    ];

    return requiredParams.every(
      (param) => params.hasOwnProperty(param) && params[param]
    );
  };
  const handleBookingNow = (item: any) => {
    if (Object.keys(dataQuery).length >= 6) {
      const {
        id,
        name,
        images,
        price,
        branch,
        bed_size,
        image,
        children,
        adults,
        num_of_bed,
      } = item;
      const checkinDate = dayjs(cookie.roomSearch.checkin);
      const checkoutDate = dayjs(cookie.roomSearch.checkout);
      const dateDiff = checkoutDate.diff(checkinDate, "day");
      const bookingData = {
        room_id: id,
        adults,
        child: children || 0,
        num_of_bed,
        room_name: name,
        image: images?.[0]?.image ?? image,
        price: +price * +dateDiff * +cookie?.roomSearch?.soLuong,
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
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (queryParams?.page && !isLoading) {
      window.scrollTo({
        top: 500,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [queryParams?.page, isLoading]);
  useEffect(() => {
    refetch();
    refetchBranch();
  }, []);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [window.innerWidth]);
  useEffect(() => {
    if (dataAll && Object.keys(dataAll).length) {
      setData(dataAll);
    }
  }, [isLoading, dataAll]);
  useEffect(() => {
    if (validateQueryParams(dataQuery)) {
      const dataUpload = {
        ...dataQuery,
        child: +dataQuery?.child ? +dataQuery?.child : 0,
        amount_room: dataQuery.soLuong,
      };
      delete dataUpload.soLuong;
      searchRooms(dataUpload)
        .unwrap()
        .then((res: any) => {
          if (res.status) {
            setData(res);
            message.success("Tìm phòng thành công");
          } else {
            setData({});
            message.error("Không có phòng nào phù hợp");
          }
        });
    }
  }, [dataQuery]);
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
                Chỉ cần tận hưởng và thư giãn
              </div>
              <h1
                className="text-[32px] font-extralight uppercase tracking-[3px] 
                        max-w-[920px] lg:text-[68px] leading-tight mb-6"
              >
                Khách sạn nghỉ dưỡng tại Việt Nam
              </h1>
              <span className=" font-extralight tracking-[3px]  ">
                Làm chậm đồng hồ của cuộc sống hiện đại. Mở cửa ra một kỳ quan
                thế giới.
              </span>
            </div>
          </div>
        </div>
        <div className="pt-primary px-6 md:px-[120px]">
          <div className="container mx-auto w-full flex flex-col justify-start lg:px-0">
            <div className="flex lg:flex-row lg:justify-center flex-col-reverse justify-start lg:max-w-none lg:px-2 relative">
              <div className="flex flex-col gap-[30px]">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <PcLoading key={index} />
                  ))
                ) : data?.data?.length ? (
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
                  <div className="flex justify-between items-center">
                    <h3 className="font-text_2nd text-[23px] font-bold">
                      Chọn phòng của bạn
                    </h3>
                    <div
                      className={`px-3 cursor-pointer ${
                        isSpinning && "animate-spin"
                      }`}
                      onClick={handleClickReset}
                    >
                      <ReloadOutlined />
                    </div>
                  </div>
                  <p className="mt-[15px] text-[12px] italic">
                    Chọn trường dưới đây để tìm kiếm
                  </p>
                  <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    className="mt-[20px] w-full"
                    name="dynamic_form_item"
                    form={form}
                    initialValues={{
                      time:
                        dataQuery?.checkin && dataQuery?.checkout
                          ? [
                              dayjs(dataQuery?.checkin),
                              dayjs(dataQuery?.checkout),
                            ]
                          : undefined,
                      branch_id: dataQuery?.branch_id
                        ? dataQuery?.branch_id
                        : undefined,
                      soLuong: +dataQuery?.soLuong
                        ? +dataQuery?.soLuong
                        : undefined,
                      adult: +dataQuery?.adult ? +dataQuery.adult : undefined,
                      child: +dataQuery?.child ? +dataQuery?.child : undefined,
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
                        {
                          validator: handleValidateDate,
                        },
                      ]}
                    >
                      <RangePicker
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
                      <Select placeholder="Chi nhánh" className="rounded-none">
                        {dataBranches &&
                          dataBranches?.data.map((item: any) => {
                            return (
                              <Select.Option value={item?.id} key={item?.id}>
                                {item?.name}
                              </Select.Option>
                            );
                          })}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="soLuong"
                      label="Số lượng phòng"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn số lượng phòng muốn",
                        },
                      ]}
                      validateTrigger="onChange"
                    >
                      <Select
                        placeholder="Số lượng phòng"
                        className="rounded-none w-full"
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
                      name="adult"
                      label="Tổng số người lớn"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn số lượng phòng muốn",
                        },
                      ]}
                      validateTrigger="onChange"
                    >
                      <Select
                        placeholder="Người lớn"
                        className="rounded-none w-full"
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
                    <Form.Item className="" name="child" label="Trẻ em">
                      <Select
                        placeholder="Trẻ em"
                        className="rounded-none w-full"
                      >
                        {Array.from({ length: 7 }, (_, index) => (
                          <Select.Option key={index} value={index.toString()}>
                            {index}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        className="bg-blue-500 flex py-5 w-full justify-center md:py-4 px-7 gap-1 items-center"
                        htmlType="submit"
                      >
                        {!loadingSearch ? (
                          <div className="flex items-center justify-center">
                            <SearchOutlined />
                            <p>Tìm kiếm</p>
                          </div>
                        ) : (
                          <LoadingOutlined />
                        )}
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-[50px] md:mt-[90px]">
            <Pagination
              defaultCurrent={1}
              total={+data?.meta?.last_page * 10}
              onChange={handlePaginationChange}
              current={page}
            />
          </div>
        </div>
        <div className="mt-primary">
          <div className="flex justify-center  font-text_2nd mb-[60px]">
            <div className="text-center">
              <h2 className="text-[30px] md:text-h1 max-w-[780px] text-center  font-medium">
                Hãy sẵn sàng để có trải nghiệm sống không giới hạn
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
            <h2 className="text-[23px] text-center text-[#202020] max-w-[600px] font-text_roboto font-light">
              PolyDev Hotels cho khách hàng tiềm năng biết những gì họ có thể
              mong đợi khi ghé thăm – trải nghiệm ngủ 5 sao đẹp và sang trọng
              với mức giá 1 sao rất phải chăng.
            </h2>
          </div>
        </div>
      </div>
    </Page>
  );
}
