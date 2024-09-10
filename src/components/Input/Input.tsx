/* (공통) 사용자 입력 input */

import postposition from 'cox-postposition';
import { useId } from 'react';

import { INPUT_TYPE } from '@/constants';

interface Props {
   title: string;
   type: string;
   focusOutlineColor?: string;
   [property: string]: any;
}

export default function Input({
   title,
   type,
   focusOutlineColor,
   ...restProps
}: Props) {
   const inputId: string = useId();

   const inputTitle = (title: string): string => {
      return postposition.put(title, '을'); // 조사(을/를) 검사
   };

   // 공통 스타일링
   const inputStyle: string =
      `w-full rounded bg-stone-100 p-3 text-base font-normal placeholder-current outline-none border-none focus:ring-2 ${focusOutlineColor ?? ''}`.trim();

   let getInputTitle: string = '';

   switch (type) {
      case INPUT_TYPE.EMAIL:
         getInputTitle = `${inputTitle(title)} 입력하세요.`;
         break;

      case INPUT_TYPE.NICKNAME:
         getInputTitle = `${inputTitle(title)} 입력하세요. (최소 1글자, 최대 10글자)`;
         break;

      case INPUT_TYPE.PASSWORD:
         getInputTitle = `${inputTitle(title)} 입력하세요. (최소 8글자, 최대 16글자, 영문·숫자·특수문자를 각각 한 글자 이상 입력하세요.)`;
         break;
   }

   return (
      <div className="input-group w-full">
         <label className="sr-only" htmlFor={inputId}>
            {`${title} 입력`}
         </label>
         <input
            className={inputStyle}
            type={type}
            id={inputId}
            placeholder={`${inputTitle(title)} 입력하세요.`}
            title={getInputTitle}
            required
            {...restProps}
         />
      </div>
   );
}
