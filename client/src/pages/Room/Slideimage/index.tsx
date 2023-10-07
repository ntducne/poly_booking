
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

export default function SlideImages() {
  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><img src="https://hotellerv1.b-cdn.net/beach/wp-content/uploads/sites/4/2018/07/kari-shea-99868-unsplash.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://hotellerv1.b-cdn.net/beach/wp-content/uploads/sites/4/2018/07/kari-shea-99868-unsplash.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://hotellerv1.b-cdn.net/beach/wp-content/uploads/sites/4/2018/07/kari-shea-99868-unsplash.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://hotellerv1.b-cdn.net/beach/wp-content/uploads/sites/4/2018/07/kari-shea-99868-unsplash.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://hotellerv1.b-cdn.net/beach/wp-content/uploads/sites/4/2018/07/kari-shea-99868-unsplash.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://hotellerv1.b-cdn.net/beach/wp-content/uploads/sites/4/2018/07/kari-shea-99868-unsplash.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://hotellerv1.b-cdn.net/beach/wp-content/uploads/sites/4/2018/07/kari-shea-99868-unsplash.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://hotellerv1.b-cdn.net/beach/wp-content/uploads/sites/4/2018/07/kari-shea-99868-unsplash.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://hotellerv1.b-cdn.net/beach/wp-content/uploads/sites/4/2018/07/kari-shea-99868-unsplash.jpg" alt="" /></SwiperSlide>
      </Swiper>
    </>
  );
}