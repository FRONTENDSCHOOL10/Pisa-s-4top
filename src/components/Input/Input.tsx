/* 아이디 & 비밀번호 & 닉네임 입력 input */

import postposition from 'cox-postposition';

interface Props {
   title: string;
   type: string;
   id?: string;
   defaultValue?: string;
}

function Input({ title, type, id = type, defaultValue = '' }: Props) {
   const inputTitle = (title: string): string => {
      return postposition.put(title, '을'); // 조사(을/를) 검사
   };

   const getInputTitle: string = `${inputTitle(title)} 입력하세요.`;

   return (
      <div className={`${id}-input-group w-full`}>
         <label className="sr-only" htmlFor={id}>
            {`${title} 입력`}
         </label>
         <input
            className="h-9 w-full rounded border border-solid border-stone-950 px-[0.6875rem] py-2 text-xs font-normal placeholder-current"
            type={type}
            name={id}
            id={id}
            defaultValue={defaultValue}
            placeholder={getInputTitle}
            title={getInputTitle}
            required
         />
      </div>
   );
}

export default Input;
