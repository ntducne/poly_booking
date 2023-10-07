import { ArrowsAltOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

type Props = {}

export default function Room(data: any) {
    const { id, name, image, price, desc, maxPerson } = data.data

    return (
        <div className='bg-bgr group overflow-hidden'>
            <div className='overflow-hidden'>
                <Link to=''>
                    <img className='group-hover:scale-110 transition-all duration-300 w-full' src={image} alt="" />
                </Link>

            </div>
            {/* detail */}
            <div className="bg-bgr shadow-md  max-w-[430px] mx-auto h-[60px]
            -translate-y-1/2 flex justify-center items-center uppercase font-medium tracking-[1px] text-[16px]
            
            ">
                <div className='flex justify-between flex-wrap gap-1 w-[80%]'>
                    <div className='flex items-center gap-x-2'>
                        <div className='text-primary flex items-center'>
                            <ArrowsAltOutlined className='text-[15px]' />
                        </div>
                        <div className='flex gap-x-1 items-center font-text_2nd'>
                            <div>Size</div>
                            <div>30M2 </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-2 '>
                        <div className='text-primary flex items-center'>
                            <UsergroupAddOutlined className='text-[15px]' />
                        </div>
                        <div className='flex gap-x-1 items-center font-text_2nd'>
                            <div>Max people</div>
                            <div>1</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' font-text_2nd bg-bgr'>
                <div className=' w-full'>
                    <Link to=''>
                        <h3 className='text-h3 font-bold '>{name}</h3>
                    </Link>
                    <div className='mb-3 text-[20px] flex flex-col md:flex-row justify-between'>
                        <div>
                            <p className='max-w-[300px]'><span className='font-normal text-desc'>{desc.slice(0, 70)}</span></p>
                        </div>
                        <div>
                            <p className='font-bold'>View: <span className='font-medium'>biển</span></p>
                            <p className='font-bold'>View: <span className='font-medium'>Thành phố</span></p>
                            <p className='font-bold'>Giường: <span className='font-medium'>đơn</span></p>
                            <p className='font-bold'>Diện tích: <span className='font-medium'>30m2</span></p>
                        </div>
                    </div>
                </div>
                <div className='mb-5 md:mb-[30px]'>

                    <Link to='' className='text-normal  font-bold border-b hover:text-[#a27b49] hover:border-b-[#a27b49] transition-all duration-600'>Xem chi tiết</Link>
                </div>
            </div>
        </div>
    )
}