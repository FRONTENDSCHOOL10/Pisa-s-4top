/* SplashSwiper 사용법

- `images` (필수): 이미지 경로(`string`)를 담은 배열. 각 배열의 요소가 슬라이드 이미지로 사용됩니다.

---- 사용법 예시 ----

import SplashSwiper from '@/components/TeaCard/SplashSwiper';

export default function App() {
   const imageUrls = [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
      'https://example.com/image4.jpg',
   ];
   ---> 데이터베이스에서 배열로 받아오기

   return (
      <div>
         <SplashSwiper images={imageUrls} />
         ---> 정방향
         <SplashSwiper images={imageUrls} reverse={true} />
         ---> 역방향
      </div>
   );
}
*/

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';

interface SplashSwiperProps {
   images: string[];
   reverse?: boolean; // reverse 프롭 추가
}

export default function SplashSwiper({
   images,
   reverse = false,
}: SplashSwiperProps) {
   const slideStyle = { width: '144px', height: '144px' };
   const slideClassName = 'rounded-2xl bg-stone-200';

   return (
      <Swiper
         spaceBetween={16}
         slidesPerView="auto"
         freeMode={true}
         loop={true}
         autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: reverse,
         }}
         centeredSlides={true}
         style={{ overflow: 'visible' }}
         modules={[Autoplay, FreeMode]}
         speed={5000}
         className="w-full"
         role="list"
         aria-label="당신에게 추천하는 티"
      >
         {images.map((image, index) => (
            <SwiperSlide
               key={index}
               style={slideStyle}
               className={slideClassName}
               role="listitem"
               aria-label={`당신에게 추천하는 티 ${index + 1}`} // [todo] 데이터베이스 연결 시 티 이름으로 변경하기
            >
               <img
                  src={image}
                  alt={`당신에게 추천하는 티 ${index + 1}`} // [todo] 데이터베이스 연결 시 티 이름으로 변경하기
                  className="h-full w-full object-cover"
               />
            </SwiperSlide>
         ))}
      </Swiper>
   );
}
