import { TabButton } from '@/components/Buttons/TabButton';
import { TeaRecommendCard } from '@/components/TeaCard/CardComponents';
import { fetchTeaData, fetchTeaCategoryData } from '@/utils/fetchData';
import { useEffect, useState } from 'react';

interface Tea {
   id: string;
   tea_image: string;
   tea_name: string;
   tea_brand: string;
   tea_category: string;
}

interface TeaCategory {
   id: string;
   category: string;
}

export function Component() {
   const [teaData, setTeaData] = useState<Tea[]>([]);
   const [categories, setCategories] = useState<TeaCategory[]>([]);
   const [selectedCategory, setSelectedCategory] = useState<string>('');

   useEffect(() => {
      const getCategories = async () => {
         try {
            const categoryData = await fetchTeaCategoryData();
            setCategories(categoryData);

            if (categoryData.length > 0) {
               setSelectedCategory(categoryData[0].category);
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
            const filteredData = allTeaData.filter(
               (tea: Tea) => tea.tea_category === selectedCategory
            );
            setTeaData(filteredData);
         } catch (error) {
            console.error('Failed to fetch tea data:', error);
         }
      };

      if (selectedCategory) {
         getTeaData();
      }
   }, [selectedCategory]);

   return (
      <main className="flex flex-col gap-5">
         <h1 className="sr-only">추천 티 리스트 페이지</h1>
         <TabButton
            tabs={categories.map((category) => category.category)}
            onTabSelect={(categoryName) => {
               setSelectedCategory(categoryName);
            }}
            activeTab={selectedCategory}
         />
         <ul className="grid grid-cols-[repeat(auto-fill,_minmax(158px,_1fr))] gap-4">
            {teaData.map((tea: Tea) => (
               <li key={tea.id} className="flex justify-center">
                  <TeaRecommendCard
                     id={tea.id}
                     imageUrl={tea.tea_image}
                     teaName={tea.tea_name}
                     brand={tea.tea_brand}
                  />
               </li>
            ))}
         </ul>
      </main>
   );
}
