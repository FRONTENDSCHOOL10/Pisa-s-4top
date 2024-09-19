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
   review_title: string;
   review_comment: string;
   tea_rate: 0 | 1 | 2 | 3 | 4 | 5;
   tea: {
      id: string;
      tea_name: string;
      tea_image: string;
      category: string;
   };
   user: {
      nickname: string;
      profile_img: string;
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
               <HomeReviewCard
                  key={review.id}
                  id={review.id}
                  teaName={review.tea.tea_name}
                  teaImg={review.tea.tea_image}
                  nickname={review.user.nickname}
                  title={review.review_title}
                  comment={review.review_comment}
                  score={review.tea_rate}
               />
            ))}
         </section>
      </main>
   );
}
