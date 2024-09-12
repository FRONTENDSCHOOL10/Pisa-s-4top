import AuthInput from '@/components/Input/AuthInput';
import DuplicateCheckInput from '@/components/Input/DuplicateCheckInput';
import Logo from '@/components/Main/Logo';
import CheckBox from '@/components/Input/CheckBox';
import { Button } from '@/components/Buttons/Buttons';

export default function JoinPage() {
   return (
      <main className="flex h-[100dvh] flex-col items-center justify-center">
         <Logo small className="mx-auto" />

         <h1 className="mt-[0.6875rem] text-center font-bold">회원가입</h1>

         <form className="mt-[3.19rem] flex w-full flex-col gap-4">
            <DuplicateCheckInput title="닉네임" type="text" pattern=".{1,10}" />
            <DuplicateCheckInput title="이메일" type="email" />
            <AuthInput title="비밀번호" type="password" />
            <CheckBox label="약관에 동의합니다." />

            <div className="mt-[7.63rem]">
               <Button
                  content="회원가입"
                  type="button"
                  size="fullWidth"
                  handleClick={() => console.log('회원가입 버튼 클릭')}
               />
            </div>
         </form>
      </main>
   );
}
