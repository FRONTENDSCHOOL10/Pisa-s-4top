import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { LabelGroup } from '@/components/Labels/Labels';
import { loadTasteNoteData } from '@/utils/fetchData';
import { postTasteSelection } from '@/utils/postData';
import { Button } from '@/components/Buttons/Buttons';

export function Component() {
   const [tasteNoteData, setTasteNoteData] = useState<string[]>([]);
   const [selectedLabels, setSelectedLabels] = useState<boolean[]>([]);
   const [user, setUser] = useState<any>(null);
   const navigate = useNavigate();

   useEffect(() => {
      const storedUser = localStorage.getItem('@auth/user');
      if (storedUser) {
         setUser(JSON.parse(storedUser));
      } else {
         toast.error('로그인이 필요합니다.');
         navigate('/login');
      }

      const fetchData = async () => {
         try {
            await loadTasteNoteData(setTasteNoteData, setSelectedLabels);
            setTasteNoteData((prevData) => {
               const withoutPreferredTag = prevData.filter(
                  (item) => item !== '😋️ 가리는 거 없어요!'
               );
               return [...withoutPreferredTag, '😋️ 가리는 거 없어요!'];
            });
         } catch (error) {
            console.error('Failed to fetch taste note data:', error);
         }
      };

      fetchData();
   }, [navigate]);

   const toggleLabelSelection = (index: number) => {
      if (tasteNoteData[index] === '😋️ 가리는 거 없어요!') {
         setSelectedLabels(new Array(tasteNoteData.length).fill(false));
         setSelectedLabels((prevSelected) =>
            prevSelected.map((_, i) => i === index)
         );
      } else {
         setSelectedLabels((prevSelected) =>
            prevSelected.map((selected, i) => {
               if (i === index) {
                  return !selected;
               }
               if (tasteNoteData[i] === '😋️ 가리는 거 없어요!') {
                  return false;
               }
               return selected;
            })
         );
      }
   };

   const resetSelection = () => {
      setSelectedLabels(new Array(tasteNoteData.length).fill(false));
   };

   const handleSelectionComplete = async () => {
      const selectedTastes = tasteNoteData.filter(
         (_, index) => selectedLabels[index]
      );

      if (!user) {
         toast.error('로그인이 필요합니다.');
         navigate('/login');
         return;
      }

      try {
         await postTasteSelection(user.nickname, selectedTastes);
         navigate('/my-taste');
      } catch (error) {
         console.error('Error posting taste selection:', error);
         toast.error('선호도를 저장하는데 실패했습니다.');
      }
   };

   return (
      <main className="flex h-screen w-full flex-col items-center justify-center">
         <h1 className="mt-7 text-2xl">
            <strong className="font-extrabold">선호하는 맛</strong>을<br />
            선택해주세요.
         </h1>
         <p className="mt-2 text-stone-500">취향에 맞는 차를 추천해드려요!</p>

         <LabelGroup
            labels={tasteNoteData}
            types="button"
            className="mt-6 flex w-full justify-center"
            selectedLabels={selectedLabels}
            handleToggleLabel={toggleLabelSelection}
         />

         <Button
            content="모두 선택했어요!"
            size="fullWidth"
            className="mt-16"
            handleClick={handleSelectionComplete}
         />

         <Button
            content="리셋할래요!"
            size="fullWidth"
            className="mt-2"
            isError={true}
            handleClick={resetSelection}
         />
      </main>
   );
}
