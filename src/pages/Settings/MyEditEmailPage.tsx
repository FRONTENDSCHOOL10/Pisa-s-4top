import { FormEvent, useEffect } from 'react';
import toast from 'react-hot-toast';

import supabase from '@/api/supabase';
import { useJoinStore } from '@/stores';
import { Button } from '@/components/Buttons/Buttons';
import DuplicateEmailInput from '@/components/Input/DuplicateEmailInput';
import { useLocalStorageUserData } from '@/hooks/useLocalStorageUserData';
import { updateLocalData } from '@/utils/updateLocalData';

export function Component() {
   // 로컬 스토리지 값 가져오기
   const userId = useLocalStorageUserData('id');
   const userEmail = useLocalStorageUserData('email');

   // zustand로 상태 관리
   const { emailSuccess, setEmailSuccess } = useJoinStore();

   useEffect(() => {
      return () => {
         setEmailSuccess(false);
      };
   }, []);

   // 이메일 변경
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const formEmail = formData.get('email') as string;

      if (emailSuccess) {
         // 업데이트 로직
         const { data, error } = await supabase.auth.admin.updateUserById(
            userId,
            { email: formEmail }
         );
         if (error) console.error('오류가 발생하였습니다: ', error);

         if (data && data.user) {
            // users 테이블 업데이트
            const { error: updateError } = await supabase
               .from('users')
               .update({ email: formEmail })
               .eq('id', data.user.id);

            if (updateError) {
               console.error('오류가 발생하였습니다: ', updateError);
            }

            updateLocalData('email', formEmail); // 로컬스토리지 업데이트

            toast.success('이메일 변경을 완료하였습니다');

            setEmailSuccess(false); // 이메일 변경 후 상태를 다시 false
         }
      } else {
         toast.error('이메일 중복확인을 실시해주세요');
      }
   };

   return (
      <main>
         <h1 className="sr-only">이메일 수정</h1>

         <form onSubmit={handleSubmit}>
            <DuplicateEmailInput
               title="이메일"
               type="email"
               name="email"
               defaultValue={userEmail}
            />

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
