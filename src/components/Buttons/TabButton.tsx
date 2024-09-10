import { useState } from 'react';

/* Tab 버튼 컴포넌트 */
// 사용법
// <TabButton tabs={['홍차', '우롱차', '녹차', '허브차']} onTabSelect={handleTabSelect} />
export type TabButtonProps = {
   tabs: string[];
   onTabSelect: (tab: string) => void;
   [props: string]: any;
};

export function TabButton({ tabs, onTabSelect, ...restProps }: TabButtonProps) {
   const [selectedTab, setSelectedTab] = useState(tabs[0]);

   function handleTabClick(tab: string) {
      setSelectedTab(tab);
      onTabSelect(tab);
   }

   return (
      <ul className="flex select-none gap-1" {...restProps}>
         {tabs.map((tab) => (
            <li key={tab}>
               <button
                  type="button"
                  className={`flex rounded-full border border-lime-700 px-[.625rem] py-[.3125rem] text-center text-xs font-normal text-lime-700 ${selectedTab === tab ? 'bg-lime-50' : 'bg-stone-100'}`}
                  onClick={() => handleTabClick(tab)}
               >
                  {tab}
               </button>
            </li>
         ))}
      </ul>
   );
}