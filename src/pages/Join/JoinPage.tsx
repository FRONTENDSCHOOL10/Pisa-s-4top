import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { Button } from '@/components/Buttons/Buttons';
import CheckBox from '@/components/Input/CheckBox';
import DuplicateEmailInput from '@/components/Input/DuplicateEmailInput';
import DuplicateNicknameInput from '@/components/Input/DuplicateNicknameInput';
import Input from '@/components/Input/Input';
import Logo from '@/components/Main/Logo';
import { INPUT_ERROR_MESSAGE, INPUT_SUCCESS_MESSAGE } from '@/constants';
import { useJoinStore } from '@/stores';
import { isValidPassword, userJoin } from '@/utils';

interface passwordValue {
   password: string;
   passwordConfirm: string;
}

interface successState {
   password: boolean;
   password_confirm: boolean;
}

interface OutlineColorState {
   password: string;
   password_confirm: string;
}

export default function JoinPage() {
   const {
      emailSuccess,
      nicknameSuccess,
      setEmailSuccess,
      setNicknameSuccess,
   } = useJoinStore();

   useEffect(() => {
      return () => {
         setEmailSuccess(false);
         setNicknameSuccess(false);
      };
   }, []);

   const navigate = useNavigate();

   const [passwordValue, setPasswordValue] = useState<passwordValue>({
      password: '',
      passwordConfirm: '',
   });

   const [passwordSuccess, setPasswordSuccess] = useState<successState>({
      password: false,
      password_confirm: false,
   });

   const [outlineColor, setOutlineColor] = useState<OutlineColorState>({
      password: 'outline-default',
      password_confirm: 'outline-default',
   });

   // 비밀번호 유효성 검사
   const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();

      setPasswordValue((prev) => ({ ...prev, password: value }));

      const isValidCheck = isValidPassword(value);

      setOutlineColor((prev) => ({
         ...prev,
         password: isValidCheck ? 'outline-success' : 'outline-error',
      }));

      setPasswordSuccess((prev) => ({
         ...prev,
         password: isValidCheck ? true : false,
      }));
   };

   // 비밀번호 확인 유효성 검사
   const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();

      setPasswordValue((prev) => ({
         ...prev,
         passwordConfirm: value,
      }));

      const isValidCheck = passwordValue.password === value;

      setOutlineColor((prev) => ({
         ...prev,
         password_confirm: isValidCheck ? 'outline-success' : 'outline-error',
      }));

      setPasswordSuccess((prev) => ({
         ...prev,
         password_confirm: isValidCheck ? true : false,
      }));
   };

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
      else if (!passwordSuccess.password || !passwordSuccess.password_confirm)
         toast.error('비밀번호를 다시 확인해주세요');
      else if (!checkbox) toast.error('개인정보 수집 및 이용에 동의해주세요');

      if (
         emailSuccess &&
         nicknameSuccess &&
         passwordSuccess.password &&
         passwordSuccess.password_confirm &&
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
      <main className="center-layout">
         <Logo small className="mx-auto" />

         <h1 className="mt-3 text-center font-bold">회원가입</h1>

         <form className="mt-14 flex w-full flex-col" onSubmit={handleJoin}>
            <DuplicateEmailInput title="이메일" type="email" name="email" />
            <DuplicateNicknameInput
               title="닉네임"
               type="text"
               name="nickname"
            />
            <Input
               title="비밀번호"
               type="password"
               className={outlineColor.password}
               onChange={handlePasswordChange}
               error={!passwordSuccess.password}
               errorMessage={INPUT_ERROR_MESSAGE.PASSWORD}
               showMessage={passwordValue.password !== ''}
               successMessage={INPUT_SUCCESS_MESSAGE.PASSWORD}
            />
            <Input
               title="비밀번호"
               type="password"
               name="password"
               className={outlineColor.password_confirm}
               onChange={handlePasswordConfirmChange}
               error={!passwordSuccess.password_confirm}
               errorMessage={INPUT_ERROR_MESSAGE.PASSWORD_CONFIRM}
               showMessage={passwordValue.passwordConfirm !== ''}
               successMessage={INPUT_SUCCESS_MESSAGE.PASSWORD_CONFIRM}
            />

            <CheckBox
               label="[필수] 개인정보 수집 및 이용 동의"
               className="mt-4"
               name="checkbox"
            />

            <Button
               className="mt-32"
               content="회원가입"
               type="submit"
               size="fullWidth"
               disabled={false}
            />
         </form>
      </main>
   );
}
