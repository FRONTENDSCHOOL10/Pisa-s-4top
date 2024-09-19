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
               setFilteredTeas(teas);
            } catch (error) {
               console.error('Failed to fetch user teas:', error);
            }
         };

         getUserTeas();
      }
   }, []);

   return (
      <main className="center-layout gap-2">
         <h1 className="text-center text-2xl font-extrabold">
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
         <div>
            <SplashSwiper
               images={filteredTeas.map((tea) => tea.tea_image)}
               className="!absolute left-0"
            />
         </div>
      </main>
   );
}
