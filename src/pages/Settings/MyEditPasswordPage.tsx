import { FormEvent, useEffect } from 'react';
import toast from 'react-hot-toast';

import supabase from '@/api/supabase';
import { useJoinStore } from '@/stores';
import { Button } from '@/components/Buttons/Buttons';
import DuplicateEmailInput from '@/components/Input/DuplicateEmailInput';
import { useLocalStorageUserData } from '@/hooks/useLocalStorageUserData';
import { updateLocalData } from '@/utils/updateLocalData';
import DoublePasswordInput from '@/components/Input/DoublePasswordInput';

export function Component() {
   // 로컬 스토리지 값 가져오기
   const userId = useLocalStorageUserData('id');

   // zustand로 상태 관리
   const {
      passwordSuccess,
      passwordConfirmSuccess,
      setPasswordSuccess,
      setPasswordConfirmSuccess,
   } = useJoinStore();

   useEffect(() => {
      return () => {
         setPasswordSuccess(false);
         setPasswordConfirmSuccess(false);
      };
   }, []);

   // 비밀번호 변경
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const formPassword = formData.get('password') as string;

      // users 테이블에서 비밀번호 가져오기
      const getPasswordData = async () => {
         const { data, error } = await supabase
            .from('users')
            .select('password')
            .eq('id', userId)
            .single();

         if (error) throw error;

         return data.password;
      };

      // 이미 사용 중인 비밀번호인지 체크
      const prevValue = await getPasswordData();
      const prevValueCheck = formPassword === prevValue ? true : false;

      if (prevValueCheck) {
         toast.error('이미 사용중인 비밀번호입니다');
      } else if (passwordSuccess && passwordConfirmSuccess) {
         // 업데이트 로직
         const { data, error } = await supabase.auth.admin.updateUserById(
            userId,
            { password: formPassword }
         );
         if (error) console.error('오류가 발생하였습니다: ', error);

         if (data && data.user) {
            // users 테이블 업데이트
            const { error: updateError } = await supabase
               .from('users')
               .update({ password: formPassword })
               .eq('id', data.user.id);

            if (updateError) {
               console.error('오류가 발생하였습니다: ', updateError);
            }

            toast.success('비밀번호 변경을 완료하였습니다');
         }
      }

      if (!passwordSuccess || !passwordConfirmSuccess) {
         toast.error('비밀번호를 다시 확인해주세요');
      }
   };

   return (
      <main>
         <h1 className="sr-only">비밀번호 수정</h1>

         <form onSubmit={handleSubmit}>
            <DoublePasswordInput name="password" />

            <Button
               className="mt-10"
               content="수정 완료하기"
               type="submit"
               size="fullWidth"
            />
         </form>
      </main>
   );
}
