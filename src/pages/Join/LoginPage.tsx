import supabase from '@/api/supabase';
import { Button } from '@/components/Buttons/Buttons';
import AuthInput from '@/components/Input/AuthInput';
import Logo from '@/components/Main/Logo';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function LoginPage() {
   const [state, setState] = useState(false);

   useEffect(() => {
      const isLogin = localStorage.getItem('@auth/login');
      console.log(isLogin);

      if (isLogin) {
         setState(!state);
      }
   }, []);

   const navigate = useNavigate();

   const handleLogin = async (e: any) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      try {
         const { data } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
         });

         if (data.user) {
            toast.success('로그인 성공');
            navigate('/');
            localStorage.setItem('@auth/login', 'true');
         } else {
            throw new Error('로그인 실패: 사용자 정보를 받지 못했습니다');
         }
      } catch (error) {
         console.error('콘솔창 확인', error);
         toast.error(
            '로그인 실패: ' + (error || '알 수 없는 오류가 발생했습니다')
         );
      }
   };

   return (
      <main className="flex h-[100dvh] flex-col items-center justify-center">
         <h1 className="sr-only">로그인</h1>

         <Logo large />

         <form
            className="mt-[4.375rem] flex w-full flex-col gap-4"
            onSubmit={handleLogin}
         >
            <AuthInput title="이메일" type="email" name="email" />
            <AuthInput title="비밀번호" type="password" name="password" />
            <Button content="로그인" type="submit" size="fullWidth" />
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
   );
}
