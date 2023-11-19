import React from 'react';
import type { FormInstance } from 'antd';
import { Button, Form, Input, Space } from 'antd';

const SubmitButton = ({ form }: { form: FormInstance }) => {
    const [submittable, setSubmittable] = React.useState(false);
    // Watch all values
    const values = Form.useWatch([], form);

    React.useEffect(() => {
        form.validateFields({ validateOnly: true }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            },
        );
    }, [values]);

    return (
        <Button htmlType="submit" disabled={!submittable}>
            Submit
        </Button>
    );
};

const Demo: React.FC = () => {
    const [form] = Form.useForm();
    const [dataBill, setDataBill] = React.useState(null);

    const checkBilling = (values: any) => {
        fetch(`http://localhost:8000/client/room/booking-check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }
    return (
        <>
            <Form onFinish={checkBilling} form={form} name="validateOnly" className='max-w-xl mx-auto' layout="vertical" autoComplete="off">
                <Form.Item name="billing_id" label="Mã hoá đơn" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <SubmitButton form={form} />
                    </Space>
                </Form.Item>
            </Form>
        </>

    );
};

export default Demo;