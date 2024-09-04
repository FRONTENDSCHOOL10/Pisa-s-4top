/* 검색 input */

import { MouseEventHandler } from 'react';

interface Props {
   id?: string;
   defaultValue?: string;
   onClick: MouseEventHandler<HTMLButtonElement>;
}

function SearchInput({ id = 'search', defaultValue = '', onClick }: Props) {
   const getSearchInputTitle: string = '원하는 티를 검색해보세요!';

   const boxShadow: string = `shadow-[0px_2px_20px_0px_rgba(214,211,209,1),0px_0px_30px_0px_rgba(255,255,255,1)]`;

   return (
      <div
         className={`rounded-2xl border border-solid border-white px-6 py-2 ${boxShadow}`}
      >
         <div className="search-input-group flex justify-between border-b border-solid border-b-stone-200">
            <label className="sr-only" htmlFor={id}>
               검색어 입력
            </label>
            <input
               className="w-full py-2 text-xs font-normal placeholder-stone-400 focus:outline-none"
               type="search"
               name={id}
               id={id}
               defaultValue={defaultValue}
               placeholder={getSearchInputTitle}
               title={getSearchInputTitle}
            />
            <button
               className="px-2"
               aria-label="검색"
               type="submit"
               onClick={onClick}
            >
               <span
                  className="fi fi-rr-search flex justify-center text-stone-400"
                  aria-hidden={true}
               />
            </button>
         </div>
      </div>
   );
}

export default SearchInput;
