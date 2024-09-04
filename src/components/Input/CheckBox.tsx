/* 체크박스 input */

import { useId } from 'react';

interface Props {
   title: string;
   [property: string]: any;
}

function CheckBox({ title, ...restProps }: Props) {
   const checkId: string = useId();

   return (
      <div className="checkbox-group flex items-center gap-2">
         <input type="checkbox" id={checkId} {...restProps} />
         <label className="text-xs font-normal" htmlFor={checkId}>
            {title}
         </label>
      </div>
   );
}

export default CheckBox;
