/* 검색 필터 버튼 (검색 페이지에서만 사용될 컴포넌트) */

/* 사용법

<SearchFilterButton filter={['상품', '리뷰']} />
<SearchFilterButton filter={['상품', '리뷰', '커뮤니티']} />   → 만약 커뮤니티 기능이 추가된다면!

*/

import { useState } from 'react';

export interface Props {
   filter: string[];
   handleFilterChange: (index: number) => void;
}

interface SearchStyles {
   default: string;
   selected: string;
   unselected: string;
   group: string;
   listItem: string;
}

// 스타일을 객체로 관리
export const SEARCH_STYLES: SearchStyles = {
   default: 'w-full truncate rounded-full py-2 font-bold',
   selected: 'bg-stone-100 text-stone-600',
   unselected: 'text-stone-400',
   group: 'search-filter-group flex gap-1 rounded-full bg-stone-300 p-0.5',
   listItem: 'flex-1 truncate',
};

export default function SearchFilterButton({
   filter,
   handleFilterChange,
}: Props) {
   const [selected, setSelected] = useState<number>(0);

   const handleClick = (index: number): void => {
      setSelected(index);
      handleFilterChange(index);
   };

   return (
      <ul className={SEARCH_STYLES.group}>
         {filter.map((data, index) => (
            <li key={data} className={SEARCH_STYLES.listItem}>
               <button
                  type="button"
                  className={`${SEARCH_STYLES.default} ${selected === index ? SEARCH_STYLES.selected : SEARCH_STYLES.unselected}`.trim()}
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
