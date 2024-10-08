/* TeaRecommendSwiper 사용법


- `teaRecommendations` (필수): `TeaRecommendCardProps` 타입의 차 추천 데이터를 담은 배열. 각 배열 요소는 TeaRecommendCard로 표시됩니다.

---- 사용법 예시 ----
import TeaRecommendSwiper from '@/components/TeaCard/TeaRecommendSwiper';

export default function App() {
   const recommendations = [
      {
         imageUrl: 'https://example.com/tea1.jpg',
         teaName: '녹차',
         brand: 'Tea Brand A',
      },
      {
         imageUrl: 'https://example.com/tea2.jpg',
         teaName: '홍차',
         brand: 'Tea Brand B',
      },
      {
         imageUrl: 'https://example.com/tea3.jpg',
         teaName: '백차',
         brand: 'Tea Brand C',
      },
   ];
   ------> 데이터베이스에서 받아오기

   return (
      <div>
         <TeaRecommendSwiper teaRecommendations={recommendations} />
      </div>
   );
}

*/

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { TeaRecommendCard } from './CardComponents';
import { FormattedTea } from '@/types/types';

interface TeaRecommendSwiperProps {
   teaRecommendations: FormattedTea[];
   userNickname: string;
}

export default function TeaRecommendSwiper({
   teaRecommendations,
   userNickname,
}: TeaRecommendSwiperProps) {
   return (
      <Swiper
         spaceBetween={8}
         slidesPerView="auto"
         loop={true}
         centeredSlides={true}
         speed={5000}
         autoplay={{
            delay: 0,
            disableOnInteraction: false,
         }}
         modules={[Autoplay]}
         role="list"
         aria-label="추천하는 티 슬라이드"
      >
         {teaRecommendations.map((recommendation) => (
            <SwiperSlide
               key={recommendation.id}
               style={{ width: 'auto' }}
               role="listitem"
               aria-label={`${recommendation.teaName} - ${recommendation.brand} 티 추천 카드`}
            >
               <TeaRecommendCard
                  {...recommendation}
                  userNickname={userNickname}
                  className='!w-44'
               />
            </SwiperSlide>
         ))}
      </Swiper>
   );
}
