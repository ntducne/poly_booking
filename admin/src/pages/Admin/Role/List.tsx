import { Table, Modal, Collapse } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import type { CollapseProps } from 'antd';
import { Link } from 'react-router-dom';

interface DataType {
    id: string;
    name_role: string;
    amountPermission: number|string;
}

export default function RoleList() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const data: DataType[] = [
        {
            id: '123123871',
            name_role: 'super-admin',
            amountPermission: 32,
        }
    ];

    const items: CollapseProps['items'] = [
        {
          key: '1',
          label: 'Loại phòng',
          children: 'Thêm',
        },
        {
          key: '2',
          label: 'Phòng',
          children: 'Sửa',
        },
    ];

    const columns: ColumnsType<DataType> = [
        { title: 'Tên vai trò', dataIndex: 'name_role', key: 'name_role',},
        { title: 'Số lượng quyền', dataIndex: 'amountPermission', key: 'amountPermission',},
        {
            title: 'Hành động', key: 'action', render: () => (
                <>
                    <button type="button"  onClick={showModal} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center">Quyền</button>
                    <Link to="/role/edit" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-brfont-medium rounded-lg text-sm px-5 py-2.5 text-center ml-1">Sửa</Link>&nbsp;
                    <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">Xoá</button>
                    <Modal title="Danh sách quyền" open={isModalOpen} onCancel={handleCancel} footer={[]} style={{ minWidth: '60%' }}>
                        <Collapse ghost items={items} />
                    </Modal>
                </>
            )
        },
    ];
    useEffect(() => {
        document.title = "Danh sách vai trò";
    }, []);

    return <Table columns={columns} dataSource={data} />
}