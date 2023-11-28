import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Img1 from '../../assets/images/Abouts/Img_1.jpg';
import Img2 from '../../assets/images/Abouts/Img_2.jpg';
import Img3 from '../../assets/images/Abouts/Img_3.jpg';
import Img4 from '../../assets/images/Abouts/Img_4.jpg';
import Img5 from '../../assets/images/Abouts/Img_5.jpg';
import Img6 from '../../assets/images/Abouts/Img_6.jpg';
import ImgAbout from '../../assets/images/Abouts/Img_boi.jpg';

import AboutUsSlide from '../../components/AboutUsSlide';
import Page from '../../components/Page';
import SmoothSlide from '../../components/SmoothSlide';

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
                const isOnScreen = rect.top < window.innerHeight && rect.bottom >= 300;
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
        <Page title='Về chúng tôi'>
            <div className={`${bg || bg2 ? 'bg-[#7A7A7A]' : 'bg-[#f9f8f6]'} transition-all duration-300`}>
                <div>
                    <AboutUsSlide />
                </div>
                <div className='flex justify-center'>
                    <div className="flex items-center justify-center mt-[100px] mb-[100px]">
                        <p className="text-[33px] font-text_roboto lg:text-[53px] md:text-[45px] text-center text-[#202020] max-w-[300px] lg:max-w-[800px] md:max-w-[700px] font-light">
                            Hãy sẵn sàng để có trải nghiệm sống không giới hạn
                        </p>
                    </div>
                </div>

                <SmoothSlide />
                <div ref={elementRef} className='flex justify-center mb-[40px] mt-[100px]'>
                    <h2 className='text-[23px] font-text_roboto text-center text-white max-w-[330px] lg:max-w-[600px] md:max-w-[600px] font-light'>
                        PolyDev Hotels cho khách hàng tiềm năng biết những gì họ có thể mong đợi khi ghé thăm – trải nghiệm phòng ngủ 5 sao đẹp và sang trọng với mức giá 1 sao rất phải chăng.
                    </h2>
                </div>

                <div className='flex justify-center mb-[100px]'>
                    <h2 className='text-[23px] font-text_roboto text-center text-white max-w-[600px] font-light'>
                        <Link to='/rooms' className='border-b hover:text-yellow-50'>
                            Khám phá phòng của chúng tôi
                        </Link>
                    </h2>
                </div>

                <div>
                    <img src={ImgAbout} className='max-w-full h-auto mb-[100px]' alt="" />
                </div>

                <div className='lg:flex lg:justify-center mb-[100px] lg:mr-[60px]'>
                    <div className='lg:mr-[160px] flex justify-center'>
                        <img src={Img1} className='h-[500px] md:h-[665px] lg:h-[655px] hover:opacity-80 transition-opacity duration-150' alt="" />
                    </div>
                    <div className='lg:mt-auto lg:mb-auto lg:ml-[-60px] md:mt-[60px] mt-[30px] '>
                        <h3 className='lg:text-left text-center text-[17px] mb-[26px] font-text_roboto text-gray-400'>Polydev Hotel</h3>
                        <div className='mb-[30px]'>
                            <p className="lg:text-left text-center font-text_roboto text-[40px] md:[50px] lg:[50px] text-[#202020] font-light ">
                                Sang trọng được khẳng định
                            </p>
                        </div>
                        <div className=''>

                            <div className='flex justify-center mb-[30px]'>
                                <p className='lg:text-left text-center font-text_roboto text-[18px] text-gray-500 max-w-[450px] lg:max-w-[500px] md:max-w-[700px] font-light'>
                                    Khách sạn chúng tôi là biểu tượng của sự sang trọng và tiện nghi, nơi mỗi chi tiết đều được chăm chút đến từng centimet. Từ lối thiết kế nội thất tinh tế đến dịch vụ chăm sóc khách hàng tận tâm, chúng tôi cam kết mang đến cho quý khách trải nghiệm đích thực của sự xa hoa và tiện lợi.
                                </p>
                            </div>
                            <div className='flex justify-center'>
                                <h2 className='lg:text-left text-center font-text_roboto text-[18px] text-gray-500 max-w-[450px] lg:max-w-[500px] md:max-w-[700px] font-light'>
                                    Tọa lạc trong một không gian lịch lãm, khách sạn chúng tôi không chỉ là điểm đến lưu trú mà còn là điểm hội tụ của phong cách và đẳng cấp. Cho dù bạn đang tìm kiếm một kỳ nghỉ thư giãn hay một không gian lý tưởng để tổ chức sự kiện quan trọng, chúng tôi tự tin rằng sự sang trọng tinh tế tại khách sạn sẽ làm nổi bật mọi trải nghiệm của bạn.
                                </h2>
                            </div>
                        </div>
                    </div>
                </div >

                <div>
                    <div className='flex justify-center '>
                        <img src={Img2} className='lg:w-[1170px] lg:h-[780px] mb-[100px]' alt="" />
                    </div>

                    <div ref={elementRef2} className='lg:flex lg:justify-center mb-[100px] '>
                        <div className='mt-auto mb-auto'>
                            <h3 className='lg:text-left text-center text-[17px] mb-[26px] font-text_roboto text-white'>Thích hợp cho bạn</h3>
                            <div className='flex justify-center mb-[30px]'>
                                <p className="lg:text-left font-text_roboto text-center text-[35px] lg:text-[50px] md:text-[50px] w-[545px] text-white font-light">
                                    Thân thiện, hiếu khách
                                </p>
                            </div>
                            <div>
                                <div className='flex justify-center mb-[30px]'>
                                    <h2 className='lg:text-left text-center font-text_roboto lg:ml-[-40px] text-[18px] text-white lg:max-w-[500px] md:max-w-[700px] max-w-[450px] font-light'>
                                        Tại khách sạn chúng tôi, sự hiếu khách và thân thiện không chỉ là một dịch vụ mà là một phong cách sống. Chúng tôi tự hào về đội ngũ nhân viên chuyên nghiệp, luôn sẵn sàng đáp ứng mọi nhu cầu của khách hàng với sự nhiệt huyết và tận tâm.                                    </h2>
                                </div>
                                <div className='flex justify-center mb-[30px] lg:mb-0'>
                                    <h2 className='lg:text-left text-center font-text_roboto lg:ml-[-40px] text-[18px] text-white lg:max-w-[500px] md:max-w-[700px] max-w-[450px] font-light'>
                                        Chúng tôi không chỉ cung cấp một không gian lưu trú, mà còn tạo ra một cộng đồng hiếu khách, nơi mà mọi người đều được đối xử như gia đình. Bất kỳ yêu cầu đặc biệt nào của bạn đều được chúng tôi đón nhận với sự tận tâm và linh hoạt, để đảm bảo bạn có một trải nghiệm lưu trú không chỉ thoải mái mà còn ấm áp và gần gũi như ở nhà. Đến với chúng tôi, bạn sẽ không chỉ là khách, mà là một phần quan trọng của cộng đồng hiếu khách mà chúng tôi xây dựng và nuôi dưỡng.                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center lg:ml-[120px]'>
                            <img src={Img3} className='lg:text-left text-center h-[500px] md:h-[665px] lg:h-[655px] hover:opacity-80 transition-opacity duration-150' alt="" />
                        </div>
                    </div >

                    <div className='lg:flex lg:justify-center lg:mb-[100px] lg:mr-[60px]'>
                        <div className='flex justify-center lg:mr-[50px]'>
                            <img src={Img4} className='lg:text-left text-center h-[500px] md:h-[665px] lg:h-[655px] hover:opacity-80 transition-opacity duration-150' alt="" />
                        </div>
                        <div className='mt-auto mb-auto ml-[20px]'>
                            <div className='flex justify-center mb-[30px] mt-[20px] lg:mt-0'>
                                <p className="lg:text-left font-text_roboto text-center text-[35px] lg:text-[50px] md:text-[50px] w-[545px] font-light">
                                    Hành trình nghỉ ngơi trong một bước
                                </p>
                            </div>
                            <div className='flex justify-center mb-[30px]'>
                                <h2 className='lg:text-left font-text_roboto text-center text-[18px] lg:ml-[-40px] text-[#202020] lg:max-w-[500px] md:max-w-[700px]  font-light'>
                                    Từ khi bạn bước vào cánh cửa, hành trình của bạn bắt đầu với sự chào đón ấm áp và không khí thoải mái tại lễ tân. Chúng tôi hiểu rằng mỗi khách hàng là duy nhất, và do đó, chúng tôi tận dụng mọi cơ hội để đáp ứng và vượt qua mong đợi của họ.                                </h2>
                            </div>
                            <div className='flex justify-center mb-[20px]'>
                                <p className="lg:text-left text-center font-text_roboto text-[#202020] text-[15px] lg:text-[23px] md:text-[23px] w-[545px] font-light">
                                    <Link to='/rooms' className='border-b hover:text-gray-500'>
                                        Xem phòng
                                    </Link>
                                </p>
                            </div>
                            <div className='flex justify-center mb-[60px]'>
                                <p className='lg:text-left text-center font-text_roboto text-[#202020] text-[15px] lg:text-[23px] md:text-[23px] w-[545px] font-light'>
                                    <Link to='/contact' className='border-b hover:text-gray-500'>
                                        Cách thức liên hệ
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div >

                    <div className='flex justify-center gap-5 pb-[60px]'>
                        <div className=''>
                            <img src={Img5} className='h-[150px] w-[600px] lg:h-[377px] lg:w-[578px] md:h-[270px] md:w-[578px] hover:opacity-80 transition-opacity duration-150' alt="" />
                        </div>
                        <div className=''>
                            <img src={Img6} className='h-[150px] w-[600px] lg:h-[377px] lg:w-[578px] md:h-[270px] md:w-[578px] hover:opacity-80 transition-opacity duration-150' alt="" />
                        </div>
                    </div >
                </div>

            </div >
        </Page>
    );
}