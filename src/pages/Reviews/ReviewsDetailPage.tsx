import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { Button } from '@/components/Buttons/Buttons';
import { StarRatingAverage } from '@/components/Review/StarRate';
import {
   TeaColorCard,
   TeaReviewDetailCard,
   TeaTasteCard,
} from '@/components/TeaCard/CardComponents';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';
import AppHelmet from '@/components/Main/AppHelmet';
import { fetchSingleReview } from '@/utils/fetchData';
import { deleteReviewData } from '@/utils/deleteData';

interface Review {
   id: string;
   review_title: string;
   review_comment: string;
   tea_rate: 0 | 1 | 2 | 3 | 4 | 5;
   review_tasting_note: string[];
   tea_color: string;
   tea: {
      id: string;
      tea_name: string;
      tea_image: string;
      tea_brand: string;
      category: {
         category: string;
      };
   };
   user: {
      nickname: string;
      profile_img: string;
   };
}

interface User {
   nickname: string;
   profile_img: string;
}

export function Component() {
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();
   const [reviewData, setReviewData] = useState<Review | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [currentUser, setCurrentUser] = useState<User | null>(null);

   useEffect(() => {
      const userData = localStorage.getItem('@auth/user');
      if (userData) {
         setCurrentUser(JSON.parse(userData));
      }

      const getReviewData = async () => {
         try {
            setIsLoading(true);
            const data = await fetchSingleReview(id);
            if (!data) {
               throw new Error('리뷰 데이터를 찾을 수 없습니다.');
            }
            setReviewData(data);
         } catch (error) {
            setError(
               error instanceof Error
                  ? error.message
                  : '리뷰 데이터를 가져오는 데 실패했습니다.'
            );
         } finally {
            setIsLoading(false);
         }
      };

      getReviewData();
   }, [id]);

   const handleDeleteReview = async () => {
      if (!id) return;

      const result = await deleteReviewData(id);

      if (result) {
         toast.success('리뷰가 삭제되었습니다.');
         navigate('/reviews');
      } else {
         toast.error('리뷰 삭제에 실패했습니다.');
      }
   };

   if (isLoading) return <LoadingSpinner />;

   if (error) return <div>{error}</div>;

   if (!reviewData) return <div>리뷰 데이터를 찾을 수 없습니다.</div>;
   if (!reviewData.tea) return <div>차 데이터를 찾을 수 없습니다.</div>;

   const isAuthor = currentUser?.nickname === reviewData.user.nickname;

   return (
      <>
         <AppHelmet
            title={`${reviewData.tea.tea_name} 리뷰`}
            description={`Tea of the Day 티 리뷰 상세 - ${reviewData.user.nickname}님의 ${reviewData.tea.tea_name} 리뷰를 확인해보세요. 티의 맛, 색상, 향에 대한 상세한 평가와 함께 남겨진 솔직한 리뷰를 읽어보실 수 있습니다. Tea of the Day에서 다양한 티 리뷰를 통해 새로운 티 경험을 발견하세요.`}
         />
         <main className="flex flex-col items-center px-6">
            <div className="h-60 w-60 overflow-hidden rounded-full bg-white">
               <img
                  className="object-contain"
                  src={reviewData.tea.tea_image}
                  alt={reviewData.tea.tea_name}
               />
            </div>
            <h2 className="mt-6 text-xl font-bold">
               {reviewData?.tea.tea_name}
            </h2>
            <p className="text-stone-500">{reviewData?.tea.tea_brand}</p>
            <p className="my-4">{reviewData.user.nickname}</p>
            <StarRatingAverage score={reviewData.tea_rate} />
            <TeaTasteCard
               labels={reviewData.review_tasting_note}
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
            {isAuthor && (
               <>
                  <div className="mb-2 mt-6 w-full">
                     <Button
                        size="fullWidth"
                        content="리뷰 수정하기"
                        handleClick={() => navigate(`/reviews/edit/${id}`)}
                     />
                  </div>
                  <div className="w-full">
                     <Button
                        content="삭제"
                        size="fullWidth"
                        className="mt-2"
                        isError={true}
                        handleClick={handleDeleteReview}
                     />
                  </div>
               </>
            )}
         </main>
      </>
   );
}
