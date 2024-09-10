import { TabButton } from '@/components/Buttons/TabButton';
import { TeaRecommendCard } from '@/components/TeaCard/CardComponents';
import { useState } from 'react';

const teaData = [
   { imageUrl: '/image1.jpg', teaName: '얼그레이', brand: '브랜드1' },
   { imageUrl: '/image2.jpg', teaName: '녹차', brand: '브랜드2' },
   { imageUrl: '/image3.jpg', teaName: '홍차', brand: '브랜드3' },
   { imageUrl: '/image4.jpg', teaName: '우롱차', brand: '브랜드4' },
   { imageUrl: '/image5.jpg', teaName: '페퍼민트', brand: '브랜드5' },
   { imageUrl: '/image6.jpg', teaName: '카모마일', brand: '브랜드6' },
   { imageUrl: '/image7.jpg', teaName: '라벤더', brand: '브랜드7' },
   { imageUrl: '/image8.jpg', teaName: '루이보스', brand: '브랜드8' },
];

export default function MyTastePage() {
   const [selectedTab, setSelectedTab] = useState('홍차');
   const handleTabSelect = (tab: string) => {
      setSelectedTab(tab);
   };

   // 선택된 탭에 따라 차 데이터를 필터링
   // const filteredTeaData = teaData.filter((tea) => tea.type === selectedTab);

   return (
      <div className="m-5 flex flex-col gap-5">
         <h1 className="sr-only">추천 티 리스트 페이지</h1>
         <TabButton
            tabs={['홍차', '우롱차', '녹차', '허브차']}
            onTabSelect={handleTabSelect}
         />
         <div className="grid grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] gap-4">
            {teaData.map((tea, index) => (
               <div className="flex items-center justify-center">
                  <TeaRecommendCard
                     key={index}
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
