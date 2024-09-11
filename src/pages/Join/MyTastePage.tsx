import { Button } from '@/components/Buttons/Buttons';
import SplashSwiper from '@/components/TeaCard/SplashSwiper';
import createUrl from '@/utils/createUrl';

function MyTastePage() {
   return (
      <>
         <main className="flex flex-col justify-center">
            <h1 className="mb-2 mt-20 text-center text-2xl font-extrabold">
               상큼한 당신에게, <br />
               추천하는 차
            </h1>
            <span className="text-center text-sm text-stone-400">
               취향 데이터를 기반으로 추천해드렸어요!
            </span>
            <Button
               content="홈으로 이동하기"
               size="small"
               isLink={true}
               style={{ margin: '2rem' }}
               href="/"
               ariaLabel="홈페이지"
            />
            <SplashSwiper
               images={[
                  createUrl('totd-logo'),
                  createUrl('typeLogo-sm'),
                  createUrl('typeLogo-lg'),
                  createUrl('totd-logo'),
                  createUrl('typeLogo-sm'),
                  createUrl('typeLogo-lg'),
                  createUrl('totd-logo'),
                  createUrl('typeLogo-sm'),
                  createUrl('typeLogo-lg'),
               ]}
            />
            <SplashSwiper
               reverse={true}
               images={[
                  createUrl('totd-logo'),
                  createUrl('typeLogo-sm'),
                  createUrl('typeLogo-lg'),
                  createUrl('totd-logo'),
                  createUrl('typeLogo-sm'),
                  createUrl('typeLogo-lg'),
                  createUrl('totd-logo'),
                  createUrl('typeLogo-sm'),
                  createUrl('typeLogo-lg'),
               ]}
            />
            <SplashSwiper
               images={[
                  createUrl('totd-logo'),
                  createUrl('typeLogo-sm'),
                  createUrl('typeLogo-lg'),
                  createUrl('totd-logo'),
                  createUrl('typeLogo-sm'),
                  createUrl('typeLogo-lg'),
                  createUrl('totd-logo'),
                  createUrl('typeLogo-sm'),
                  createUrl('typeLogo-lg'),
               ]}
            />
         </main>
      </>
   );
}

export default MyTastePage;
