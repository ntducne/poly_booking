import { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"
import { Link } from 'react-router-dom'
import ImgHome from '../../assets/images/Home/view.jpg'
import RoomsView from '../../sections/Home/RoomsView'
import ImageRestaurant from '../../assets/images/Home/Restaurant/Img2.jpg'
import Art1 from '../../assets/images/Home/Art/Image1.jpg'
import Art2 from '../../assets/images/Home/Art/Image2.jpg'
import { ImageStyle1, ImageStyle10, ImageStyle11, ImageStyle2, ImageStyle3, ImageStyle4, ImageStyle5, ImageStyle6, ImageStyle7, ImageStyle8, ImageStyle9 } from '../../assets/images/Home/ImsViews'
import HeroSlide from '../../components/HeroSlide'
import BookForm from '../../components/BookForm'
import Page from '../../components/Page'
import ObserverAnimate from '../../components/ObserverAnimation'
type Props = {}

export default function Home({ }: Props) {
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
        const isOnScreen = rect.top < window.innerHeight - 300 && rect.bottom >= 300;


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
    <Page title='Trang chủ'>
      <HeroSlide />
      <BookForm />
      <div className={`py-[80px] lg:py-[70px]  ${bg || bg2 ? 'bg-[#202020]' : 'bg-[#f9f8f6]'} transition-all duration-300`}>

        <div ref={elementRef} className="px-4 flex flex-col justify-center items-center lg:flex-row ">
          <ObserverAnimate position={{ y: 70 }}>
            <div className='relative inline-block'>
              <img src={ImgHome} className='md:max-w-[780px] rounded lg:translate-x-[-20%]' alt="" />
              <div className='lg:absolute hidden lg:block lg:top-1/2 lg:right-[-25%] lg:transform lg:-translate-y-1/2
             text-white'>
                <div className='mb-5'>
                  <span className=''>For luxury seekers</span>

                </div>
                <h2 className='max-w-[383px] text-[40px] '>Discover a hotel that defines a new dimension of luxury. Emotional luxury.</h2>
                <Link to='#' className='underline text-[24px]'>Views More</Link>
              </div>

            </div>
          </ObserverAnimate>
          <div className='text-white mt-[30px] flex flex-col lg:hidden items-center'>
            <div className='mb-5'>
              <span className=''>For luxury seekers</span>

            </div>
            <h2 className='text-[25px] text-center'>Discover a hotel that defines a new dimension of luxury. Emotional luxury.</h2>
            <Link to='#' className='underline text-[24px] mt-[30px]'>View More</Link>
          </div>
        </div>

        <RoomsView />
        {/* restaurant */}
        <div className='mt-[100px] px-4'>
          <div className='flex justify-center  font-text_2nd mb-[60px]'>
            <ObserverAnimate position={{ y: 50, duration: 1.5 }}>
              <div className='text-center'>
                <h2 className='text-[30px] md:text-[50px] max-w-[780px] text-center  font-medium'>We put a smile back on your face. Pleasing people the world over. The best surprise is no surprise.</h2>
                <Link to='' className='border-b text-[20px] md:text-[30px]'>Views our rooms</Link>
              </div>
            </ObserverAnimate>
          </div>
          <div className=' bg-[#111111] relative font-text_2nd lg:h-[675px] flex flex-col-reverse gap-5 lg:gap-0 lg:flex-row items-center justify-center text-white'>
            <ObserverAnimate position={{ x: 100, duration: 1.5 }}>
              <div className='absolute md:static z-50'>
                <p className='text-[18px]'>Restaurant</p>
                <h3 className='text-[30px] md:text-[50px] font-medium max-w-[300px] md:max-w-[580px] mb-4'>
                  The art of meeting your highest expectations. Life’s better at the Garden
                </h3>
                <Link to='' className='border-b text-[20px] md:text-[30px]'>Views our restaurant</Link>
              </div>
            </ObserverAnimate>
            <div className='absolute inset-0 bg-black opacity-50'></div>
            <div className='max-w-[600px]'>
              <img src={ImageRestaurant} className='w-full' alt="" />
            </div>
          </div>
        </div>
        {/* art */}
        <div className='mt-[100px] px-4'>
          <div className='flex justify-center mb-[60px]'>
            <ObserverAnimate position={{ y: 50, duration: 1.5 }}>
              <h2 className='text-[23px] text-center text-[#202020] max-w-[800px] font-text font-light'>
                Everything you need to live an unforgettable eco-luxury experience of health and well-being. The art of meeting your highest expectations.
              </h2>
            </ObserverAnimate>
          </div>
          <div className='flex justify-center flex-col md:flex-row gap-[30px] md:gap-[50px]'>
            <ObserverAnimate position={{ x: -150, duration: 1 }}>
              <Link to='' className='relative group'>
                <img src={Art1} className='w-full md:max-w-[570px] object-cover h-[450px]' alt="" />
                <div className='absolute inset-0 bg-black opacity-50'></div>
                <div className='absolute w-full bottom-[15%] group-hover:bottom-[50%] group-hover:translate-y-[70%] transition-all duration-1000 right-1/2 translate-x-1/2 text-white'>
                  <h3 className='text-[40px] font-text_2nd text-center'>Center Park</h3>
                  <p className='text-[14px] md:px-4 group-hover:md:block opacity-0 duration-300 transition-opacity ease-in-out 
               hidden md:text-center group-hover:opacity-100 '>
                    "Leather detail shoulder contrastic colour contour stunning silhouette working peplum. Statement buttons cover-up tweaks patch pockets perennial lapel collar flap chest pockets topline stitching cropped."
                  </p>

                </div>
              </Link>
            </ObserverAnimate>
            <ObserverAnimate position={{ x: 150, duration: 1 }}>
              <Link to='' className='relative group'>
                <img src={Art2} className='w-full md:max-w-[570px] object-cover h-[450px]' alt="" />
                <div className='absolute inset-0 bg-black opacity-50'></div>
                <div className='absolute w-full bottom-[15%] group-hover:bottom-[50%] group-hover:translate-y-[70%] transition-all duration-1000 right-1/2 translate-x-1/2 text-white'>
                  <h3 className='text-[40px] font-text_2nd text-center'>Deluxe Suite</h3>
                  <p className='text-[14px] md:px-4 group-hover:md:block opacity-0 duration-300 transition-opacity ease-in-out 
               hidden md:text-center group-hover:opacity-100 '>
                    "Leather detail shoulder contrastic colour contour stunning silhouette working peplum. Statement buttons cover-up tweaks patch pockets perennial lapel collar flap chest pockets topline stitching cropped."
                  </p>

                </div>
              </Link>
            </ObserverAnimate>


          </div>
        </div>
        {/* imgs */}
        <div className='mt-[100px] ' ref={elementRef2}>
          <ObserverAnimate position={{ y: -50, duration: 1 }}>
            <div className='flex flex-col justify-center items-center text-white'>
              <p className='text-center'>Hotel Gallery</p>
              <h3 className='max-w-[800px] font-text_2nd text-center text-[30px]  md:text-[50px] font-medium'>Enjoy and join the handful of guests who already sent their best photographic memories of their stay.</h3>
            </div>

          </ObserverAnimate>
          <div className='w-full md:columns-3 column-1 sm:columns-2 px-4 mt-[60px] mx-auto lg:columns-4 column gap-[30px]'>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full rounded' src={ImageStyle1} alt="" /></div>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full rounded' src={ImageStyle5} alt="" /></div>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full rounded' src={ImageStyle9} alt="" /></div>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full rounded' src={ImageStyle2} alt="" /></div>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full rounded' src={ImageStyle6} alt="" /></div>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full rounded' src={ImageStyle10} alt="" /></div>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full rounded' src={ImageStyle3} alt="" /></div>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full rounded' src={ImageStyle7} alt="" /></div>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full rounded' src={ImageStyle11} alt="" /></div>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full rounded' src={ImageStyle4} alt="" /></div>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full rounded' src={ImageStyle8} alt="" /></div>
          </div>

        </div>
      </div>

    </Page>
  )
}