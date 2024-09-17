/* 체크박스 input */

/* 사용법

<CheckBox label='자동 로그인' />
<CheckBox label='약관에 동의합니다.' />

*/

import { useId } from 'react';

export interface Props {
   className?: string;
   label: string;
   [property: string]: any;
}

export default function CheckBox({ className='', label, ...restProps }: Props) {
   const checkId: string = useId();

   return (
      <div className={`checkbox-group flex items-center gap-2 ${className}`.trim()}>
         <label className="select-none text-sm font-normal" htmlFor={checkId}>
            {label}
         </label>
         <input
            className="order-first"
            type="checkbox"
            id={checkId}
            {...restProps}
         />
      </div>
   );
}
