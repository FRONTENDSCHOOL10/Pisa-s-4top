import { Button } from '@/components/Buttons/Buttons';
import AuthInput from '@/components/Input/AuthInput';
import Logo from '@/components/Main/Logo';

export default function LoginPage() {
   return (
      <main className="flex h-[100dvh] flex-col items-center justify-center">
         <h1 className="sr-only">로그인</h1>

         <Logo large />

         <form className="mt-[4.375rem] flex w-full flex-col gap-4">
            <AuthInput title="이메일" type="email" />
            <AuthInput title="비밀번호" type="password" />
            <Button
               content="로그인"
               type="button"
               size="fullWidth"
               handleClick={() => console.log('로그인 버튼 클릭')}
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
   );
}
