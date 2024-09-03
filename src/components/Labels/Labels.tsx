import { useState } from 'react';

interface LabelProps {
   isButton?: boolean;
}

export function Label({ isButton = false }: LabelProps) {
   const [isClicked, setIsClicked] = useState(false);

   function handleClick() {
      if (isButton) {
         setIsClicked((prevState) => !prevState);
      }
   }

   const buttonClasses = `rounded-[1.375rem] border border-solid border-lime-700 px-2.5 py-[.3125rem] text-xs font-normal text-lime-700 hover:bg-lime-100 ${isClicked ? 'bg-lime-300' : 'bg-stone-100'}` ;

   const labelClasses = 'rounded-[1.375rem] border border-solid border-lime-700 px-2.5 py-[.3125rem] text-xs font-normal text-lime-700 bg-stone-100';

   return isButton ? (
      <button className={buttonClasses} type="button" onClick={handleClick}>
         🪻 라벤더
      </button>
   ) : (
      <span className={labelClasses}>🪻 라벤더</span>
   );
}

export function LabelWarning() {
   return (
      <span className="rounded-[1.375rem] border border-solid border-red-600 bg-stone-100 px-2.5 py-[.3125rem] text-xs font-normal text-red-600">
         ⛔ 알러지 주의
      </span>
   );
}