import { TabButton } from '@/components/Buttons/TabButton';
import HomeReviewCard from '@/components/Review/HomeReviewCard';
import { fetchTeaCategoryData } from '@/utils/fetchData';
import { useEffect, useState } from 'react';
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

   // useEffect(() => {
   //    const getReviews = async () => {
   //       try {
   //          const reviewData = await fetchReviewData();
   //          setReviewData(reviewData);

   //          if (reviewData.length > 0) {
   //             setReviewData(reviewData[0].category);
   //          }
   //       } catch (error) {
   //          console.error('Failed to fetch tea category data:', error);
   //       }
   //    };

   //    getReviews();
   // }, [])

   return (
      <main className="flex flex-col gap-5">
         <h1 className="sr-only">티 리뷰 리스트 페이지</h1>
         <TabButton
            tabs={categories.map((category) => category.category)}
            onTabSelect={(categoryName) => {
               setSelectedCategory(categoryName);
            }}
            activeTab={selectedCategory}
         />

         <section className="flex flex-col gap-2">
            {/* HomeReviewCard에 임시 데이터 전달 */}
            <HomeReviewCard
               id="1"
               profileImg="/default-profile.png"
               title="Sample Review Title 1"
               nickname="Sample User 1"
               comment="This is a sample review comment."
               score={4}
            />
            <HomeReviewCard
               id="2"
               profileImg="/default-profile.png"
               title="Sample Review Title 2"
               nickname="Sample User 2"
               comment="This is another sample review comment."
               score={5}
            />
            <HomeReviewCard
               id="3"
               profileImg="/default-profile.png"
               title="Sample Review Title 3"
               nickname="Sample User 3"
               comment="Yet another sample review comment."
               score={3}
            />
         </section>
      </main>
   );
}
