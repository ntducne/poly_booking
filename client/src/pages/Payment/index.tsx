import { Card } from 'antd';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export default function PaymentView() {
    const [cookie, setCookie] = useCookies(['paymentPage', 'bookingNow', 'roomSearch', 'userInfo', 'userBook', 'paymentMethod']);

    useEffect(() => {
        setCookie('paymentPage', 2, { path: '/' })
    },[])

    const selectPaymentMethod = (e :any) => { 
        setCookie('paymentMethod', e.target.value, { path: '/' })
    }

    return (
        <div className="container mx-auto" style={{
            maxWidth: 1000,
        }}>
            <div className="mt-12 mb-8">
                <h1 className="text-2xl font-bold mb-3">Thanh toán</h1>
            </div>
            <div className="grid pb-4" style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gridGap: '1rem',

            }}>
                <div>
                    <Card title={
                        <div className='pb-2'>
                            <p className='font-semibold text-xl mt-2'>Kiểm tra thông tin đặt phòng </p>
                        </div>
                    }>
                        <div className="rounded-lg bg-white">
                            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                                <img className="h-24 w-28 rounded-md border object-cover object-center" src={cookie.bookingNow.image} alt="" />
                                <div className="flex w-full flex-col px-4 py-4">
                                    <span className="font-semibold">{cookie.bookingNow.room_name}</span>
                                    <span className="float-right text-gray-400">({cookie.roomSearch.soLuong}x)</span>
                                    <p className="text-lg font-bold">{cookie.bookingNow.price} VNĐ</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div >
                    <Card title={
                        <div className='pb-2'>
                            <p className='font-semibold text-xl mt-2'>Phương thức thanh toán</p>
                        </div>
                    }>
                        <ul className="w-full">
                            <li className='mb-2'>
                                <input type="radio" id="method_one" onClick={selectPaymentMethod} name="payment_method" value="vnpay" className="hidden peer" required/>
                                <label htmlFor="method_one" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">                           
                                    <div className="flex items-center space-x-4">
                                        <div style={{
                                            width: 30,
                                        }}>

                                        <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png" alt="" width={30} />
                                        </div>
                                        <h3 className="text-base font-semibold text-heading">VNPAY</h3>
                                    </div>
                                </label>
                            </li>
                            <li className='mb-2'>
                                <input type="radio" id="method_two" onClick={selectPaymentMethod} name="payment_method" value="momo" className="hidden peer"/>
                                <label htmlFor="method_two" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                    <div className="flex items-center space-x-4">
                                        <div style={{
                                            width: 30,
                                        }}>

                                        <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="" width={30} />
                                        </div>
                                        <h3 className="text-base font-semibold text-heading">Momo</h3>
                                    </div>
                                </label>
                            </li>
                            <li className='mb-2'>
                                <input type="radio" id="method_three" onClick={selectPaymentMethod} name="payment_method" value="paypal" className="hidden peer"/>
                                <label htmlFor="method_three" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100">
                                    <div className="flex items-center space-x-4">
                                        <div style={{
                                            width: 30,
                                        }}>
                                        <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="" width={30} />
                                        </div>
                                        <h3 className="text-base font-semibold text-heading">PayPal</h3>
                                    </div>
                                </label>
                            </li>
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    )
}