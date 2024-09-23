import { FormEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Buttons/Buttons';
import CheckBox from '@/components/Input/CheckBox';
import DoublePasswordInput from '@/components/Input/DoublePasswordInput';
import DuplicateEmailInput from '@/components/Input/DuplicateEmailInput';
import DuplicateNicknameInput from '@/components/Input/DuplicateNicknameInput';
import Logo from '@/components/Main/Logo';
import { useJoinStore } from '@/stores';
import { userJoin } from '@/utils';
import AppHelmet from '@/components/Main/AppHelmet';

export default function JoinPage() {
   const {
      emailSuccess,
      nicknameSuccess,
      passwordSuccess,
      passwordConfirmSuccess,
      setEmailSuccess,
      setNicknameSuccess,
      setPasswordSuccess,
      setPasswordConfirmSuccess,
   } = useJoinStore();

   useEffect(() => {
      return () => {
         setEmailSuccess(false);
         setNicknameSuccess(false);
         setPasswordSuccess(false);
         setPasswordConfirmSuccess(false);
      };
   }, []);

   const navigate = useNavigate();

   // 회원가입 버튼 눌렀을때
   const handleJoin = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData: FormData = new FormData(e.currentTarget);
      const nickname: string = formData.get('nickname') as string;
      const email: string = formData.get('email') as string;
      const password: string = formData.get('password') as string;
      const checkbox: boolean = formData.get('checkbox') !== null;

      if (!emailSuccess) toast.error('이메일 중복확인을 실시해주세요');
      else if (!nicknameSuccess) toast.error('닉네임 중복확인을 실시해주세요');
      else if (!passwordSuccess || !passwordConfirmSuccess)
         toast.error('비밀번호를 다시 확인해주세요');
      else if (!checkbox) toast.error('개인정보 수집 및 이용에 동의해주세요');

      if (
         emailSuccess &&
         nicknameSuccess &&
         passwordSuccess &&
         passwordConfirmSuccess &&
         checkbox
      ) {
         try {
            await toast.promise(userJoin(email, password, nickname), {
               loading: '회원가입 진행 중...',
               success: '회원가입을 완료하였습니다',
               error: '회원가입에 실패하였습니다',
            });
            navigate('/login');
         } catch (error) {
            toast.error('모든 필드를 올바르게 입력해주세요');
         }
      }
   };

   return (
      <>
         <AppHelmet
            title="회원가입"
            description="Tea of the Day 회원가입 - 차의 세계로 여러분을 초대합니다. 가입하시고 개인 맞춤 차 추천 서비스를 경험해보세요."
         />
         <main className="center-appbar-content">
            <Logo small className="mx-auto" />

            <h1 className="mt-3 text-center font-bold">회원가입</h1>

            <form className="mt-14 flex w-full flex-col" onSubmit={handleJoin}>
               <DuplicateEmailInput title="이메일" type="email" name="email" />
               <DuplicateNicknameInput
                  title="닉네임"
                  type="text"
                  name="nickname"
               />

               <DoublePasswordInput name="password" />

               <CheckBox
                  label="[필수] 개인정보 수집 및 이용 동의"
                  className="mt-4"
                  name="checkbox"
               />

               <Button
                  className="mt-24"
                  content="회원가입"
                  type="submit"
                  size="fullWidth"
                  disabled={false}
               />
            </form>
         </main>
      </>
   );
}
