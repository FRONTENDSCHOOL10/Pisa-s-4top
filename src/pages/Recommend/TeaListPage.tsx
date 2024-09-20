import { TabButton } from '@/components/Buttons/TabButton';
import { TeaRecommendCard } from '@/components/TeaCard/CardComponents';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';
import { useTeaLikes } from '@/hooks/useTeaLikes';
import { useEffect, useState } from 'react';
import { fetchTeaData } from '@/utils/fetchData';

interface Tea {
   id: string;
   tea_image: string;
   tea_name: string;
   tea_brand: string;
   tea_category: string;
}

export function Component() {
   const { categories, selectedCategory, setSelectedCategory, currentUser, isLoading } = useTeaLikes();
   const [allTeas, setAllTeas] = useState<Tea[]>([]);

   useEffect(() => {
      const getAllTeas = async () => {
         try {
            const teas = await fetchTeaData();
            setAllTeas(teas);
         } catch (error) {
            console.error('Failed to fetch all tea data:', error);
         }
      };

      getAllTeas();
   }, []);

   if (isLoading) {
      return <LoadingSpinner />;
   }

   const filteredTeas = allTeas.filter((tea) => tea.tea_category === selectedCategory);

   return (
      <main className="flex flex-col gap-5">
         <h1 className="sr-only">추천 티 리스트 페이지</h1>
         <TabButton
            tabs={categories.map((category) => category.category)}
            onTabSelect={setSelectedCategory}
            activeTab={selectedCategory}
         />
         <ul className="grid grid-cols-[repeat(auto-fill,_minmax(158px,_1fr))] gap-4">
            {filteredTeas.map((tea) => (
               <li key={tea.id} className="flex justify-center">
                  <TeaRecommendCard
                     id={tea.id}
                     imageUrl={tea.tea_image}
                     teaName={tea.tea_name}
                     brand={tea.tea_brand}
                     userNickname={currentUser?.nickname || ''}
                  />
               </li>
            ))}
         </ul>
      </main>
   );
}