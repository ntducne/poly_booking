import { Button, message, Steps } from 'antd';
import { useState } from 'react';

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
];

const Demo = () => {

    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    return (
        <>
            <nav className="bg-white sticky w-full z-20 top-0 left-0 border-b border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
                    <a href="https://flowbite.com/" className="flex items-center">
                        <img src="https://res.cloudinary.com/dteefej4w/image/upload/v1696338661/logo_30_zwmslg.png" className="h-10 mr-3" alt="Flowbite Logo" />
                        {/* <span className="self-center text-2xl font-semibold whitespace-nowrap">Thanh toán</span> */}
                    </a>
                    <div className="flex md:order-2">
                        <Steps current={current} items={items}/>
                    </div>
                </div>
            </nav>

            <div>
                {current == 0
                    ?
                    <div className="container mx-auto" style={{
                        maxWidth: 1000
                    }}>
                        <div className="mt-12 mb-8">
                            <h1 className="text-3xl font-bold mb-3">Đặt phòng khách sạn</h1>
                            <h5 className="text-md font-bold text-gray-500">Hãy chắc chắn rằng tất cả thông tin trên trang này là chính xác trước khi tiến hành thanh toán.</h5>
                        </div>

                        <div className="grid" style={{
                            // grid-template-columns: 3fr 1fr; grid-gap: 1rem;
                            display: 'grid',
                            gridTemplateColumns: '3fr 2fr',
                            gridGap: '1rem'
                        }}>
                            <div>
                                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt="" />
                            </div>
                            <div>
                                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                            </div>
                        </div>

                    </div>
                    :

                    <h1>helolo</h1>


                }




            </div>
            <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Button onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </>
    );
}
export default Demo;