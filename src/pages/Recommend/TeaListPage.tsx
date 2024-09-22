import { useEffect, useState, useMemo, useCallback } from 'react';

import { TabButton } from '@/components/Buttons/TabButton';
import { TeaRecommendCard } from '@/components/TeaCard/CardComponents';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';
import { useTeaLikes } from '@/hooks/useTeaLikes';
import { fetchFilteredTeaData, fetchTeaData } from '@/utils/fetchData';
import CheckBox from '@/components/Input/CheckBox';
import NoData from '@/components/Data/NoData';

interface Tea {
   id: string;
   tea_image: string;
   tea_name: string;
   tea_brand: string;
   tea_category: string;
}

export function Component() {
   const { categories, currentUser, isLoading: isLikesLoading } = useTeaLikes();
   const [selectedCategory, setSelectedCategory] = useState('홍차');
   const [filteredTeas, setFilteredTeas] = useState<Tea[]>([]);
   const [allTeas, setAllTeas] = useState<Tea[]>([]);
   const [isTeaLoading, setIsTeaLoading] = useState(true);
   const [isShowAll, setIsShowAll] = useState(false);

   // 전체 티 가져오는 함수
   useEffect(() => {
      const fetchAllTeas = async () => {
         try {
            const teas = await fetchTeaData();
            setAllTeas(teas);
         } catch (error) {
            console.error('Failed to fetch all tea data:', error);
         }
      };

      fetchAllTeas();
   }, []);

   // 테이스팅 노트를 기반으로 필터링된 티 데이터를 가져오는 함수
   const getFilteredTea = useCallback(async () => {
      if (!currentUser) return;

      try {
         setIsTeaLoading(true);
         const teas = await fetchFilteredTeaData(null, currentUser.nickname);
         setFilteredTeas(teas);
      } catch (error) {
         console.error('Failed to fetch filtered tea data:', error);
      } finally {
         setIsTeaLoading(false);
      }
   }, [currentUser]);

   useEffect(() => {
      if (!isShowAll) {
         getFilteredTea();
      } else {
         setIsTeaLoading(false);
      }
   }, [isShowAll, getFilteredTea]);

   const handleTabSelect = (category: string) => {
      setSelectedCategory(category);
   };

   const handleShowAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setIsShowAll(checked);
      setIsTeaLoading(true); // 체크박스 상태 변경 시 로딩 상태 시작
      setTimeout(() => setIsTeaLoading(false), 500); // 짧은 지연 후 로딩 상태 해제
   };

   const resultTeas = useMemo(() => {
      if (isShowAll) {
         return allTeas.filter((tea) => tea.tea_category === selectedCategory);
      }
      return filteredTeas.filter(
         (tea) => tea.tea_category === selectedCategory
      );
   }, [isShowAll, allTeas, selectedCategory, filteredTeas]);

   if (isLikesLoading || isTeaLoading) {
      return <LoadingSpinner />;
   }

   return (
      <main className="-mt-2 flex min-h-screen flex-col">
         <h1 className="sr-only">추천 티 리스트 페이지</h1>
         <TabButton
            tabs={categories.map((category) => category.category) || []}
            onTabSelect={handleTabSelect}
            activeTab={selectedCategory}
         />
         <CheckBox
            label="모든 티 보기"
            className="my-3 ml-1 text-stone-950"
            checked={isShowAll}
            onChange={handleShowAllChange}
         />
         {resultTeas.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
               {resultTeas.map((tea) => (
                  <li key={tea.id}>
                     <TeaRecommendCard
                        id={tea.id}
                        imageUrl={tea.tea_image}
                        teaName={tea.tea_name}
                        brand={tea.tea_brand}
                        userNickname={currentUser?.nickname || ''}
                        className="!w-full"
                     />
                  </li>
               ))}
            </ul>
         ) : (
            <NoData text="선택한 카테고리에 해당하는 티가 없습니다" />
         )}
      </main>
   );
}
