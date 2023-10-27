import { Card, Tabs } from 'antd';

const itemTab: any = [
    {
        label: 'Momo',
        key: 1,
        children: 'Thanh toán bằng Momo',
    },
    {
        label: 'Zalo Pay',
        key: 2,
        children: 'Thanh toán bằng ZaloPay',
    },
    {
        label: 'VNPay',
        key: 3,
        children: 'Thanh toán bằng VNPay',
    },
    {
        label: 'PayPal',
        key: 4,
        children: 'Thanh toán bằng PayPal',
    },
    {
        label: 'VietQR',
        key: 5,
        children: 'Thanh toán bằng VietQR',
    }
]


export default function PaymentView() {
    const onChange = (key: string) => {
        console.log(key);
      };
    return (
        <div className="container mx-auto" style={{
            maxWidth: 1000,
        }}>
            <div className="mt-12 mb-8">
                <h1 className="text-2xl font-bold mb-3">Thanh toán</h1>
            </div>
            <div className="grid pb-4" style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gridGap: '1rem',

            }}>
                <div>
                    <Tabs
                        style={{ width: 500 }}
                        size='large'
                        tabPosition="left"
                        items={itemTab}
                        onChange={onChange}
                    />
                    
                    
                </div>
                <div>
                    <Card title={
                        <div className='pb-2'>
                            <p className='font-semibold text-xl mt-2'>Mã đặt chỗ</p>
                            <span className='pb-2'>1203871283</span>
                        </div>
                    }>
                        <p className='font-medium text-xl'>NGUYEN VAN A</p>
                        <p className='font-medium text-xl'>+8498765432</p>
                        <p className='font-medium text-xl'>duc@gmail.com</p>
                    </Card>
                </div>
            </div>
        </div>
    )
}