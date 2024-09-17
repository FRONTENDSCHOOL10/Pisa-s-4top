import { Button } from '@/components/Buttons/Buttons';
import DuplicateCheckInput from '@/components/Input/DuplicateCheckInput';
import Input from '@/components/Input/Input';

//! 추후 프로필 이미지는 컴포넌트로 빼기
export function Component() {
   return (
      <main className="flex flex-col items-center gap-6">
         <h1 className="sr-only">마이페이지 수정</h1>

         <div className="relative mb-10 inline-block">
            <img
               src=""
               alt="프로필"
               className="h-[9.375rem] w-[9.375rem] rounded-full bg-stone-300 object-cover"
            />
            <label
               htmlFor="profile-upload"
               className="absolute bottom-0 right-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-700 text-white hover:bg-gray-600"
            >
               <span className="fi-rr-mode-portrait"></span>
            </label>
            <input
               id="profile-upload"
               type="file"
               accept="image/*"
               className="hidden"
            />
         </div>

         <form className="w-full">
            <DuplicateCheckInput title="이메일" type="email" name="email" />
            <DuplicateCheckInput title="닉네임" type="text" name="nickname" />
            <Input
               title="비밀번호"
               type="password"
               className="outline-default"
            />
            <Input
               title="비밀번호"
               type="password"
               className="outline-default"
            />

            <Button
               className="mt-10"
               content="수정 완료하기"
               type="button"
               size="fullWidth"
               handleClick={() => console.log('fullWidth 버튼 클릭됨')}
            />
         </form>
      </main>
   );
}
