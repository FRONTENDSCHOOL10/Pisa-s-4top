/* (공통) 사용자 입력 input */

import { useId } from 'react';
import postposition from 'cox-postposition';

interface Props {
   title: string;
   type: string;
   focusOutlineColor?: string;
   [property: string]: any;
}

function Input({ title, type, focusOutlineColor, ...restProps }: Props) {
   const inputId: string = useId();

   const inputTitle = (title: string): string => {
      return postposition.put(title, '을'); // 조사(을/를) 검사
   };

   const getInputTitle: string = `${inputTitle(title)} 입력하세요.`;

   const inputStyle =
      `w-full rounded bg-stone-100 p-3 text-base font-normal placeholder-current outline focus:outline-2 ${focusOutlineColor ?? ''}`.trim();

   return (
      <div className="input-group w-full">
         <label className="sr-only" htmlFor={inputId}>
            {`${title} 입력`}
         </label>
         <input
            className={inputStyle}
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
