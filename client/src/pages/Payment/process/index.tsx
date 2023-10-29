import { LoadingOutlined } from '@ant-design/icons';
import { Spin, message } from 'antd';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export default function PaymentProcess() {
    // const [cookie, setCookie, removeCookie] = useCookies(['paymentPage']);
    const [cookie, setCookie, removeCookie] = useCookies(['paymentPage', 'bookingNow', 'roomSearch', 'userInfo', 'userBook']);

    const Navigate = useNavigate();
    useEffect(() => {
        setCookie('paymentPage', 3, { path: '/' })
        const process = () => {
            fetch('https://api.polydevhotel.site/client/room/booking', {
            method: 'POST',
            body: JSON.stringify({
                'checkin': cookie.roomSearch.checkin,
                'checkout': cookie.roomSearch.checkout,
                "room_id": cookie.bookingNow.room_id,
                "soLuong": cookie.roomSearch.soLuong,
                "branch_id": cookie.roomSearch.branch_id,
                "adults": cookie.roomSearch.adults,
                "children": cookie.roomSearch.children,
                'email': cookie.userBook.email,
                'phone': cookie.userBook.phone,
                'name': cookie.userBook.name,
            }),
            headers: {
                'Authorization': `Bearer ${cookie.userInfo.accessToken.token}`,
                'Content-Type': 'application/json'
            },
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Có lỗi xảy ra trong quá trình đặt phòng.');
                }
            })
            .then(data => {
                console.log(data);
                message.success('Đặt phòng thành công');
                // Navigate('/payment/status')
                // Thực hiện điều hướng sau khi thành công (ví dụ: chuyển đến trang cảm ơn)
            })
            .catch(error => {
                console.error(error);
                message.error('Có lỗi xảy ra trong quá trình đặt phòng. Vui lòng thử lại sau.');
            });
    
        }
        process();
    },[])
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