import { useCookies } from 'react-cookie'
import { Form, Input, message, Upload, Button } from 'antd';
import { useGetUserQuery } from '../../api/Auth'
import HeroSlide from '../../components/HeroSlide'
import { useEffect, useState } from 'react';
import Page from '../../components/Page';
import { UploadOutlined } from "@ant-design/icons";



const Profile = () => {
    const [cookie] = useCookies(['userInfo']);
    const token = cookie.userInfo.accessToken.token;
    //     const {data} = useGetUserQuery("")  
    //    console.log(data);;any
    console.log(token);
    const [form] = Form.useForm();

    const [data, setData] = useState({} as any)
    useEffect(() => {
        fetch('https://api.polydevhotel.site/user/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        },)
            .then((res: { json: () => any }) => res.json())
            .then((data: any) => setData(data))
    }, [])



    console.log(data.message);


    // const {data} = useGetUserQuery("")  
    //    console.log(data);
    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const handleBeforeUpload = (file: any) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("Bạn chỉ có thể tải lên file JPG/PNG!");
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            message.error("Kích thước hình ảnh không được vượt quá 10MB!");
        }
        return isJpgOrPng && isLt10M;
    };
    const [fileList, setFileList] = useState([]);

    const dummyRequest = ({ onSuccess }: any) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };
    const handleOnChange = ({ fileList }: any) => {
        setFileList(fileList);
      };
     
      
    const onFinish = (values: any) => {
        console.log('Dữ liệu biểu mẫu:', values);
        // Thực hiện logic đăng ký ở đây

    };


    const passwordValidator = (_: any, value: any) => {
        if (value && value.length <= 7) {
            return Promise.reject('Mật khẩu phải có ít nhất 8 ký tự');
        }
        return Promise.resolve();
    };

    const phonePattern = /^(?:\d{10}|\d{11})$/;
    const validatePhoneNumber = (_: any, value: any) => {
        if (!phonePattern.test(value)) {
            return Promise.reject('Số điện thoại không hợp lệ!');
        }
        return Promise.resolve();
    };

    const confirmPasswordValidator = (_: any, value: any) => {
        if (value && value !== form.getFieldValue('password')) {
            return Promise.reject('Không trùng khớp với mật khẩu.');
        }
        return Promise.resolve();
    };

    return (
        <div className='mb-[300px]'>
            <HeroSlide />
            <div className="container mx-auto my-5 p-5">
                <div className="md:flex no-wrap md:-mx-2 ">

                    <div className="w-full md:w-3/12 md:mx-2">

                        <div className="bg-white p-3 border-t-4 border-green-400">
                            <div className="image overflow-hidden">
                                <img className="h-auto w-full mx-auto"
                                    src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                                    alt="" />
                            </div>
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{data?.message?.name}</h1>
                            <h3 className="text-gray-600 font-lg text-semibold leading-6">Owner at Her Company Inc.</h3>
                            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit amet
                                consectetur adipisicing elit.
                                Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>
                            <ul
                                className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-3">
                                    <span>Status</span>
                                    <span className="ml-auto"><span
                                        className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Member since</span>
                                    <span className="ml-auto">{data?.message?.created_at}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="my-4"></div>

                        <div className="bg-white p-3 hover:shadow">
                            <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                                <span className="text-green-500">
                                    <svg className="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </span>
                                <span>Similar Profiles</span>
                            </div>

                            <div className="text-center my-2">
                                <img className="h-full w-full rounded-full mx-auto"
                                    src={data?.message?.image}
                                    alt="" />

                            </div>


                        </div>

                    </div>

                    <div className="w-full md:w-9/12 mx-2 h-64">

                        <div className="bg-white p-3 shadow-sm rounded-sm">
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                <span className="text-green-500">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <span className="tracking-wide">About</span>
                            </div>
                            <div className="text-gray-700">
                                <div className="grid md:grid-cols-2 text-sm">
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">First Name</div>
                                        <div className="px-4 py-2"> {data?.message?.name}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Last Name</div>
                                        <div className="px-4 py-2"> {data?.message?.name}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Gender</div>
                                        <div className="px-4 py-2">Female</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Contact No.</div>
                                        <div className="px-4 py-2"> {data?.message?.phone}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Current Address</div>
                                        <div className="px-4 py-2"> {data?.message?.address}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Permanant Address</div>
                                        <div className="px-4 py-2"> {data?.message?.adress}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Email.</div>
                                        <div className="px-4 py-2">
                                            <a className="text-blue-800" href="mailto:jane@example.com"> {data?.message?.email}</a>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Birthday</div>
                                        <div className="px-4 py-2">Feb 06, 1998</div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="my-4"></div>
                        

                        <div className="bg-white p-3 shadow-sm rounded-sm">
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">Thay đổi thông tin</h1>
                            <Page title='Đăng ký'>

                                <section className="h-screen m-h-[500px] ml-10" >


                                    <div
                                        className="g-6 flex h-[22px] flex-wrap items-center gap-12">
                                        <div
                                            className="card rounded-3">

                                            <div className="flex justify-center">

                                                <div className="mt-8 ">
                                                    <Form name="validateOnly" layout="vertical" autoComplete="off" form={form} onFinish={onFinish}>
                                                        <div className="lg:flex lg:gap-8 md:flex md:gap-8">
                                                            <div className="relative" data-te-input-wrapper-init>
                                                                <Form.Item name="name" label={<span className="text-gray-500 text-small">Name</span>}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: 'Vui lòng nhập tên!',
                                                                        },
                                                                    ]}>
                                                                    <Input className="bg-transparent border rounded w-[250px] h-[35px] lg:w-[350px]" />
                                                                </Form.Item>
                                                            </div>
                                                            <div className="relative" data-te-input-wrapper-init>
                                                                <Form.Item name="email" label={<span className="text-gray-500 text-small">Email</span>}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: 'Vui lòng nhập địa chỉ email!',
                                                                        },
                                                                        {
                                                                            type: 'email',
                                                                            message: 'Địa chỉ email không hợp lệ!',
                                                                        },
                                                                    ]}>
                                                                    <Input className="bg-transparent border rounded w-[250px] h-[35px] lg:w-[350px]" />
                                                                </Form.Item>
                                                            </div>

                                                        </div>
                                                        <div className="lg:flex lg:gap-8 md:flex md:gap-8">
                                                            <div className="relative" data-te-input-wrapper-init>
                                                                <Form.Item
                                                                    label="Ảnh"
                                                                    name="images"
                                                                    valuePropName="fileList"
                                                          
                                                                    getValueFromEvent={normFile}
                                                                >
                                                                    <Upload
                                                                        name="avatar"
                                                                        beforeUpload={handleBeforeUpload}
                                                                        customRequest={dummyRequest}
                                                                        onChange={handleOnChange}
                                                                        listType="picture"
                                                                        maxCount={4}
                                                                        fileList={fileList}
                                                                        multiple
                                                                    >
                                                                        {fileList.length === 4 ? (
                                                                            ""
                                                                        ) : (
                                                                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                                                        )}
                                                                    </Upload>
                                                                </Form.Item>


                                                            </div>
                                                            <div className="col-md-6 mb-4">
                                                                <h6 className="mb-2 pb-1 text-gray-500 text-small">Gender: </h6>
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
                                                        <div className="lg:flex lg:gap-8 md:flex md:gap-8">
                                                            <div className="relative" data-te-input-wrapper-init>
                                                                <Form.Item name="password_confirmation" label={<span className="text-gray-500 text-small">Địa chỉ</span>}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: 'Vui lòng xác nhận địa chỉ!',
                                                                        },
                                                                        {
                                                                            validator: confirmPasswordValidator,
                                                                        },
                                                                    ]}>
                                                                    <Input.Password className="bg-transparent border rounded w-[250px] h-[35px] lg:w-[350px]" />
                                                                </Form.Item>
                                                            </div>
                                                            <div className="relative" data-te-input-wrapper-init>
                                                                <Form.Item name="phone" label={<span className="text-gray-500 text-small">Phone Number</span>}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: 'Vui lòng nhập số điện thoại!',
                                                                        },
                                                                        {
                                                                            validator: validatePhoneNumber,
                                                                        },
                                                                    ]}>
                                                                    <Input className="bg-transparent border rounded w-[250px] h-[35px] lg:w-[350px]" />
                                                                </Form.Item>
                                                            </div>
                                                        </div>

                                                        <div className="text-center lg:text-left">
                                                            <button
                                                                className='w-full bg-cyan-500 rounded-xl h-[60px] mt-[30px] text-2xl font-semibold text-white'
                                                            >
                                                                <p className='text-secondary p-2'>Đăng ký</p>
                                                            </button>


                                                        </div>
                                                    </Form>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                </section>

                            </Page>

                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile

function then(arg0: (res: { json: () => any }) => any) {
    throw new Error('Function not implemented.')
}
