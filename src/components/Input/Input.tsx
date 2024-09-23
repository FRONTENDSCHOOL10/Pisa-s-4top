/* (공통) 사용자 입력 input */

import postposition from 'cox-postposition';
import { useId, useState } from 'react';

import { INPUT_TYPE } from '@/constants';

interface Props {
   title: string;
   type: string;
   className?: string;
   showMessage?: boolean;
   placeholder?: string;
   error?: boolean;
   errorMessage?: string;
   successMessage?: string;
   isFirstPassword?: boolean;
   [property: string]: any;
}

const inputTitle = (title: string): string => {
   return postposition.put(title, '을'); // 조사(을/를) 검사
};

export default function Input({
   title,
   type,
   className = '',
   showMessage = true,
   placeholder = `${inputTitle(title)} 입력하세요.`,
   error = false,
   errorMessage = '',
   successMessage = '',
   isFirstPassword = false,
   ...restProps
}: Props) {
   const inputId: string = useId();

   const [showPassword, setShowPassword] = useState(false);

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   const isPassword = type === 'password';

   const bottomClass =
      isFirstPassword && type === 'password'
         ? 'ex:-bottom-5 -bottom-9'
         : '-bottom-5';

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
      <div className="input-group relative mb-10 w-full">
         <label className="text-sm font-bold" htmlFor={inputId}>
            {title}
         </label>
         <input
            className={className.trim()}
            type={isPassword && showPassword ? 'text' : type}
            id={inputId}
            placeholder={placeholder}
            title={getInputTitle}
            {...restProps}
         />
         {/* 비밀번호 확인 */}
         {isPassword && (
            <button
               type="button"
               className="absolute bottom-2 right-2"
               onClick={togglePasswordVisibility}
            >
               {showPassword ? (
                  <span
                     className="fi fi-rr-unlock text-stone-500"
                     aria-label="비밀번호 표시"
                  />
               ) : (
                  <span
                     className="fi fi-sr-lock text-stone-500"
                     aria-label="비밀번호 숨기기"
                  />
               )}
            </button>
         )}
         {showMessage && (
            <span
               className={`absolute left-0 z-10 text-xs font-bold ${messageStyle} ${bottomClass}`}
            >
               {error ? errorMessage : successMessage}
            </span>
         )}
      </div>
   );
}
