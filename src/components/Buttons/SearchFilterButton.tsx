/* 검색 필터 버튼 (검색 페이지에서만 사용될 컴포넌트) */

/* 사용법

<SearchFilterButton />

*/

import { useState } from 'react';

const searchDefaultStyle: string = `w-1/2 rounded-full py-2 font-bold text-stone-600`; // 공통 스타일링
const searchFocusStyle: string = `bg-stone-100`; // focused

export default function SearchFilterButton() {
   const [selected, setSelected] = useState<boolean>(false);

   const handleClick = (state: boolean): void => {
      setSelected(state);
   };

   return (
      <div className="search-filter-group flex gap-1 rounded-full bg-stone-300 p-0.5">
         <button
            className={`${searchDefaultStyle} ${!selected ? searchFocusStyle : ''}`.trim()}
            onClick={() => handleClick(false)}
            aria-pressed={!selected}
         >
            상품
         </button>
         <button
            className={`${searchDefaultStyle} ${selected ? searchFocusStyle : ''}`.trim()}
            onClick={() => handleClick(true)}
            aria-pressed={selected}
         >
            리뷰
         </button>
      </div>
   );
}
