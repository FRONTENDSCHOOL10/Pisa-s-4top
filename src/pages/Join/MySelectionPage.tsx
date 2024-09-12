import { useState, useEffect } from 'react';
import { LabelGroup } from '@/components/Labels/Labels';
import { fetchTasteNoteData } from '@/utils/fetchData';
import { Button } from '@/components/Buttons/Buttons';

export function Component() {
   const [tasteNoteData, setTasteNoteData] = useState<string[]>([]);
   const [selectedLabels, setSelectedLabels] = useState<boolean[]>([]);

   useEffect(() => {
      const loadTasteNoteData = async () => {
         try {
            const labelData = await fetchTasteNoteData();
            setTasteNoteData(labelData);
            setSelectedLabels(new Array(labelData.length).fill(false));
         } catch (error) {
            console.error('Failed to fetch tastenote data:', error);
         }
      };

      loadTasteNoteData();
   }, []);

   const toggleLabelSelection = (index: number) => {
      setSelectedLabels((prevSelected) =>
         prevSelected.map((selected, i) => (i === index ? !selected : selected))
      );
   };

   const resetSelection = () => {
      setSelectedLabels(new Array(tasteNoteData.length).fill(false));
   };

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
            selectedLabels={selectedLabels}
            onToggleLabel={toggleLabelSelection}
         />

         <Button
            content="모두 선택했어요!"
            size="fullWidth"
            className="mt-16"
         />

         <Button
            content="리셋할래요!"
            size="fullWidth"
            className="mt-2"
            isError={true}
            onClick={resetSelection}
         />
      </main>
   );
}
