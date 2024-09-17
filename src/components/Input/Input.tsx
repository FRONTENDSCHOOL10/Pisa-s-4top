/* (공통) 사용자 입력 input */

import postposition from 'cox-postposition';
import { useId } from 'react';

import { INPUT_TYPE } from '@/constants';

interface Props {
   title: string;
   type: string;
   className?: string;
   showMessage?: boolean;
   error?: boolean;
   errorMessage?: string;
   successMessage?: string;
   [property: string]: any;
}

export default function Input({
   title,
   type,
   className = '',
   showMessage = true,
   error = false,
   errorMessage = '',
   successMessage = '',
   ...restProps
}: Props) {
   const inputId: string = useId();

   const inputTitle = (title: string): string => {
      return postposition.put(title, '을'); // 조사(을/를) 검사
   };

   let getInputTitle: string = '';

   switch (type) {
      case INPUT_TYPE.EMAIL:
         getInputTitle = `${inputTitle(title)} 입력하세요.`;
         break;

      case INPUT_TYPE.NICKNAME:
         getInputTitle = `닉네임은 최소 1글자, 최대 10글자 입력할 수 있습니다.`;
         break;

      case INPUT_TYPE.PASSWORD:
         getInputTitle = `비밀번호는 영문·숫자·특수문자를 포함하여 최소 8글자, 최대 16글자 입력할 수 있습니다.`;
         break;
   }

   const messageStyle = error ? 'text-red-600' : 'text-green-700';

   return (
      <div className="input-group relative mb-6 w-full">
         <label className="sr-only" htmlFor={inputId}>
            {`${title} 입력`}
         </label>
         <input
            className={className.trim()}
            type={type}
            id={inputId}
            placeholder={`${inputTitle(title)} 입력하세요.`}
            title={getInputTitle}
            {...restProps}
         />
         {showMessage && (
            <span
               className={`absolute -bottom-5 left-0 z-10 text-xs font-bold ${messageStyle}`}
            >
               {error ? errorMessage : successMessage}
            </span>
         )}
      </div>
   );
}
