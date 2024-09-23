import { FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import supabase from '@/api/supabase';
import { useJoinStore } from '@/stores';
import { Button } from '@/components/Buttons/Buttons';
import { useLocalStorageUserData } from '@/hooks/useLocalStorageUserData';
import { updateLocalData } from '@/utils/updateLocalData';
import DuplicateNicknameInput from '@/components/Input/DuplicateNicknameInput';
import AppHelmet from '@/components/Main/AppHelmet';

export function Component() {
   const navigate = useNavigate();

   // 로컬 스토리지 값 가져오기
   const userId = useLocalStorageUserData('id');
   const userNickname = useLocalStorageUserData('nickname');

   // zustand로 상태 관리
   const { nicknameSuccess, setNicknameSuccess } = useJoinStore();

   useEffect(() => {
      return () => {
         setNicknameSuccess(false);
      };
   }, []);

   // 닉네임 변경
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const formNickname = formData.get('nickname') as string;

      if (nicknameSuccess) {
         // 업데이트 로직
         const { error: updateError } = await supabase
            .from('users')
            .update({ nickname: formNickname })
            .eq('id', userId);

         if (updateError) console.error('오류가 발생하였습니다: ', updateError);

         updateLocalData('nickname', formNickname); // 로컬스토리지 업데이트

         toast.success('닉네임 변경을 완료하였습니다');
         navigate('/my-page');

         setNicknameSuccess(false); // 닉네임 변경 후 상태를 다시 false
      } else {
         toast.error('닉네임 중복확인을 실시해주세요');
      }
   };

   return (
      <>
         <AppHelmet
            title="닉네임 변경"
            description="Tea of the Day 닉네임 변경 - 닉네임을 변경하세요. 더 나은 개인화 서비스를 위해 프로필을 최신 상태로 유지하세요."
         />
         <main className="center-content">
            <h1 className="sr-only">닉네임 변경</h1>

            <form onSubmit={handleSubmit}>
               <DuplicateNicknameInput
                  title="닉네임"
                  type="text"
                  name="nickname"
                  defaultValue={userNickname}
               />

               <Button
                  className="mt-10"
                  content="변경 완료하기"
                  type="submit"
                  size="fullWidth"
               />
            </form>
         </main>
      </>
   );
}
