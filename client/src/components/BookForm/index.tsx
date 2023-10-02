import { SearchOutlined } from '@ant-design/icons';
import {
    DatePicker,
    Form,
    Select
} from 'antd';
import './index.css';


type Props = {}
const { RangePicker } = DatePicker;

export default function BookForm({ }: Props) {
    const onFinish = (values: any) => {
        console.log(values)

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo)
    };
    return (
        <div className='container mx-auto relative max-w-[1440px] bg-bgr'>
            <div className=" pt-4  px-5 py-10  w-full items-center  lg:shadow-xl lg:absolute lg:left-0 lg:-top-12  lg:right-0 lg:p-0 lg:z-30">

                <Form
                    className='h-[400px] w-full lg:h-[70px]'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    wrapperCol={{ span: 180 }}
                >
                    <div className='flex flex-col w-full h-full lg:flex-row'>
                        <div className='flex-1 lg:border-r h-full '>

                            <Form.Item
                                name="Start-end h-full border"

                            >
                                <div className='h-full flex items-center justify-end relative'>

                                    <RangePicker className='w-full rounded-none min-h-[70px] border-none my-custom-range-picker' />
                                </div>
                            </Form.Item>
                        </div>
                        <div className='flex-1 lg:border-r'>

                            <Form.Item name="Start-end2">
                                <Select
                                    placeholder='Trẻ nhỏ'
                                    className=''
                                >
                                    <Select.Option value="1">1</Select.Option>
                                    <Select.Option value="2">2</Select.Option>
                                    <Select.Option value="3">3</Select.Option>
                                    <Select.Option value="4">4</Select.Option>
                                    <Select.Option value="5">5</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className='flex-1 lg:border-r'>
                            <Form.Item name="Start-end2 ">
                                <Select
                                    placeholder='Người lớn'
                                    className='rounded-none'
                                >
                                    <Select.Option value="1">1</Select.Option>
                                    <Select.Option value="2">2</Select.Option>
                                    <Select.Option value="3">3</Select.Option>
                                    <Select.Option value="4">4</Select.Option>
                                    <Select.Option value="5">5</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className='flex-1 lg:border-r'>
                            <Form.Item name="Start-end2 ">
                                <Select
                                    placeholder='Chi nhánh'
                                    className='rounded-none'
                                >
                                    <Select.Option value="1">Chi nhánh 1</Select.Option>
                                    <Select.Option value="2">Chi nhánh 2</Select.Option>
                                    <Select.Option value="3">Chi nhánh 3</Select.Option>
                                    <Select.Option value="4">Chi nhánh4</Select.Option>
                                    <Select.Option value="5">Chi nhánh 5</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className=''>
                            {/* <Form.Item className='p-0 m-0'> */}
                            <button className='bg-primary  p lg:h-full h-[40px] active:bg-black px-5 w-full justify-center md:h-[65px] flex items-center rounded-none'>
                                <SearchOutlined className='lg:px-5 text-[18px] lg:text-[20px] text-secondary' />
                            </button>
                            {/* </Form.Item> */}

                        </div>

                    </div>
                </Form>
            </div>
        </div>
    )
}