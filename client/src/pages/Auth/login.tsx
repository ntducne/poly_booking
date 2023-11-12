// import React from 'react'
import { Button, Form, Input, message } from 'antd';
import Page from '../../components/Page';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api/Auth';
// import { useAppDispatch } from '../../app/hooks';
// import { getUser } from '../../slices/User';
import { useCookies } from 'react-cookie';
import { useState } from 'react';

type Props = {}

export default function Login({ }: Props) {
    const navigate = useNavigate()
    const [Login] = useLoginMutation()
    // const dispatch = useAppDispatch()
    const [form] = Form.useForm();
    const [is_loading, setIsLoading] = useState(false)

    // Sử dụng hook useCookies
    const [, setCookie] = useCookies(['userInfo']);

    const onFinish = (values: any) => {
        console.log('Dữ liệu biểu mẫu:', values);
        // Thực hiện logic đăng nhập ở đây
        if (values) {
            setIsLoading(true)
            Login(values)
                .unwrap()
                .then((values: any) => {
                    const valuesUser = {
                        accessToken: values.accessToken,
                        ...values.user
                    }
                    console.log('Thông tin người dùng:', values);

                    if (values.accessToken && values.user) {
                        // Lưu thông tin người dùng vào cookie
                        setCookie('userInfo', valuesUser, { path: '/' });
                        console.log('loginSuccess');
                        message.success("Đăng nhập thành công");
                        setTimeout(() => {
                            navigate('/')
                        }, 1000);
                    } else {
                        setIsLoading(false)
                        console.log('Lỗi xác thực, không thể đăng nhập');
                        message.error("Thông tin đăng nhập không đúng. Vui lòng kiểm tra lại.");
                    }
                }).catch((error: any) => {
                    console.log(error);
                    message.error(error?.values?.message || "some thing error");
                })
        }
    };

    return (
        <Page title='Đăng nhập'>
            <div className="flex items-center justify-center h-[120vh] lg:h-[105vh] md:h-screen bg-bgr">
                <section className=" h-screen mt-2">
                    <div className="  items-center justify-center h-full">
                        <div className=" w-[300px] h-[600px] lg:h-[600px] lg:w-[1050px] md:h-[450px] md:w-[725px] bg-white rounded-md shadow-2xl">
                            <div
                                className="md:flex md:flex-wrap md:items-center lg:flex lg:flex-wrap lg:items-center lg:gap-5 md:gap-2">
                                <div
                                    className="shrink-1 mb-12 grow-0 basis-auto lg:w-6/12 xl:w-6/12 md:w-6/12">
                                    <img
                                        src="https://cdn.alongwalk.info/vn/wp-content/uploads/2022/03/12183725/image-7-khach-san-5-sao-vung-tau-view-bien-cuc-dep-164705984460476.jpg"
                                        className=" h-[150px] w-[300px] lg:w-full lg:h-[600px] md:h-[450px] md:w-full border rounded-md"
                                        alt="Sample image" />
                                </div>

                                <div className="w-5/6 mx-6 md:mb-12 lg:w-5/12 xl:w-5/12 md:w-5/12">
                                    <Form name="validateOnly" layout="vertical" autoComplete="off" form={form} onFinish={onFinish}>
                                        <div
                                            className="flex flex-row items-center justify-center lg:justify-start">
                                            <p className="mb-0 mr-4 text-normal">Sign in with</p>
                                            <button
                                                type="button"
                                                data-te-ripple-init
                                                data-te-ripple-color="light"
                                                className="mx-1 h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 hover:text-blue-500 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                                <svg xmlns="http://www.w3.org/2000/svg" className='mx-auto' x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                                                    <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path><path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path><polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon><path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path><path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"></path>
                                                </svg>
                                            </button>

                                        </div>

                                        <div
                                            className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                            <p
                                                className="mx-4 mb-0 text-center text-small font-semibold dark:text-white">
                                                Or
                                            </p>
                                        </div>

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

                                        <div className="relative mb-6" data-te-input-wrapper-init>
                                            <Form.Item name="password" label={<span className="text-gray-500 text-small">Password</span>}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập mật khẩu!',
                                                    },
                                                    {
                                                        min: 8,
                                                        message: 'Mật khẩu phải có ít nhất 8 ký tự!',
                                                    },
                                                ]} >
                                                <Input.Password className="bg-transparent border rounded w-full h-[35px] " />
                                            </Form.Item>
                                        </div>

                                        <div className="mb-6 flex items-center justify-between">
                                            <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                                <input
                                                    className=" relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                                                    type="checkbox"
                                                    value=""
                                                    id="exampleCheck2" />
                                                <label
                                                    className=" inline-block hover:cursor-pointer"
                                                >
                                                    Remember me
                                                </label>
                                            </div>

                                            <a href="forGotPassword">Forgot password?</a>
                                        </div>

                                        <div className="text-small lg:text-left">
                                            <div className="text-small lg:text-left flex justify-center">
                                                <Button htmlType="submit" type="primary" loading={is_loading} className='bg-primary w-[200px] h-[35px] active:bg-black justify-center flex items-center border rounded-[5px] transition-transform transform hover:scale-95'>
                                                    {is_loading ? 'Đang đăng nhập' : 'Đăng nhập'}
                                                </Button>
                                            </div>


                                            <p className="mb-0 mt-2 pt-1 text-sm font-semibold flex gap-2">
                                                Don't have an account?
                                                <a
                                                    href="register"
                                                    className="text-danger text-blue-500 transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                                                >Register</a>
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

    )
}