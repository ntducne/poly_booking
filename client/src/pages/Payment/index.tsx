import { Card } from 'antd';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export default function PaymentView() {
    const [cookie, setCookie, removeCookie] = useCookies(['paymentPage']);
    useEffect(() => {
        setCookie('paymentPage', 2, { path: '/' })
    })
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
                                <img className="h-24 w-28 rounded-md border object-cover object-center" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                                <div className="flex w-full flex-col px-4 py-4">
                                    <span className="font-semibold">Nike Air Max Pro 8888 - Super Light</span>
                                    <span className="float-right text-gray-400">42EU - 8.5US</span>
                                    <p className="text-lg font-bold">$138.99</p>
                                </div>
                            </div>
                            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                                <img className="h-24 w-28 rounded-md border object-cover object-center" src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
                                <div className="flex w-full flex-col px-4 py-4">
                                <span className="font-semibold">Nike Air Max Pro 8888 - Super Light</span>
                                <span className="float-right text-gray-400">42EU - 8.5US</span>
                                <p className="mt-auto text-lg font-bold">$238.99</p>
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
                                <input type="radio" id="method_one" name="payment_method" value="method_one" className="hidden peer" required/>
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
                                <input type="radio" id="method_two" name="payment_method" value="method_two" className="hidden peer"/>
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
                                <input type="radio" id="method_three" name="payment_method" value="method_three" className="hidden peer"/>
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