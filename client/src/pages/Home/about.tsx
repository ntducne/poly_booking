import React from 'react';
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import ImgAbout from '../../assets/images/Abouts/Img_boi.jpg'
import Img1 from '../../assets/images/Abouts/Img_1.jpg'
import Img2 from '../../assets/images/Abouts/Img_2.jpg'
import Img3 from '../../assets/images/Abouts/Img_3.jpg'
import Img4 from '../../assets/images/Abouts/Img_4.jpg'
import Img5 from '../../assets/images/Abouts/Img_5.jpg'
import Img6 from '../../assets/images/Abouts/Img_6.jpg'

import SmoothSlide from '../../components/SmoothSlide'
import HeroSlide from '../../components/HeroSlide';

type Props = {}

export default function AboutPage({ }: Props) {
    const [bg, setBg] = useState<boolean>(false)
    const [bg2, setBg2] = useState<boolean>(false)
    const elementRef = useRef<any>(null)
    const elementRef2 = useRef<any>(null)
    useEffect(() => {
        const handleScroll = () => {
            const element = elementRef.current;
            const element2 = elementRef2.current;
            if (element) {
                const rect = element.getBoundingClientRect();
                const isOnScreen = rect.top < window.innerHeight && rect.bottom >= 300;
                console.log(isOnScreen);

                setBg(isOnScreen);
            }
            if (element2) {
                const rect = element2.getBoundingClientRect();
                const isOnScreen = rect.top < window.innerHeight - 300 && rect.bottom >= 900;
                setBg2(isOnScreen);
            }

        };
        // window.addEventListener("scroll", () => {
        //   window.scrollY > 390 && window.scrollY < 1100 ? setBg(true) : setBg(false)
        // })
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Khi trang được tải, kiểm tra luôn
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    return (
        <div className={`${bg || bg2 ? 'bg-[#7A7A7A]' : 'bg-[#f9f8f6]'} transition-all duration-300`}>
            <div>
                <HeroSlide />
            </div>
            <div className='flex justify-center'>
                <div className="flex items-center justify-center h-[340px]">
                    <p className="text-[53px] text-center text-[#202020] max-w-[800px] font-text font-light">
                        Get Ready to live for unlimited living experience
                    </p>
                </div>
            </div>
            <SmoothSlide />
            <div className='flex justify-center mb-[40px] mt-[140px]'>
                <h2 className='text-[23px] text-center text-[#202020] max-w-[600px] font-text font-light'>
                    Tune Hotels tells potential customers what they can expect when they visit – a beautiful and luxurious 5-star sleeping experience, at a very affordable 1-star price.
                </h2>
            </div>

            <div className='flex justify-center mb-[60px]'>
                <h2 className='text-[23px] text-center text-[#202020] max-w-[600px] font-text font-light'>
                    <Link to='' className='border-b hover:text-gray-500'>
                        Discover our rooms
                    </Link>
                </h2>
            </div>

            <div>
                <img src={ImgAbout} className='max-w-full h-auto mb-[100px]' alt="" />
            </div>

            <div className='flex justify-center mb-[100px] mr-[60px]'>
                <div className='mr-[160px]'>
                    <img src={Img1} className='h-[655px] hover:opacity-80 transition-opacity duration-150' alt="" />
                </div>
                <div className='mt-auto mb-auto ml-[-60px]'>
                    <h3 className='text-[17px] mb-[26px] text-gray-400'>Polydev Hotel</h3>
                    <div className='mb-[30px]'>
                        <p className="text-[50px] text-[#202020] font-text font-light">
                            Luxury Redefined
                        </p>
                    </div>
                    <div className='mb-[30px]'>
                        <h2 className='text-[18px] text-gray-500 max-w-[500px] font-text font-light'>
                            Leather detail shoulder contrastic colour contour stunning silhouette working peplum. Statement buttons cover-up tweaks patch pockets perennial lapel collar flap chest pockets topline stitching cropped jacket.
                        </h2>
                    </div>
                    <div>
                        <h2 className='text-[18px] text-gray-500 max-w-[500px] font-text font-light'>
                            Exercitation photo booth stumptown tote bag Banksy, elit small batch freegan sed. Craft beer elit seitan exercitation, photo booth et 8-bit kale chips proident chillwave deep v laborum. Aliquip veniam delectus, Marfa eiusmod Pinterest in do umami readymade swag. Selfies iPhone Kickstarter, drinking vinegar
                        </h2>
                    </div>
                </div>
            </div >

            <div>
                <div className='flex justify-center mb-[100px]'>
                    <img src={Img2} className='w-[1170px] h-[780px] mb-[100px]' alt="" />
                </div>

                <div ref={elementRef} className='flex justify-center mb-[100px] '>
                    <div className='mt-auto mb-auto'>
                        <h3 className='text-[17px]  mb-[26px] text-white'>For luxury seekers</h3>
                        <div className='mb-[30px]'>
                            <p className="text-[50px] w-[545px] text-white font-text font-light">
                                Experience the passion of hospitality
                            </p>
                        </div>
                        <div className='mb-[30px]'>
                            <h2 className='text-[18px] text-white max-w-[500px] font-text font-light'>
                                Leather detail shoulder contrastic colour contour stunning silhouette working peplum. Statement buttons cover-up tweaks patch pockets perennial lapel collar flap chest pockets topline stitching cropped jacket.
                            </h2>
                        </div>
                        <div>
                            <h2 className='text-[18px] text-white max-w-[500px] font-text font-light'>
                                Exercitation photo booth stumptown tote bag Banksy, elit small batch freegan sed. Craft beer elit seitan exercitation, photo booth et 8-bit kale chips proident chillwave deep v laborum. Aliquip veniam delectus, Marfa eiusmod Pinterest in do umami readymade swag. Selfies iPhone Kickstarter, drinking vinegar
                            </h2>
                        </div>
                    </div>
                    <div className='ml-[120px]'>
                        <img src={Img3} className='h-[655px] hover:opacity-80 transition-opacity duration-150' alt="" />
                    </div>
                </div >

                <div className='flex justify-center mb-[100px] mr-[60px]'>
                    <div className='mr-[100px]'>
                        <img src={Img4} className='h-[655px] hover:opacity-80 transition-opacity duration-150' alt="" />
                    </div>
                    <div className='mt-auto mb-auto ml-[20px]'>
                        <div className='mb-[30px]'>
                            <p className="text-[50px] w-[400px] text-[#202020] font-text font-light">
                                Rest Journey in Single step
                            </p>
                        </div>
                        <div className='mb-[30px]'>
                            <h2 className='text-[18px] text-gray-500 max-w-[500px] font-text font-light'>
                                Leather detail shoulder contrastic colour contour stunning silhouette working peplum. Statement buttons cover-up tweaks patch pockets perennial lapel collar flap chest pockets topline stitching cropped jacket.kets perennial lapel collar flap chest pockets topline stitching cropped jacket.
                            </h2>
                        </div>
                        <div className=' mb-[20px]'>
                            <h2 className='text-[23px] text-[#202020] max-w-[600px] font-text font-light'>
                                <Link to='/' className='border-b hover:text-gray-500'>
                                    See our rooms
                                </Link>
                            </h2>
                        </div>
                        <div className=' mb-[60px]'>
                            <h2 className='text-[23px] text-[#202020] max-w-[600px] font-text font-light'>
                                <Link to='/' className='border-b hover:text-gray-500'>
                                    See our restaurants
                                </Link>
                            </h2>
                        </div>
                    </div>
                </div >

                <div className='flex justify-center gap-5 pb-[60px]'>
                    <div className=''>
                        <img src={Img5} className='h-[377px] w-[578px] hover:opacity-80 transition-opacity duration-150' alt="" />
                    </div>
                    <div className=''>
                        <img src={Img6} className='h-[377px] w-[578px] hover:opacity-80 transition-opacity duration-150' alt="" />
                    </div>
                </div >
            </div>

        </div >
    );
}