import { useState, useEffect } from 'react';

import TeaRecommendSwiper from '@/components/TeaCard/TeaRecommendSwiper';
import SearchInput from '@/components/Input/SearchInput';
import HomeReviewCard from '@/components/Review/HomeReviewCard';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';
import AppHelmet from '@/components/Main/AppHelmet';
import {
   fetchFilteredTeaData,
   fetchMultipleReviews,
   fetchUserTaste,
} from '@/utils/fetchData';

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

            const teaResult = await fetchFilteredTeaData('', userNickname);
            const reviewResult = await fetchMultipleReviews();

            setUserNickname(userNickname);

            const randomTeaData = teaResult
               .sort(() => Math.random() - 0.5)
               .slice(0, 20);

            setTeaData(formatTeaData(randomTeaData));
            setReviewData(reviewResult || []);
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
      <>
         <AppHelmet
            title="데일리 차 추천 서비스, Tea of the Day"
            description="Tea of the Day에서 당신의 취향에 맞는 차를 찾아보세요. 개인화된 추천 시스템으로 새로운 차를 발견하고, 다른 사용자들의 리뷰를 통해 다양한 차 경험을 공유하세요. 차 애호가들을 위한 최고의 플랫폼, Tea of the Day에서 당신만의 특별한 차 여정을 시작하세요."
         />
         <main>
            <h1 className="sr-only">메인 페이지</h1>
            <SearchInput isButton={true} />
            <h2 className="mb-6 mt-16 text-3xl font-bold text-stone-950">
               {userTaste}
               <br />
               <span className="font-light">{userNickname}에게,</span>
               <span className="sr-only">추천하는 차</span>
            </h2>
            <div className="absolute left-0 w-full">
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
                        teaImg={
                           review.tea?.tea_image || '/default-tea-image.jpg'
                        }
                        teaName={review.tea?.tea_name || '알 수 없는 차'}
                        teaBrand={review.tea?.tea_brand || '알 수 없는 브랜드'}
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
      </>
   );
}
