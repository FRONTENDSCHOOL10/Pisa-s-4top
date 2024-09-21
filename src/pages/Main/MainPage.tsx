import { useState, useEffect } from 'react';
import {
   fetchFilteredTeaData,
   fetchMultipleReviews,
   fetchUserTaste,
} from '@/utils/fetchData';
import TeaRecommendSwiper from '@/components/TeaCard/TeaRecommendSwiper';
import SearchInput from '@/components/Input/SearchInput';
import HomeReviewCard from '@/components/Review/HomeReviewCard';
import { Helmet } from 'react-helmet-async';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';

const getUserNicknameFromLocalStorage = () => {
   const userString = localStorage.getItem('@auth/user');
   if (userString) {
      try {
         const userObject = JSON.parse(userString);
         return userObject.nickname;
      } catch (error) {
         console.error('Error parsing user data:', error);
      }
   }
   return null;
};

const formatTeaData = (teas) => {
   return teas.map((tea) => ({
      id: tea.id,
      imageUrl: tea.tea_image,
      teaName: tea.tea_name,
      brand: tea.tea_brand,
   }));
};

export default function MainPage() {
   const [teaData, setTeaData] = useState([]);
   const [reviewData, setReviewData] = useState([]);
   const [userTaste, setUserTaste] = useState('추천하는');
   const [userNickname, setUserNickname] = useState('');
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const userNickname = getUserNicknameFromLocalStorage();
            let userTasteResult = '추천하는';

            if (userNickname) {
               const tasteResult = await fetchUserTaste(userNickname);
               if (tasteResult) {
                  userTasteResult = tasteResult;
               }
            }
            setUserTaste(userTasteResult);

            // selectedCategory와 userNickname을 fetchFilteredTeaData에 전달
            const teaResult = await fetchFilteredTeaData('홍차', userNickname);
            const reviewResult = await fetchMultipleReviews();

            // 무작위로 20개의 티 데이터를 선택
            const randomTeaData = teaResult
               .sort(() => Math.random() - 0.5) // 데이터를 무작위로 섞음
               .slice(0, 20); // 20개의 데이터만 선택

            setTeaData(formatTeaData(randomTeaData));
            setReviewData(reviewResult || []);
            console.log('TeaData: ', randomTeaData);
         } catch (error) {
            console.error('Error fetching data:', error);
         } finally {
            setIsLoading(false);
         }
      };

      fetchData();
   }, []);

   if (isLoading) {
      return <LoadingSpinner />;
   }

   return (
      <main>
         <Helmet>
            <title>데일리 차 추천 서비스, Tea of the Day</title>
            <meta
               name="description"
               content="당신의 차 취향에 맞춘 추천 서비스, Tea of the Day"
            />
         </Helmet>
         <h1 className="sr-only">메인 페이지</h1>

         <SearchInput isButton={true} />

         <h2 className="mb-6 mt-16 text-3xl font-thin text-stone-950">
            {userTaste}
            <br />
            <strong className="font-extrabold">당신에게,</strong>{' '}
            <span className="sr-only">추천하는 차</span>
         </h2>

         <div className="absolute left-0">
            <TeaRecommendSwiper
               teaRecommendations={teaData}
               userNickname={userNickname}
            />
         </div>

         <h2 className="mb-4 mt-80 pt-4 text-2xl font-extralight">
            다른 사람들의 <strong className="font-semibold">리뷰</strong>
         </h2>

         <div className="flex flex-col gap-3">
            {Array.isArray(reviewData) && reviewData.length > 0 ? (
               reviewData.map((review) => (
                  <HomeReviewCard
                     key={review.id}
                     id={review.id}
                     teaImg={review.tea?.tea_image || '/default-tea-image.jpg'}
                     teaName={review.tea?.tea_name || '알 수 없는 차'}
                     title={review.review_title || '제목 없음'}
                     comment={review.review_comment || '내용 없음'}
                     nickname={review.user?.nickname || '익명'}
                     score={review.tea_rate}
                  />
               ))
            ) : (
               <p>아직 등록된 리뷰가 없습니다.</p>
            )}
         </div>
      </main>
   );
}
