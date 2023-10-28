import { Button, Card, Modal } from 'antd';
import { useState } from 'react';
import { Checkbox, Form, Input } from 'antd';
import { Col, Row } from 'antd';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const itemsColapper: CollapseProps['items'] = [
    {
        key: '1',
        label:
            <div className='flex justify-between items-center'>
                <p className='text-xl font-bold'>Thành tiền</p>
                <p className='text-xl font-bold'>1.000.000 VNĐ</p>
            </div>
        , children:
            <div className='flex justify-between items-center'>
                <p className='text-sm'>(5x) Superior Double Room</p>
                <p className='text-sm'>200.000 VNĐ</p>
            </div>
    },
];
export default function AccommodationBook() {
    const [isModalLogin, setIsModalLogin] = useState(false);
    // const [isModalRegister, setIsModalRegister] = useState(false);

    const showModal = () => {
        setIsModalLogin(true);
    };
    const handleOk = () => {
        setIsModalLogin(false);
    };
    const handleCancel = () => {
        setIsModalLogin(false);
    };
    return (
        <>
            <Modal title="Đăng nhập" open={isModalLogin} onOk={handleOk} onCancel={handleCancel} footer={[
                <Button className='max-w-[200px]'>
                    Đăng nhập
                </Button>
            ]}>
                <Form
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                    // style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
            <div className="container mx-auto" style={{
                maxWidth: 1000,
            }}>
                <div className="mt-12 mb-8">
                    <h1 className="text-2xl font-bold mb-3">Đặt phòng khách sạn</h1>
                    <h5 className="text-md font-bold text-gray-500">Hãy chắc chắn rằng tất cả thông tin trên trang này là chính xác trước khi tiến hành thanh toán.</h5>
                </div>
                <div className="grid pb-4" style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gridGap: '1rem',

                }}>
                    <div>
                        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row">
                            <img className="object-cover w-full rounded-t-lg h-60 md:h-auto md:w-20 md:rounded-none md:rounded-l-lg ml-5" src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/334a43706b543daaa27995a60d895f2a.png" alt="" />
                            <div className="flex flex-col justify-between p-4 leading-normal">
                                <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900">Đăng nhập hoặc Đăng ký và tận hưởng ưu đãi dành riêng cho thành viên</h5>
                                <p className="mb-3 font-normal text-gray-700 flex"><img className='mr-2' src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/5/513ab8104dcf3ae7a42419cba432351d.svg" alt="" /> Đặt chỗ nhanh và dễ dàng hơn với Passenger Quick Pick</p>
                                <Button className='max-w-[200px]' onClick={showModal}>
                                    Đăng nhập hoặc đăng ký
                                </Button>
                            </div>
                        </div>

                        <div className='mt-6 '>
                            <h1 className="text-xl font-bold mb-3">Chi tiết liên hệ (cho Vé điện tử/Phiếu xác nhận)</h1>
                            <div className='bg-white rounded-md border border-gray-200 shadow-sm'>
                                <div className='p-5'>
                                    <div className="mb-3">
                                        <label htmlFor="text" className="font-bold block mb-2 text-sm text-gray-900">Họ và tên</label>
                                        <input type="text" id="text" className="border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" />
                                        <div className='mt-1 text-gray-400'>*Nhập tên như trên CMND/hộ chiếu (không dấu)</div>
                                    </div>
                                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                                        <div>
                                            <label htmlFor="phone" className="font-bold block mb-2 text-sm text-gray-900">Số điện thoại</label>
                                            <input type="phone" id="phone" className="border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" />
                                            <div className='mt-1 text-gray-400'>VD: +84 901234567 trong đó (+84) là mã quốc gia còn 901234567 là số di động</div>
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="font-bold block mb-2 text-sm text-gray-900">Email</label>
                                            <input type="email" id="email" className="border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5" />
                                            <div className='mt-1 text-gray-400'>VD: email@example.com</div>
                                        </div>
                                    </div>
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>

                        <div className='mt-6'>
                            <h1 className="text-xl font-bold mb-3">Yêu cầu đặc biệt</h1>
                            <div className=''>
                                <Card title={
                                    <div className='text-xs'>
                                        Cơ sở lưu trú sẽ cố gắng đáp ứng yêu cầu của bạn dựa trên tình trạng sẵn có. <br /> Lưu ý rằng bạn có thể phải trả thêm phí cho một số yêu cầu và bạn không thể sửa yêu cầu sau khi đã gửi.
                                    </div>
                                }
                                    headStyle={{
                                        backgroundColor: '#f5f5f5'
                                    }}

                                >
                                    <div className="" >
                                        <Checkbox.Group style={{ width: '100%' }} >
                                            <Row>
                                                <Col span={8}>
                                                    <Checkbox value="A">Phòng không hút thuốc</Checkbox>
                                                </Col>
                                                <Col span={8}>
                                                    <Checkbox value="B">Tầng lầu</Checkbox>
                                                </Col>
                                                <Col span={8}>
                                                    <Checkbox value="C">Phòng liên thông</Checkbox>
                                                </Col>
                                                <Col span={8}>
                                                    <Checkbox value="D">Loại giường</Checkbox>
                                                </Col>
                                                <Col span={8}>
                                                    <Checkbox value="E">Giờ nhận phòng</Checkbox>
                                                </Col>
                                                <Col span={8}>
                                                    <Checkbox value="F">Giờ trả phòng</Checkbox>
                                                </Col>
                                                <Col span={8}>
                                                    <Checkbox value="G">Khác</Checkbox>
                                                </Col>
                                            </Row>
                                        </Checkbox.Group>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        <div className='mt-6 '>
                            <h1 className="text-xl font-bold mb-3">Chính sách hủy đặt phòng</h1>
                            <div className='bg-white border border-gray-200 rounded-lg p-5'>
                                <div className='mb-5'>
                                    <p className='text-md font-bold mb-1'>Có áp dụng chính sách hủy phòng</p>
                                    <p className='text-gray-500'>Hủy đặt phòng này có thể phải chịu một khoản phí hủy phòng nhất định.</p>
                                </div>
                                <div>
                                    <p className='text-md font-bold mb-1'>Có thể đổi lịch</p>
                                    <p className='text-gray-500'>Đặt phòng này có thể đổi lịch nhưng bạn có thể phải chịu một khoản phí hủy.</p>
                                    <ul className="mt-2 space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                        <li>
                                            Bất kỳ mã giảm giá hoặc điểm đã sử dụng trong đặt phòng ban đầu sẽ không thể áp dụng cho đặt phòng mới.
                                        </li>
                                        <li>
                                            Phí đổi lịch có thể được áp dụng dựa trên sự chênh lệch giá giữa đặt phòng cũ và mới.
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div className='mt-6'>
                            <h1 className="text-xl font-bold mb-3">Tiện Ích Bổ Sung cho Kỳ Nghỉ Của Bạn</h1>
                            <div className=''>
                                <Card title={
                                    <div className=''>
                                        <Checkbox value="AFF">Bảo hiểm Du lịch Chubb - Hotel Protect</Checkbox>
                                        <p className='text-gray-500 text-xs'>Bảo vệ kỳ nghỉ của Quý khách khỏi rủi ro bị hủy, mất đặt phòng khách sạn, và hơn thế nữa</p>
                                    </div>
                                }
                                >
                                    <div className="" >
                                        <ul className="space-y-4 text-left">
                                            <li className="flex items-center space-x-3">
                                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                                </svg>
                                                <span>Bảo hiểm lên đến tối đa VND 850,000/phòng/đêm cho Quyền lợi Hủy hoặc Gián đoạn Đặt phòng khách sạn.</span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                                </svg>
                                                <span>Bảo hiểm lên đến tối đa VND 850,000/phòng/đêm cho Quyền lợi Đặt phòng khách sạn.</span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                                </svg>
                                                <span>Bảo hiểm lên đến VND 210,000,000 cho Quyền lợi Tai nạn cá nhân</span>
                                            </li>
                                            <li className="flex items-center space-x-3">
                                                <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                                </svg>
                                                <span>Bảo hiểm lên đến VND 20,000,000 cho Quyền lợi Mất hoặc hư hại hành lý, quần áo và vật dụng cá nhân</span>
                                            </li>
                                        </ul>
                                    </div>
                                </Card>
                            </div>
                        </div>

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
                        <Card title={
                            <div className='flex'>
                                <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/6aa2fd01a9460e1a71bb0efb713f0212.svg" alt="" />
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className=" text-md font-bold tracking-tight text-gray-900">Polydev Quang Ninh</h5>
                                    <p className="font-normal text-gray-700 flex">Polydev Quang Ninh</p>
                                </div>
                            </div>
                        }
                            bodyStyle={{
                                backgroundColor: '#f5f5f5'
                            }}
                        >
                            <div className="grid" style={{ display: 'grid', gridTemplateColumns: '3fr 3fr' }}>
                                <p>Ngày nhận phòng</p>
                                <p className='font-bold'>10/10/2023 - Từ 12:00</p>
                            </div>
                            <div className="grid" style={{ display: 'grid', gridTemplateColumns: '3fr 3fr' }}>
                                <p>Ngày trả phòng</p>
                                <p className='font-bold'>15/10/2023 - Trước 14:00</p>
                            </div>
                        </Card>
                        <Card className='mt-2' title={
                            <div className='flex items-center'>
                                <img className='w-14 h-14 rounded-md' src="https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20023314-5ed86dd02e4234d1bb6025804fef7200.jpeg?_src=imagekit&tr=h-80,q-40,w-80" alt="" />
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className=" text-md font-bold tracking-tight text-gray-900">Superior Double Room</h5>
                                    <p className="font-normal text-gray-700 flex">(4x) Superior Double Room</p>
                                </div>
                            </div>
                        }
                        >
                            <div className="grid" style={{
                                // grid-template-columns: 3fr 1fr; grid-gap: 1rem;
                                display: 'grid',
                                gridTemplateColumns: '2fr 3fr',
                            }}>
                                <p>khách/phòng</p>
                                <p className='font-bold'>2 khách</p>
                            </div>

                            <div className="grid" style={{
                                // grid-template-columns: 3fr 1fr; grid-gap: 1rem;
                                display: 'grid',
                                gridTemplateColumns: '2fr 3fr',
                            }}>
                                <p>Kiểu giường</p>
                                <p className='font-bold'>2 giường đôi</p>
                            </div>
                        </Card>
                    </div>
                </div>




            </div>
        </>
    )
}