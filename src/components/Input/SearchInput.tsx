/* 검색 input */

import { MouseEventHandler, useId, useState } from 'react';

interface Props {
   onClick: MouseEventHandler<HTMLButtonElement>;
   [property: string]: any;
}

function SearchInput({ onClick, ...restProps }: Props) {
   const [isFocusSearch, setIsFocusSearch] = useState<boolean>(false);

   const searchId: string = useId();

   const getSearchInputTitle: string = '원하는 티를 검색해보세요!';

   const boxShadow: string = `shadow-[0px_2px_20px_0px_rgba(214,211,209,1),0px_0px_30px_0px_rgba(255,255,255,1)]`;

   const borderColor: string = isFocusSearch
      ? `border-b-green-700`
      : `border-b-stone-200`;

   const iconColor: string = isFocusSearch
      ? `text-green-700`
      : `text-stone-400`;

   return (
      <div
         className={`flex h-[3.75rem] rounded-2xl border border-solid border-white bg-white px-6 py-3 ${boxShadow}`}
      >
         <div
            className={`search-input-group flex flex-grow border-b border-solid ${borderColor}`}
         >
            <label className="sr-only" htmlFor={searchId}>
               검색어 입력
            </label>
            <input
               className="w-full py-3 text-base font-normal placeholder-stone-400 focus:placeholder-green-700 focus:outline-none"
               type="search"
               id={searchId}
               name="filter"
               placeholder={getSearchInputTitle}
               title={getSearchInputTitle}
               onFocus={() => setIsFocusSearch(!isFocusSearch)}
               onBlur={() => setIsFocusSearch(!isFocusSearch)}
               {...restProps}
            />
            <button
               className="px-2"
               aria-label="검색"
               type="submit"
               onClick={onClick}
            >
               <span
                  className={`fi fi-rr-search flex justify-center ${iconColor}`}
                  aria-hidden={true}
               />
            </button>
         </div>
      </div>
   );
}

export default SearchInput;
