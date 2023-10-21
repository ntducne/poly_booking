import { Input, Select, DatePicker, InputNumber, Form, Card, Button, Modal, message } from 'antd';
import TableCustom from '../../../component/Table';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useSearchRoomMutation } from '../../../api/booking';
import { useGetRoomTypeQuery } from '../../../api/roomTypes';

export default function RoomBooking() {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [searchRoom] = useSearchRoomMutation()
    const [currentPage, setCurrentPage] = useState(1);
    const { data } = useGetRoomTypeQuery({ page: currentPage || 1 }); // Sử dụng trang hiện tại hoặc mặc định là trang 1

    const [dataRoom, setDataRoom] = useState<any>([]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const changePage = (page: number) => { 
        console.log(page)
    }

    const columns = [
        'name', 'age', 'address',
        {
            title: 'Thao tác',
            key: 'action',
            render: (record: any) => (
                <Button shape="round" onClick={showModal}>
                    Chọn phòng {record.name}
                </Button>
            ),
        }
    ];

    const onFinish = (values: any) => {
        setLoading(true);
        const value = {
            room_type_id: '6522c8c025f69ae25502e0cc',
            amount_room: values.amount_room,
            check_in: values.days[0].format('d/MM/YYYY'),
            check_out: values.days[1].format('d/MM/YYYY'),
            adults: values.adults,
            children: values.childrens,
        }
        try {

            searchRoom(value).unwrap().then(res => {
                console.log(res);
                // setDataRoom(res.data)
            })
            setLoading(false);

        }
        catch (err) {
            setLoading(false);
            message.error('Lỗi lấy dữ liệu !');
        }

            

    };


    
    return (
        <>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                ahihi
            </Modal>
            <Form form={form} labelCol={{ span: 6 }} layout="horizontal" className='mt-5 mb-5' onFinish={onFinish}>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Card title="Thông tin phòng" bordered={false}>
                        <Form.Item label="Loại phòng" name="room_type" rules={[{ required: false, message: 'Vui lòng chọn loại phòng' }]}>
                            <Select>
                                {
                                    data?.data?.map((item: any) => {
                                        return <Select.Option value={item.id} key={item.id}>{item.room_type_name}</Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="Số phòng" name="amount_room" rules={[{ required: true, message: 'Vui lòng nhập số lượng phòng' }]}>
                            <InputNumber min={1} className='w-full' />
                        </Form.Item>
                        <Form.Item label="Ngày" name="days" rules={[{ required: true, message: 'Vui lòng nhập checkin checkout' }]}>
                            <DatePicker.RangePicker className='w-full' placeholder={['Ngày ở', 'Ngày trả']} />
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
            <TableCustom loading={isLoading} columns={columns} data={dataRoom} changePage={changePage} />
        </>
    )
}