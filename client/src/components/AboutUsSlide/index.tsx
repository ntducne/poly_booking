import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
type Props = {}

import { Autoplay, EffectFade } from 'swiper/modules';
import ObserverAnimate from '../ObserverAnimation';
const slides = [
    {
        title: "Một nơi ấm áp,",
        title2: "phong cách để bạn thư giãn.",
        bg: "https://hotellerv5.themegoods.com/minimal/wp-content/uploads/sites/3/2020/08/thought-catalog-344189-unsplash.jpg",
        btnText: "Tận hưởng những khoảnh khắc huy hoàng nhất của bạn cùng PolyDevHotel"
    },
    {
        title: "Một nơi ấm áp,",
        title2: "phong cách để bạn thư giãn.",
        bg: "https://stelia-resort-tuy-hoa.hotelmix.vn/data/Photos/OriginalPhoto/12847/1284756/1284756874/Stelia-Beach-Resort-Tuy-Hoa-Exterior.JPEG",
        btnText: "Tận hưởng những khoảnh khắc huy hoàng nhất của bạn cùng PolyDevHotel"
    }
]

export default function AboutUsSlide({ }: Props) {
    return (
        <Swiper
            modules={[EffectFade, Autoplay]}
            effect={'fade'}
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false
            }}
            className='heroSlider h-[600px] lg:h-screen bg-black p-0 '>
            {slides.map((slide, index) => {
                const { title, title2, bg, btnText } = slide
                return <SwiperSlide key={index} className='text-white h-full bg-pink-300 
                relative' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className='z-20 text-white '>
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 105 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            initial="hidden"
                            animate='visible'
                        >
                            <ObserverAnimate position={{ y: 150, duration: 1.5 }}>
                                <div className='lg:w-[1170px] w-[400px] md:w-[650px] mt-[350px]'>
                                    <h1 className='md:text-[50px] text-[32px] font-text_2nd tracking-[2px] 
                         lg:text-[68px] leading-tight mb-6'>{title} <br /> {title2}</h1>
                                    <button className='btn mx-auto font-text text-[14px] lg:text-[16px] md:text-[16px] text-[#ebe9eb]'>{btnText}</button>
                                </div>
                            </ObserverAnimate>
                        </motion.div>
                    </div>


                    <div className='absolute top-0 w-full h-full'>
                        <img className='object-cover h-full w-full' src={bg} alt="" />
                    </div>
                    <div className='absolute w-full h-full bg-black/20'>

                    </div>
                </SwiperSlide>
            })}
        </Swiper>
    )
}