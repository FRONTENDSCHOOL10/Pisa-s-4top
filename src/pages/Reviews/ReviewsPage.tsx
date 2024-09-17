import { TabButton } from '@/components/Buttons/TabButton';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';
import HomeReviewCard from '@/components/Review/HomeReviewCard';
import { fetchTeaCategoryData, fetchReviewData } from '@/utils/fetchData';
import { useEffect, useState } from 'react';

interface TeaCategory {
   id: string;
   category: string;
}

interface Review {
   id: string;
   review_user: string;
   review_title: string;
   review_comment: string;
   tea_rate: 0 | 1 | 2 | 3 | 4 | 5;
   tea: {
      id: string;
      tea_name: string;
      category: string;
   };
}

export function Component() {
   const [categories, setCategories] = useState<TeaCategory[]>([]);
   const [selectedCategory, setSelectedCategory] = useState<string>('');
   const [reviewData, setReviewData] = useState<Review[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         setIsLoading(true);
         try {
            const categoryData = await fetchTeaCategoryData();
            setCategories(categoryData);

            if (categoryData.length > 0) {
               setSelectedCategory(categoryData[0].category);
            }

            const data = await fetchReviewData();
            setReviewData(data);
         } catch (error) {
            console.error('Failed to fetch data:', error);
         } finally {
            setIsLoading(false);
         }
      };

      fetchData();
   }, []);

   const filteredReviews = reviewData.filter(
      (review) => review.tea.category === selectedCategory
   );

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
            {filteredReviews.map((review: Review) => (
               // 프로필 이미지 데이터 연결 안함
               <HomeReviewCard
                  key={review.id}
                  id={review.id}
                  nickname={review.review_user}
                  title={review.review_title}
                  comment={review.review_comment}
                  score={review.tea_rate}
               />
            ))}
         </section>
      </main>
   );
}
