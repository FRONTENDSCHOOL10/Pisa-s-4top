import { useState, useEffect } from 'react';
import { LabelGroup } from '@/components/Labels/Labels';
import { fetchTasteNoteData } from '@/utils/fetchData';
import { Button } from '@/components/Buttons/Buttons';

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
      <main className="flex h-screen w-full flex-col items-center justify-center">
         <h1 className="mt-7 text-2xl">
            <strong className="font-extrabold">선호하는 맛</strong>을<br />
            선택해주세요.
         </h1>
         <p className="mt-2">취향에 맞는 차를 추천해드려요!</p>
         <LabelGroup
            labels={tasteNoteData}
            types="button"
            className="mt-6 flex w-full justify-center"
         />
         <Button content="모두 선택했어요!" size="fullWidth" className="mt-6" />
      </main>
   );
}
