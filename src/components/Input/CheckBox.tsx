/* 체크박스 input */

import { useId } from 'react';

interface Props {
   label: string;
   [property: string]: any;
}

function CheckBox({ label, ...restProps }: Props) {
   const checkId: string = useId();

   return (
      <div className="checkbox-group flex items-center gap-2">
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

export default CheckBox;
