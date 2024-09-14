import { useState, useEffect } from 'react';
import { Button } from '@/components/Buttons/Buttons';
import { loadTasteNoteData } from '@/utils/fetchData';
import { StarRatingAverage } from '@/components/Review/StarRate';
import {
   TeaColorCard,
   TeaReviewDetailCard,
   TeaTasteCard,
} from '@/components/TeaCard/CardComponents';

export function Component() {
   const [tasteNoteData, setTasteNoteData] = useState<string[]>([]);
   const [selectedLabels, setSelectedLabels] = useState<boolean[]>([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            await loadTasteNoteData(setTasteNoteData, setSelectedLabels);
         } catch (error) {
            console.error('Failed to fetch tastenote data:', error);
         }
      };

      fetchData();
   }, []);

   const toggleLabelSelection = (index: number) => {
      setSelectedLabels((prevSelected) =>
         prevSelected.map((selected, i) => (i === index ? !selected : selected))
      );
   };

   return (
      <main className="flex flex-col items-center px-6">
         <h1 className="sr-only">리뷰 수정 페이지</h1>
         <div className="h-80 w-80 rounded-3xl bg-stone-300">
            <img className="object-cover" src="" alt="" />
         </div>
         <p className="my-4 text-stone-600">nickname</p>
         <StarRatingAverage score={3} />

         <TeaTasteCard
            labels={tasteNoteData}
            className="mb-2 mt-8"
            selectedLabels={selectedLabels}
            handleToggleLabel={toggleLabelSelection}
            types="button"
         />

         <TeaColorCard className="mb-2" />
         <TeaReviewDetailCard title="리뷰 제목" contents="리뷰 내용" />

         <Button content="리뷰 수정하기" size="fullWidth" className="mt-16" />

         <Button
            content="삭제"
            size="fullWidth"
            className="mt-2"
            isError={true}
         />
      </main>
   );
}
