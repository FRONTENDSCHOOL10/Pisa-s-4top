import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TabButton } from '@/components/Buttons/TabButton';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';
import HomeReviewCard from '@/components/Review/HomeReviewCard';
import { fetchTeaCategoryData, fetchMultipleReviews } from '@/utils/fetchData';

interface TeaCategory {
   id: string;
   category: string;
}

interface Review {
   id: string;
   review_title: string;
   review_comment: string;
   tea_color: string;
   review_tasting_note: string[];
   tea_rate: 0 | 1 | 2 | 3 | 4 | 5;
   tea: {
      id: string;
      tea_name: string;
      tea_image: string;
      tea_category: {
         id: string;
         category: string;
      };
   };
   user: {
      nickname: string;
      profile_img: string;
   };
}

export function Component() {
   const navigate = useNavigate();
   const [categories, setCategories] = useState<TeaCategory[]>([]);
   const [selectedCategory, setSelectedCategory] = useState<string>('');
   const [reviewData, setReviewData] = useState<Review[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         setIsLoading(true);
         try {
            // 사용자 정보 가져오기
            const userData = localStorage.getItem('@auth/user');
            if (!userData) {
               navigate('/login');
               return;
            }
            const user = JSON.parse(userData);

            const categoryData = await fetchTeaCategoryData();
            if (categoryData) {
               setCategories(categoryData as TeaCategory[]);
               if (categoryData.length > 0) {
                  setSelectedCategory(categoryData[0].category);
               }
            }

            const data = await fetchMultipleReviews();
            // 사용자의 리뷰만 필터링
            if (data) {
               const userReviews = data.filter(
                  (review: any) => review.user.nickname === user.nickname
               );
               setReviewData(userReviews as Review[]);
            }
         } catch (error) {
            console.error('Failed to fetch data:', error);
         } finally {
            setIsLoading(false);
         }
      };

      fetchData();
   }, [navigate]);

   const filteredReviews = reviewData.filter(
      (review) => review.tea.tea_category.category === selectedCategory
   );

   if (isLoading) {
      return <LoadingSpinner />;
   }

   return (
      <main className="flex flex-col gap-5">
         <h1 className="sr-only">내 리뷰 리스트 페이지</h1>
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
                     teaName={review.tea.tea_name}
                     teaImg={review.tea.tea_image}
                     nickname={review.user.nickname}
                     title={review.review_title}
                     comment={review.review_comment}
                     score={review.tea_rate}
                  />
               ))
            ) : (
               <p>이 카테고리에 작성한 리뷰가 없습니다</p>
            )}
         </section>
      </main>
   );
}
