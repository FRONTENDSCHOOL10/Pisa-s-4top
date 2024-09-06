import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';

// 프롭 추가
export default function SplashSwiper() {
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
         <SwiperSlide
            style={{ width: '144px', height: '144px' }}
            className="rounded-2xl bg-stone-200"
         >
            <img src="{}" alt="" />
            {/* 리팩토링 시 프롭 추가 */}
         </SwiperSlide>
         <SwiperSlide
            style={{ width: '144px', height: '144px' }}
            className="rounded-2xl bg-stone-200"
         >
            2
         </SwiperSlide>
         <SwiperSlide
            style={{ width: '144px', height: '144px' }}
            className="rounded-2xl bg-stone-200"
         >
            3
         </SwiperSlide>
         <SwiperSlide
            style={{ width: '144px', height: '144px' }}
            className="rounded-2xl bg-stone-200"
         >
            4
         </SwiperSlide>
         <SwiperSlide
            style={{ width: '144px', height: '144px' }}
            className="rounded-2xl bg-stone-200"
         >
            5
         </SwiperSlide>
         <SwiperSlide
            style={{ width: '144px', height: '144px' }}
            className="rounded-2xl bg-stone-200"
         >
            6
         </SwiperSlide>
      </Swiper>
   );
}
