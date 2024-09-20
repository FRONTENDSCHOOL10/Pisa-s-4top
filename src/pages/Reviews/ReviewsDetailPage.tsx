import { useEffect, useState } from 'react';
import { fetchReviewData } from '@/utils/fetchData';
import { Button } from '@/components/Buttons/Buttons';
import { StarRatingAverage } from '@/components/Review/StarRate';
import {
   TeaColorCard,
   TeaReviewDetailCard,
   TeaTasteCard,
} from '@/components/TeaCard/CardComponents';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';
import { useNavigate, useParams } from 'react-router-dom';

export function Component() {
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();
   const [reviewData, setReviewData] = useState<any>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const getReviewData = async () => {
         try {
            setIsLoading(true);
            const data = await fetchReviewData(id);
            setReviewData(data);
            console.log(data);
         } catch (error) {
            console.error('Failed to fetch review data:', error);
            setError('리뷰 데이터를 가져오는 데 실패했습니다.');
         } finally {
            setIsLoading(false);
         }
      };

      getReviewData();
   }, [id]);

   // 로딩 중인 경우 로딩 스피너를 표시
   if (isLoading) {
      return <LoadingSpinner />;
   }

   // 에러가 발생한 경우 에러 메시지 표시
   if (error) {
      return <div>{error}</div>;
   }

   // 데이터가 없는 경우 처리
   if (!reviewData) {
      return <div>리뷰 데이터를 찾을 수 없습니다.</div>;
   }

   if (!reviewData.tea) {
      return <div>차 데이터를 찾을 수 없습니다.</div>;
   }

   return (
      <main className="flex flex-col items-center px-6 pb-20">
         <div className="h-60 w-60 overflow-hidden rounded-full bg-white">
            <img
               className="object-contain"
               src={reviewData.tea.tea_image}
               alt={reviewData.tea.tea_name}
            />
         </div>
         <p className="my-4">{reviewData.user.nickname}</p>
         <StarRatingAverage score={reviewData.tea_rate} />

         <TeaTasteCard
            labels={reviewData.review_tasting_note || []}
            selectedLabels={reviewData.review_tasting_note.map(() => false)}
            types="label"
            isEditable={false}
            className="mb-2 mt-8"
         />

         <TeaColorCard
            className="mb-2"
            initialColor={reviewData.tea_color}
            disabled={true}
         />

         <TeaReviewDetailCard
            title={reviewData.review_title}
            contents={reviewData.review_comment}
         />

         <div className="mb-2 mt-6 w-full">
            <Button
               size="fullWidth"
               content="리뷰 수정하기"
               handleClick={() => console.log('리뷰 수정하기 버튼 클릭됨')}
            />
         </div>
         <div className="w-full">
            <Button
               size="fullWidth"
               isError={true}
               content="삭제"
               handleClick={() => console.log('리뷰 삭제 버튼 클릭됨')}
            />
         </div>
      </main>
   );
}
