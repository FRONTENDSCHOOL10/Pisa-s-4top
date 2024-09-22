import { TabButton } from '@/components/Buttons/TabButton';
import { TeaRecommendCard } from '@/components/TeaCard/CardComponents';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';
import { useTeaLikes } from '@/hooks/useTeaLikes';
import { useEffect, useState, useMemo } from 'react';
import { fetchFilteredTeaData, fetchTeaData } from '@/utils/fetchData';
import CheckBox from '@/components/Input/CheckBox';

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
   useEffect(() => {
      const getFilteredTeas = async () => {
         if (!selectedCategory || !currentUser) return;

         try {
            setIsTeaLoading(true);
            const teas = await fetchFilteredTeaData(
               selectedCategory,
               currentUser.nickname
            );
            setFilteredTeas(teas);
         } catch (error) {
            console.error('Failed to fetch filtered tea data:', error);
         } finally {
            setIsTeaLoading(false);
         }
      };

      if (!isShowAll) {
         getFilteredTeas();
      } else {
         setIsTeaLoading(false);
      }
   }, [selectedCategory, currentUser, isShowAll]);

   const handleTabSelect = (category: string) => {
      setSelectedCategory(category);
   };

   const handleShowAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      setIsShowAll(checked);
   };

   const resultTeas = useMemo(() => {
      if (isShowAll) {
         return allTeas.filter((tea) => tea.tea_category === selectedCategory);
      }
      return filteredTeas;
   }, [isShowAll, allTeas, selectedCategory, filteredTeas]);

   if (isLikesLoading || isTeaLoading) {
      return <LoadingSpinner />;
   }

   return (
      <main className="flex flex-col gap-5">
         <h1 className="sr-only">추천 티 리스트 페이지</h1>
         {/* 카테고리 필터 버튼 */}
         <TabButton
            tabs={categories?.map((category) => category.category) || []}
            onTabSelect={handleTabSelect}
            activeTab={selectedCategory}
         />
         {/* 전체 티 체크박스 */}
         <CheckBox
            label="모든 티 보기"
            className="text-stone-950"
            checked={isShowAll}
            onChange={handleShowAllChange}
         />
         {resultTeas.length > 0 ? (
            <ul className="grid gap-4 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
            <p>선택한 카테고리에 해당하는 티가 없습니다</p>
         )}
      </main>
   );
}
