import {
  CloseOutlined,
  FileImageOutlined,
  LoadingOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Divider, Form, Rate, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
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
  const [imagePreviews, setImagePreviews] = useState<any>([]);
  const { slug } = useParams();
  const { data, isLoading, refetch } = useGetDetailQuery(slug);
  const rating = useMemo(() => {
    const allStar =
      data?.room?.rate.reduce((acc: any, r: any) => {
        return +acc + +r?.star;
      }, 0) || 0;
    return allStar / data?.room?.rate?.length;
  }, [data]);
  const [cookies] = useCookies(["userInfo"]);
  const [postComment, { isLoading: isLoadingCmt }] = useProcessReviewMutation();
  const [form] = useForm();
  const [commentForm] = useForm();
  const [searchRoom, { isLoading: loadingSearch }] = useSearchRoomsMutation();
  const [dataSearch, setDataSearch] = useState<any>({});
  const handleImageChange = (e: any) => {
    const files = e.target.files;
    if (files.length > 0 && imagePreviews.length < 4) {
      const newPreviews = Array.from(files).map((file: any) => {
        const reader = new FileReader();

        return new Promise((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result);
          };

          reader.readAsDataURL(file);
        });
      });

      Promise.all(newPreviews).then((previews) => {
        setImagePreviews([...imagePreviews, ...previews]);
      });
    }
  };
  const handleRemoveImage = (index: any) => {
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
  };

  const { data: dataBranches, isLoading: branchLoading } = useGetBranchesQuery(
    {}
  );
  const [cookie, setCookie] = useCookies(["bookingNow", "roomSearch"]);
  const navigate = useNavigate();
  const disabledDate = (current: any) => {
    const today = dayjs().startOf("day");
    return current && current < today;
  };
  const handleValidateDate = (_: any, value: any) => {
    console.log("value", value);
    const formattedDates = value?.map((item: any) =>
      dayjs(item.$d).format("YYYY-MM-DD")
    );
    if (formattedDates[0] === formattedDates[1]) {
      return Promise.reject("Ngày trả phòng không trùng với ngày nhận");
    }
    return Promise.resolve();
  };
  const onFinishComment = async (values: any) => {
    if (values) {
      const formData = new FormData();
      imagePreviews.forEach((preview: any, index: any) => {
        const base64Data = preview.split(",")[1];
        const binaryData = atob(base64Data);
        const uint8Array = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }

        // Create Blob and File objects
        const blob = new Blob([uint8Array], { type: "image/jpeg" });
        const file = new File([blob], `image_${index}.jpg`);
        formData.append(`images[]`, file);
      });
      formData.append(`rate`, values?.rate);
      formData.append(`room_id`, data.room.id);
      formData.append(`comment`, values?.comment);
      postComment(formData)
        .unwrap()
        .then(() => {
          message.success("Đánh giá thành công");
          commentForm.resetFields();
          setImagePreviews([]);
          refetch();
        })
        .catch((error) => {
          if (error?.status == 400) {
            message.error(error?.data?.message);
            commentForm.resetFields();
            setImagePreviews([]);
            return;
          }
          message.error("Đánh giá không thành công");
        });
    }
  };

  const onFinishFailedComment = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
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
      branch_id: branch_id?.value,
      amount_room: soLuong,
      checkin: formattedDates?.[0],
      checkout: formattedDates?.[1],
    };

    searchRoom(dataQuery)
      .unwrap()
      .then((response) => {
        if (response.status) {
          message.success("Có phòng trống");
          setDataSearch(dataQuery);
          setCookie("roomSearch", { ...dataQuery, soLuong }, { path: "/" });
        } else {
          message.error("Đã hết phòng");
          form.resetFields();
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
    refetch();
  }, []);
  useEffect(() => {
    if (data?.message == "Phòng không tồn tại !") {
      return navigate("/404");
    }
    form.setFieldsValue({
      branch_id: {
        label: data?.room?.branch?.name,
        value: data?.room?.branch?.id,
      },
    });
  }, [data?.room, data, isLoading]);

  return (
    <Page title={data?.room?.name || "Chi tiết phòng"}>
      <div className="px-[20px] md:px-[160px] bg-bgr">
        <div>
          <div className="pt-[140px] flex flex-col-reverse lg:flex-row justify-center gap-3">
            {isLoading || branchLoading ? (
              <div className="flex flex-col gap-2">
                {Array.from({ length: 8 }).map((_, index) => (
                  <PcLoading key={index} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3 ">
                <img src={data?.room?.images?.[0]?.image} alt="" />
                <div>
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <h1 className="text-3xl font-bold">{data?.room?.name}</h1>
                    <div className="flex gap-3 items-center justify-between flex-wrap">
                      <Rate
                        allowHalf
                        disabled
                        defaultValue={5}
                        value={rating || 5}
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
                  <div className="mt-[20px] flex flex-wrap gap-3">
                    <ul className="flex flex-col gap-3 text-[16px] text-gray-500">
                      <li>Người lớn: {data?.room?.adults}</li>
                      <li>Diện tích: {data?.room?.area}</li>
                      <li>Trẻ em: {data?.room?.children}</li>
                      <li>Chi nhánh: {data?.room?.branch.name}</li>
                    </ul>

                    <ul className="flex flex-col gap-3 text-[16px] text-gray-500">
                      {data?.room?.num_of_bed.map((item: any) => {
                        return (
                          <li>
                            Giường {item?.size}: {item?.slot}
                          </li>
                        );
                      })}
                      <li>Loại phòng: {data?.room?.type?.room_type_name}</li>
                    </ul>
                  </div>
                  <div className="mt-[20px] text-gray-500 w-full">
                    {data?.room?.type?.description}
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
                        {
                          validator: handleValidateDate,
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
                      label="Tổng số  người lớn"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn người lớn",
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
                    <Form.Item label="Trẻ em" name="child">
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
                        className="bg-blue-500 mt-5 flex py-5 w-full justify-center md:py-4 px-7 gap-1 items-center"
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
        </div>
        <Swiper
          slidesPerView={2}
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
                    className="h-[300px] w-[100%] object-cover"
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
              <div className="text-[18px] cursor-pointer ml-1">
                <label htmlFor="imgUp" className="!text-[20px]">
                  <FileImageOutlined />
                </label>
                <input
                  type="file"
                  name=""
                  multiple
                  id="imgUp"
                  className="!hidden"
                  onChange={handleImageChange}
                />
              </div>
              <div className="flex bg-white">
                {imagePreviews.map((item: any, index: any) => (
                  <div className="relative mt-2 overflow-hidden p-3">
                    <img
                      src={item}
                      alt=""
                      className=" object-cover rounded w-[150px] h-[100px]"
                    />

                    <div
                      onClick={() => handleRemoveImage(index)}
                      className="absolute bottom-[75%] right-[2%] cursor-pointer bg-white rounded-full px-2 py-1 shadow-lg"
                    >
                      <CloseOutlined />
                    </div>
                  </div>
                ))}
              </div>
              <Form.Item
                name="comment"
                rules={[{ required: true, message: "Vui lòng nhập bình luận" }]}
                className=""
              >
                <TextArea
                  rows={4}
                  placeholder="Đánh giá của bạn...."
                  className="pt-3 bg-none outline-none border-none"
                />
              </Form.Item>

              <Form.Item>
                <button
                  className={`bg-blue-500 flex items-center gap-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded }`}
                >
                  <span className={`${!isLoadingCmt ? "block" : "hidden"}`}>
                    Đánh giá
                  </span>
                  <span
                    className={`${
                      isLoadingCmt ? "block" : "hidden"
                    } animate-spin`}
                  >
                    <RedoOutlined className="text-[15px]" />
                  </span>
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
            data?.room?.rate?.map((item: any) => (
              <section className="bg-bgr  pt-8 m-auto">
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
                    </footer>
                    <div className=" pb-2">
                      <div className="flex items-center space-x-1 ">
                        <Rate
                          allowHalf
                          disabled
                          defaultValue={5}
                          value={+item?.star}
                          className="text-[18px]"
                        />
                      </div>
                    </div>
                    <p className="text-gray-500 ">{item.content}</p>
                  </article>
                  {item?.image?.length && (
                    <div className="mt-3">
                      {item?.image?.map((item: any) => {
                        return (
                          <img className="max-w-[100px]" src={item} alt="" />
                        );
                      }) || ""}
                    </div>
                  )}
                </div>
              </section>
            ))}
        </div>
      </div>
    </Page>
  );
};

export default Detail;
