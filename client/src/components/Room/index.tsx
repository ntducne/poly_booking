import { ArrowsAltOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

export default function Room(data: any) {
    const { id, name, image, price, desc, maxPerson } = data.data

    return (
        <div className='bg-white shadow-2xl group '>
            <div className='overflow-hidden'>
                <img className='group-hover:scale-110 transition-all duration-300 w-full' src={image} alt="" />

            </div>
            {/* detail */}
            <div className="bg-white shadow-lg max-w-[430px] mx-auto h-[60px]
            -translate-y-1/2 flex justify-center items-center uppercase font-medium tracking-[1px] text-[16px]
            ">
                <div className='flex justify-between flex-wrap gap-1 w-[80%]'>
                    <div className='flex items-center gap-x-2'>
                        <div className='text-[#202020] flex items-center'>
                            <ArrowsAltOutlined className='text-[15px]' />
                        </div>
                        <div className='flex gap-x-1 items-center'>
                            <div>Size</div>
                            <div>30M2 </div>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <div className='text-[#202020] flex items-center'>
                            <UsergroupAddOutlined className='text-[15px]' />
                        </div>
                        <div className='flex gap-x-1 items-center'>
                            <div>Max people</div>
                            <div>1</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-[35px] font-text_2nd'>
                <div className=' w-full'>
                    <Link to=''>
                        <h3 className='text-[35px] font-bold '>{name}</h3>
                    </Link>
                    <div className='mb-3 text-[20px] flex flex-col md:flex-row justify-between'>
                        <div>
                            <p className='font-bold'>Giường: <span className='font-medium'>đơn</span></p>
                            <p className='max-w-[300px]  font-bold'>Mô tả: <span className='font-normal'>{desc.slice(0, 10)}</span></p>
                        </div>
                        <div>
                            <p className='font-bold'>View: <span className='font-medium'>biển</span></p>
                            <p className='font-bold'>View: <span className='font-medium'>biển</span></p>
                        </div>
                    </div>
                </div>
                <div className='mb-5 md:mb-[30px]'>

                    <Link to='' className='text-[23px]  font-bold border-b hover:text-[#a27b49] hover:border-b-[#a27b49] transition-all duration-600'>Xem chi tiết</Link>
                </div>
            </div>
        </div>
    )
}