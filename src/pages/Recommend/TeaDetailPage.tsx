import { Button } from '@/components/Buttons/Buttons';
import {
   TeaDescriptionCard,
   TeaRecipeCard,
} from '@/components/TeaCard/CardComponents';
import TeaInfo from '@/components/TeaDetail/TeaInfo';
import TeaReviewList from '@/components/TeaDetail/TeaReviewList';

export function Component() {
   return (
      <main className="flex flex-col gap-4">
         <h1 className="sr-only">티 상세 페이지</h1>
         <div className="mx-8">
            <TeaInfo />
            <Button
               isLink={true}
               href="/reviews/write"
               ariaLabel="리뷰 작성 페이지"
               content="리뷰 쓰기"
               size="fullWidth"
               className="mb-2 mt-4"
            />
         </div>
         <TeaDescriptionCard description="이 티는 레몬과 오렌지, 꿀이 들어간 상쾌한 향이 특징입니다." />
         <TeaRecipeCard
            title="이렇게도 드실 수 있어요!"
            imageUrl=""
            steps={[
               '1. 레몬을 얇게 썬다.',
               '2. 오렌지와 꿀을 섞는다.',
               '3. 뜨거운 물을 부어 잘 저어준다.',
            ]}
         />
         <TeaReviewList />
      </main>
   );
}
