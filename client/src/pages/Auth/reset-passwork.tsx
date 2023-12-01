// import React from 'react'
import { Form, Input, message } from 'antd';
import Page from '../../components/Page';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTokenQuery, useResetPasswordMutation } from '../../api/Auth';
import { useEffect } from 'react';

type Props = {}

export default function ResetPassword({ }: Props) {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const [resetPassword] = useResetPasswordMutation();
    const { token } = useParams(); // Lấy token từ URL

    const { data } = useGetTokenQuery(token);

    const confirmPasswordValidator = (_: any, value: any) => {
        const newPassword = form.getFieldValue('new_password');
        // console.log(newPassword, value);

        if (newPassword !== value) {
            return Promise.reject('Mật khẩu xác nhận không khớp với mật khẩu.');
        }
        return Promise.resolve();
    };

    const onFinish = (values: any) => {
        const dataUpload = {
            token: token || "",
            ...values
        }
        console.log(dataUpload);

        resetPassword(dataUpload)
            .unwrap()
            .then((item: any) => {
                console.log(item)
                message.success('Mật khẩu đã được đặt lại thành công!');
                setTimeout(() => {
                    navigate('/auth/login');
                }, 1000);
            })
            .catch((error: any) => {
                console.log(error)
                message.error('Có lỗi xảy ra trong quá trình đặt lại mật khẩu.');
            });
    };

    useEffect(() => {
        if (data?.status !== true) {
            navigate("/auth/login")
        }
    }, [data?.status])

    return (
        <Page title='Nhập lại mật khẩu'>
            <div className="flex items-center justify-center h-[120vh] lg:h-full md:h-screen bg-bgr">
                <section className="h-screen pt-12" >
                    <div className="flex items-center justify-center">
                        <div className="w-[300px] h-[600px] lg:h-[550px] lg:w-[1050px] md:h-[450px] md:w-[725px] bg-white rounded-md shadow-2xl">
                            <div
                                className="md:flex md:flex-wrap md:items-center lg:flex lg:flex-wrap lg:items-center lg:gap-5 md:gap-2">
                                <div
                                    className="shrink-1 mb-12 grow-0 basis-auto lg:w-6/12 xl:w-6/12 md:w-6/12">
                                    <img
                                        src="https://cdn.alongwalk.info/vn/wp-content/uploads/2022/03/12183725/image-7-khach-san-5-sao-vung-tau-view-bien-cuc-dep-164705984460476.jpg"
                                        className="h-[150px] w-[300px] lg:w-full lg:h-[550px] md:h-[450px] md:w-full border rounded-md"
                                        alt="Sample image" />
                                </div>

                                <div className="w-5/6 mx-6 md:mb-12 lg:w-5/12 xl:w-5/12 md:w-5/12">
                                    <Form name="validateOnly" layout="vertical" autoComplete="off" form={form} onFinish={onFinish}>
                                        <div className="relative mb-6" data-te-input-wrapper-init>
                                            <Form.Item name="new_password" label={<span className="text-gray-500 text-small">Password</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập mật khẩu!',
                                                        validateTrigger: ['onBlur'],
                                                    },
                                                    {
                                                        min: 8,
                                                        message: 'Mật khẩu phải có ít nhất 8 ký tự.',
                                                    },
                                                ]}>
                                                <Input.Password className="bg-transparent border rounded w-[250px] h-[35px] lg:w-[350px]" />
                                            </Form.Item>
                                            <Form.Item name="new_password_confirmation" label={<span className="text-gray-500 text-small">Confirm Password</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng xác nhận mật khẩu!',
                                                    },
                                                    {
                                                        validator: confirmPasswordValidator,
                                                    },
                                                ]}>
                                                <Input.Password className="bg-transparent border rounded w-[250px] h-[35px] lg:w-[350px]" />
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