/* 아이디 & 비밀번호 & 닉네임 입력 input */

import postposition from 'cox-postposition';
import { useId } from 'react';

interface Props {
   title: string;
   type: string;
   [property: string]: any;
}

function Input({ title, type, ...restProps }: Props) {
   const inputId: string = useId();

   const inputTitle = (title: string): string => {
      return postposition.put(title, '을'); // 조사(을/를) 검사
   };

   const getInputTitle: string = `${inputTitle(title)} 입력하세요.`;

   return (
      <div className="input-group w-full">
         <label className="sr-only" htmlFor={inputId}>
            {`${title} 입력`}
         </label>
         <input
            className="h-9 w-full rounded border border-solid border-stone-950 px-[0.6875rem] py-2 text-xs font-normal placeholder-current"
            type={type}
            id={inputId}
            placeholder={getInputTitle}
            title={getInputTitle}
            required
            {...restProps}
         />
      </div>
   );
}

export default Input;
