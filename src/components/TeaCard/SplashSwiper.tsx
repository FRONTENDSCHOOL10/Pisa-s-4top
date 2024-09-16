import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

interface SplashSwiperProps {
   images: string[];
   reverse?: boolean;
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
         loop={true}
         autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: reverse,
         }}
         modules={[Autoplay]}
         centeredSlides={true}
         speed={5000}
         className="w-full"
         role="list"
         aria-label="당신에게 추천하는 티"
      >
         {images.map((image, index) => (
            <SwiperSlide
               key={index}
               style={slideStyle}
               className={`${slideClassName} pointer-events-none`} // 슬라이드 상호작용 차단
               role="listitem"
               aria-label={`당신에게 추천하는 티 ${index + 1}`}
            >
               <img
                  src={image}
                  alt={`당신에게 추천하는 티 ${index + 1}`}
                  className="pointer-events-none h-full w-full object-cover" // 이미지 상호작용 차단
               />
            </SwiperSlide>
         ))}
      </Swiper>
   );
}
