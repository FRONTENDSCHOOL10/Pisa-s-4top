import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import supabase from '@/api/supabase';
import { Button } from '@/components/Buttons/Buttons';
import { CardLayout, CardTitle } from '@/components/TeaCard/CardComponents';
import AppHelmet from '@/components/Main/AppHelmet';
import { LabelGroup } from '@/components/Labels/Labels';
import { useLocalStorageUserData } from '@/hooks/useLocalStorageUserData';
import { loadTasteNoteData } from '@/utils/fetchData';
import { getValidEmoji } from '@/utils/emojiMap';
import { calculateCategory } from '@/utils/postData';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';
import NoData from '@/components/Data/NoData';

export function Component() {
   const userNickname = useLocalStorageUserData('nickname');

   const [tasteNoteData, setTasteNoteData] = useState<string[]>([]);
   const [selectedLabels, setSelectedLabels] = useState<boolean[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   const navigate = useNavigate();

   useEffect(() => {
      const fetchUserSelection = async () => {
         if (!userNickname) {
            console.error('사용자 닉네임이 비어 있습니다');
            return [];
         }
         try {
            const { data, error } = await supabase
               .from('tasteselection')
               .select('user_selection')
               .eq('user_nickname', userNickname)
               .maybeSingle();

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
         } finally {
            setIsLoading(false);
         }
      };

      if (userNickname) {
         fetchTasteNoteData();
      } else {
         setIsLoading(false);
      }
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

      const userTaste = await calculateCategory(selectedTastes);

      const { error: updateError } = await supabase
         .from('tasteselection')
         .update({ user_selection: selectedTastes, user_taste: userTaste })
         .eq('user_nickname', userNickname);

      if (updateError) {
         console.error('오류가 발생하였습니다: ', updateError);
         toast.error('업데이트에 실패하였습니다.');
         return;
      }

      toast.success('내 취향 변경을 완료하였습니다');

      navigate('/my-page');
   };

   if (isLoading) {
      return <LoadingSpinner />;
   }

   if (!userNickname) {
      console.error('사용자 정보를 찾을 수 없습니다.');
      return (
         <NoData text="취향 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요." />
      );
   }

   return (
      <>
         <AppHelmet
            title="취향 태그 변경"
            description="Tea of the Day 취향 태그 변경 - Tea of the Day에서 당신의 취향을 더욱 정확하게 표현해보세요. 선호하는 맛과 향을 선택하여 개인화된 티 추천을 받아보세요. 취향 태그를 통해 더 나은 티 경험을 만들어갑니다."
         />
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
                     className="flex justify-center gap-3"
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
      </>
   );
}
