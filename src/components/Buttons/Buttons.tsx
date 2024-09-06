import { useState, useEffect } from 'react';

/* 기본 버튼 */
// 레스트프롭 추가 확인
interface ButtonDefaultProps {
   text?: string;
}
// 버튼 타입도 프롭에 추가해주세용! -> 프롭으로 받되 옵션!
export function ButtonDefault({ text = '버튼default' }: ButtonDefaultProps) {
   return (
      <button
         className="inline-flex items-center justify-center whitespace-nowrap rounded bg-green-700 px-4 py-3 text-base font-normal text-stone-100 hover:bg-green-600"
         type="button"
      >
         {text}
      </button>
   );
}

/* full width 버튼 */
interface ButtonFullWidthProps {
   text?: string;
}

export function ButtonFullWidth({
   text = '버튼fullWidth',
}: ButtonFullWidthProps) {
   return (
      <button
         className="inline-flex w-full items-center justify-center whitespace-nowrap rounded bg-green-700 py-3 text-base font-normal text-stone-100 hover:bg-green-600"
         type="button"
      >
         {text}
      </button>
   );
}

/* large 버튼 */
interface ButtonLargeProps {
   text?: string;
}

export function ButtonLarge({ text = '버튼large' }: ButtonLargeProps) {
   return (
      <button
         className="inline-flex w-full items-center justify-center whitespace-nowrap rounded bg-green-700 py-6 text-base font-normal text-stone-100 hover:bg-green-600"
         type="button"
      >
         {text}
      </button>
   );
}
// 컬러만 달라서 error status 프롭..!
/* full width 빨간색 버튼 */
interface ButtonErrorProps {
   text?: string;
}

export function ButtonError({ text = '버튼error' }: ButtonErrorProps) {
   return (
      <button
         className="inline-flex w-full items-center justify-center whitespace-nowrap rounded bg-red-600 py-3 text-base font-normal text-stone-100 hover:bg-red-500"
         type="button"
      >
         {text}
      </button>
   );
}

/* 찜 버튼 컴포넌트 */
export function ButtonHeart() {
   const [isActive, setIsActive] = useState(false);

   function handleClick() {
      setIsActive((prevState) => !prevState);
   }

   const classes = `fi flex justify-center items-center ${
      isActive ? 'fi-sr-heart text-red-600' : 'fi-rr-heart text-stone-300'
   }`;

   return (
      <button
         className="select-none"
         type="button"
         onClick={handleClick}
         aria-pressed={isActive}
         aria-label={isActive ? '찜 활성화' : '찜 해제'}
      >
         <span className={classes}></span>
      </button>
   );
}

/* 찜 버튼 + 카운트 컴포넌트 */
interface ButtonHeartwithCountProps {
   totalLike: number;
}

export function ButtonHeartwithCount({
   totalLike = 0,
}: ButtonHeartwithCountProps) {
   const [isActive, setIsActive] = useState(false);
   const [count, setCount] = useState(totalLike);

   function handleClick() {
      setIsActive((prevState) => {
         const newActive = !prevState;
         setCount(newActive ? count + 1 : totalLike);
         return newActive;
      });
   }

   useEffect(() => {
      if (!isActive) {
         setCount(totalLike);
      }
   }, [isActive, totalLike]);

   const buttonClasses = `select-none rounded-2xl ${isActive ? 'bg-red-600 px-[.3125rem] py-[.3125rem]' : 'border border-stone-300 px-1 py-1'}`;
   const iconClasses = `fi flex justify-center items-center ${
      isActive
         ? 'fi-sr-heart text-white text-[.6188rem]'
         : 'fi-rr-heart text-stone-300 text-[.625rem]'
   }`;
   const numberClasses = `ml-1 text-base font-bold ${isActive ? 'text-red-600' : 'text-stone-300'}`;

   return (
      <div>
         <button
            className={buttonClasses}
            type="button"
            onClick={handleClick}
            aria-pressed={isActive}
            aria-label={isActive ? '찜 활성화' : '찜 해제'}
         >
            <span className={iconClasses}></span>
         </button>
         <span className={numberClasses}>{count}</span>
      </div>
   );
}
