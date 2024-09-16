import { TabButton } from '@/components/Buttons/TabButton';
import { useEffect, useState } from 'react';
import { fetchTeaCategoryData, fetchTeaData } from '@/utils/fetchData';
import { TeaRecommendCard } from '@/components/TeaCard/CardComponents';

interface TeaCategory {
   id: string;
   category: string;
}

interface Tea {
   id: string;
   tea_name: string;
   tea_brand: string;
   tea_image: string;
   tea_category: string;
}

export function Component() {
   const [categories, setCategories] = useState<TeaCategory[]>([]);
   const [activeTab, setActiveTab] = useState<string>('');
   const [teaData, setTeaData] = useState<Tea[]>([]);

   useEffect(() => {
      const getCategories = async () => {
         try {
            const categoryData = await fetchTeaCategoryData();
            setCategories(categoryData);

            if (categoryData.length > 0) {
               setActiveTab(categoryData[0].category);
            }
         } catch (error) {
            console.error('Failed to fetch tea category data:', error);
         }
      };

      getCategories();
   }, []);

   useEffect(() => {
      const getTeaData = async () => {
         try {
            const allTeaData = await fetchTeaData();
            const filteredTeaData = allTeaData.filter(
               (tea) => tea.tea_category === activeTab
            );
            setTeaData(filteredTeaData);
         } catch (error) {
            console.error('Failed to fetch tea data:', error);
         }
      };

      if (activeTab) {
         getTeaData();
      }
   }, [activeTab]);

   return (
      <main>
         <h1 className="sr-only">나의 찜 페이지</h1>
         <article className="flex flex-col items-center">
            <div>
               <TabButton
                  tabs={categories.map((category) => category.category)}
                  onTabSelect={(categoryName) => {
                     setActiveTab(categoryName);
                  }}
                  className="mb-8 self-start"
                  activeTab={activeTab}
               />
               <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                  {teaData.map((tea) => (
                     <li key={tea.id}>
                        <TeaRecommendCard
                           id={tea.id}
                           imageUrl={tea.tea_image}
                           teaName={tea.tea_name}
                           brand={tea.tea_brand}
                        />
                     </li>
                  ))}
               </ul>
            </div>
         </article>
      </main>
   );
}
