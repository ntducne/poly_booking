import { message, Steps } from 'antd';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, Outlet, useNavigate } from 'react-router-dom';
type Props = {}

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

const PaymentLayout = ({ } :Props) => {
    const navigate = useNavigate()
    const [current, setCurrent] = useState(0);
    const [cookie, setCookie, removeCookie] = useCookies(['paymentPage']);

    useEffect(() => {
        if (cookie.paymentPage) {
            setCurrent(cookie.paymentPage)
        }
    
    })

    const next = () => {
        setCurrent(current + 1);
        current == 0 && navigate('/accommodation/book/review')
        current == 1 && navigate('/payment')
        removeCookie('paymentPage', { path: '/' })
        setCookie('paymentPage', current + 1, { path: '/' })      
    };

    const prev = () => {
        removeCookie('paymentPage', { path: '/' })
        setCurrent(current - 1);
        setCookie('paymentPage', current - 1, { path: '/' })  
        current == 1 && navigate('/accommodation/book')
        current == 2 && navigate('/accommodation/book/review')
        current == 3 && navigate('/payment')
    };
    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    return (
        <div className='bg-white'>
            <nav className="bg-white sticky w-full z-20 top-0 left-0 border-b border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto container p-3">
                    <Link to="/" className="flex items-center">
                        <img src="https://res.cloudinary.com/dteefej4w/image/upload/v1696338661/logo_30_zwmslg.png" className="h-10 mr-3" />
                    </Link>
                    <div className="w-1/2">
                        <Steps current={current} items={items} size="small" />
                    </div>
                </div>
            </nav>
            <div className=''>
                <Outlet/>
                <div className="container mx-auto grid pb-10" style={{
                    maxWidth: 1000,
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gridGap: '1rem',
                    
                }}>
                    <div className=' flex items-center justify-end'>
                        {current > 0 && (
                            <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" style={{ margin: '0 8px' }} onClick={() => prev()}>
                                Quay lại
                            </button>
                        )}
                        {current < steps.length - 1 && (
                            <button className='class="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-10 py-2.5 text-center mr-2"' onClick={() => next()}>
                                {current == 0 && 'Tiếp tục'}
                                {current == 1 && 'Xác nhận'}
                                {current == 2 && 'Thanh toán'}
                            </button>
                        )}
                        {current === steps.length - 1 && (
                            <button onClick={() => message.success('Processing complete!')}>
                                Done
                            </button>
                        )}

                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}
export default PaymentLayout;