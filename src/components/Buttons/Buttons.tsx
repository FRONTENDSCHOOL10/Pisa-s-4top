import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

/* 기본 버튼 */
/* 버튼 사용법 */
// small버튼: <Button content="버튼 내용" type="button" size="small" handleClick={() => console.log('small 버튼 클릭됨')} />
// fullWidth버튼: <Button content="버튼 내용" type="button" size="fullWidth" handleClick={() => console.log('fullWidth 버튼 클릭됨')} />
// fullWidth-error버튼: <Button content="버튼 내용" type="button" size="fullWidth" isError={true} handleClick={() => console.log('error 버튼 클릭됨')} />
// large버튼: <Button content="버튼 내용" type="button" size="large" handleClick={() => console.log('large 버튼 클릭됨')} />
/* class 지정할 경우 */
// <Button content="버튼 내용" type="button" size="small" handleClick={() => console.log('small 버튼 클릭됨')} className='' />

/* 링크 버튼 사용법 */
// <Button content="버튼 내용" size="small" isLink={true} href="/" ariaLabel='이동하는 페이지 명' />
/* class 지정할 경우 */
// <Button content="버튼 내용" size="small" isLink={true} href="/" ariaLabel='이동하는 페이지 명' className='' />

export interface ButtonProps {
   content: string;
   isLink?: boolean;
   href?: string;
   ariaLabel?: string;
   type?: 'button' | 'submit' | 'reset';
   size?: 'small' | 'fullWidth' | 'large';
   isError?: boolean;
   handleClick?: () => void;
   className?: string;
   [props: string]: any;
}

const defaultClass: string =
   'inline-flex items-center justify-center whitespace-nowrap rounded text-base font-normal text-stone-100';
const defaultColor: string = 'bg-green-700 hover:bg-green-600';
const errorColor: string = 'bg-red-600 hover:bg-red-500';
const sizeClasses: { [key in 'small' | 'fullWidth' | 'large']: string } = {
   small: 'px-4 py-3',
   fullWidth: 'w-full py-3',
   large: 'w-full py-6',
};

export function Button({
   content = '버튼',
   isLink = false,
   href,
   ariaLabel,
   type = 'button',
   size = 'small',
   isError = false,
   handleClick,
   className = '',
   ...restProps
}: ButtonProps) {
   const appliedSize = isError ? 'fullWidth' : size;
   const style = `${defaultClass} ${sizeClasses[appliedSize]} ${isError ? errorColor : defaultColor} ${className}`;

   if (isLink && href && ariaLabel) {
      return (
         <Link
            to={href}
            aria-label={ariaLabel}
            className={style}
            {...restProps}
         >
            {content}
         </Link>
      );
   }

   return (
      <button
         type={type}
         onClick={handleClick}
         className={style}
         {...restProps}
      >
         {content}
      </button>
   );
}

/* 찜 버튼 컴포넌트 */
// 사용법
// <ButtonHeart handleToggle={() => console.log('찜 버튼 토글됨')} />
export interface ButtonHeartProps {
   handleToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
   isActive: boolean;
   [props: string]: any;
}

export function ButtonHeart({
   handleToggle,
   isActive,
   ...restProps
}: ButtonHeartProps) {
   const iconClass: string = `fi flex justify-center items-center ${
      isActive ? 'fi-sr-heart text-red-600' : 'fi-rr-heart text-stone-300'
   }`;

   return (
      <button
         className="select-none"
         type="button"
         onClick={handleToggle}
         role="checkbox"
         aria-checked={isActive}
         aria-label={isActive ? '찜 활성화' : '찜 비활성화'}
         {...restProps}
      >
         <span className={iconClass} aria-hidden="true"></span>
      </button>
   );
}

/* 찜 버튼 + 카운트 컴포넌트 */
// 사용법
// <ButtonHeart totalLike={DB에서 티에 대한 토탈 찜 개수} onToggle={() => console.log('찜 버튼 토글됨')} />
export interface ButtonHeartwithCountProps {
   totalLike: number;
   isActive: boolean;
   handleToggle: () => void;
   [props: string]: any;
}

export function ButtonHeartwithCount({
   totalLike = 0,
   isActive,
   handleToggle,
   ...restProps
}: ButtonHeartwithCountProps) {
   const buttonClass: string = `select-none rounded-2xl ${isActive ? 'bg-red-600 px-[.3125rem] py-[.3125rem]' : 'border border-stone-300 px-1 py-1'}`;
   const iconClass: string = `fi flex justify-center items-center ${
      isActive
         ? 'fi-sr-heart text-white text-[.6188rem]'
         : 'fi-rr-heart text-stone-300 text-[.625rem]'
   }`;
   const numberClass: string = `ml-1 text-base font-bold ${isActive ? 'text-red-600' : 'text-stone-300'}`;

   // totalLike가 NaN인 경우 0으로 표시
   const displayCount = isNaN(totalLike) ? 0 : totalLike;

   return (
      <div className="flex items-center">
         <button
            className={buttonClass}
            type="button"
            onClick={handleToggle}
            role="checkbox"
            aria-checked={isActive}
            aria-label={isActive ? '찜 활성화' : '찜 비활성화'}
            {...restProps}
         >
            <span className={iconClass} aria-hidden="true"></span>
         </button>
         <span className={numberClass} aria-hidden="true">
            {displayCount}
         </span>
      </div>
   );
}