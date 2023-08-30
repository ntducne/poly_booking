import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';


import Slide1 from '../../assets/images/Abouts/slide_1.jpg'
import Slide2 from '../../assets/images/Abouts/slide_2.jpg'
import Slide3 from '../../assets/images/Abouts/slide_3.jpg'



type Props = {}

export default function SmoothSlide({ }: Props) {
    const [setSwiperRef] = useState<any>(null);

    return (
        <>
            <Swiper
                onSwiper={setSwiperRef}
                slidesPerView={2}
                centeredSlides={true}
                spaceBetween={0}
                pagination={{
                    type: 'fraction',
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
            // className="mySwiper"
            >
                <div>

                </div>
                <SwiperSlide>
                    <div className='w-[450px] h-[600px]'>
                        <img src={Slide1} className='' alt="" />
                    </div>
                </SwiperSlide>

                <SwiperSlide >
                    <div className='w-[100px] h-[600px]'>
                        <img src={Slide2} className='' alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide >
                    <div className='w-[900px] h-[600px]'>
                        <img src={Slide3} className='' alt="" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}