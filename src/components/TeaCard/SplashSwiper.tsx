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
}

export default function SplashSwiper({ images }: SplashSwiperProps) {
   const slideStyle = { width: '144px', height: '144px' };
   const slideClassName = 'rounded-2xl bg-stone-200';

   return (
      <Swiper
         spaceBetween={16}
         slidesPerView="auto"
         freeMode={true}
         loop={true}
         autoplay={{ delay: 0, disableOnInteraction: false }}
         centeredSlides={true}
         style={{ overflow: 'visible' }}
         modules={[Autoplay, FreeMode]}
         speed={5000}
         className="w-full"
      >
         {images.map((image, index) => (
            <SwiperSlide
               key={index}
               style={slideStyle}
               className={slideClassName}
            >
               <img
                  src={image}
                  alt={`Slide ${index}`}
                  className="h-full w-full object-cover"
               />
            </SwiperSlide>
         ))}
      </Swiper>
   );
}
