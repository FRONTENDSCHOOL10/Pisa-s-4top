import { useState, useEffect } from 'react';
import {
   fetchTeaData,
   fetchReviewData,
   fetchUserTaste,
} from '@/utils/fetchData';
import TeaRecommendSwiper from '@/components/TeaCard/TeaRecommendSwiper';
import SearchInput from '@/components/Input/SearchInput';
import HomeReviewCard from '@/components/Review/HomeReviewCard';
import { Helmet } from 'react-helmet-async';

export default function MainPage() {
   const [teaData, setTeaData] = useState([]);
   const [reviewData, setReviewData] = useState([]);
   const [userTaste, setUserTaste] = useState('추천하는');

   useEffect(() => {
      const fetchData = async () => {
         try {
            // localStorage에서 사용자 정보 가져오기
            const userString = localStorage.getItem('@auth/user');
            console.log('User Data from localStorage:', userString);

            let userNickname = null;

            if (userString) {
               const userObject = JSON.parse(userString);
               userNickname = userObject.nickname;
               console.log('Parsed userNickname:', userNickname);
            }

            // 사용자 취향 가져오기
            let userTasteResult = '추천하는'; // 기본 값 설정
            if (userNickname) {
               userTasteResult = await fetchUserTaste(userNickname);
               console.log(
                  'User Taste Result from fetchUserTaste:',
                  userTasteResult
               );
            } else {
               console.log('No userNickname found');
            }

            // 사용자 취향 업데이트
            setUserTaste(userTasteResult || '추천하는');
            console.log(
               'Updated userTaste state:',
               userTasteResult || '추천하는'
            );

            // 티와 리뷰 데이터를 병렬로 가져오기
            const [teaResult, reviewResult] = await Promise.all([
               fetchTeaData(),
               fetchReviewData(),
            ]);
            console.log('Fetched teaResult:', teaResult);
            console.log('Fetched reviewResult:', reviewResult);

            setTeaData(formatTeaData(teaResult));
            setReviewData(reviewResult);
            console.log('Formatted teaData state:', formatTeaData(teaResult));
            console.log('Updated reviewData state:', reviewResult);
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      };

      fetchData();
   }, []);

   // Helper function to format tea data
   const formatTeaData = (teaResult) => {
      console.log('Formatting tea data:', teaResult);
      return teaResult.map((tea) => ({
         imageUrl: tea.tea_image,
         teaName: tea.tea_name,
         brand: tea.tea_brand,
      }));
   };

   return (
      <main>
         <Helmet>
            <title>데일리 차 추천 서비스, Tea of the Day</title>
            <meta name="description" content="데일리 티 추천 서비스, TOTD" />
         </Helmet>
         <h1 className="sr-only">메인 페이지</h1>
         <SearchInput isButton={true} />
         <h2 className="mb-6 mt-16 text-3xl font-thin text-stone-950">
            {userTaste}
            <br />
            <strong className="font-extrabold">당신에게,</strong>{' '}
            <span className="sr-only">추천하는 차</span>
         </h2>
         <section className="relative h-72">
            <div className="absolute left-0">
               <TeaRecommendSwiper teaRecommendations={teaData} />
            </div>
         </section>
         <h3 className="mb-4 mt-12 text-2xl font-extralight">
            다른 사람들의 <strong className="font-semibold">리뷰</strong>
         </h3>

         <div className="flex flex-col gap-3">
            {reviewData.map((review) => (
               <HomeReviewCard
                  id={review.id}
                  teaImg={review.tea.tea_image}
                  teaName={review.tea.tea_name}
                  title={review.review_title}
                  comment={review.review_comment}
                  nickname={review.review_user}
                  score={review.tea_rate}
               />
            ))}
         </div>
      </main>
   );
}
