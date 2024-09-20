import { useState, useEffect } from 'react';

import { Button } from '@/components/Buttons/Buttons';
import SplashSwiper from '@/components/TeaCard/SplashSwiper';
import { fetchTeasByUserSelection, fetchUserTaste } from '@/utils/fetchData'; // fetchUserTaste 함수 import

export function Component() {
   const [filteredTeas, setFilteredTeas] = useState([]);
   const [userTaste, setUserTaste] = useState<string | null>(null); // userTaste 상태 추가

   useEffect(() => {
      // 로컬 스토리지에서 사용자 정보 가져오기
      const storedUser = localStorage.getItem('@auth/user');
      if (storedUser) {
         const user = JSON.parse(storedUser);
         const userNickname = user.nickname;

         // 사용자 선택에 기반한 차 데이터 가져오기
         const getUserTeas = async () => {
            try {
               // user_taste 가져오기
               const taste = await fetchUserTaste(userNickname);
               setUserTaste(taste); // 가져온 taste를 상태에 저장
               console.log('User Taste:', taste);

               // 사용자 선택에 기반한 차 목록 가져오기
               const teas = await fetchTeasByUserSelection(userNickname);
               console.log('Fetched Teas:', teas);
               setFilteredTeas(teas as any);
            } catch (error) {
               console.error('Failed to fetch user teas:', error);
            }
         };

         getUserTeas();
      }
   }, []);

   // 배열을 지정된 크기의 청크로 나눔
   //   - array: 원본 배열
   //   - chunkSize: 각 청크(스와이퍼)에 포함될 아이템 수 (현재는 9)
   //   - numberOfChunks: 생성할 청크의 수 (현재는 3)
   const getRandomTeaData = (
      array: any[],
      chunkSize: number,
      numberOfChunks: number
   ) => {
      const result = [];
      const remainingItems = [...array]; // 원본 배열 복사

      for (let i = 0; i < numberOfChunks; i++) {
         const chunk = [];
         for (let j = 0; j < chunkSize && remainingItems.length > 0; j++) {
            // 남은 아이템 중 랜덤으로 하나 선택
            const randomIndex = Math.floor(
               Math.random() * remainingItems.length
            );
            const selectedItem = remainingItems[randomIndex];

            // 선택된 아이템을 chunk에 추가하고 remainingItems에서 제거
            chunk.push(selectedItem);
            remainingItems.splice(randomIndex, 1);
         }
         if (chunk.length > 0) {
            result.push(chunk);
         }
      }

      return result;
   };

   const teaChunks = getRandomTeaData(filteredTeas, 9, 3);

   return (
      <main className="center-layout gap-2 overflow-x-hidden">
         <h1 className="mt-36 text-center text-2xl font-extrabold">
            {userTaste ? `${userTaste} 당신에게` : '당신에게'}
            <br /> 추천하는 차
         </h1>
         <p className="text-center text-sm text-stone-400">
            취향 데이터를 기반으로 추천해드렸어요!
         </p>
         <Button
            className="my-7 w-[18rem]"
            content="홈으로 이동하기"
            size="large"
            isLink={true}
            href="/main"
            ariaLabel="홈페이지"
         />
         <div className="flex flex-col gap-3">
            {teaChunks.map((chunk, index) => (
               <SplashSwiper
                  key={index}
                  images={chunk.map((tea) => tea.tea_image)}
                  className=""
               />
            ))}
         </div>
      </main>
   );
}
