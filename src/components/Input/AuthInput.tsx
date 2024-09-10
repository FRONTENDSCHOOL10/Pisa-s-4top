/* 이메일 & 비밀번호 입력 input */

/* 사용법

0. 사용 시 <form></form> 태그를 직접 넣어주어야 합니다.

<form onSubmit={(e: FormEvent<HTMLFormElement>) => { e.preventDefault(); }}>
   <AuthInput title="이메일" type="email" />
   <AuthInput title="비밀번호" type="password" />
</form>

*/

import { ChangeEvent, useState } from 'react';

import Input from './Input';
import { INPUT_TYPE } from '@/constants';
import { isValidEmail, isValidPassword } from '@/utils/isValidCheck';

export interface Props {
   title: string;
   type: string;
}

export default function AuthInput({ title, type }: Props) {
   const [outlineColor, setOutlineColor] = useState<string>('outline-default');

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value: string = e.target.value.trim();

      const isValid: boolean =
         type === INPUT_TYPE.EMAIL
            ? isValidEmail(value)
            : isValidPassword(value);

      // ! test용 코드, 추후 삭제
      console.log('정규식 체크', type, isValid, value);

      setOutlineColor(isValid ? 'outline-success' : 'outline-error');
   };

   return (
      <Input
         title={title}
         type={type}
         defaultValue=""
         onChange={handleChange}
         focusOutlineColor={outlineColor}
      />
   );
}
