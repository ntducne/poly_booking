import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Select,
    Space
} from 'antd';
import './index.css'
import { SearchOutlined } from '@ant-design/icons';

type Props = {}
const Option = Select.Option;
const { RangePicker } = DatePicker;

export default function BookForm({ }: Props) {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='container mx-auto relative max-w-[1440px]'>
            <div className=" mt-4  px-5 py-10 bg-[#a37d4c] w-full items-center lg:shadow-xl lg:absolute lg:left-0 lg:-top-12  lg:right-0 lg:p-0 lg:z-30">

                <Form
                    className='h-[300px] w-full lg:h-[70px]'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    wrapperCol={{ span: 180 }}
                >
                    <div className='flex flex-col w-full h-full lg:flex-row'>
                        <div className='flex-1 lg:border-r h-full '>

                            <Form.Item
                                name="Start-end h-full"
                                // rules={[{ required: true, message: 'Vui lòng nhập tên' }]}

                            >
                                <div className='h-full flex items-center justify-end relative'>

                                    <RangePicker className='w-full  rounded-none min-h-[70px]' />
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
                        <div className=''>
                            <Form.Item className=''>
                                <Button type="primary" className='bg-green-500 p lg:h-[70px] px-5 py-[20px] w-full justify-center flex items-center rounded-none' htmlType="submit">
                                    <SearchOutlined  className='lg:px-5 text-[14px] lg:text-[20px]'/>
                                </Button>
                            </Form.Item>

                        </div>

                    </div>
                </Form>
            </div>
        </div>
    )
}