import { Button, ButtonHeartwithCount } from '@/components/Buttons/Buttons';
import { LabelGroup } from '@/components/Labels/LabelGroup';
// import { Label } from "@/components/Labels/Labels";
import { StarRatingAverage } from '@/components/Review/StarRate';
import {
   TeaDescriptionCard,
   TeaRecipeCard,
   TeaReviewCard,
} from '@/components/TeaCard/CardComponents';
import { Link } from 'react-router-dom';

const labels = [
   { label: '🍋 레몬' },
   { label: '🍊 오렌지' },
   { label: '🍯 꿀' },
];
const handleWriteReviewClick = () => {
   console.log('리뷰 쓰기 버튼 클릭됨');
};

export default function TeaDetailPage() {
   return (
      <div>
         <div className="flex flex-col items-center px-8">
            <img
               className="h-[9.375rem] w-[9.375rem] rounded-full bg-stone-300"
               src=""
               alt=""
            />
            <p>티 종류</p>
            <h1>티 이름</h1>
            <p>티 브랜드</p>
            <ButtonHeartwithCount totalLike={10} />
            <StarRatingAverage score={3.5} />
            <LabelGroup labels={labels} size="small" />
            <Button
               content='리뷰 쓰기'
               size='fullWidth'
               handleClick={handleWriteReviewClick} // 클릭 핸들러 함수 전달
            />
         </div>
         <div className="px-2">
            <TeaDescriptionCard description="이 티는 레몬과 오렌지, 꿀이 들어간 상쾌한 향이 특징입니다." />
            <TeaRecipeCard
               title="이렇게도 드실 수 있어요!"
               imageUrl="/images/tea-recipe.jpg"
               steps={[
                  "레몬을 얇게 썬다.",
                  "오렌지와 꿀을 섞는다.",
                  "뜨거운 물을 부어 잘 저어준다.",
               ]}
            />
         </div>
         <div>
            <p className='text-stone-950 text-2xl font-black'>0개의 리뷰</p>
            <TeaReviewCard
               reviewTitle="맛있는 티!"
               nickName="홍길동"
               reviewContent="이 티는 정말 상쾌하고 달콤한 맛이 나요. 자주 마시고 싶어요."
               profileImageUrl=""
            />
            <TeaReviewCard
               reviewTitle="맛있는 티!"
               nickName="홍길동"
               reviewContent="이 티는 정말 상쾌하고 달콤한 맛이 나요. 자주 마시고 싶어요."
               profileImageUrl=""
            />
         </div>
      </div>
   );
}
