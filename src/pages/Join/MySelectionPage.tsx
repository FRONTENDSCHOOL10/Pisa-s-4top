import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { LabelGroup } from '@/components/Labels/Labels';
import { loadTasteNoteData } from '@/utils/fetchData';
import { postTasteSelection } from '@/utils/postData'; // postTasteSelection 함수 import
import { Button } from '@/components/Buttons/Buttons';

export function Component() {
   const [tasteNoteData, setTasteNoteData] = useState<string[]>([]);
   const [selectedLabels, setSelectedLabels] = useState<boolean[]>([]);
   const [user, setUser] = useState<any>(null); // 사용자 정보 상태 추가
   const navigate = useNavigate();

   useEffect(() => {
      // 1. 로컬 스토리지에서 사용자 정보 가져오기
      const storedUser = localStorage.getItem('@auth/user');
      if (storedUser) {
         setUser(JSON.parse(storedUser));
      } else {
         toast.error('로그인이 필요합니다.');
         navigate('/login');
      }

      // 2. 테이스팅 노트 데이터 로드
      const fetchData = async () => {
         try {
            await loadTasteNoteData(setTasteNoteData, setSelectedLabels);
         } catch (error) {
            console.error('Failed to fetch taste note data:', error);
         }
      };

      fetchData();
   }, [navigate]);

   const toggleLabelSelection = (index: number) => {
      setSelectedLabels((prevSelected) =>
         prevSelected.map((selected, i) => (i === index ? !selected : selected))
      );
   };

   const resetSelection = () => {
      setSelectedLabels(new Array(tasteNoteData.length).fill(false));
   };

   // 모두 선택했어요! 버튼 클릭 핸들러
   const handleSelectionComplete = async () => {
      // 선택된 맛을 수집
      const selectedTastes = tasteNoteData.filter(
         (_, index) => selectedLabels[index]
      );

      if (!user) {
         toast.error('로그인이 필요합니다.');
         navigate('/login');
         return;
      }

      try {
         // 데이터를 서버로 전송
         await postTasteSelection(user.nickname, selectedTastes);

         // 데이터 전송이 완료되면 다음 페이지로 이동
         // navigate('/my-taste');
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
            handleClick={handleSelectionComplete} // 클릭 시 postData 호출 및 페이지 이동
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
