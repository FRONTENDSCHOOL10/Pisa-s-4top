import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import supabase from '@/api/supabase';
import AuthInput from '@/components/Input/AuthInput';
import DuplicateCheckInput from '@/components/Input/DuplicateCheckInput';
import Logo from '@/components/Main/Logo';
import CheckBox from '@/components/Input/CheckBox';
import { Button } from '@/components/Buttons/Buttons';

export default function JoinPage() {
   const navigate = useNavigate();

   const handleJoin = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData: FormData = new FormData(e.currentTarget);

      const nickname = formData.get('nickname') as string;
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      console.log(nickname, email, password); // ! test용 코드 추후 삭제

      try {
         const { data } = await supabase.auth.signUp({
            email: email,
            password: password,
         });

         await supabase.from('users').insert({
            id: data.user?.id,
            email: data.user?.email,
            nickname: nickname,
            profile_img: '/assets/profileDefault.webp',
            created_at: data.user?.created_at,
         });

         toast.success('회원가입을 완료하였습니다');
         navigate('/login');
      } catch (error) {
         toast.error('회원가입에 실패하였습니다');
         console.error(error);
      }
   };

   return (
      <main className="center-layout">
         <Logo small className="mx-auto" />

         <h1 className="mt-[0.6875rem] text-center font-bold">회원가입</h1>

         <form
            className="mt-[3.19rem] flex w-full flex-col gap-4"
            onSubmit={handleJoin}
         >
            <DuplicateCheckInput
               title="닉네임"
               type="text"
               pattern=".{1,10}"
               name="nickname"
            />
            <DuplicateCheckInput title="이메일" type="email" name="email" />
            <AuthInput title="비밀번호" type="password" name="password" />
            <CheckBox label="약관에 동의합니다." />

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
