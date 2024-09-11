import { TabButton } from '@/components/Buttons/TabButton';
import { TeaRecommendCard } from '@/components/TeaCard/CardComponents';
// import { useState } from 'react';

interface Tea {
   imageUrl: string;
   teaName: string;
   brand: string;
}

const teaData: Tea[] = [
   { imageUrl: '', teaName: '얼그레이', brand: '브랜드1' },
   { imageUrl: '', teaName: '녹차', brand: '브랜드2' },
   { imageUrl: '', teaName: '홍차', brand: '브랜드3' },
   { imageUrl: '', teaName: '우롱차', brand: '브랜드4' },
   { imageUrl: '', teaName: '페퍼민트', brand: '브랜드5' },
   { imageUrl: '', teaName: '카모마일', brand: '브랜드6' },
   { imageUrl: '', teaName: '라벤더', brand: '브랜드7' },
   { imageUrl: '', teaName: '루이보스', brand: '브랜드8' },
];

export function Component() {
   // const [selectedTab, setSelectedTab] = useState<string>('홍차');
   // const handleTabSelect = (tab: string) => {
   //    setSelectedTab(tab);
   // };

   // 선택된 탭에 따라 차 데이터를 필터링
   // const filteredTeaData = teaData.filter((tea: Tea) => tea.teaName === selectedTab);

   return (
      <div className="mb-10 flex flex-col gap-5">
         <h1 className="sr-only">추천 티 리스트 페이지</h1>
         <TabButton
            tabs={['홍차', '우롱차', '녹차', '허브차']}
            onTabSelect={() => {
               console.log('탭 전환');
            }}
         />
         <div className="grid grid-cols-[repeat(auto-fill,_minmax(158px,_1fr))] gap-4">
            {teaData.map((tea: Tea, index: number) => (
               <div key={index} className="flex justify-center">
                  <TeaRecommendCard
                     imageUrl={tea.imageUrl}
                     teaName={tea.teaName}
                     brand={tea.brand}
                  />
               </div>
            ))}
         </div>
      </div>
   );
}
