
import { Swiper, SwiperSlide } from 'swiper/react'
import { motion } from "framer-motion"

type Props = {}

import { Autoplay, EffectFade } from 'swiper/modules';
const slides = [
    {
        title: "Your Luxury Hotel For Vacation",
        bg: "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        btnText: "Room & Suites"
    },
    {
        title: "Your Luxury Hotel For Vacation",
        bg: "https://images.pexels.com/photos/5615059/pexels-photo-5615059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        btnText: "Room & Suites"
    },
    {
        title: "Your Luxury Hotel For Vacation",
        bg: "https://images.pexels.com/photos/17871424/pexels-photo-17871424/free-photo-of-buildings-on-shore.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        btnText: "Room & Suites"
    }
]

export default function HeroSlide({ }: Props) {
    return (
        <Swiper
            modules={[EffectFade, Autoplay]}
            effect={'fade'}
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false
            }}
            className='heroSlider h-[600px] lg:h-[860px] bg-black p-0 '>
            {slides.map((slide, index) => {
                const { title, bg, btnText } = slide
                return <SwiperSlide key={index} className='text-white h-full bg-pink-300 
                relative' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div className='z-20 text-white text-center'>
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 105 },
                                visible: { opacity: 1, y: 0 }

                            }}
                            initial="hidden"
                            animate='visible'
                        >
                            <div className='uppercase tracking-[6px] mb-5'>Just enjoy and relax</div>
                            <h1 className='text-[32px] font-extralight uppercase tracking-[3px] 
                        max-w-[920px] lg:text-[68px] leading-tight mb-6'>{title}</h1>
                            <button className='btn mx-auto'>{btnText}</button>
                        </motion.div>
                    </div>


                    <div className='absolute top-0 w-full h-full'>
                        <img className='object-cover h-full w-full' src={bg} alt="" />
                    </div>
                    <div className='absolute w-full h-full bg-black/70'>

                    </div>
                </SwiperSlide>
            })}
        </Swiper>
    )
}