/* 검색 input */

/* 사용법

1. 메인 페이지에서 사용 시 (검색 페이지로 이동하는 역할만 함)
<SearchInput isButton={true} />

2. 검색 페이지에서 사용 시
<SearchInput onClick={() => console.log('click')} />

*/

import { FormEventHandler, useId, useState } from 'react';
import { Link } from 'react-router-dom';

export interface Props {
   isButton?: boolean;
   onSubmit?: FormEventHandler<HTMLFormElement>;
   [property: string]: any;
}

export default function SearchInput({
   isButton = false,
   onSubmit,
   ...restProps
}: Props) {
   const [isFocusSearch, setIsFocusSearch] = useState<boolean>(false);

   const searchId: string = useId();

   const getSearchInputTitle: string = '원하는 티를 검색해보세요!';

   const borderColor: string = isFocusSearch
      ? 'border-b-green-700'
      : 'border-b-stone-950';

   const iconColor: string = isFocusSearch
      ? 'text-green-700'
      : 'text-stone-950';

   // 공통 내용
   const renderInput = (isButton: boolean): JSX.Element => (
      <div
         className={`flex h-[3.75rem] rounded-2xl border border-solid border-white bg-white px-6 py-3 shadow-search`}
      >
         <div
            className={`search-input-group flex flex-grow border-b border-solid ${borderColor}`}
         >
            <label className="sr-only" htmlFor={searchId}>
               {isButton ? '검색 페이지로 이동' : '검색어 입력'}
            </label>
            <input
               className={`w-full py-3 text-base font-normal placeholder-stone-950 focus:outline-none ${isButton ? 'cursor-pointer' : 'focus:placeholder-green-700'}`}
               type="search"
               id={searchId}
               name="value"
               placeholder={getSearchInputTitle}
               title={getSearchInputTitle}
               onFocus={() => setIsFocusSearch(!isFocusSearch)}
               onBlur={() => setIsFocusSearch(!isFocusSearch)}
               readOnly={isButton} // 메인 페이지에선 읽기 전용으로 보이도록 함
               tabIndex={isButton ? -1 : 0}
               {...restProps}
            />
            <button
               className="px-2"
               aria-label="검색"
               type={isButton ? 'button' : 'submit'}
               tabIndex={isButton ? -1 : 0}
            >
               <span
                  className={`fi fi-rr-search flex justify-center ${isButton ? 'text-stone-950' : iconColor}`}
                  aria-hidden={true}
               />
            </button>
         </div>
      </div>
   );

   // 메인 페이지에서는 search 페이지로 이동하는 단순 Link 역할, 검색 페이지에서는 input 역할
   return (
      <>
         {isButton ? (
            <Link to="/search">{renderInput(isButton)}</Link>
         ) : (
            <form onSubmit={onSubmit} className="z-10">
               {renderInput(isButton)}
            </form>
         )}
      </>
   );
}
