import { SmileOutlined } from '@ant-design/icons';
import { Result, message } from 'antd';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function PaymentStatus() {
    const [status, setStatus] = useState(null);
    const [, setCookie] = useCookies(['paymentPage']);
    const [billing_id, setBilling_id] = useState(null);
    const location = useLocation();
    const Navigate = useNavigate();
  
    useEffect(() => {
        setCookie('paymentPage', 4, { path: '/' })

        if(location.search) {
            Navigate('/payment/status')
            fetch(`${import.meta.env.VITE_URL_API}/api/vnpay/callback${location.search}`,{
                method: 'GET',
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } 
                else {
                    message.error('Có lỗi xảy ra.');
                }
            })
            .then(data => {
                setStatus(data.status);
                if(data.status == 1){
                    setBilling_id(data.billing_id);
                }
            })
            .catch(() => {
                message.error('Có lỗi xảy ra ! Vui lòng thử lại sau.');
            });
        }

    }, [])

    return (
        <div className="container mx-auto mt-14" style={{
            maxWidth: 1000,
        }}>
            {!status && (
                <Result
                    icon={<SmileOutlined />}
                    title={<>
                        <Spin indicator={antIcon} /> Chờ xíu !!!
                    </>}
                />
            )}
            {status == 1 && (
                <div className="container px-4 mx-auto" data-path="0.0">
                    <Result
                        status="success"
                        title="Đặt phòng thành công !"
                        subTitle={`Cảm ơn quý khách đã đặt phòng tại khách sạn của chúng tôi. Chúng tôi sẽ liên hệ với quý khách trong thời gian sớm nhất. Mã hoá đơn của quý khách là ${billing_id}.`}
                        extra={[<>
                            <Link to="/" type='button' key="buy">Về trang chủ</Link>, Quý khách có thể kiểm tra hoá đơn <Link to={`/search-order`} type='button' key="buy">Tại đây</Link>
                        </>]}
                    />
                </div>
            )}
            {status == 6 && (
                <div className="container px-4 mx-auto" data-path="0.0">
                    <Result
                        status="error"
                        title="Đặt phòng thất bại !"
                        subTitle="Có lỗi xảy ra trong quá trình đặt phòng. Vui lòng thử lại sau."
                        extra={[
                            <Link to="/" type='button' key="buy">Về trang chủ</Link>,
                        ]}
                    />
                </div>
            )}
            {status == 7 && (
                <div className="container px-4 mx-auto" data-path="0.0">
                    <Result
                        status="error"
                        title="Đặt phòng thất bại !"
                        subTitle="Lỗi thanh toán ! Vui lòng thử lại sau."
                        extra={[
                            <Link to="/" type='button' key="buy">Về trang chủ</Link>,
                        ]}
                    />
                </div>
            )}
        </div>
    )
}