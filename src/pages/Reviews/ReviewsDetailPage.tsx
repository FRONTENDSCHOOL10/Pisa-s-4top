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
import { useParams } from 'react-router-dom';

export function Component() {
   const [reviewData, setReviewData] = useState<any>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   // useParams로 URL 파라미터를 받아옴
   const { id } = useParams<{ id: string }>();

   useEffect(() => {
      console.log('Raw id from useParams:', id); // 디버깅용 로그
      if (!id) {
         setError('리뷰 ID를 찾을 수 없습니다.');
         setLoading(false);
         return;
      }

      const reviewId = decodeURIComponent(id); // id를 디코딩하여 사용

      const loadReviewData = async () => {
         try {
            const data = await fetchReviewData(reviewId); // 디코딩된 id 사용
            if (data && data.length > 0) {
               setReviewData(data[0]);
            } else {
               setError('리뷰 데이터를 찾을 수 없습니다.');
            }
         } catch (err) {
            console.error('리뷰 데이터를 가져오는 중 오류 발생:', err);
            setError('리뷰 데이터를 가져오는 중 오류가 발생했습니다.');
         } finally {
            setLoading(false);
         }
      };

      loadReviewData();
   }, [id]); // id가 변경될 때마다 데이터를 다시 로드

   if (loading) {
      return <LoadingSpinner />;
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
            labels={reviewData.review_tasting_note}
            selectedLabels={[false, false, false]}
            types="label"
            isEditable={false}
            className="mb-2 mt-8"
         />
         <TeaColorCard
            className="mb-2"
            initialColor={reviewData.teacolor.tea_color}
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
