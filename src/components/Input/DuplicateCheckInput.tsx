/* 중복확인 input */

import { useEffect, useRef, useState } from 'react';

import { INPUT_TYPE, OUTLINE_COLORS } from '@/constants';
import { isValidEmail, isValidNickName } from '@/utils/isValidCheck';
import Input from './Input';

interface Props {
   title: string;
   type: string;
   focusOutlineColor?: string;
   [property: string]: any;
}

function DuplicateCheckInput({ title, type, ...restProps }: Props) {
   const [outlineColor, setOutlineColor] = useState<string>(
      OUTLINE_COLORS.DEFAULT
   );

   const [text, setText] = useState('');
   const textRef = useRef('');

   const TEST = '하하';
   const TEST2 = '12345@naver.com';

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      textRef.current = e.target.value;
      console.log(textRef.current);
   };

   const handleClick = () => {
      setText(textRef.current);
   };

   useEffect(() => {
      if (text === '') return;

      let isValid = false;
      let isDuplicate = false;

      switch (type) {
         case INPUT_TYPE.NICKNAME: {
            isDuplicate = text === TEST;
            isValid = isValidNickName(text);
            break;
         }
         case INPUT_TYPE.EMAIL: {
            isDuplicate = text === TEST2;
            isValid = isValidEmail(text);
            break;
         }
      }

      if (isDuplicate || !isValid) {
         setOutlineColor(OUTLINE_COLORS.ERROR);
      } else {
         setOutlineColor(OUTLINE_COLORS.SUCCESS);
      }
   }, [text, type]);

   return (
      <>
         <Input
            title={title}
            type={type}
            focusOutlineColor={outlineColor}
            defaultValue={text}
            onChange={handleChange}
            {...restProps}
         />
         {/* 버튼 컴포넌트로 변경 */}
         <button className="w-[200px]" type="button" onClick={handleClick}>
            중복확인
         </button>
      </>
   );
}

export default DuplicateCheckInput;
