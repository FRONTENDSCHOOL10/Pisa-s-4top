import { Button } from '@/components/Buttons/Buttons';
import { StarRatingAverage } from '@/components/Review/StarRate';
import {
   TeaColorCard,
   TeaReviewDetailCard,
   TeaTasteCard,
} from '@/components/TeaCard/CardComponents';

export function Component() {
   const labels = ['Bitter', 'Nutty', 'Fruity'];

   return (
      <main className="flex flex-col items-center px-6">
         <div className="h-80 w-80 rounded-2xl bg-stone-300">
            <img className="object-cover" src="" alt="" />
         </div>
         <p className="my-4">nickname</p>
         <StarRatingAverage score={3} />
         <TeaTasteCard labels={labels} className="mb-2 mt-8" />
         <TeaColorCard className="mb-2" />
         <TeaReviewDetailCard title="리뷰 제목" contents="리뷰 내용" />
         <div className="mb-2 mt-6 w-full">
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
