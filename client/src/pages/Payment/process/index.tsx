import { LoadingOutlined } from '@ant-design/icons';
import { Button, Result, Spin, message } from 'antd';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export default function PaymentProcess() {
    const [cookie, setCookie, removeCookie] = useCookies(['paymentPage', 'bookingNow', 'roomSearch', 'userBook', 'paymentMethod']);
    const [status, setStatus] = useState(0);

    const navigate = useNavigate()
    useEffect(() => {
        if(!cookie?.bookingNow || !cookie?.roomSearch) {
            navigate('/')
        }
        setCookie('paymentPage', 2, { path: '/' })
        const process = () => {
            let val = {
                "room_id": cookie?.bookingNow?.room_id,
                'checkin': cookie?.roomSearch?.checkin,
                'checkout': cookie?.roomSearch?.checkout,
                "amount_room": cookie?.roomSearch?.soLuong,
                "branch_id": cookie?.roomSearch?.branch_id,
                "adult": cookie?.roomSearch?.adult,
                "child": cookie?.roomSearch?.child,
                'email': cookie?.userBook?.email,
                'phone': cookie?.userBook?.phone,
                'name': cookie?.userBook?.name,
                'payment_method': cookie?.paymentMethod
            }
            fetch(`${import.meta.env.VITE_URL_CLIENT}/v2/booking`, {
                method: 'POST',
                body: JSON.stringify(val),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Có lỗi xảy ra trong quá trình đặt phòng. Status: ' + response.status);
                }
            })
            .then(data => {
                if(data?.status == false){
                    message.error(data?.message);
                    setStatus(2);
                }
                if(data?.status == true){
                    message.success(data?.message);
                    setStatus(1);
                    if(data?.url){
                        setTimeout(() => {
                            window.location.href = data?.url;
                        }, 2000);
                    }
                    if(data?.billingCode){
                        navigate(`/payment/status?billingCode=${data?.billingCode}`)
                    }
                } 
            })
            .catch(error => {
                setStatus(3);
                console.error(error);
                message.error('Có lỗi xảy ra trong quá trình đặt phòng. Vui lòng thử lại sau.');
            });
        }
        process();
    },[])

    const returnHome = () => {
        removeCookie('bookingNow', { path: '/' });
        removeCookie('roomSearch', { path: '/' });
        removeCookie('userBook', { path: '/' });
        removeCookie('paymentMethod', { path: '/' });
        navigate('/');
    }

    const returnRoom = () => {
        removeCookie('bookingNow', { path: '/' });
        removeCookie('roomSearch', { path: '/' });
        removeCookie('userBook', { path: '/' });
        removeCookie('paymentMethod', { path: '/' });
        navigate('/rooms');
    }

    const returnContact = () => {
        removeCookie('bookingNow', { path: '/' });
        removeCookie('roomSearch', { path: '/' });
        removeCookie('userBook', { path: '/' });
        removeCookie('paymentMethod', { path: '/' });
        navigate('/contact');
    }

    return ( 
        <div className="container mx-auto" style={{
            maxWidth: 1000,
        }}>
            {status == 0 && (
            <div className="mt-12 mb-8">
                <h1 className="text-2xl font-bold mb-3"><Spin indicator={antIcon} /> Chờ chút, chúng tôi đang xử lý đơn đặt của bạn !</h1>
            </div>
            )}
            {status == 1 && (
                <div className="container px-4 mx-auto" data-path="0.0">
                    <Result
                        status="success"
                        title="Chúng tôi đã nhận được đơn đặt phòng của quý khách, hệ thống chuyển hướng quý khách đến trang thanh toán ngay sau đây!"
                    />
                </div>
            )}
            {status == 2 && (
                <div className="container px-4 mx-auto" data-path="0.0">
                    <Result
                        status="error"
                        title="Đặt phòng thất bại !"
                        subTitle="Phòng đã được đặt bởi người khác. Xin quý khách vui lòng đổi phòng khác đặt. Xin cảm ơn !"
                        extra={[
                            <Button onClick={returnHome} key="0">
                                Về trang chủ
                            </Button>,
                            <Button onClick={returnRoom} key="1">
                                Tiến hành đặt phòng lại
                            </Button>,
                        ]}
                    />
                </div>
            )}
             {status == 3 && (
                <div className="container px-4 mx-auto" data-path="0.0">
                    <Result
                        status="error"
                        title="Đặt phòng thất bại !"
                        subTitle="Có lỗi xảy ra khi đặt phòng. Vui lòng liên hệ với chúng tôi để được hỗ trợ. Xin cảm ơn !"
                        extra={[
                            <Button onClick={returnHome} key="0">
                                Về trang chủ
                            </Button>,
                            <Button onClick={returnContact} key="1">
                                Liên hệ với chúng tôi
                            </Button>,
                        ]}
                    />
                </div>
            )}
        </div>
    )
}