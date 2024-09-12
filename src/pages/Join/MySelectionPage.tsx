import React, { useState, useEffect } from 'react';
import { LabelGroup } from '@/components/Labels/Labels';
import { fetchTasteNoteData } from '@/utils/fetchData';

export function Component() {
   const [tasteNoteData, setTasteNoteData] = useState<string[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const loadTasteNoteData = async () => {
         setLoading(true);
         setError(null);
         try {
            const labelData = await fetchTasteNoteData();
            setTasteNoteData(labelData);
         } catch (error) {
            console.error('Failed to fetch tastenote data:', error);
            setError('데이터를 불러오는데 실패했습니다.');
         } finally {
            setLoading(false);
         }
      };

      loadTasteNoteData();
   }, []);

   if (loading) {
      return <p>로딩 중...</p>;
   }

   if (error) {
      return <p>{error}</p>;
   }

   return (
      <main>
         <h1>
            <strong>선호하는 맛</strong>을<br />
            선택해주세요.
         </h1>
         <p>취향에 맞는 차를 추천해드려요!</p>
         <LabelGroup
            labels={tasteNoteData}
            className="flex w-full justify-center"
         />
      </main>
   );
}
