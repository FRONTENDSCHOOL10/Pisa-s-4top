import { useEffect, useState } from 'react';

import { TabButton } from '@/components/Buttons/TabButton';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';
import HomeReviewCard from '@/components/Review/HomeReviewCard';
import { fetchTeaCategoryData, fetchMultipleReviews } from '@/utils/fetchData';
import { Review, TeaCategory } from '@/types/types';

export function Component() {
   const [categories, setCategories] = useState<TeaCategory[]>([]);
   const [selectedCategory, setSelectedCategory] = useState<string>('');
   const [reviewData, setReviewData] = useState<Review[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         setIsLoading(true);
         try {
            const categoryData =
               (await fetchTeaCategoryData()) as TeaCategory[];
            setCategories(categoryData);

            if (categoryData.length > 0) {
               setSelectedCategory(categoryData[0].category);
            }

            const data = await fetchMultipleReviews();
            setReviewData(data as any);
         } catch (error) {
            console.error('Failed to fetch data:', error);
         } finally {
            setIsLoading(false);
         }
      };

      fetchData();
   }, []);

   const filteredReviews = reviewData.filter((review) => {
      return review.tea?.tea_category?.category === selectedCategory;
   });

   if (isLoading) {
      return <LoadingSpinner />;
   }

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
            {filteredReviews.length > 0 ? (
               filteredReviews.map((review: Review) => (
                  <HomeReviewCard
                     key={review.id}
                     id={review.id}
                     teaName={review.tea?.tea_name || ''}
                     teaBrand={review.tea?.tea_brand || ''}
                     teaImg={review.tea?.tea_image || ''}
                     nickname={review.user?.nickname || '익명'}
                     title={review.review_title}
                     comment={review.review_comment}
                     score={review.tea_rate || 0}
                  />
               ))
            ) : (
               <p>해당 카테고리에 리뷰 데이터가 없습니다.</p>
            )}
         </section>
      </main>
   );
}
