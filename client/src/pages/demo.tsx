import { Button, Card, message, Modal, Steps } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox, Form, Input } from 'antd';
import { Col, Row } from 'antd';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useCookies } from 'react-cookie';
import { log } from 'console';
import { usePostBookingMutation } from '../api/Room';




type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};
const steps = [
    {
        title: 'Đặt phòng',
        content: 'room-book',
    },
    {
        title: 'Xác nhận',
        content: 'accept',
    },
    {
        title: 'Thanh toán',
        content: 'payment',
    },
    {
        title: 'Xử lý',
        content: 'process',
    },
    {
        title: 'Hoàn tất',
        content: 'success',
    },
];




const Demo = () => {
    const [Booking] = usePostBookingMutation()
    const [form] = Form.useForm()
    const [cookies] = useCookies();
    console.log(cookies.roomBooking);
    console.log(cookies.userInfo);

    const item = cookies.roomBooking
    const userInfo = cookies.userInfo
    const [isModalLogin, setIsModalLogin] = useState(false);
    // const [isModalRegister, setIsModalRegister] = useState(false);
    const onFinish = (values: any) => {
        console.log('Success:', values);
        Booking(values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
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
                    <p className='text-sm'>(5x) {item?.name}</p>
                    <p className='text-sm'>{item?.discount} VNĐ</p>
                </div>
        },
    ];
    const showModal = () => {
        setIsModalLogin(true);
    };

    const handleOk = () => {
        setIsModalLogin(false);
    };

    const handleCancel = () => {
        setIsModalLogin(false);
    };
    const [current, setCurrent] = useState(0);

    // const next = (event: any) => {
    //     console.log(event.taget.phone);


    // };

    const prev = () => {
        setCurrent(current - 1);
    };
    // useEffect(() => {
    //     console.log(userInfo);

    //     form.setFieldsValue(userInfo)
    // }, [userInfo])
    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    return (
        <>aHIHI</>
    )
}