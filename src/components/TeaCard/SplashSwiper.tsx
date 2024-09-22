import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import { LoadingSpinner } from '../Main/LoadingSpinner';

interface SplashSwiperProps {
   images: string[];
   reverse?: boolean;
   className?: string;
   direction?: string;
}

export default function SplashSwiper({
   images,
   reverse = false,
   className = '',
   direction = 'ltr',
}: SplashSwiperProps) {
   const [allImagesLoaded, setAllImagesLoaded] = useState(false);
   const swiperRef = useRef<any>(null);
   const slideStyle = { width: '144px', height: '144px' };
   const slideClassName =
      'rounded-2xl bg-white pointer-events-none overflow-hidden';

   // 이미지 미리 로드
   useEffect(() => {
      const loadImagePromises = images.map((src) => {
         return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => resolve(); // 이미지 로드 실패 시에도 resolve
         });
      });

      Promise.all(loadImagePromises).then(() => {
         setAllImagesLoaded(true);
      });
   }, [images]);

   // 이미지 로드 후 Swiper 업데이트 및 autoplay 재시작
   useEffect(() => {
      if (allImagesLoaded && swiperRef.current) {
         swiperRef.current.update(); // Swiper 인스턴스 업데이트
         swiperRef.current.slideToLoop(0); // 슬라이드를 첫 번째로 이동
         if (swiperRef.current.autoplay) {
            swiperRef.current.autoplay.start(); // autoplay 재시작
         }
      }
   }, [allImagesLoaded]);

   return (
      <>
         {!allImagesLoaded ? (
            <LoadingSpinner />
         ) : (
            <Swiper
               key={images.length} // Swiper를 강제로 재렌더링
               onSwiper={(swiper) => (swiperRef.current = swiper)}
               spaceBetween={16}
               slidesPerView="auto"
               loop={images.length > 1}
               autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  reverseDirection: reverse,
               }}
               modules={[Autoplay]}
               centeredSlides={true}
               speed={5000}
               className={`w-full ${className}`}
               role="list"
               aria-label="당신에게 추천하는 티"
               dir={direction} // 방향 설정
            >
               {images.map((image, index) => (
                  <SwiperSlide
                     key={index}
                     style={slideStyle}
                     className={slideClassName}
                     role="listitem"
                     aria-label={`당신에게 추천하는 티 ${index + 1}`}
                  >
                     <img
                        src={image}
                        alt={`당신에게 추천하는 티 ${index + 1}`}
                        className="pointer-events-none h-full w-full object-contain"
                        loading="eager"
                     />
                  </SwiperSlide>
               ))}
            </Swiper>
         )}
      </>
   );
}
