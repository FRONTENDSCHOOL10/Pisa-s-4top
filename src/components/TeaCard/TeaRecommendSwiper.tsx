import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import TeaRecommendCard from './TeaRecommendCard';

export default function TeaRecommendSwiper() {
   return (
      <Swiper
         spaceBetween={20}
         slidesPerView="auto"
         loop={true}
         centeredSlides={true}
         style={{ overflow: 'visible' }}
      >
         <SwiperSlide style={{ width: 'auto' }}>
            <TeaRecommendCard />
         </SwiperSlide>
         <SwiperSlide style={{ width: 'auto' }}>
            <TeaRecommendCard />
         </SwiperSlide>
         <SwiperSlide style={{ width: 'auto' }}>
            <TeaRecommendCard />
         </SwiperSlide>
         <SwiperSlide style={{ width: 'auto' }}>
            <TeaRecommendCard />
         </SwiperSlide>
         <SwiperSlide style={{ width: 'auto' }}>
            <TeaRecommendCard />
         </SwiperSlide>
      </Swiper>
   );
}
