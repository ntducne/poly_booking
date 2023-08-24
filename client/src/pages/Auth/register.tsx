
import type { FormInstance } from 'antd';
import { Button, Form, Input, Space } from 'antd';

type Props = {}

export default function Register({ }: Props) {
    // const [submittable, setSubmittable] = React.useState(false);

    // const values = Form.useWatch([], form);

    // React.useEffect(() => {
    //     form.validateFields({ validateOnly: true }).then(
    //         () => {
    //             setSubmittable(true);
    //         },
    //         () => {
    //             setSubmittable(false);
    //         },
    //     );
    // }, [values]);
    return (
        <div className="flex items-center justify-center h-[850px] bg-blue-100">
            <section className="h-screen" >
                <div className="flex items-center justify-center h-full">
                    <div className="h-[750px] w-[1050px] bg-gray-100 rounded-md shadow-xl hover:shadow-2xl">
                        <div
                            className="g-6 flex h-[22px] flex-wrap items-center gap-12">
                            <div
                                className="card rounded-3">
                                <img
                                    src="https://bizweb.dktcdn.net/100/456/685/themes/865471/assets/img_banner_col_1.jpg?1668419812840"
                                    className="h-[250px] w-[1050px] border rounded-t-md"
                                    alt="Sample image" />
                                <div className="flex justify-center">

                                    <div className="mt-8 ">
                                        <div
                                            className="flex flex-row items-center justify-center">
                                            <p className="mb-0 mr-4 text-lg">Register with</p>

                                            <button
                                                type="button"
                                                data-te-ripple-init
                                                data-te-ripple-color="light"
                                                className="mx-1 h-9 w-9 rounded-full bg-blue-500 hover:bg-gray-100 hover:text-blue-500 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="mx-auto h-3.5 w-3.5"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                                </svg>
                                            </button>

                                            <button
                                                type="button"
                                                data-te-ripple-init
                                                data-te-ripple-color="light"
                                                className="mx-1 h-9 w-9 rounded-full bg-blue-500 hover:bg-gray-100 hover:text-blue-500 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="mx-auto h-3.5 w-3.5"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                                </svg>
                                            </button>

                                            <button
                                                type="button"
                                                data-te-ripple-init
                                                data-te-ripple-color="light"
                                                className="mx-1 h-9 w-9 rounded-full bg-blue-500 hover:bg-gray-100 hover:text-blue-500 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="mx-auto h-3.5 w-3.5"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div
                                            className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                            <p
                                                className="mx-4 mb-0 text-center font-semibold dark:text-white">
                                                Or
                                            </p>
                                        </div>

                                        <Form name="validateOnly" layout="vertical" autoComplete="off">
                                            <div className="flex gap-8">
                                                <div className="relative" data-te-input-wrapper-init>
                                                    <Form.Item name="f-name" label={<span className="text-gray-500">First Name</span>} >
                                                        <Input className="bg-transparent border rounded w-full" />
                                                    </Form.Item>
                                                    {/* <label
                                                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                                    >First Name
                                                    </label> */}
                                                </div>
                                                <div className="relative" data-te-input-wrapper-init>
                                                    <Form.Item name="l-name" label={<span className="text-gray-500">Last Name</span>} >
                                                        <Input className="bg-transparent border rounded w-full" />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="flex gap-8">
                                                <div className="relative" data-te-input-wrapper-init>
                                                    <Form.Item name="password" label={<span className="text-gray-500">Password</span>}>
                                                        <Input className="bg-transparent border rounded w-full" />
                                                    </Form.Item>

                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <h6 className="mb-2 pb-1 text-gray-500">Gender: </h6>
                                                    <div className="flex gap-8">
                                                        <div className="flex items-center">
                                                            <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Female</label>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <input checked id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Male</label>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <input checked id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Other</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-8">
                                                <div className="relative" data-te-input-wrapper-init>
                                                    <Form.Item name="email" label={<span className="text-gray-500">Email</span>} >
                                                        <Input className="bg-transparent border rounded w-full" />
                                                    </Form.Item>
                                                </div>
                                                <div className="relative" data-te-input-wrapper-init>
                                                    <Form.Item name="phone" label={<span className="text-gray-500">Phone Number</span>} >
                                                        <Input className="bg-transparent border rounded w-full" />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            <div className="text-center lg:text-left">
                                                <Form.Item>
                                                    <Space>
                                                        {/* <SubmitButton form={form} /> */}
                                                        <Button htmlType="reset" className='bg-blue-500 text-white hover:bg-gray-100 hover:text-blue-500'>Submit</Button>
                                                        <Button htmlType="reset">Reset</Button>
                                                    </Space>
                                                </Form.Item>

                                                <p className="mb-0 text-sm font-semibold flex gap-2">
                                                    Do have an account?
                                                    <a
                                                        href="login"
                                                        className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                                                    >Login</a>
                                                </p>
                                            </div>
                                        </Form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}