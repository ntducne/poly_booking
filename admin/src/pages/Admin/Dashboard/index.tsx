import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { Button, DatePicker, Form, Select, Typography } from "antd";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import Page from "../../../component/page";
import ChartFour from "../../../component/Charts/four";
import ChartFive from "../../../component/Charts/five";
import { useState } from "react";
import dayjs from "dayjs";
// import type { DatePickerProps } from 'antd';
import ChartOne from "../../../component/Charts/one";
import {
  useStatisticalsChartQuery,
  useStatisticalsQuery,
} from "../../../api/statisticals";
import { Skeleton } from "antd";
const { Title } = Typography;
const { RangePicker } = DatePicker;
import formatMoneyVN from "../../../config/formatMoneyVN";
import moment from "moment";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdMeetingRoom } from "react-icons/md";
import { MdNoMeetingRoom } from "react-icons/md";
import { MdRoomPreferences } from "react-icons/md";

const Dashboard = () => {
  const [formatDay] = useState("DD/MM/YYYY");
  const [formatMonth] = useState("MM/YYYY");
  // const [weekFormat,] = useState('DD/MM');
  // const customWeekStartEndFormat: DatePickerProps['format'] = (value :any) =>
  // `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
  //   .endOf('week')
  //   .format(weekFormat)}`;
  const [query, setQuery] = useState<any>({
    // module: "revenue",
    type: "daily",
    day: dayjs().format("YYYY-MM-DD"),
    status: [3, 4],
  });
  const { data: dataChart, isLoading: loadingChart } =
    useStatisticalsChartQuery<any>([]);
  const { data: dataRevenue, isLoading } = useStatisticalsQuery({
    module: "revenue",
    ...query,
  });
  const { data: dataRoom, isLoading: loadingRoom } = useStatisticalsQuery({
    module: "room",
    ...query,
  });
  const { data: dataBooking, isLoading: loadingBooking } = useStatisticalsQuery(
    {
      module: "book",
      ...query,
    }
  );

  const [typeStat, setTypeStat] = useState("");
  const handleSelectStat = (value: string) => {
    form.setFieldsValue({ typeValue: "" });
    setTypeStat(value);
  };

  const [form] = Form.useForm();
  const submitStat = (values: any) => {
    if (!values) {
      return;
    }

    const { type, typeValue } = values;
    if (type === "daily") {
      const dataQuery = {
        // module: "revenue",
        type,
        day: dayjs(typeValue.$d).format("YYYY-MM-DD"),
        status: [3, 4],
      };
      setQuery(dataQuery);
    }
    if (type === "weekly") {
      const dataQuery = {
        // module: "revenue",
        type,
        week: dayjs(typeValue.$d).format("w"),
        year: dayjs(typeValue.$d).format("YYYY"),
        status: [3, 4],
      };
      setQuery(dataQuery);
    }
    if (type === "monthly") {
      const dataQuery = {
        // module: "revenue",
        type,
        month: dayjs(typeValue.$d).format("YYYY-MM"),
        status: [3, 4],
      };
      setQuery(dataQuery);
    }
    if (type === "yearly") {
      const dataQuery = {
        // module: "revenue",
        type,
        year: dayjs(typeValue.$d).format("YYYY"),
        status: [3, 4],
      };
      setQuery(dataQuery);
    }
    if (type === "day_to_day") {
      const formatDay = typeValue?.map((item: any) =>
        dayjs(item.$d).format("YYYY-MM-DD")
      );
      const dataQuery = {
        // module: "revenue",
        type,
        fromDay: formatDay?.[0],
        toDay: formatDay?.[1],
        status: [3, 4],
      };
      setQuery(dataQuery);
    }
    if (type === "week_to_week") {
      const formatDay = typeValue?.map((item: any) =>
        dayjs(item.$d).format("YYYY-w")
      );
      const dataQuery = {
        // module: "revenue",
        type,
        fromWeek: formatDay?.[0],
        toWeek: formatDay?.[1],
        status: [3, 4],
      };
      setQuery(dataQuery);
    }
    if (type === "month_to_month") {
      const formatMonth = typeValue?.map((item: any) =>
        dayjs(item.$d).format("YYYY-MM")
      );
      const dataQuery = {
        // module: "revenue",
        type,
        fromMonth: formatMonth?.[0],
        toMonth: formatMonth?.[1],
        status: [3, 4],
      };
      setQuery(dataQuery);
    }
    if (type === "year_to_year") {
      const formatYear = typeValue?.map((item: any) =>
        dayjs(item.$d).format("YYYY")
      );
      const dataQuery = {
        // module: "revenue",
        type,
        fromYear: formatYear?.[0],
        toYear: formatYear?.[1],
        status: [3, 4],
      };
      setQuery(dataQuery);
    }
  };
  if (isLoading || loadingRoom || loadingBooking || loadingChart) {
    return (
      <div>
        <Skeleton />
      </div>
    );
  }

  return (
    <>
      <Page title={`Trang chủ`}>
        <Form
          className=""
          form={form}
          name="basic"
          onFinish={submitStat}
          style={{
            height: 70,
          }}
        >
          <div className="rounded-lg bg-white mb-4 flex items-start justify-end">
            <Form.Item
              name="type"
              className="mb-0"
              // initialValue="daily"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại thống kê",
                },
              ]}
            >
              <Select
                className="w-[220px] mr-2"
                onChange={handleSelectStat}
                // defaultValue="daily"
                options={[
                  { value: "daily", label: "Ngày" },
                  { value: "weekly", label: "Tuần" },
                  { value: "monthly", label: "Tháng" },
                  { value: "yearly", label: "Năm" },
                  { value: "day_to_day", label: "Từ ngày đến ngày" },
                  { value: "week_to_week", label: "Từ tuần đến tuần" },
                  { value: "month_to_month", label: "Từ tháng đến tháng" },
                  { value: "year_to_year", label: "Từ năm đến năm" },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="typeValue"
              className="mr-2 mb-0"
              initialValue={dayjs()}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thời gian",
                },
              ]}
            >
              {typeStat === "daily" && (
                <DatePicker
                  className="w-[220px]"
                  placeholder="Chọn ngày"
                  format={formatDay}
                  disabledDate={(current) =>
                    current && current > moment().endOf("day")
                  }
                />
              )}
              {typeStat === "weekly" && (
                <DatePicker
                  className="w-[220px]"
                  picker="week"
                  placeholder="Chọn tuần"
                  format="w/YYYY"
                  disabledDate={(current) =>
                    current && current > moment().endOf("week")
                  }
                />
              )}
              {typeStat === "monthly" && (
                <DatePicker
                  picker="month"
                  className="w-[220px]"
                  placeholder="Chọn tháng"
                  format={formatMonth}
                  disabledDate={(current) =>
                    current && current > moment().endOf("month")
                  }
                />
              )}
              {typeStat === "yearly" && (
                <DatePicker
                  picker="year"
                  className="w-[220px]"
                  placeholder="Chọn năm"
                  disabledDate={(current) =>
                    current && current > moment().endOf("year")
                  }
                />
              )}
              {typeStat === "day_to_day" && (
                <RangePicker
                  className="w-[220px]"
                  format={formatDay}
                  placeholder={["Từ ngày", "Đến ngày"]}
                  disabledDate={(current) =>
                    current && current > moment().endOf("day")
                  }
                />
              )}
              {typeStat === "week_to_week" && (
                <RangePicker
                  className="w-[220px]"
                  picker="week"
                  format="w/YYYY"
                  placeholder={["Từ tuần", "Đến tuần"]}
                  disabledDate={(current) =>
                    current && current > moment().endOf("week")
                  }
                />
              )}
              {typeStat === "month_to_month" && (
                <RangePicker
                  picker="month"
                  className="w-[220px]"
                  format={formatMonth}
                  placeholder={["Từ tháng", "Đến tháng"]}
                  disabledDate={(current) =>
                    current && current > moment().endOf("month")
                  }
                />
              )}
              {typeStat === "year_to_year" && (
                <RangePicker
                  picker="year"
                  className="w-[220px]"
                  placeholder={["Từ năm", "Đến năm"]}
                  disabledDate={(current) =>
                    current && current > moment().endOf("year")
                  }
                />
              )}
            </Form.Item>
            <Button
              // loading={true}
              className="w-[100px]"
              htmlType="submit"
            >
              Xem
            </Button>
          </div>
        </Form>
        <div className="rounded-lg">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            <article className="rounded-lg border border-gray-100 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Doanh thu</p>

                  <p className="text-2xl font-medium text-gray-900">
                    {formatMoneyVN(dataRevenue?.total)}
                  </p>
                </div>

                <span className="rounded-full bg-blue-100 p-3 text-blue-600">
                  <FaMoneyBillTrendUp className="text-3xl" />
                </span>
              </div>
              <div className="mt-1 flex gap-1 text-green-600">
                <p className="flex gap-2 text-xs">
                  <span className="text-gray-500">
                    Ngày : {dataRevenue?.days}{" "}
                  </span>
                </p>
              </div>
            </article>
            <article className="rounded-lg border border-gray-100 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Lượng đặt phòng</p>

                  <p className="text-2xl font-medium text-gray-900">
                    {dataBooking?.book}
                  </p>
                </div>

                <span className="rounded-full bg-blue-100 p-3 text-blue-600">
                  <MdMeetingRoom className="text-3xl" />
                </span>
              </div>
              <div className="mt-1 flex gap-1 text-green-600">
                <p className="flex gap-2 text-xs">
                  <span className="text-gray-500">
                    {" "}
                    Ngày : {dataRevenue?.days}{" "}
                  </span>
                </p>
              </div>
            </article>
            <article className="rounded-lg border border-gray-100 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Lượng huỷ phòng</p>

                  <p className="text-2xl font-medium text-gray-900">
                    {dataBooking?.cancel}
                  </p>
                </div>

                <span className="rounded-full bg-blue-100 p-3 text-blue-600">
                  <MdNoMeetingRoom className="text-3xl" />
                </span>
              </div>

              <div className="mt-1 flex gap-1 text-red-600">
                <p className="flex gap-2 text-xs">
                  <span className="text-gray-500">
                    {" "}
                    Ngày : {dataRevenue?.days}{" "}
                  </span>
                </p>
              </div>
            </article>
            <article className="rounded-lg border border-gray-100 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Tổng số lượng phòng</p>
                  <p className="text-2xl font-medium text-gray-900">
                    {dataRoom?.total_room}
                  </p>
                </div>
                <span className="rounded-full bg-blue-100 p-3 text-blue-600">
                  <MdRoomPreferences className="text-3xl" />
                </span>
              </div>
              <div className="mt-1 flex gap-1 text-green-600">
                <p className="flex gap-2 text-xs">
                  <span className="text-gray-500">
                    {" "}
                    Ngày : {dataRevenue?.days}{" "}
                  </span>
                </p>
              </div>
            </article>
            <article className="rounded-lg border border-gray-100 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Số phòng còn trống</p>

                  <p className="text-2xl font-medium text-gray-900">
                    {dataRoom?.room_is_not_book}
                  </p>
                </div>

                <span className="rounded-full bg-blue-100 p-3 text-blue-600">
                  <MdMeetingRoom className="text-3xl" />
                </span>
              </div>
              <div className="mt-1 flex gap-1 text-green-600">
                <p className="flex gap-2 text-xs">
                  <span className="text-gray-500">
                    {" "}
                    Ngày : {dataRevenue?.days}{" "}
                  </span>
                </p>
              </div>
            </article>
            <article className="rounded-lg border border-gray-100 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Số lượng phòng đang đặt</p>

                  <p className="text-2xl font-medium text-gray-900">
                    {dataRoom?.room_is_book}
                  </p>
                </div>

                <span className="rounded-full bg-blue-100 p-3 text-blue-600">
                  <MdMeetingRoom className="text-3xl" />
                </span>
              </div>
              <div className="mt-1 flex gap-1 text-green-600">
                <p className="flex gap-2 text-xs">
                  <span className="text-gray-500">
                    {" "}
                    Ngày : {dataRevenue?.days}{" "}
                  </span>
                </p>
              </div>
            </article>
          </div>
          <div className="mt-4">
            <ChartOne data={dataChart?.revenue} />
          </div>
          <div className="grid grid-cols-1 2xl:grid-cols-2 mt-10 gap-6">
            <div>
              <ChartFour data={dataChart}/>
            </div>
            <div>
              <ChartFive data={dataChart?.user}/>
            </div>
          </div>
          <div className="border rounded-2xl bg-white p-6 mt-8 hidden">
            <div>
              <Title level={4}>Đánh giá mới của khách hàng</Title>
            </div>
            <Swiper
              loop={true}
              speed={2000}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              slidesPerView={1}
              breakpoints={{
                800: {
                  width: 678,
                  slidesPerView: 2,
                },
                1280: {
                  width: 1280,
                  slidesPerView: 3,
                },
              }}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Autoplay]}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="border rounded-xl p-2 pb-9 xl:p-7 text-base	text-[#6e6e6e] ">
                  <div className="">
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Itaque, animi.
                    </p>
                  </div>
                  <div className="flex flex-col xl:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col xl:flex-row xl:items-center">
                      <img
                        className="hidden xl:w-12 xl:h-12 xl:rounded-xl xl:block"
                        src="https://hinhnen4k.com/wp-content/uploads/2023/01/anh-trai-cute-dau-nam-5.jpg"
                        alt=""
                      />
                      <div className="my-3 ml-2">
                        <div>Nguyễn Quốc Huy</div>
                        <div>4 phút trước</div>
                      </div>
                    </div>
                    <div className="flex">
                      <button className="border border-[#68e365] rounded-[50%] p-1 text-[#68e365] mr-1">
                        <AiOutlineCheck className="w-4 h-4 " />
                      </button>
                      <button className="border border-[#e23428] rounded-[50%] p-1 ml-2 text-[#e23428]">
                        <AiOutlineClose className="w-4 h-4 " />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="border rounded-xl p-2 pb-9 xl:p-7 text-base	text-[#6e6e6e] ">
                  <div className="">
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Itaque, animi.
                    </p>
                  </div>
                  <div className="flex flex-col xl:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col xl:flex-row xl:items-center">
                      <img
                        className="hidden xl:w-12 xl:h-12 xl:rounded-xl xl:block"
                        src="https://hinhnen4k.com/wp-content/uploads/2023/01/anh-trai-cute-dau-nam-5.jpg"
                        alt=""
                      />
                      <div className="my-3 ml-2">
                        <div>Nguyễn Quốc Huy</div>
                        <div>4 phút trước</div>
                      </div>
                    </div>
                    <div className="flex">
                      <button className="border border-[#68e365] rounded-[50%] p-1 text-[#68e365] mr-1">
                        <AiOutlineCheck className="w-4 h-4 " />
                      </button>
                      <button className="border border-[#e23428] rounded-[50%] p-1 ml-2 text-[#e23428]">
                        <AiOutlineClose className="w-4 h-4 " />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="border rounded-xl p-2 pb-9 xl:p-7 text-base	text-[#6e6e6e] ">
                  <div className="">
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Itaque, animi.
                    </p>
                  </div>
                  <div className="flex flex-col xl:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col xl:flex-row xl:items-center">
                      <img
                        className="hidden xl:w-12 xl:h-12 xl:rounded-xl xl:block"
                        src="https://hinhnen4k.com/wp-content/uploads/2023/01/anh-trai-cute-dau-nam-5.jpg"
                        alt=""
                      />
                      <div className="my-3 ml-2">
                        <div>Nguyễn Quốc Huy</div>
                        <div>4 phút trước</div>
                      </div>
                    </div>
                    <div className="flex">
                      <button className="border border-[#68e365] rounded-[50%] p-1 text-[#68e365] mr-1">
                        <AiOutlineCheck className="w-4 h-4 " />
                      </button>
                      <button className="border border-[#e23428] rounded-[50%] p-1 ml-2 text-[#e23428]">
                        <AiOutlineClose className="w-4 h-4 " />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="border rounded-xl p-2 pb-9 xl:p-7 text-base	text-[#6e6e6e] ">
                  <div className="">
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Itaque, animi.
                    </p>
                  </div>
                  <div className="flex flex-col xl:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col xl:flex-row xl:items-center">
                      <img
                        className="hidden xl:w-12 xl:h-12 xl:rounded-xl xl:block"
                        src="https://hinhnen4k.com/wp-content/uploads/2023/01/anh-trai-cute-dau-nam-5.jpg"
                        alt=""
                      />
                      <div className="my-3 ml-2">
                        <div>Nguyễn Quốc Huy</div>
                        <div>4 phút trước</div>
                      </div>
                    </div>
                    <div className="flex">
                      <button className="border border-[#68e365] rounded-[50%] p-1 text-[#68e365] mr-1">
                        <AiOutlineCheck className="w-4 h-4 " />
                      </button>
                      <button className="border border-[#e23428] rounded-[50%] p-1 ml-2 text-[#e23428]">
                        <AiOutlineClose className="w-4 h-4 " />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="border rounded-xl p-2 pb-9 xl:p-7 text-base	text-[#6e6e6e] ">
                  <div className="">
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Itaque, animi.
                    </p>
                  </div>
                  <div className="flex flex-col xl:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col xl:flex-row xl:items-center">
                      <img
                        className="hidden xl:w-12 xl:h-12 xl:rounded-xl xl:block"
                        src="https://hinhnen4k.com/wp-content/uploads/2023/01/anh-trai-cute-dau-nam-5.jpg"
                        alt=""
                      />
                      <div className="my-3 ml-2">
                        <div>Nguyễn Quốc Huy</div>
                        <div>4 phút trước</div>
                      </div>
                    </div>
                    <div className="flex">
                      <button className="border border-[#68e365] rounded-[50%] p-1 text-[#68e365] mr-1">
                        <AiOutlineCheck className="w-4 h-4 " />
                      </button>
                      <button className="border border-[#e23428] rounded-[50%] p-1 ml-2 text-[#e23428]">
                        <AiOutlineClose className="w-4 h-4 " />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="border rounded-xl p-2 pb-9 xl:p-7 text-base	text-[#6e6e6e] ">
                  <div className="">
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Itaque, animi.
                    </p>
                  </div>
                  <div className="flex flex-col xl:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col xl:flex-row xl:items-center">
                      <img
                        className="hidden xl:w-12 xl:h-12 xl:rounded-xl xl:block"
                        src="https://hinhnen4k.com/wp-content/uploads/2023/01/anh-trai-cute-dau-nam-5.jpg"
                        alt=""
                      />
                      <div className="my-3 ml-2">
                        <div>Nguyễn Quốc Huy</div>
                        <div>4 phút trước</div>
                      </div>
                    </div>
                    <div className="flex">
                      <button className="border border-[#68e365] rounded-[50%] p-1 text-[#68e365] mr-1">
                        <AiOutlineCheck className="w-4 h-4 " />
                      </button>
                      <button className="border border-[#e23428] rounded-[50%] p-1 ml-2 text-[#e23428]">
                        <AiOutlineClose className="w-4 h-4 " />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              {/* <SwiperSlide>Slide 6</SwiperSlide>
              <SwiperSlide>Slide 7</SwiperSlide>
              <SwiperSlide>Slide 8</SwiperSlide>
              <SwiperSlide>Slide 9</SwiperSlide> */}
            </Swiper>
          </div>
        </div>
      </Page>
    </>
  );
};

export default Dashboard;
