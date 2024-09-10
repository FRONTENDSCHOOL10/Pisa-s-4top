import { Button, ButtonHeartwithCount } from '@/components/Buttons/Buttons';
import { LabelGroup } from '@/components/Labels/Labels';
import { StarRatingAverage } from '@/components/Review/StarRate';
import {
   TeaDescriptionCard,
   TeaRecipeCard,
   TeaReviewCard,
} from '@/components/TeaCard/CardComponents';
import { TeaBrewingGuide } from '@/components/TeaCard/TeaBrewingGuide';

interface Label {
   label: string;
}

const labels: Label[] = [
   { label: '🍋 레몬' },
   { label: '🍊 오렌지' },
   { label: '🍯 꿀' },
];

interface Review {
   profileImageUrl: string;
   nickName: string;
   title: string;
   content: string;
   score: 0 | 1 | 2 | 3 | 4 | 5;
}

const reviewData: Review[] = [
   {
      profileImageUrl: '',
      nickName: '김철수',
      title: '맛있어요!',
      content: '너무 맛있어요!!',
      score: 4,
   },
   {
      profileImageUrl: '',
      nickName: '김영희',
      title: '맛없어요ㅜㅜ',
      content: '너무 맛없어요ㅜㅜ',
      score: 0,
   },
];

export default function TeaDetailPage() {
   return (
      <div className="mx-5 mb-10 mt-5 flex flex-col gap-4">
         <h1 className="sr-only">티 상세 페이지</h1>
         <section className="flex flex-col items-center gap-4 px-5">
            <img
               className="h-[9.375rem] w-[9.375rem] rounded-full bg-stone-300"
               src=""
               alt="어떤 브랜드의 어떤 티" // DB 연결 후 수정 예정
            />
            <div className="-mb-2 flex flex-col items-center">
               <p className="text-xs font-light">티 종류</p>
               <h2 className="text-xl font-bold">티 이름</h2>
               <p className="text-xs font-light">티 브랜드</p>
            </div>
            <ButtonHeartwithCount
               totalLike={10}
               onToggle={() => console.log('찜 버튼 토글됨')}
            />
            <StarRatingAverage score={3.5} aria-label="리뷰 평균 별점 3.5점" />
            <LabelGroup labels={labels} size="small" />
            <TeaBrewingGuide
               teaAmount={3}
               waterAmount={200}
               temperature={92}
               brewingTime={6}
            />
            <Button
               isLink={true}
               href="/reviews/write"
               ariaLabel="리뷰 작성 페이지"
               content="리뷰 쓰기"
               size="fullWidth"
            />
         </section>
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
         <section className="flex flex-col gap-4">
            <h3 className="mt-3 pl-2 text-2xl font-black text-stone-950">
               0개의 리뷰
            </h3>
            {reviewData.map((review: Review, index: number) => (
               <div key={index} className="">
                  <TeaReviewCard
                     key={index}
                     profileImageUrl={review.profileImageUrl}
                     nickName={review.nickName}
                     reviewTitle={review.title}
                     reviewContent={review.content}
                     score={review.score}
                  />
               </div>
            ))}
         </section>
      </div>
   );
}
