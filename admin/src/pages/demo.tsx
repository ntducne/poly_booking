import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { RoomInterface } from '../Interface/RoomInterface';
interface DataType {
    key: string;
    name: string;
    slug: string;
    description: string;
}


const data: RoomInterface[] = [
    {
        key: "1",
        id: "6522c8c025f69ae25502e0cd",
        name: "Sarah Zulauf1",
        slug: "sarah-zulauf1",
        area: 92,
        adults: 3,
        childrens: 3,
        pay_upon_check_in: 1,
        description: "Et placeat voluptas et. Inventore cum ea excepturi voluptates perspiciatis provident. Voluptatibus corporis error et architecto quo. Esse qui qui dolorem sit vel.",
        discount: 203008,
        "status": 1,
        "policies_and_information": {
            "check_in_time": "14:00",
            "check_out_time": "12:00"
        },
        "num_of_bed": 3,
        "bed_size": 2,
        "branch": {
            "id": "6522c8b825f69ae25502e07a",
            "name": "PolyDev Hotel Quang Ninh",
            "address": "Quang Ninh",
            "phone": "0869127367"
        },
        "images": [
            {
                "id": "6522c8c125f69ae25502e0cf",
                "image": "https:\/\/via.placeholder.com\/640x480.png\/0088ff?text=et"
            },
            {
                "id": "6522c8c125f69ae25502e0d0",
                "image": "https:\/\/via.placeholder.com\/640x480.png\/001177?text=veritatis"
            },
            {
                "id": "6522c8c125f69ae25502e0d1",
                "image": "https:\/\/via.placeholder.com\/640x480.png\/006600?text=ullam"
            },
            {
                "id": "6522c8c125f69ae25502e0d2",
                "image": "https:\/\/via.placeholder.com\/640x480.png\/001100?text=vel"
            },
            {
                "id": "6522c8c125f69ae25502e0d3",
                "image": "https:\/\/via.placeholder.com\/640x480.png\/009933?text=tempore"
            }
        ],
        "rate": [],
        "type": {
            "id": "6522c8c025f69ae25502e0cc",
            "room_type_name": "Prof. Amos Simonis 1",
            "description": "qu\u00e1 l\u00e0 tuy\u1ec7t v\u1eddi khi m\u00ecnh ch\u00e0o nhau",
            "price_per_night": 289633,
            "status": 0
        }
    },
];


const columns: ColumnsType<RoomInterface> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Slug',
        dataIndex: 'slug',
        key: 'slug',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
        <Space size="middle">
            <a>Invite {record.name}</a>
            <a>Delete</a>
        </Space>
        ),
    },
];

const Demo: React.FC = () => <Table columns={columns} dataSource={data} />;

export default Demo;