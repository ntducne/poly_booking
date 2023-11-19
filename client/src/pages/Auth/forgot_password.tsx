import { Form, Input, message } from 'antd';
import Page from '../../components/Page';
import { useForgotPasswordMutation } from '../../api/Auth';
// import './ForgotPassword.css';

function ForgotPassword() {
    const [form] = Form.useForm();
    const [ForgotPassword] = useForgotPasswordMutation();

    const onFinish = (values: any) => {
        console.log(values);
        const email = values.email;

        ForgotPassword({ email })
            .then((response: any) => {
                if (response?.data?.status === true) {
                    // Email tồn tại
                    message.success('Liên kết đặt lại mật khẩu đã được gửi qua email !');
                } else {
                    // Email không tồn tại
                    message.error('Email không tồn tại. Vui lòng kiểm tra lại.');
                }
                console.log('aa:', response);
            })
            .catch((error: any) => {
                console.error('Lỗi khi gửi yêu cầu', error);
            });
    };

    return (
        <Page title='Quên mật khẩu'>
            <div className="flex items-center justify-center h-[100vh] lg:h-full md:h-screen bg-bgr">
                <section className="h-screen pt-12" >
                    <div className="flex items-center justify-center">
                        <div className="w-[300px] h-[550px] lg:h-[550px] lg:w-[1050px] md:h-[450px] md:w-[725px] bg-white rounded-md shadow-2xl hover:shadow-2xl ">
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

                                        <div className="text-center lg:text-left">
                                            <button
                                                className='bg-primary w-[100px] lg:h-full active:bg-black justify-center md:h-[65px] flex items-center border rounded-[5px] transition-transform transform hover:scale-95'
                                            >
                                                <p className='text-secondary p-2'>Gửi liên kết</p>
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
