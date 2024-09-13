import { useState, useEffect } from 'react';
import { Button } from '@/components/Buttons/Buttons';
import { fetchTasteNoteData } from '@/utils/fetchData';
import { StarRatingAverage } from '@/components/Review/StarRate';
import {
   TeaColorCard,
   TeaReviewDetailCard,
   TeaTasteCard,
} from '@/components/TeaCard/CardComponents';

export function Component() {
   const [tasteNoteData, setTasteNoteData] = useState<string[]>([]);

   useEffect(() => {
      const loadTasteNoteData = async () => {
         try {
            const labelData = await fetchTasteNoteData();
            setTasteNoteData(labelData);
         } catch (error) {
            console.error('Failed to fetch tastenote data:', error);
         }
      };

      loadTasteNoteData();
   }, []);

   return (
      <main className="flex flex-col items-center px-6">
         <div className="h-80 w-80 rounded-2xl bg-stone-300">
            <img className="object-cover" src="" alt="" />
         </div>
         <p className="my-4">nickname</p>
         <StarRatingAverage score={3} />
         <TeaTasteCard labels={tasteNoteData} className="mb-2 mt-8" />
         <TeaColorCard className="mb-2" />
         <TeaReviewDetailCard title="리뷰 제목" contents="리뷰 내용" />

         <Button content="수정 끝났어요!" size="fullWidth" className="mt-16" />

         <Button
            content="삭제할래요!"
            size="fullWidth"
            className="mt-2"
            isError={true}
         />
      </main>
   );
}
