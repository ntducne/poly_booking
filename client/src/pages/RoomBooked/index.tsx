import { Divider, Pagination } from 'antd'
import { ImageStyle1 } from '../../assets/images/Home/ImsViews'
import BookForm from '../../components/BookForm'
import HeroSlide from '../../components/HeroSlide'

type Props = {}

export default function RoomBooked({ }: Props) {
    return (

        <div>
            <HeroSlide />
            <BookForm />
            <div className='min-h-[100px] my-[100px] lg:mx-[150px] mx-2'>
                <h2 className='text-[50px] font-bold font-text_2nd'>Phòng đã đặt</h2>

                <div>
                    <div className='border-t pt-[30px] flex flex-col md:flex-row gap-[30px]'>
                        <div className='shadow-md overflow-hidden'>
                            <img className='w-full md:w-[489px] overflow-hidden h-[489px] object-cover rounded-[10px]' src={ImageStyle1} alt="" />
                        </div>
                        <div className='mb-3'>
                            <h3 className='text-[30px] font-bold mb-3'>Distant Mountains Artwork Tee</h3>
                            <p className='text-[20px] font-medium mb-3'>$36.00</p>
                            <p className='text-[#6B7280] tracking-[1px] text-[19px]'>You awake in a new, mysterious land. Mist hangs low along the distant mountains. What does it mean?</p>
                            <div className='flex mt-[30px] gap-11'>
                                <div>
                                    <p className='text-[19px] font-medium'>
                                        Delivery address
                                    </p>
                                    <p className='max-w-[300px] text-[#6B7280] text-[19px]'>
                                        Floyd Miles
                                        7363 Cynthia Pass
                                        Toronto, ON N3Y 4H8
                                    </p>
                                </div>
                                <div>
                                    <p className='text-[19px] font-medium'>
                                        Shipping updates
                                    </p>
                                    <p className='text-[#6B7280] text-[19px]'>
                                        f•••@example.com
                                    </p >
                                    <p className='text-[#6B7280] text-[19px]'>1•••••••••40</p>
                                </div>
                            </div>
                            <Divider />
                            <div className='mt-3'>
                                <h2 className='text-[19px] font-medium'>Processing on March 24, 2021</h2>
                                <div className='flex mt-5 h-[13px] rounded-lg bg-[#E5E7EB]'>
                                    <div className='w-[50%] h-[13px] rounded-lg bg-[#4F46B5]'>
                                        <h2 className='mt-5 font-medium text-[19px] text-[#4F46B5]'>Pending</h2>
                                    </div>
                                    <div className='w-[50%] h-[13px] rounded-lg bg-[#E5E7EB]'>
                                        <h2 className='mt-5 font-medium text-[19px]'>Done</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='border-t pt-[30px] mt-[30px] flex flex-col md:flex-row gap-[30px]'>
                        <div className='shadow-md overflow-hidden'>
                            <img className='w-full md:w-[489px] overflow-hidden h-[489px] object-cover rounded-[10px]' src={ImageStyle1} alt="" />
                        </div>
                        <div className='mb-3'>
                            <h3 className='text-[30px] font-bold mb-3'>Distant Mountains Artwork Tee</h3>
                            <p className='text-[20px] font-medium mb-3'>$36.00</p>
                            <p className='text-[#6B7280] tracking-[1px] text-[19px]'>You awake in a new, mysterious land. Mist hangs low along the distant mountains. What does it mean?</p>
                            <div className='flex mt-[30px] gap-11'>
                                <div>
                                    <p className='text-[19px] font-medium'>
                                        Delivery address
                                    </p>
                                    <p className='max-w-[300px] text-[#6B7280] text-[19px]'>
                                        Floyd Miles
                                        7363 Cynthia Pass
                                        Toronto, ON N3Y 4H8
                                    </p>
                                </div>
                                <div>
                                    <p className='text-[19px] font-medium'>
                                        Shipping updates
                                    </p>
                                    <p className='text-[#6B7280] text-[19px]'>
                                        f•••@example.com
                                    </p >
                                    <p className='text-[#6B7280] text-[19px]'>1•••••••••40</p>
                                </div>
                            </div>
                            <Divider />
                            <div className='mt-3'>
                                <h2 className='text-[19px] font-medium'>Processing on March 24, 2021</h2>
                                <div className='flex mt-5 h-[13px] rounded-lg bg-[#E5E7EB]'>
                                    <div className='w-[50%] h-[13px] rounded-lg bg-[#4F46B5]'>
                                        <h2 className='mt-5 font-medium text-[19px] text-[#4F46B5]'>Pending</h2>
                                    </div>
                                    <div className='w-[50%] h-[13px] rounded-lg bg-[#E5E7EB]'>
                                        <h2 className='mt-5 font-medium text-[19px]'>Done</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end mt-6'>
                        <Pagination defaultCurrent={6} total={500} />
                    </div>
                </div>
            </div>
        </div>
    )
}