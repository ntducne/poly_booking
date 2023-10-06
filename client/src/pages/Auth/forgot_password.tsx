import { Form, Input } from 'antd';
import { useState } from 'react';
import Page from '../../components/Page';

// import './ForgotPassword.css';

function ForgotPassword() {
    const [form] = Form.useForm();
    const [showOTP, setShowOTP] = useState(false); // State để kiểm soát việc hiển thị mã OTP

    const onFinish = (values: any) => {
        if (showOTP) {
            // Kiểm tra nếu mã OTP chỉ chứa chữ số
            if (/^[0-9]*$/.test(values.otp)) {
                // Xử lý khi mã OTP hợp lệ
                // Không cần thay đổi trạng thái showOTP
            } else {
                // Xử lý khi mã OTP không hợp lệ (không chỉ chứa chữ số)
                // Ví dụ: Hiển thị thông báo lỗi
            }
        } else {
            setShowOTP(true); // Hiển thị trường nhập mã OTP sau khi nhấn "Gửi liên kết"
        }
    };


    return (
        <Page title='Quên mật khẩu'>
            <div className="flex items-center justify-center h-[120vh] lg:h-screen md:h-screen bg-bgr">
                <section className="h-screen" >
                    <div className="flex items-center justify-center h-full">
                        <div className="w-[300px] h-[600px] lg:h-[600px] lg:w-[1050px] md:h-[450px] md:w-[725px] bg-white rounded-md shadow-2xl hover:shadow-2xl ">
                            <div
                                className="md:flex md:flex-wrap md:items-center lg:flex lg:flex-wrap lg:items-center lg:gap-5 md:gap-2">
                                <div
                                    className="shrink-1 mb-12 grow-0 basis-auto lg:w-6/12 xl:w-6/12 md:w-6/12">
                                    <img
                                        src="https://cdn.alongwalk.info/vn/wp-content/uploads/2022/03/12183725/image-7-khach-san-5-sao-vung-tau-view-bien-cuc-dep-164705984460476.jpg"
                                        className="h-[150px] w-[300px] lg:w-full lg:h-[600px] md:h-[450px] md:w-full border rounded-md"
                                        alt="Sample image" />
                                </div>

                                <div className="w-5/6 mx-6 md:mb-12 lg:w-5/12 xl:w-5/12 md:w-5/12">
                                    <Form name="validateOnly" layout="vertical" autoComplete="off" form={form} onFinish={onFinish}>
                                        <div className="relative mb-6" data-te-input-wrapper-init>
                                            <Form.Item name="email" label={<span className="text-gray-500 text-small">Email address</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập địa chỉ Email!',
                                                    },
                                                    {
                                                        type: 'email',
                                                        message: 'Địa chỉ email không hợp lệ!',
                                                    },
                                                ]} >
                                                <Input className="bg-transparent border rounded w-full h-[35px]" />
                                            </Form.Item>
                                        </div>

                                        {showOTP && ( // Hiển thị trường nhập mã OTP nếu showOTP là true
                                            <div className="relative mb-6" data-te-input-wrapper-init>
                                                <Form.Item
                                                    name="otp"
                                                    label={<span className="text-gray-500 text-small">Mã OTP</span>}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Vui lòng nhập mã OTP!',
                                                        },
                                                        {
                                                            min: 6,
                                                            message: 'Mật khẩu phải có ít nhất 6 ký tự!',
                                                        },
                                                        {
                                                            pattern: /^[0-9]*$/, // Chỉ chấp nhận các chữ số
                                                            message: 'Mã OTP phải là chữ số!',
                                                        },
                                                    ]}
                                                >
                                                    <Input className="bg-transparent border rounded w-full h-[35px]" />
                                                </Form.Item>
                                            </div>
                                        )}

                                        <div className="text-center lg:text-left">
                                            <button
                                                className='bg-primary w-[100px] lg:h-full active:bg-black justify-center md:h-[65px] flex items-center border rounded-[5px] transition-transform transform hover:scale-95'
                                            >
                                                <p className='text-secondary p-2'>{showOTP ? 'Xác nhận' : 'Gửi liên kết'}</p>
                                            </button>


                                            <p className="mb-0 mt-2 pt-1 text-sm font-semibold flex gap-2">
                                                You remember your password?
                                                <a
                                                    href="login"
                                                    className="text-danger text-blue-500 transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                                                >Login</a>
                                            </p>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div >
                </section >
            </div >
        </Page>
    );
}

export default ForgotPassword;
