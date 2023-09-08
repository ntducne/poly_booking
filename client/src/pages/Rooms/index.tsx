import { Pagination } from 'antd'
import { useEffect, useState } from 'react'
import { Navigation, Pagination as Pagination1 } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SlideRooms1, SlideRooms2, SlideRooms3, SlideRooms4, SlideRooms5 } from '../../assets/images/Rooms/Slides'
import BookForm from '../../components/BookForm'
import HeroSlide from '../../components/HeroSlide'
import Page from '../../components/Page'
import Room from '../../components/Room'
type Props = {}

const rooms = [
    {
        id: 1,
        name: "Room 1",
        price: 10000,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda consequuntur sapiente, incidunt labore illum magni quam cumque esse quibusdam laudantium ratione recusandae, aliquid tempore ex. Esse voluptatibus voluptatem dicta blanditiis!",
        maxPerson: 3,
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 2,
        name: "Room 2",
        price: 10000,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda consequuntur sapiente, incidunt labore illum magni quam cumque esse quibusdam laudantium ratione recusandae, aliquid tempore ex. Esse voluptatibus voluptatem dicta blanditiis!",
        maxPerson: 4,
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 3,
        name: "Room 3",
        price: 20000,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda consequuntur sapiente, incidunt labore illum magni quam cumque esse quibusdam laudantium ratione recusandae, aliquid tempore ex. Esse voluptatibus voluptatem dicta blanditiis!",
        maxPerson: 12,
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 4,
        name: "Room 4",
        price: 1000,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda consequuntur sapiente, incidunt labore illum magni quam cumque esse quibusdam laudantium ratione recusandae, aliquid tempore ex. Esse voluptatibus voluptatem dicta blanditiis!",
        maxPerson: 10,
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
]
export default function Rooms({ }: Props) {
    const [width, setWidth] = useState(0)
    useEffect(() => {
        setWidth(window.innerWidth)
        console.log('check');

    }, [window.innerWidth])
    return (
        <Page title='Phòng'>
            <div className='pb-[100px]'>
                <div className='relative h-[500px] lg:h-[760px] bg-black bg-cover bg-no-repeat' style={{ backgroundImage: `url("https://png.pngtree.com/thumb_back/fw800/background/20230609/pngtree-resort-hotels-in-vancouver-image_2922772.jpg")` }}>
                    <div className='relative h-full flex justify-center items-center'>
                        <div className='absolute w-full h-full bg-black/50'></div>
                        <div className='z-20 text-white text-center'>
                            <div className='uppercase tracking-[6px] mb-5'>Just enjoy and relax</div>
                            <h1 className='text-[32px] font-extralight uppercase tracking-[3px] 
                        max-w-[920px] lg:text-[68px] leading-tight mb-6'>Retreat Hotel at Santorini</h1>
                            <span className=' font-extralight tracking-[3px]  '>Unwind the clock of modern life. Unlock the door to a wonder of the world.</span>
                        </div>

                    </div>
                </div>
                {/* <HeroSlide /> */}
                <BookForm />
                <div className='mt-[100px] px-4'>
                    <div className='container mx-auto lg:px-0'>
                        <div className='grid grid-cols-1 max-w-sm mx-auto gap-[60px] lg:grid-cols-3 lg:max-w-none lg:mx-0'>
                            {rooms.map((room: any) => {
                                return <Room key={room.id} data={room} />
                            })}

                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <Pagination defaultCurrent={6} total={500} />
                    </div>
                </div>
                <div className='mt-[100px] px-4'>
                    <div className='flex justify-center  font-text_2nd mb-[60px]'>
                        <div className='text-center'>
                            <h2 className='text-[30px] md:text-[50px] max-w-[780px] text-center  font-medium'>Get Ready to live for unlimited living experience</h2>
                        </div>
                    </div>
                    <Swiper
                        slidesPerView={width <= 768 ? 1 : 4}
                        navigation={true}
                        mousewheel={true}
                        spaceBetween={20}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination1, Navigation]}
                        className="mySwiper"

                    >
                        <SwiperSlide><img className='h-[600px] w-[100%] object-cover rounded-[10px]' src={SlideRooms1} alt="" /></SwiperSlide>
                        <SwiperSlide><img className='h-[600px] w-[100%] object-cover rounded-[10px]' src={SlideRooms2} alt="" /></SwiperSlide>
                        <SwiperSlide><img className='h-[600px] w-[100%] object-cover rounded-[10px]' src={SlideRooms3} alt="" /></SwiperSlide>
                        <SwiperSlide><img className='h-[600px] w-[100%] object-cover rounded-[10px]' src={SlideRooms4} alt="" /></SwiperSlide>
                        <SwiperSlide><img className='h-[600px] w-[100%] object-cover rounded-[10px]' src={SlideRooms5} alt="" /></SwiperSlide>

                    </Swiper>
                    <div className='flex justify-center mt-[60px]'>
                        <h2 className='text-[23px] text-center text-[#202020] max-w-[600px] font-text font-light'>
                            Tune Hotels tells potential customers what they can expect when they visit – a beautiful and luxurious 5-star sleeping experience, at a very affordable 1-star price.
                        </h2>
                    </div>
                </div>

            </div>
        </Page>
    )
}