import { useState, useEffect } from 'react';
import { fetchTeaData, fetchReviewData } from '@/utils/fetchData';
import TeaRecommendSwiper from '@/components/TeaCard/TeaRecommendSwiper';
import SearchInput from '@/components/Input/SearchInput';
import HomeReviewCard from '@/components/Review/HomeReviewCard';

export default function MainPage() {
   const [teaData, setTeaData] = useState([]);
   const [reviewData, setReviewData] = useState([]);

   useEffect(() => {
      // 티 데이터 가져오기
      const getTeaData = async () => {
         try {
            const data = await fetchTeaData();
            const formattedData = data.map((tea) => ({
               imageUrl: tea.tea_image,
               teaName: tea.tea_name,
               brand: tea.tea_brand,
            }));
            setTeaData(formattedData);
         } catch (error) {
            console.error('티 데이터를 가져오는데 실패했습니다:', error);
         }
      };

      // 리뷰 데이터 가져오기
      const getReviewData = async () => {
         try {
            const data = await fetchReviewData();
            console.log('Fetched review data:', data);
            setReviewData(data);
         } catch (error) {
            console.error('리뷰 데이터를 가져오는데 실패했습니다:', error);
         }
      };

      getTeaData();
      getReviewData();
   }, []);

   return (
      <main>
         <h1 className="sr-only">메인 페이지</h1>
         <SearchInput isButton={true} />
         <h2 className="mb-6 mt-16 text-3xl font-thin text-stone-950">
            상큼한
            <br />
            <strong className="font-extrabold">당신에게,</strong>{' '}
            <span className="sr-only">추천하는 차</span>
         </h2>
         <section className="h-72">
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
