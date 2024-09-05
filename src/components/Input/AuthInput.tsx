/* 이메일 & 비밀번호 입력 input */

import { useState } from 'react';

import Input from './Input';
import { INPUT_TYPE, OUTLINE_COLORS } from '@/constants';
import { isValidEmail, isValidPassword } from '@/utils/isValidCheck';

interface Props {
   title: string;
   type: string;
}

function AuthInput({ title, type }: Props) {
   const [outlineColor, setOutlineColor] = useState<string>(
      OUTLINE_COLORS.DEFAULT
   );

   const handleChange = (e: any) => {
      const value: string = e.target.value.trim();

      const isValid: boolean =
         type === INPUT_TYPE.EMAIL
            ? isValidEmail(value)
            : isValidPassword(value);

      console.log('정규식 체크', type, isValid, value);

      setOutlineColor(isValid ? OUTLINE_COLORS.SUCCESS : OUTLINE_COLORS.ERROR);
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

export default AuthInput;
