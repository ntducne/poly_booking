import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


import Slide1 from '../../assets/images/Abouts/slide_1.jpg'
import Slide2 from '../../assets/images/Abouts/slide_2.jpg'
import Slide3 from '../../assets/images/Abouts/slide_3.jpg'
import Slide4 from '../../assets/images/Abouts/slide_4.jpg'
import Slide5 from '../../assets/images/Abouts/slide_5.jpg'
import Slide7 from '../../assets/images/Abouts/slide_7.jpg'
import Slide6 from '../../assets/images/Abouts/slide_6.jpg'
import Slide8 from '../../assets/images/Abouts/slide_8.jpg'
import Slide9 from '../../assets/images/Abouts/slide_9.jpg'

type Props = {}

export default function SmoothSlide({ }: Props) {
    // const [setSwiperRef] = useState<any>(null);

    return (
        <>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                    type: 'fraction',
                }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={Slide1} className='h-[200px] md:h-[450px] lg:h-[600px] lg:w-full' alt="" />
                </SwiperSlide>
                <SwiperSlide >
                    <img src={Slide2} className='h-[200px] md:h-[450px] lg:h-[600px] lg:w-full' alt="" />
                </SwiperSlide>
                <SwiperSlide >
                    <img src={Slide6} className='h-[200px] md:h-[450px] lg:h-[600px] lg:w-full' alt="" />
                </SwiperSlide>
                <SwiperSlide >
                    <img src={Slide8} className='h-[200px] md:h-[450px] lg:h-[600px] lg:w-full' alt="" />
                </SwiperSlide>
                <SwiperSlide >
                    <img src={Slide3} className='h-[200px] md:h-[450px] lg:h-[600px] lg:w-full' alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={Slide4} className='h-[200px] md:h-[450px] lg:h-[600px] lg:w-full' alt="" />
                </SwiperSlide>
                <SwiperSlide >
                    <img src={Slide5} className='h-[200px] md:h-[450px] lg:h-[600px] lg:w-full' alt="" />
                </SwiperSlide>

                <SwiperSlide >
                    <img src={Slide7} className='h-[200px] md:h-[450px] lg:h-[600px] lg:w-full' alt="" />
                </SwiperSlide>

                <SwiperSlide >
                    <img src={Slide9} className='h-[200px] md:h-[450px] lg:h-[600px] lg:w-full' alt="" />
                </SwiperSlide>
            </Swiper>
        </>
    );
}