import { useState, useEffect } from 'react';

/* 기본 버튼 */
// 사용법
// <ButtonDefault content="버튼 내용" type="button" handleClick={() => console.log('Clicked')} />
export interface ButtonDefaultProps {
   content: string;
   type?: 'button' | 'submit' | 'reset';
   handleClick: () => void;
   [props: string] : any;
}

export function ButtonDefault({
   content = '버튼default',
   type = 'button',
   handleClick,
   ...restProps
}: ButtonDefaultProps) {
   return (
      <button
         className="inline-flex items-center justify-center whitespace-nowrap rounded bg-green-700 px-4 py-3 text-base font-normal text-stone-100 hover:bg-green-600"
         type={type}
         onClick={handleClick}
         {...restProps}
         aria-label={content}
      >
         {content}
      </button>
   );
}

/* full width 버튼 */
// 사용법
// <ButtonFullWidth content="버튼 내용" type="button" handleClick={() => console.log('Clicked')} />
// <ButtonFullWidth content="버튼 내용" type="button" isError={true} handleClick={() => console.log('Clicked')} /> : 빨간색 버튼
export interface ButtonFullWidthProps {
   content?: string;
   type?: 'button' | 'submit' | 'reset';
   isError?: boolean;
   handleClick: () => void;
   [props: string] : any;
}

const defaultClass: string =
   'inline-flex w-full items-center justify-center whitespace-nowrap rounded py-3 text-base font-normal text-stone-100';
const defaultStyle: string = 'bg-green-700  hover:bg-green-600';
const redStyle: string = 'bg-red-600 hover:bg-red-500';

export function ButtonFullWidth({
   content = '버튼fullWidth',
   type = 'button',
   isError = false,
   handleClick,
   ...restProps
}: ButtonFullWidthProps) {
   return (
      <button
         className={`${defaultClass} ${isError ? redStyle : defaultStyle}`}
         type={type}
         onClick={handleClick}
         {...restProps}
         aria-label={content}
      >
         {content}
      </button>
   );
}

/* large 버튼 */
// 사용법
// <ButtonLarge content="버튼 내용" type="button" handleClick={() => console.log('Clicked')} />
export interface ButtonLargeProps {
   content?: string;
   type?: 'button' | 'submit' | 'reset';
   handleClick: () => void;
   [props: string] : any;
}

export function ButtonLarge({
   content = '버튼large',
   type = 'button',
   handleClick,
   ...restProps
}: ButtonLargeProps) {
   return (
      <button
         className="inline-flex w-full items-center justify-center whitespace-nowrap rounded bg-green-700 py-6 text-base font-normal text-stone-100 hover:bg-green-600"
         type={type}
         onClick={handleClick}
         {...restProps}
         aria-label={content}
      >
         {content}
      </button>
   );
}

/* 찜 버튼 컴포넌트 */
// 사용법
// <ButtonHeart type="button" onToggle={() => console.log('찜 버튼 토글됨')} />
export interface ButtonHeartProps {
   type?: 'button' | 'submit' | 'reset';
   onToggle?: () => void;
   [props: string] : any;
}

export function ButtonHeart({ type, onToggle, ...restProps }: ButtonHeartProps) {
   const [isActive, setIsActive] = useState(false);

   function handleToggle() {
      setIsActive((prevState) => !prevState);
      if (onToggle) {
         onToggle();
      }
   }
   const iconClass: string = `fi flex justify-center items-center ${
      isActive ? 'fi-sr-heart text-red-600' : 'fi-rr-heart text-stone-300'
   }`;

   return (
      <button
         className="select-none"
         type={type}
         onClick={handleToggle}
         {...restProps}
         aria-pressed={isActive}
         aria-label={isActive ? '찜 활성화' : '찜 비활성화'}
      >
         <span className={iconClass} aria-hidden="true"></span>
      </button>
   );
}

/* 찜 버튼 + 카운트 컴포넌트 */
// 사용법
// <ButtonHeart type="button" totalLike={DB에서 티에 대한 토탈 찜 개수} onToggle={() => console.log('찜 버튼 토글됨')} />
export interface ButtonHeartwithCountProps {
   type?: 'button' | 'submit' | 'reset';
   totalLike: number;
   onToggle?: () => void;
   [props: string] : any;
}

export function ButtonHeartwithCount({
   type = 'button',
   totalLike = 0,
   onToggle,
   ...restProps
}: ButtonHeartwithCountProps) {
   const [isActive, setIsActive] = useState(false);
   const [count, setCount] = useState(totalLike);

   function handleToggle() {
      setIsActive((prevState) => {
         const newActive = !prevState;
         setCount(newActive ? count + 1 : totalLike);
         return newActive;
      });
      if (onToggle) {
         onToggle();
      }
   }

   useEffect(() => {
      if (!isActive) {
         setCount(totalLike);
      }
   }, [isActive, totalLike]);

   const buttonClass: string = `select-none rounded-2xl ${isActive ? 'bg-red-600 px-[.3125rem] py-[.3125rem]' : 'border border-stone-300 px-1 py-1'}`;
   const iconClass: string = `fi flex justify-center items-center ${
      isActive
         ? 'fi-sr-heart text-white text-[.6188rem]'
         : 'fi-rr-heart text-stone-300 text-[.625rem]'
   }`;
   const numberClass: string = `ml-1 text-base font-bold ${isActive ? 'text-red-600' : 'text-stone-300'}`;

   return (
      <div className="flex items-center">
         <button
            className={buttonClass}
            type={type}
            onClick={handleToggle}
            {...restProps}
            aria-pressed={isActive}
            aria-label={isActive ? '찜 활성화' : '찜 비활성화'}
         >
            <span className={iconClass} aria-hidden="true"></span>
         </button>
         <span className={numberClass} aria-hidden="true">
            {count}
         </span>
      </div>
   );
}
