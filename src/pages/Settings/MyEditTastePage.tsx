import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import supabase from '@/api/supabase';
import { Button } from '@/components/Buttons/Buttons';
import { useLocalStorageUserData } from '@/hooks/useLocalStorageUserData';
import { CardLayout, CardTitle } from '@/components/TeaCard/CardComponents';
import { LabelGroup } from '@/components/Labels/Labels';
import { loadTasteNoteData } from '@/utils/fetchData';
import { getValidEmoji } from '@/utils/emojiMap';

export function Component() {
   const userNickname = useLocalStorageUserData('nickname');

   const [tasteNoteData, setTasteNoteData] = useState<string[]>([]);
   const [selectedLabels, setSelectedLabels] = useState<boolean[]>([]);

   const navigate = useNavigate();

   useEffect(() => {
      const fetchUserSelection = async () => {
         try {
            const { data, error } = await supabase
               .from('tasteselection')
               .select('user_selection')
               .eq('user_nickname', userNickname)
               .single();

            if (error) throw error;

            return data?.user_selection || [];
         } catch (error) {
            console.error('Failed to fetch user selection:', error);
            return [];
         }
      };

      const fetchTasteNoteData = async () => {
         try {
            const data = await loadTasteNoteData();
            console.log('Loaded taste note data:', data);

            if (!data) {
               throw new Error('Taste note data is undefined or null');
            }

            let filteredData = data.map((note) => getValidEmoji(note));

            filteredData = filteredData.sort((a, b) =>
               a === '😋️ 가리는 거 없어요!'
                  ? 1
                  : b === '😋️ 가리는 거 없어요!'
                    ? -1
                    : 0
            );

            const userSelection = await fetchUserSelection();

            const updatedSelectedLabels = filteredData.map((note) =>
               userSelection.includes(note)
            );

            setTasteNoteData(filteredData);
            setSelectedLabels(updatedSelectedLabels);
         } catch (error) {
            console.error('Failed to load taste note data:', error);
         }
      };

      fetchTasteNoteData();
   }, [userNickname]);

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

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const selectedTastes = tasteNoteData.filter(
         (_, index) => selectedLabels[index]
      );

      const { error: updateError } = await supabase
         .from('tasteselection')
         .update({ user_selection: selectedTastes })
         .eq('user_nickname', userNickname);

      if (updateError) {
         console.error('오류가 발생하였습니다: ', updateError);
         toast.error('업데이트에 실패하였습니다.');
         return;
      }

      toast.success('내 취향 변경을 완료하였습니다');

      navigate('/my-page');
   };

   return (
      <main>
         <h1 className="sr-only">선호하는 테이스팅 노트 수정</h1>

         <form onSubmit={handleSubmit}>
            <CardLayout>
               <CardTitle className="mb-4">선호하는 맛</CardTitle>
               <LabelGroup
                  labels={tasteNoteData}
                  types="button"
                  selectedLabels={selectedLabels}
                  handleToggleLabel={toggleLabelSelection}
                  className="flex justify-center gap-3 px-28"
               />
            </CardLayout>
            <Button
               content="리셋할래요!"
               size="fullWidth"
               className="mt-6"
               isError={true}
               handleClick={resetSelection}
            />
            <Button
               className="mt-2"
               content="수정 완료하기"
               type="submit"
               size="fullWidth"
            />
         </form>
      </main>
   );
}
