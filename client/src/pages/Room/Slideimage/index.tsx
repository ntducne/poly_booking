

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import { useGetDetialQuery } from '../../../api/Room';

export default function SlideImages() {
  const { id } = useParams()
  const { data } = useGetDetialQuery(id)
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
        <SwiperSlide><img src={data?.room?.images[0]?.image} alt="" /></SwiperSlide>
        <SwiperSlide><img src={data?.room?.images[1]?.image} alt="" /></SwiperSlide>
        <SwiperSlide><img src={data?.room?.images[2]?.image} alt="" /></SwiperSlide>
        <SwiperSlide><img src={data?.room?.images[3]?.image} alt="" /></SwiperSlide>
        <SwiperSlide><img src={data?.room?.images[4]?.image} alt="" /></SwiperSlide>
       
      </Swiper>
    </>
  );
}