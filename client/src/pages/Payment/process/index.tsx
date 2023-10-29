import { LoadingOutlined } from '@ant-design/icons';
import { Spin, message } from 'antd';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export default function PaymentProcess() {
    const [cookie, setCookie, removeCookie] = useCookies(['paymentPage', 'bookingNow', 'roomSearch', 'userInfo', 'userBook', 'paymentMethod']);
    useEffect(() => {
        setCookie('paymentPage', 3, { path: '/' })
        const process = () => {

            const data  = {
                "room_id": cookie.bookingNow.room_id,
                    
                'checkin': cookie.roomSearch.checkin,
                'checkout': cookie.roomSearch.checkout,
                "soLuong": cookie.roomSearch.soLuong,
                "branch_id": cookie.roomSearch.branch_id,
                "adults": cookie.roomSearch.adult,
                "children": cookie.roomSearch.child,
    
                'email': cookie.userBook.email,
                'phone': cookie.userBook.phone,
                'name': cookie.userBook.name,
                'billingCode': Math.floor(Math.random() * 1000000),
            }

            console.log(data);
            

            fetch('https://api.polydevhotel.site/client/room/booking', {
                method: 'POST',
                body: JSON.stringify(data),
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
                removeCookie('bookingNow', { path: '/' });
                removeCookie('roomSearch', { path: '/' });
                removeCookie('userBook', { path: '/' });
                removeCookie('paymentPage', { path: '/' });
                if(cookie.paymentMethod === 'vnpay'){
                    removeCookie('paymentMethod', { path: '/' });
                    window.location.href = `https://api.polydevhotel.site/api/vnpay/process/${data.bill.billingCode}/${data.bill.total}`;
                }
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