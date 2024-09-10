import { ButtonFullWidth } from '@/components/Buttons/Buttons';
import { ButtonError } from '@/components/Buttons/Buttons';
import { StarRatingAverage } from '@/components/Review/StarRate';
import { LabelGroup } from '@/components/Labels/LabelGroup';

function ReviewsDetailPage() {
   const labels = [
      { label: 'Bitter' },
      { label: 'Peanuts' },
      { label: 'Peanuts' },
      { label: 'Peanuts' },
      { label: 'Peanuts' },
      { label: 'Peanuts' },
   ];

   return (
      <main className="flex flex-col items-center px-6">
         <div className="h-8 w-full rounded-full bg-stone-300">
            <img className="object-cover" src="" alt="" />
         </div>
         <p className="my-4">nickname</p>
         <StarRatingAverage score={3} />
         <article className="mt-4">
            <h3>맛</h3>
            <LabelGroup labels={labels} size="large" />
         </article>
         <article>
            <h3>수색</h3>
         </article>
         <div>
            <h1>reviewTitle</h1>
            <p>reviewContent</p>
         </div>
         <div className="mb-2 w-full">
            <ButtonFullWidth text="리뷰 수정하기" />
         </div>
         <div className="w-full">
            <ButtonError text="삭제" />
         </div>
      </main>
   );
}

export default ReviewsDetailPage;
