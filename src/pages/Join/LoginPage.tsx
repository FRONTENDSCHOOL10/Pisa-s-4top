import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import supabase from '@/api/supabase';
import { Button } from '@/components/Buttons/Buttons';
import Input from '@/components/Input/Input';
import Logo from '@/components/Main/Logo';
import { isValidEmail, isValidPassword } from '@/utils/isValidCheck';
import { INPUT_ERROR_MESSAGE } from '@/constants';
import { getSelectionData } from '@/utils/getSelectionData';
import AppHelmet from '@/components/Main/AppHelmet';

export default function LoginPage() {
   const navigate = useNavigate();

   const [emailError, setEmailError] = useState(false);
   const [passwordError, setPasswordError] = useState(false);

   // 유효성 검사
   const isValidCheck = (value: string, func: (value: string) => boolean) => {
      return value === '' || !func(value);
   };

   // 로그인 함수
   const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      const checkEmailError: boolean = isValidCheck(email, isValidEmail);
      const checkPasswordError: boolean = isValidCheck(
         password,
         isValidPassword
      );

      setEmailError(checkEmailError);
      setPasswordError(checkPasswordError);

      if (email === '' || password === '') {
         toast.error('이메일 또는 비밀번호를 입력하세요');
      }

      // 유효성 검사 통과됐다면 if문 실행
      if (!checkEmailError && !checkPasswordError) {
         const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
         });

         if (data.user) {
            // 사용자 정보 가져오기
            const { data: userData, error: userError } = await supabase
               .from('users')
               .select('nickname, profile_img')
               .eq('id', data.user.id)
               .single();

            if (userError) {
               toast.error('사용자 정보를 가져오는 데 실패하였습니다');
               return;
            }

            // tasteselection 테이블에서 user_nickname 확인
            // const { data: selectionData, error: selectionError } =
            //    await supabase
            //       .from('tasteselection')
            //       .select('user_nickname')
            //       .eq('user_nickname', userData.nickname)
            //       .single();

            // if (selectionError && selectionError.code !== 'PGRST116') {
            //    // 'PGRST116'은 No Rows Found 오류
            //    toast.error('사용자 선택 정보를 가져오는 데 실패하였습니다');
            //    return;
            // }

            const selectionData = await getSelectionData(userData.nickname);

            toast.success('로그인에 성공하였습니다');
            localStorage.setItem('@auth/login', 'true');
            localStorage.setItem(
               '@auth/user',
               JSON.stringify({
                  id: data.user.id,
                  email: data.user.email,
                  nickname: userData.nickname,
                  profile_img: userData.profile_img,
               })
            );

            // user_nickname이 있으면 '/', 없으면 '/my-selection'으로 리디렉션
            if (selectionData) {
               navigate('/');
            } else {
               navigate('/my-selection');
            }
         }

         if (error) {
            toast.error('이메일 또는 비밀번호가 일치하지 않습니다');
         }
      }
   };

   // 유효성 검사 error → outline-error
   const outlineColorStyle = (value: boolean): string => {
      return value ? 'outline-error' : 'outline-default';
   };

   return (
      <>
         <AppHelmet
            title="로그인"
            description="Tea of the Day 로그인 - 개인 맞춤 차 추천 서비스에 접속하세요. 다양한 차 추천과 정보를 만나보세요."
         />
         <main className="center-layout">
            <h1 className="sr-only">로그인</h1>
            <Logo large />
            <form className="mt-20 flex w-full flex-col" onSubmit={handleLogin}>
               <Input
                  title="이메일"
                  type="email"
                  name="email"
                  className={outlineColorStyle(emailError)}
                  error={emailError}
                  errorMessage={INPUT_ERROR_MESSAGE.EMAIL}
               />
               <Input
                  title="비밀번호"
                  type="password"
                  name="password"
                  className={outlineColorStyle(passwordError)}
                  error={passwordError}
                  errorMessage={INPUT_ERROR_MESSAGE.PASSWORD}
               />
               <Button
                  className="mt-6"
                  content="로그인"
                  type="submit"
                  size="fullWidth"
               />
            </form>
            <div className="mt-24 flex w-full items-center justify-between">
               <p>계정이 없으신가요?</p>
               <Button
                  content="회원가입"
                  size="small"
                  isLink={true}
                  href="/join"
                  ariaLabel="회원가입 페이지로 이동"
               />
            </div>
         </main>
      </>
   );
}
