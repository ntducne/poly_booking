import React from 'react'
import { AiOutlineWifi } from 'react-icons/Ai'
import { PiCoffee } from 'react-icons/Pi'
import { LuBath } from 'react-icons/Lu'
import { FaParking, FaBreadSlice, FaCheck } from 'react-icons/Fa'
import { TbSwimming } from 'react-icons/Tb'
import { CgGym } from 'react-icons/Cg'
import BookForm from '../../components/BookForm'
import Checkin from './Bookformdetial/checkin'
import Checkout from './Bookformdetial/checkout'
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
type Props = {}

const Detial = (props: Props) => {
    return (
        <div className='container mx-auto '>
            <div className='flex flex-col lg:flex-row h-full py-24'>
                <div className='w-full h-full lg:w-[60%] px-6 '>
                    <h2 className='text-5xl'>
                        Tên Phòng
                    </h2>
                    <p className='mb-8 mt-10'>
                        Mo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac proooooooMo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac proooooooMo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac proooooooMo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac proooooooMo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac proooooooMo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac proooooooMo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac proooooooMo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac proooooooMo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac proooooooMo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac proooooooMo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac proooooooMo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac proooooooMo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac proooooooMo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac proooooooMo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac proooooooMo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac proooooooMo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac proooooooMo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac prooooooo Mo ta cua phong nhaa cac prooooooo
                    </p>
                    <img className='mb-8' src="https://www.duyenharesorts.com/Data/Sites/1/News/103/lnom2253.jpg" alt="" />
                    <div className='mt-12'>
                        <h3 className='h3 mb-3 text-4xl'>
                            Tiện nghi phòng
                        </h3>
                        <p className='mb-12'>   The spacious room is decorated with modern furnishings and luxurious amenities, 
                        offering skyline view from the balcony </p>
                        <div className='grid grid-cols-3 gap-6 mb-12'>
                            <div className='flex items-center -gap-x-3 flex-1 '>
                                <div className='text-3xl text-accent' ><AiOutlineWifi /></div>
                                <div className='text-base ml-1'>Wifi</div>
                            </div>
                            <div className='flex items-center -gap-x-3 flex-1 '>
                                <div className='text-3xl text-accent' ><PiCoffee /></div>
                                <div className='text-base ml-1'>Coffee</div>
                            </div>
                            <div className='flex items-center -gap-x-3 flex-1 '>
                                <div className='text-3xl text-accent' ><LuBath /></div>
                                <div className='text-base ml-1'>Bath</div>
                            </div>
                            <div className='flex items-center -gap-x-3 flex-1 '>
                                <div className='text-3xl text-accent' ><FaParking /></div>
                                <div className='text-base ml-1'>Parking</div>
                            </div>
                            <div className='flex items-center -gap-x-3 flex-1 '>
                                <div className='text-3xl text-accent' ><TbSwimming /></div>
                                <div className='text-base ml-1'>Swimming</div>
                            </div>
                            <div className='flex items-center -gap-x-3 flex-1 '>
                                <div className='text-3xl text-accent' ><FaBreadSlice /></div>
                                <div className='text-base ml-1'>Breakfast</div>
                            </div>
                            <div className='flex items-center -gap-x-3 flex-1 '>
                                <div className='text-3xl text-accent' ><CgGym /></div>
                                <div className='text-base ml-1'>Gym</div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className='w-full h-full lg:w-[40%]'>
                    <div className='py-8 px-6 bg-yellow-100 mb-12'>
                        <div className='flex flex-col space-y-4 mb-4'>
                            <h3 className='h3 mb-3 text-4xl'>

                                Đặt phòng của bạn
                            </h3>
                            <div className='h-[60px]'>
                                <Checkin />
                            </div>
                            <div className='h-[60px]'>
                                <Checkout />
                            </div>
                            <div className='flex-1 lg:border-r h-[60px]'>

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
                            <div className='flex-1 lg:border-r h-[60px]'>
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
                            <div className="mb-4">
                                <button type="button" className=' h-[50px] flex max-w-sm w-full bg-gradient-to-r from-indigo-500 via-pink-500 
                                to-yellow-500 hover:from-indigo-600 hover:via-pink-600 hover:to-red-600 
                                focus:outline-none text-white  uppercase font-bold shadow-md rounded-full mx-auto items-center'>

                                    <p className="mx-auto">Dat phong</p>

                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className='text-3xl'>Nội quy phòng</h3>
                        <p className='mb-6 mt-[20px]'>
                        The spacious room is decorated with modern furnishings and luxurious amenities, 
                        offering skyline view from the balcony 
                        </p>
                        <ul>
                            <li className='flex items-center gap-x-4'>
                                <FaCheck/>
                                Check-in : 3:00 PM - 9:00 PM  
                            </li>
                            <li className='flex items-center gap-x-4 mt-2'>
                                <FaCheck/>
                                Check-out : 10:00 AM
                            </li>
                            <li className='flex items-center gap-x-4 mt-2'>
                                <FaCheck/>
                               No Pets  
                            </li>
                            <li className='flex items-center gap-x-4 mt-2'>
                                <FaCheck/>
                                No Smoking
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Detial