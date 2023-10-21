import { Input, Select, DatePicker, InputNumber, Form, Row, Card, Col, Button, Modal } from 'antd';
import TableCustom from '../../../component/Table';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function RoomBooking() {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const data: any = [
    {
        id: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        id: '2',
        name: 'Joe Black',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        id: '3',
        name: 'Jim Green',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        id: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
    
    ];

    const columns: any = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            
        },
        { title: 'Thao tác', key: 'action', render: (record: any) => (
            <>
                <Button shape="round" onClick={showModal}>Chọn phòng</Button>
                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </>
        )},
    ];
    const onFinish = (values: any) => {
        const value = {
            room_type: values.room_type,
            amount_room: values.amount_room,
            checkin: values.days[0].format('d/MM/YYYY'),
            checkout: values.days[1].format('d/MM/YYYY'),
            adults: values.adults,
            childrens: values.childrens,
        }
        console.log(value);
        

    };
    return (
        <>
            <Form form={form} labelCol={{ span: 6 }} layout="horizontal" className='mt-5 mb-5' onFinish={onFinish}>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Card title="Thông tin phòng" bordered={false}>
                        <Form.Item label="Loại phòng" name="room_type"  rules={[{ required: true, message: 'Vui lòng chọn loại phòng' }]}>
                            <Select>
                                <Select.Option value="1">Room Type 1</Select.Option>
                                <Select.Option value="2">Room Type 2</Select.Option>
                                <Select.Option value="3">Room Type 3</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Số phòng"  name="amount_room"  rules={[{ required: true, message: 'Vui lòng nhập số lượng phòng' }]}>
                            <InputNumber min={1} className='w-full' />
                        </Form.Item>
                        <Form.Item label="Ngày" name="days" rules={[{ required: true , message: 'Vui lòng nhập checkin checkout' }]}>
                            <DatePicker.RangePicker className='w-full' placeholder={['Check in', 'Check out']} />
                        </Form.Item>
                    </Card>
                    <Card title="Thông tin khác" bordered={false}>
                        <Form.Item label="Người lớn" name="adults" rules={[{ required: true, message: 'Vui lòng nhập số người lớn' }]}>
                            <InputNumber min={1} className='w-full' />
                        </Form.Item>
                        <Form.Item label="Trẻ em" name="childrens" rules={[{ required: true, message: 'Vui lòng nhập số trẻ em' }]}>
                            <InputNumber min={1} className='w-full' />
                        </Form.Item>
                        <div className='flex items-center justify-end'>
                            <button type="submit" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"><SearchOutlined /> Tìm</button>
                        </div>
                    </Card>
                    <Card title="Thông tin khách hàng" bordered={false}>
                        <Form.Item label="Tên khách hàng" name="name"> 
                            <Input />
                        </Form.Item>
                        <Form.Item label="Số điện thoại" name="phone">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email" name="email" rules={[
                            {
                                type: 'email',
                                message: 'Địa chỉ email không hợp lệ!',
                            },
                        ]}>
                            <Input />
                        </Form.Item>
                    </Card>
                </div>
            </Form>
            <TableCustom columns={columns} data={data}/>
        </>
    )
}