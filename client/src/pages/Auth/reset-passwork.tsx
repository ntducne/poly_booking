// import React from 'react'
import { Form, Input, message } from 'antd';
import Page from '../../components/Page';
import { useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../../api/Auth';

type Props = {}

export default function ResetPassword({ }: Props) {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const [resetPassword] = useResetPasswordMutation();
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get('token'); // Lấy token từ URL

    if (typeof token !== 'string') {
        console.log('Token:', token);
        message.error('Token không hợp lệ');
        navigate('/auth/login');
        return null;
    } else {
        console.log('Không có token trong URL.');
    }

    const passwordValidator = (_: any, value: any) => {
        if (value && value.length <= 7) {
            return Promise.reject('Mật khẩu phải có ít nhất 8 ký tự');
        }
        return Promise.resolve();
    };

    const confirmPasswordValidator = (_: any, value: any) => {
        if (value && value !== form.getFieldValue('password')) {
            return Promise.reject('Không trùng khớp với mật khẩu.');
        }
        return Promise.resolve();
    };

    const onFinish = (values: any) => {
        const { newPassword, confirmPassword } = values;
        console.log(values);

        if (newPassword === confirmPassword) {
            resetPassword({ token, newPassword })
                .unwrap()
                .then(() => {
                    message.success('Mật khẩu đã được đặt lại thành công!');
                    setTimeout(() => {
                        navigate('/auth/login')
                    }, 1000);
                })
        } else {
            // Xử lý trường hợp mật khẩu không khớp
            message.error('Mật khẩu không khớp. Vui lòng thử lại.');
        }
    };

    return (
        <Page title='Nhập lại mật khẩu'>
            <div className="flex items-center justify-center h-[120vh] lg:h-screen md:h-screen bg-bgr">
                <section className="h-screen" >
                    <div className="flex items-center justify-center h-full">
                        <div className="w-[300px] h-[600px] lg:h-[600px] lg:w-[1050px] md:h-[450px] md:w-[725px] bg-white rounded-md shadow-2xl">
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
                                            <Form.Item name="newPassword" label={<span className="text-gray-500 text-small">Password</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập mật khẩu!',
                                                        validateTrigger: ['onBlur'],
                                                    },
                                                    {
                                                        validator: passwordValidator,
                                                    },
                                                ]}>
                                                <Input className="bg-transparent border rounded w-[250px] h-[35px] lg:w-[350px]" />
                                            </Form.Item>
                                            <Form.Item name="confirmPassword" label={<span className="text-gray-500 text-small">Confirm Password</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng xác nhận mật khẩu!',
                                                    },
                                                    {
                                                        validator: confirmPasswordValidator,
                                                    },
                                                ]}>
                                                <Input className="bg-transparent border rounded w-[250px] h-[35px] lg:w-[350px]" />
                                            </Form.Item>
                                        </div>

                                        <div className="text-center lg:text-left">
                                            <button
                                                className='bg-primary w-[100px] lg:h-full active:bg-black justify-center md:h-[65px] flex items-center border rounded-[5px] transition-transform transform hover:scale-95'
                                            >
                                                <p className='text-secondary p-2'>Xác nhận</p>
                                            </button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div >
                </section >
            </div >
        </Page>

    )
}