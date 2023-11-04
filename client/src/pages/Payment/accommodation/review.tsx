import { Card } from 'antd';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const itemsPolicy: CollapseProps['items'] = [
    {
        key: '1',
        label:
            <div className=''>
                <div className='flex'>
                    <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/4/490736fd267a2218e286f4e02312f7f7.svg" alt="" />
                    <p className='ml-3 text-xl font-bold'>
                        Chính sách huỷ phòng & đổi lịch    
                    </p>
                </div>
                <p className='mt-2 text-md font-bold'>Không hoàn tiền không đổi lịch</p>
            </div>
        , children:
        <>
            <div className='mb-4'>
            Đặt phòng này <span className='font-bold'>không thể hoàn tiền</span> và <span className='font-bold'>không thể đổi lịch.</span>
            </div>
        </>
           
    },
];
export default function AccommodationReview() {
    const [cookie, setCookie] = useCookies(['paymentPage', 'bookingNow', 'roomSearch', 'userInfo', 'userBook']);

    useEffect(() => {
        setCookie('paymentPage', 1, { path: '/' })
    },[])

    const itemsColapper: CollapseProps['items'] = [
        {
            key: '1',
            label:
                <div className='flex justify-between items-center'>
                    <p className='text-xl font-bold'>Thành tiền</p>
                    <p className='text-xl font-bold'>{cookie.bookingNow.price} VNĐ</p>
                </div>
            , children:
            <>
                <div className='flex justify-between items-center mb-4 font-semibold'>
                    <p className='text-sm'>({cookie.roomSearch.soLuong}x) {cookie.bookingNow.room_name}</p>
                    <p className='text-sm'>{cookie.bookingNow.price} VNĐ</p>
                </div>
            </>
        },
    ];

    return (
        <>
            <div className="container mx-auto" style={{
                maxWidth: 1000,
            }}>
                <div className="mt-12 mb-8">
                    <h1 className="text-2xl font-bold mb-3">Bạn vui lòng kiểm tra lại đặt chỗ</h1>
                    <h5 className="text-md font-bold text-gray-500">Vui lòng xem lại chi tiết đặt phòng của bạn trước khi tiếp tục đến bước thanh toán</h5>
                </div>
                <div className="grid pb-4" style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gridGap: '1rem',

                }}>
                    <div>
                        <div className=" bg-white border border-gray-200 rounded-lg shadow ">
                            <div className='flex flex-col items-center md:flex-row'>
                                <img className="object-cover w-full rounded-t-lg h-60 md:h-auto md:w-36 md:rounded-none md:rounded-l-lg ml-5" src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/334a43706b543daaa27995a60d895f2a.png" alt="" />
                                <div className="flex flex-col justify-between p-4 leading-normal w-full">
                                    <p className="mb-3 font-bold text-xl text-gray-700 flex ">
                                        <img className='mr-2' src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/6aa2fd01a9460e1a71bb0efb713f0212.svg" alt="" />
                                        {cookie.bookingNow.branch}
                                    </p>
                                    <hr className='mb-3'/>
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                                        <div className="">
                                            <p className='mb-2 font-bold text-sm text-gray-500'>Ngày nhận phòng:</p>
                                            <p className='mb-2 font-bold text-sm'>{cookie.roomSearch.checkin}</p>
                                            <p>Từ 14:00</p>
                                        </div>
                                        <div className="">
                                            <p className='mb-2 font-bold text-sm text-gray-500'>Ngày trả phòng:</p>
                                            <p className='mb-2 font-bold text-sm'>{cookie.roomSearch.checkout}</p>
                                            <p>Trước 12:00</p>
                                        </div>
                                        {/* <div className="">
                                            <p className='mb-2 font-bold text-sm text-gray-500'>Số đêm nghỉ:</p>
                                            <p>5</p>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <hr className='ml-5 mr-5 mx-auto' />
                            <p className='font-bold text-xl ml-5 mb-3 mt-3'>{cookie.bookingNow.room_name}</p>
                            <div className='grid grid-cols-2 gap-4 pl-5'>
                                {/* <div className=''>
                                    <div className="grid grid-cols-2 mb-2" >
                                        <p>Khách/phòng</p>
                                        <p className='font-bold'>4 khách</p>
                                    </div>
                                    <div className="grid grid-cols-2" >
                                        <p>Khách/phòng</p>
                                        <p className='font-bold'>4 khách</p>
                                    </div>
                                </div> */}
                                <div className='mb-5'>
                                    <div className="flex" >
                                        <img className='rounded-md w-20' src={cookie.bookingNow.image} alt="" />
                                        <div className='ml-3'>
                                            <div className='flex mb-2'>
                                                <img className='mr-2' src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/812d6f19a9d1ceb30728acbce11f709a.svg" alt="" />
                                                <p className='font-bold'>Không gồm bữa sáng</p>
                                            </div>
                                            <div className='flex'>
                                                <img className='mr-2' src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/0/01cf1090e2f434a7d63f1cbca912ef44.svg" alt="" />
                                                <p className='font-bold text-green-500'>Wifi miễn phí</p>
                                            </div>

                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Card className='mt-6' title={<p className='font-bold text-xl'>Chính sách khách sạn & phòng</p>}>
                            <Collapse
                                expandIconPosition='end'
                                ghost
                                items={itemsPolicy}
                            />
                        </Card>
                        <Card className='mt-6' title={<p className='font-bold text-xl'>Chính Sách Lưu Trú</p>}>
                            <div className='flex items-center mb-2'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-id="IcSystemClock">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#687176" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M12 6V12L16 14" stroke="#687176" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                <span style={{ fontSize: 16 }} className='ml-2 font-bold text-md'>Thời gian nhận phòng/trả phòng</span>
                            </div>
                            <span className='text-md text-gray-400 font-bold'>Giờ nhận phòng: </span>Từ 14:00  <span className='ml-5 text-md text-gray-400 font-bold'>Giờ trả phòng:</span> Trước 12:00
                        </Card>
                        <div className='mt-6'>
                            <h1 className="text-xl font-bold mb-3">Chi tiết giá</h1>
                            <div className='w-full h-auto border rounded-md'>
                                <Collapse
                                    expandIconPosition='end'
                                    ghost
                                    items={itemsColapper}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Card className='mb-4' title={<p className='font-bold text-xl'>Chi tiết người liên lạc</p>}>
                            <p className='font-medium text-xl'>{cookie.userBook.name}</p>
                            <p className='font-medium text-xl'>{cookie.userBook.phone}</p>
                            <p className='font-medium text-xl'>{cookie.userBook.email}</p>
                        </Card>
                        <Card title={<p className='font-bold text-xl'>Chi tiết khách ở</p>}>
                            <p className='font-bold text-gray-500 text-md'>Room 1 Guest Name</p>
                            <p className='font-medium text-xl'>{cookie.userBook.name}</p>
                            <div className='mt-2 mb-5'></div>
                            <p className='font-bold text-gray-500 text-md'>Yêu cầu đặc biệt</p>
                            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                <li className='mb-2 mt-2'>
                                    
                                </li>
                            </ul>
                            <p className='text-xs'>Các yêu cầu đặc biệt sẽ tùy thuộc vào tính sẵn có và không được bảo đảm. Một số yêu cầu có thể phát sinh phụ phí.</p>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}