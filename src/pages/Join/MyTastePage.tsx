import { Button } from '@/components/Buttons/Buttons';
import SplashSwiper from '@/components/TeaCard/SplashSwiper';
import createUrl from '@/utils/createUrl';

export function Component() {
   // ! 추후 '상큼한' 당신에게 → 수정하기
   return (
      <main className="center-layout gap-2">
         <h1 className="text-center text-2xl font-extrabold">
            상큼한 당신에게,
            <br />
            추천하는 차
         </h1>
         <p className="text-center text-sm text-stone-400">
            취향 데이터를 기반으로 추천해드렸어요!
         </p>
         <Button
            className="my-7 w-[18rem]"
            content="홈으로 이동하기"
            size="large"
            isLink={true}
            href="/main"
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
   );
}
