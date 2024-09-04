import { memo, useState } from 'react';

interface LabelProps {
   isButton?: boolean;
   taste: string;
}

const labelClass =
   'rounded-[1.375rem] border border-solid border-lime-700 px-2.5 py-[.3125rem] text-xs font-normal text-lime-700 bg-stone-100';

export const Label = memo(({ isButton = false, taste }: LabelProps) => {
   const [isClicked, setIsClicked] = useState(false);

   function handleClick() {
      if (isButton) {
         setIsClicked((prevState) => !prevState);
      }
   }

   const buttonClass = `rounded-[1.375rem] border border-solid border-lime-700 px-2.5 py-[.3125rem] text-xs font-normal text-lime-700 hover:bg-lime-100 ${isClicked ? 'bg-lime-300' : 'bg-stone-100'}`;

   return isButton ? (
      <button className={buttonClass} type="button" onClick={handleClick}>
         {taste}
      </button>
   ) : (
      <span className={labelClass}>{taste}</span>
   );
});

export const LabelWarning = memo(() => {
   return (
      <span className="rounded-[1.375rem] border border-solid border-red-600 bg-stone-100 px-2.5 py-[.3125rem] text-xs font-normal text-red-600">
         ⛔ 알러지 주의
      </span>
   );
});
