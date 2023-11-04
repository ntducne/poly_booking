import { Input, Select, DatePicker, InputNumber, Form, Card, Button, Modal, message, Image, Row, Col, Table } from 'antd';
import TableCustom from '../../../component/Table';
import { SearchOutlined } from '@ant-design/icons';
import { useState,useEffect } from 'react';
import { useSearchRoomMutation } from '../../../api/booking';
import { useGetAllRoomTypeQuery } from '../../../api/roomTypes';
import { RoomInterface } from '../../../Interface/RoomInterface';
import Page from '../../../component/page';
import formatMoneyVN from '../../../config/formatMoneyVN';
import { DetailRoomModal } from '../../../component/Modal/DetailRoomModal';

export default function RoomBooking() {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoadingData, setLoading] = useState(false);
    const [isDisabledForm, setDisableForm] = useState(false);
    const [searchRoom] = useSearchRoomMutation()
    const {data, isLoading} = useGetAllRoomTypeQuery({ })
    const [dataDetailRoom, setDataDetailRoom] = useState(null);
    const [dataRoom, setDataRoom] = useState([] as RoomInterface[]);


    // useEffect(() => {
    //     refetch()
    // }, [refetch])
    

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const setDetailRoom = (data_room :RoomInterface) => {
        setDataDetailRoom(null)
        setDataDetailRoom(data_room as any)
        setIsModalOpen(true);
    }

    const newData = dataRoom.map((item: any) => ({
        ...item,
        key: item.id,
    }));

    const columns = [
        { 
            title: 'Ảnh', 
            key: 'name', 
            width: '7%', 
            render: (record: any) =>  (
                <>
                    <Image width={50} height={50} className='rounded-md' src={record?.images[0].image}/>
                </>
            )
        },
        { title: 'Tên phòng', key: 'name', width: '15%', dataIndex: 'name' },
        // { 
        //     title: 'Loại phòng', 
        //     key: 'discount', 
        //     width: '20%', 
        //     render: (record: any) =>  (
        //         <>
        //             {record?.type?.room_type_name}
        //         </>
        //     )
        // },
        { 
            title: 'Giá ( 1 đêm )', 
            key: 'price', 
            width: '20%', 
            render: (record: any) =>  {
                if(record?.type?.price_per_night > record?.discount) {
                    return (
                        <>
                            {formatMoneyVN(record?.type?.price_per_night - record?.discount)}
                        </>
                    )
                }   
                return (
                    <>
                        {formatMoneyVN(record?.type?.price_per_night)}
                    </>
                )
            }
        },
        {
            title: 'Chi nhánh',
            key: 'branch',
            width: '20%',
            render: (record: any) =>  (
                <>
                    {record?.branch?.name}
                </>
            )
        },
        {
            title: '',
            key: 'action',
            render: (record: any) => (
                <>
                    <Button shape="round" className="mr-3" onClick={()=> {setDetailRoom(record)}}>
                        Chi tiết phòng
                    </Button>
                    <Button shape="round" onClick={showModal}>
                        Chọn phòng
                    </Button>
                </>
            ),
        }
    ];

    const onFinish = async (values: any) => {
        setLoading(true);
        setDisableForm(true);
        setDataRoom([])
        const value = {
            room_type_id: values.room_type,
            amount_room: values.amount_room,
            check_in: values.days[0].format('YYYY-MM-DD'),
            check_out: values.days[1].format('YYYY-MM-DD'),
            adults: values.adults,
            children: values.childrens,
        }
        searchRoom(value).unwrap().then(res => {
            if(res.status == 'success'){
                message.success(res.message)
                setDataRoom(res.data)
            }
            else if(res.status == 'error'){
                message.error(res.message)
            }
            setLoading(false);
            setDisableForm(false);
        })

    };
    
    return (
        <Page title={`Đặt phòng`}>
            {dataDetailRoom !== null ? <DetailRoomModal room={dataDetailRoom} setIsModalOpen={handleCancel} isOpen={isModalOpen}/> : <></>}
            <Form disabled={isDisabledForm} form={form} labelCol={{ span: 6 }} layout="horizontal" className={`${isLoading && 'mt-5 mb-5'}`} onFinish={onFinish}>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <Card title="Thông tin phòng" bordered={false} loading={isLoading}>
                        <Form.Item label="Loại phòng" name="room_type" rules={[{ required: true, message: 'Vui lòng chọn loại phòng' }]}>
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
                    <Card title="Thông tin khác" loading={isLoading} bordered={false}>
                        <Form.Item label="Người lớn" name="adults" rules={[{ required: true, message: 'Vui lòng nhập số người lớn' }]}>
                            <InputNumber min={1} className='w-full' />
                        </Form.Item>
                        <Form.Item label="Trẻ em" name="childrens" rules={[{ required: true, message: 'Vui lòng nhập số trẻ em' }]}>
                            <InputNumber min={1} className='w-full' />
                        </Form.Item>
                        <div className='flex items-center justify-end'>
                            <Form.Item >
                                <Button htmlType='submit' className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l font-medium rounded-lg text-sm px-8  text-center mb-2" icon={<SearchOutlined />}>Tìm</Button>
                            </Form.Item>
                        </div>
                    </Card>
                    <Card title="Thông tin khách hàng" loading={isLoading} bordered={false}>
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
            <Table className={`${isLoading && 'hidden'}`} loading={isLoadingData} columns={columns} dataSource={newData} pagination={false} />
            {/* <TableCustom loading={isLoadingData} columns={columns} data={dataRoom}/> */}
        </Page>
    )
}