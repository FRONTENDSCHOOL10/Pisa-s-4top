/* 검색 필터 버튼 (검색 페이지에서만 사용될 컴포넌트) */

/* 사용법

<SearchFilterButton filter={['상품', '리뷰']} />
<SearchFilterButton filter={['상품', '리뷰', '커뮤니티']} />   → 만약 커뮤니티 기능이 추가된다면!

*/

import { useState } from 'react';

const searchDefaultStyle: string = `w-full truncate rounded-full py-2 font-bold text-stone-600`; // 공통 스타일링
const searchFocusStyle: string = `bg-stone-100`; // focused

export interface Props {
   filter: string[];
}

export default function SearchFilterButton({ filter }: Props) {
   const [selected, setSelected] = useState<number>(0);

   const handleClick = (index: number): void => {
      setSelected(index);
   };

   return (
      <ul className="search-filter-group flex gap-1 rounded-full bg-stone-300 p-0.5">
         {filter.map((data, index) => (
            <li key={data} className="flex-1 truncate">
               <button
                  type="button"
                  className={`${searchDefaultStyle} ${selected === index ? searchFocusStyle : ''}`.trim()}
                  onClick={() => handleClick(index)}
                  aria-pressed={selected === index}
               >
                  {data}
               </button>
            </li>
         ))}
      </ul>
   );
}
