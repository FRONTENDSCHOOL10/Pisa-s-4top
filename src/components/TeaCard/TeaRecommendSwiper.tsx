import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import TeaRecommendCard, { TeaRecommendCardProps } from './TeaRecommendCard';

interface TeaRecommendSwiperProps {
   teaRecommendations: TeaRecommendCardProps[];
}

export default function TeaRecommendSwiper({
   teaRecommendations,
}: TeaRecommendSwiperProps) {
   return (
      <Swiper
         spaceBetween={16}
         slidesPerView="auto"
         loop={true}
         centeredSlides={true}
         autoplay={true}
         style={{ overflow: 'visible' }}
      >
         {teaRecommendations.map((recommendation, index) => (
            <SwiperSlide key={index} style={{ width: 'auto' }}>
               <TeaRecommendCard {...recommendation} />
            </SwiperSlide>
         ))}
      </Swiper>
   );
}
