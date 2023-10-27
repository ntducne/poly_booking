import { SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Pagination, Select } from "antd";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetBranchesQuery } from "../../api/Branch";
import { useGetRoomsQuery } from "../../api/Room";
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
type Props = {};

const { RangePicker } = DatePicker;
export default function Rooms({ }: Props) {
    const [width, setWidth] = useState(0);
    const [dataQuery, setDataQuery] = useState({})
    const { data, isLoading, refetch } = useGetRoomsQuery(dataQuery);
    const { data: dataBranches, isLoading: isLoadingBranches } = useGetBranchesQuery({})
    const [, setCookie] = useCookies(['bookingNow']);
    const onFinish = (values: any) => {
        if (values) {
            const formattedData = values?.time.map((item: any) => {
                const date = dayjs(item.$d);
                const formattedDate = date.format('YYYY-MM-DD');
                return formattedDate;
            });
            setDataQuery({
                adult: values.adult,
                child: values.child,
                branch_id: values.branch_id,
                soLuong: values.soLuong,
                checkin: formattedData?.[0],
                checkout: formattedData?.[1],
            })
            console.log('');

        }

    };
    const handleBookingNow = (item: any) => {
        const dataSetCookie = {
            ...item,
            ...dataQuery
        }
        setCookie('bookingNow', dataSetCookie, { path: '/' });
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        setWidth(window.innerWidth);
    }, [window.innerWidth]);
    useEffect(() => {
        refetch()
    })
    if (isLoading) {
        return <>loading...</>;
    }
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
                        <div className="mb-[20px] font-bold text-[18px]">4 accommodations found from November 23, 2023 - till November 24, 2023</div>
                        <div className="flex gap-5 md:flex-row flex-col-reverse justify-start lg:max-w-none lg:mx-0 relative">
                            <div className="flex flex-col gap-[60px]">
                                {data?.data ? data?.data?.map((room: any) => {
                                    return <Room key={room.id} data={room} handleBooking={handleBookingNow} />;
                                }) :
                                    <div>
                                        <img src="https://1987giasi.com/files/assets/tam_het_cam.png" alt="" />
                                    </div>
                                }
                            </div>
                            <div className="md:max-w-[400px] w-full top-[10px] mb-[60px] md:mb-0 md:ml-[40px]">
                                <div className="w-full shadow-lg p-4" style={{ position: "sticky", top: "100px" }}>
                                    <h3 className="font-text_2nd text-[23px] font-bold">Chọn phòng của bạn</h3>
                                    <p className="mt-[15px] text-[12px] italic">Chọn trường dưới đây để tìm kiếm</p>
                                    <Form
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        layout="vertical"
                                        className="mt-[20px]"
                                    >
                                        <Form.Item
                                            label="Thời gian đặt phòng"
                                            name="time"
                                        >
                                            <RangePicker
                                                size={window.innerWidth < 768 ? "large" : "middle"}
                                                className="w-full" placeholder={["Thời gian bắt đầu", "Thời gian kết thúc"]}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Chi nhánh"
                                            name="branch_id"
                                        >
                                            <Select
                                                size={window.innerWidth < 768 ? "large" : "middle"}
                                                placeholder='Chi nhánh'
                                                className='rounded-none'
                                            >
                                                {dataBranches && dataBranches?.data.map((item: any) => {
                                                    return <Select.Option value={item?.id}>{item?.name}</Select.Option>
                                                })}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            label="Người lớn"
                                            name="adult"
                                        >
                                            <Select
                                                placeholder='Người lớn'
                                                className='rounded-none'
                                                size={window.innerWidth < 768 ? "large" : "middle"}

                                            >
                                                <Select.Option value="1">1</Select.Option>
                                                <Select.Option value="2">2</Select.Option>
                                                <Select.Option value="3">3</Select.Option>
                                                <Select.Option value="4">4</Select.Option>
                                                <Select.Option value="5">5</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            label="Trẻ em"
                                            name="child"
                                        >
                                            <Select
                                                placeholder='Trẻ em'
                                                className='rounded-none'
                                                size={window.innerWidth < 768 ? "large" : "middle"}
                                            >
                                                <Select.Option value="1">1</Select.Option>
                                                <Select.Option value="2">2</Select.Option>
                                                <Select.Option value="3">3</Select.Option>
                                                <Select.Option value="4">4</Select.Option>
                                                <Select.Option value="5">5</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            label="Số lượng"
                                            name="soLuong"
                                        >
                                            <Select
                                                placeholder='Số lượng'
                                                className='rounded-none'
                                                size={window.innerWidth < 768 ? "large" : "middle"}
                                            >
                                                <Select.Option value="1">1</Select.Option>
                                                <Select.Option value="2">2</Select.Option>
                                                <Select.Option value="3">3</Select.Option>
                                                <Select.Option value="4">4</Select.Option>
                                                <Select.Option value="5">5</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type="primary" className="bg-blue-500 flex py-5 w-full justify-center md:py-4 px-7 gap-1 items-center" htmlType="submit">
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
                        <Pagination defaultCurrent={6} total={500} />
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
