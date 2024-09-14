import { TabButton } from '@/components/Buttons/TabButton';
import { useEffect, useState } from 'react';
import { fetchTeaCategoryData } from '@/utils/fetchData';
import { TeaRecommendCard } from '@/components/TeaCard/CardComponents';

interface TeaCategory {
   id: string;
   category: string;
}
export function Component() {
   const [categories, setCategories] = useState<TeaCategory[]>([]);
   const [selectedCategory, setSelectedCategory] = useState<string>('');
   // const [reviewData, setReviewData] = useState([]);

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
   return (
      <main>
         <h1 className="sr-only">나의 찜 페이지</h1>
         <article className="flex flex-col items-center">
            <div>
               <TabButton
                  tabs={categories.map((category) => category.category)}
                  onTabSelect={(categoryName) => {
                     setSelectedCategory(categoryName);
                  }}
                  className="mb-8 self-start"
               />
               <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  <li>
                     <TeaRecommendCard
                        imageUrl=""
                        teaName="티 이름"
                        brand="티 브랜드"
                     />
                  </li>
                  <li>
                     <TeaRecommendCard
                        imageUrl=""
                        teaName="티 이름"
                        brand="티 브랜드"
                     />
                  </li>
                  <li>
                     <TeaRecommendCard
                        imageUrl=""
                        teaName="티 이름"
                        brand="티 브랜드"
                     />
                  </li>
                  <li>
                     <TeaRecommendCard
                        imageUrl=""
                        teaName="티 이름"
                        brand="티 브랜드"
                     />
                  </li>
                  <li>
                     <TeaRecommendCard
                        imageUrl=""
                        teaName="티 이름"
                        brand="티 브랜드"
                     />
                  </li>
               </ul>
            </div>
         </article>
      </main>
   );
}
