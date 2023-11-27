import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Art1 from '../../assets/images/Home/Art/Image1.jpg'
import Art2 from '../../assets/images/Home/Art/Image2.jpg'
import { ImageStyle1, ImageStyle10, ImageStyle11, ImageStyle2, ImageStyle3, ImageStyle4, ImageStyle5, ImageStyle6, ImageStyle7, ImageStyle8, ImageStyle9 } from '../../assets/images/Home/ImsViews'
import ImageRestaurant from '../../assets/images/Home/Restaurant/Img2.jpg'
import ImgHome from '../../assets/images/Home/view.jpg'
import BookForm from '../../components/BookForm'
import HeroSlide from '../../components/HeroSlide'
import ObserverAnimate from '../../components/ObserverAnimation'
import Page from '../../components/Page'
import RoomsView from '../../sections/Home/RoomsView'
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
        const isOnScreen = rect.top < window.innerHeight - 250 && rect.bottom >= 470;


        setBg(isOnScreen);
      }
      if (element2) {
        const rect = element2.getBoundingClientRect();
        const isOnScreen = rect.top < window.innerHeight - 100 && rect.bottom >= 1200;
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
                  <span className='text-desc font-text_roboto'>Sang trọng và độc đáo</span>

                </div>
                <h2 className='max-w-[383px] text-h3 font-text_roboto'>Khám phá một khách sạn xác định một khía cạnh mới của sự sang trọng. Cảm xúc sang trọng.</h2>
                <Link to='/rooms' className='underline text-[24px] font-text_roboto'>Xem thêm</Link>
              </div>

            </div>
          </ObserverAnimate>
          <div className='text-white mt-[30px] flex flex-col lg:hidden items-center'>
            <div className='mb-5'>
              <span className='text-desc'>Sang trọng và độc đáo</span>

            </div>
            <h2 className='text-[25px] text-center'>Khám phá một khách sạn xác định một khía cạnh mới của sự sang trọng. Cảm xúc sang trọng.</h2>
            <Link to='#' className='underline text-[24px] mt-[30px]'>Xem thêm</Link>
          </div>
        </div>

        <RoomsView />
        {/* restaurant */}
        <div className='mt-primary'>
          <div className='flex justify-center font-text_2nd mb-[60px]'>
            <ObserverAnimate position={{ y: 50, duration: 1.5 }}>
              <div className='text-center'>
                <h2 className=' md:text-h1 max-w-[780px] text-center '>Một trải nghiệm tự nhiên được tạo nên từ sự chuyên nghiệp và quan tâm đặc biệt mà chúng tôi dành cho mỗi khách hàng.</h2>
                <Link to='' className='border-b text-[20px] md:text-h3'>Xem phòng</Link>
              </div>
            </ObserverAnimate>
          </div>
          <div className=' bg-[#111111] relative font-text_roboto lg:h-[675px] flex flex-col-reverse gap-5 lg:gap-0 lg:flex-row items-center justify-center text-white'>
            <ObserverAnimate position={{ x: 100, duration: 1.5 }}>
              <div className='absolute md:static z-50'>
                <p className='text-desc'>Nhà hàng</p>
                <h3 className='text-h5 md:text-h1 max-w-[300px] md:max-w-[580px] mb-4'>
                  Không gian nhà hàng bên trong khách sạn trang nhã và ấm cúng
                </h3>
                <Link to='' className='border-b text-[20px] md:text-h3'>Xem thêm</Link>
              </div>
            </ObserverAnimate>
            <div className='absolute inset-0 bg-black opacity-50'></div>
            <div className='max-w-[600px]'>
              <img src={ImageRestaurant} className='w-full' alt="" />
            </div>
          </div>
        </div>
        {/* art */}
        <div className='mt-primary px-4'>
          <div className='flex justify-center mb-[60px]'>
            <ObserverAnimate position={{ y: 50, duration: 1.5 }}>
              <h2 className='text-normal text-center text-[#202020] max-w-[800px] font-text_roboto font-light'>
                Mọi thứ bạn cần để trải nghiệm một hành trình sang trọng, thân thiện với môi trường với sức khỏe và sự an lạc không thể quên.               </h2>
            </ObserverAnimate>
          </div>
          <div className='flex justify-center flex-col md:flex-row gap-[30px] md:gap-[50px]'>
            <ObserverAnimate position={{ x: -150, duration: 1 }}>
              <Link to='' className='relative group'>
                <img src={Art1} className='w-full md:max-w-[570px] object-cover h-[450px]' alt="" />
                <div className='absolute inset-0 bg-black opacity-50'></div>
                <div className='absolute w-full bottom-[15%] group-hover:bottom-[50%] group-hover:translate-y-[70%] transition-all duration-1000 right-1/2 translate-x-1/2 text-white'>
                  <h3 className='text-h3 font-text_2nd text-center'>Sang trọng</h3>
                  <p className='text-small md:px-4 group-hover:md:block opacity-0 duration-300 transition-opacity ease-in-out 
               hidden md:text-center group-hover:opacity-100'>
                    "
                    Khách sạn chúng tôi tự hào là điểm đến sang trọng, nơi mỗi chi tiết đều được chăm chút kỹ lưỡng. Từ thiết kế độc đáo đến dịch vụ chăm sóc tận tâm, chúng tôi mang đến trải nghiệm lưu trú với đẳng cấp không giới hạn."                  </p>

                </div>
              </Link>
            </ObserverAnimate>
            <ObserverAnimate position={{ x: 150, duration: 1 }}>
              <Link to='' className='relative group'>
                <img src={Art2} className='w-full md:max-w-[570px] object-cover h-[450px]' alt="" />
                <div className='absolute inset-0 bg-black opacity-50'></div>
                <div className='absolute w-full bottom-[15%] group-hover:bottom-[50%] group-hover:translate-y-[70%] transition-all duration-1000 right-1/2 translate-x-1/2 text-white'>
                  <h3 className='text-h3 font-text_2nd text-center'>Ấm áp</h3>
                  <p className='text-small md:px-4 group-hover:md:block opacity-0 duration-300 transition-opacity ease-in-out 
               hidden md:text-center group-hover:opacity-100 '>
                    "Không chỉ là nơi lưu trú, mà còn là một mái nhà ấm áp. Ánh đèn dịu dàng, không khí thân thiện và sự chăm sóc tận tâm tạo nên không gian ấm cúng, nơi mà mỗi khách hàng cảm nhận được sự ấm áp và chân thành từ đội ngũ nhân viên."                  </p>

                </div>
              </Link>
            </ObserverAnimate>


          </div>
        </div>
        {/* imgs */}
        <div className='mt-primary ' ref={elementRef2}>
          <ObserverAnimate position={{ y: -50, duration: 1 }}>
            <div className='flex flex-col justify-center items-center text-white'>
              <p className='text-center text-desc'>PolyDev Hotel</p>
              <h3 className='max-w-[800px] font-text_2nd text-center text-h3  md:text-h1 font-medium'>
                Hãy tận hưởng và tham gia cùng những du khách đã chia sẻ những kí ức ảnh tốt nhất từ chuyến lưu trú của họ.</h3>
            </div>

          </ObserverAnimate>
          <div className='max-w-[1222px] md:columns-3 column-1 sm:columns-2 px-4 mt-[60px] mx-auto lg:columns-4 column gap-[30px]'>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full' src={ImageStyle1} alt="" /></div>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full' src={ImageStyle5} alt="" /></div>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full' src={ImageStyle9} alt="" /></div>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full' src={ImageStyle2} alt="" /></div>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full' src={ImageStyle6} alt="" /></div>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full' src={ImageStyle10} alt="" /></div>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full' src={ImageStyle3} alt="" /></div>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full' src={ImageStyle7} alt="" /></div>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full' src={ImageStyle11} alt="" /></div>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full' src={ImageStyle4} alt="" /></div>
            <div className='w-full mb-[30px] break-inside-avoid'><img className='w-full' src={ImageStyle8} alt="" /></div>
          </div>

        </div>
      </div>

    </Page>
  )
}