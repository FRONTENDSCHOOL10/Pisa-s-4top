import { TabButton } from '@/components/Buttons/TabButton';
import { TeaRecommendCard } from '@/components/TeaCard/CardComponents';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';
import { useTeaLikes } from '@/hooks/useTeaLikes';
import { useEffect, useState } from 'react';
import { fetchFilteredTeaData } from '@/utils/fetchData';

interface Tea {
   id: string;
   tea_image: string;
   tea_name: string;
   tea_brand: string;
   tea_category: string;
}

export function Component() {
   const { categories, currentUser, isLoading: isLikesLoading } = useTeaLikes();
   const [selectedCategory, setSelectedCategory] = useState('홍차'); // 기본값을 '홍차'로 설정
   const [filteredTeas, setFilteredTeas] = useState<Tea[]>([]);
   const [isTeaLoading, setIsTeaLoading] = useState(true);

   // 카테고리 및 테이스팅 노트를 기반으로 필터링된 티 데이터를 가져오는 함수
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

      getFilteredTeas();
   }, [selectedCategory, currentUser]); // 카테고리가 변경될 때마다 다시 필터링

   const handleTabSelect = (category: string) => {
      setSelectedCategory(category); // 선택한 카테고리로 상태 업데이트
   };

   if (isLikesLoading || isTeaLoading) {
      return <LoadingSpinner />;
   }

   return (
      <main className="flex flex-col gap-5">
         <h1 className="sr-only">추천 티 리스트 페이지</h1>
         <div className="">
            {/* 카테고리 필터 버튼 */}
            <TabButton
               tabs={categories?.map((category) => category.category) || []}
               onTabSelect={handleTabSelect} // 탭 선택 시 카테고리 변경
               activeTab={selectedCategory} // 현재 활성화된 카테고리
               className="mb-6"
            />
            <ul className="grid grid-cols-3 gap-4">
               {filteredTeas.length > 0 ? (
                  filteredTeas.map((tea) => (
                     <li key={tea.id} className="flex-1">
                        <TeaRecommendCard
                           id={tea.id}
                           imageUrl={tea.tea_image}
                           teaName={tea.tea_name}
                           brand={tea.tea_brand}
                           userNickname={currentUser?.nickname || ''}
                           className="!w-full"
                        />
                     </li>
                  ))
               ) : (
                  <p>
                     선택한 카테고리 또는 테이스팅 노트에 해당하는 티가
                     없습니다.
                  </p>
               )}
            </ul>
         </div>
      </main>
   );
}
