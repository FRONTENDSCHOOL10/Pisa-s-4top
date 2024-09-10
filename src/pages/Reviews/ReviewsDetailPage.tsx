import { Button } from '@/components/Buttons/Buttons';
import { StarRatingAverage } from '@/components/Review/StarRate';
import { LabelGroup } from '@/components/Labels/Labels';

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
            <h2>맛</h2>
            <LabelGroup labels={labels} size="large" />
         </article>
         <article>
            <h2>수색</h2>
         </article>
         <div>
            <h1>reviewTitle</h1>
            <p>reviewContent</p>
         </div>
         <div className="mb-2 w-full">
            <Button
               size="fullWidth"
               content="리뷰 수정하기"
               handleClick={() => console.log('리뷰 수정하기 버튼 클릭됨')}
            />
         </div>
         <div className="w-full">
            <Button
               size="fullWidth"
               isError={true}
               content="삭제"
               handleClick={() => console.log('리뷰 삭제 버튼 클릭됨')}
            />
         </div>
      </main>
   );
}

export default ReviewsDetailPage;
