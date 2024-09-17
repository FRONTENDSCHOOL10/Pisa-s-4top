import { TabButton } from '@/components/Buttons/TabButton';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';
import HomeReviewCard from '@/components/Review/HomeReviewCard';
import { fetchTeaCategoryData, fetchReviewData } from '@/utils/fetchData';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

interface UserInfo {
   nickname: string;
   profile_img: string;
}

export function Component() {
   const navigate = useNavigate();
   const [categories, setCategories] = useState<TeaCategory[]>([]);
   const [selectedCategory, setSelectedCategory] = useState<string>('');
   const [reviewData, setReviewData] = useState<Review[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

   useEffect(() => {
      const fetchData = async () => {
         setIsLoading(true);
         try {
            // 사용자 정보 가져오기
            const userString = localStorage.getItem('@auth/user');
            if (!userString) {
               navigate('/login');
               return;
            }
            const user: UserInfo = JSON.parse(userString);
            setUserInfo(user);

            const categoryData = await fetchTeaCategoryData();
            setCategories(categoryData);

            if (categoryData.length > 0) {
               setSelectedCategory(categoryData[0].category);
            }

            const data = await fetchReviewData();
            // 사용자의 리뷰만 필터링
            const userReviews = data.filter(
               (review) => review.review_user === user.nickname
            );
            setReviewData(userReviews);
         } catch (error) {
            console.error('Failed to fetch data:', error);
         } finally {
            setIsLoading(false);
         }
      };

      fetchData();
   }, [navigate]);

   const filteredReviews = reviewData.filter(
      (review) => review.tea.category === selectedCategory
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
                     nickname={review.review_user}
                     title={review.review_title}
                     comment={review.review_comment}
                     score={review.tea_rate}
                     profileImg={
                        userInfo?.profile_img || '/assets/profileDefault.webp'
                     }
                  />
               ))
            ) : (
               <p>이 카테고리에 작성한 리뷰가 없습니다</p>
            )}
         </section>
      </main>
   );
}
