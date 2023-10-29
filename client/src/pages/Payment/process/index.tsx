import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export default function PaymentProcess() {
    const [cookie, setCookie, removeCookie] = useCookies(['paymentPage']);
    useEffect(() => {
        setCookie('paymentPage', 3, { path: '/' })
    })
    return ( 
        <div className="container mx-auto" style={{
            maxWidth: 1000,
        }}>

            <div className="mt-12 mb-8">
                <h1 className="text-2xl font-bold mb-3"><Spin indicator={antIcon} /> Chờ chút, chúng tôi đang xử lý đơn đặt của bạn !</h1>
            </div>
        </div>
    )
}