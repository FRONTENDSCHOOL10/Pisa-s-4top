import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { Button } from '@/components/Buttons/Buttons';
import { StarRating } from '@/components/Review/StarRate';
import {
   TeaColorCard,
   TeaReviewDetailCard,
   TeaTasteCard,
} from '@/components/TeaCard/CardComponents';
import AppHelmet from '@/components/Main/AppHelmet';
import { fetchSingleReview, loadTasteNoteData } from '@/utils/fetchData';
import { updateReviewData } from '@/utils/updateData';
import { deleteReviewData } from '@/utils/deleteData';
import { getValidEmoji } from '@/utils/emojiMap';

export function Component() {
   const [tasteNoteData, setTasteNoteData] = useState<string[]>([]);
   const [selectedLabels, setSelectedLabels] = useState<boolean[]>([]);
   const [reviewData, setReviewData] = useState<any>(null);
   const [reviewTitle, setReviewTitle] = useState<string>('');
   const [rating, setRating] = useState(3);
   const [reviewContent, setReviewContent] = useState<string>('');
   const [reviewColor, setReviewColor] = useState<string>('');
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();

   useEffect(() => {
      const fetchTasteNoteData = async () => {
         try {
            const data = await loadTasteNoteData();

            if (!data) {
               throw new Error('Taste note data is undefined or null');
            }

            const filteredData = data
               .filter((note) => note !== '😋️ 가리는 거 없어요!')
               .map((note) => getValidEmoji(note));

            setTasteNoteData(filteredData);
            setSelectedLabels(new Array(filteredData.length).fill(false));
         } catch (error) {
            console.error('Failed to load taste note data:', error);
         }
      };

      fetchTasteNoteData();
   }, []);

   useEffect(() => {
      if (!id || tasteNoteData.length === 0) return;

      const fetchReview = async () => {
         const review = await fetchSingleReview(id);
         if (review) {
            setReviewData(review);
            setReviewTitle(review.review_title);
            setReviewContent(review.review_comment);
            setReviewColor(review.tea_color);
            setRating(review.tea_rate);

            const existingTastes = review.review_tasting_note || [];
            setSelectedLabels(
               tasteNoteData.map((taste) => existingTastes.includes(taste))
            );
         }
      };

      fetchReview();
   }, [id, tasteNoteData]);

   const toggleLabelSelection = (index: number) => {
      setSelectedLabels((prevSelected) =>
         prevSelected.map((selected, i) => (i === index ? !selected : selected))
      );
   };

   const handleUpdateReview = async () => {
      if (!id) return;

      if (!reviewTitle.trim()) {
         toast.error('리뷰 제목을 입력해주세요.');
         return;
      }

      if (!reviewContent.trim()) {
         toast.error('리뷰 내용을 입력해주세요.');
         return;
      }

      if (!reviewColor.trim()) {
         toast.error('차의 색상을 선택해주세요.');
         return;
      }

      if (selectedLabels.every((label) => label === false)) {
         toast.error('테이스팅 노트를 선택해주세요.');
         return;
      }

      const updatedTastingNotes = tasteNoteData.filter(
         (_, index) => selectedLabels[index]
      );

      const updatedReview = {
         review_title: reviewTitle,
         tea_rate: rating,
         review_comment: reviewContent,
         review_tasting_note: updatedTastingNotes,
         tea_color: reviewColor,
      };

      if (
         reviewData.review_title === updatedReview.review_title &&
         reviewData.review_comment === updatedReview.review_comment &&
         JSON.stringify(reviewData.review_tasting_note) ===
            JSON.stringify(updatedReview.review_tasting_note) &&
         reviewData.tea_color === updatedReview.tea_color &&
         reviewData.tea_rate === updatedReview.tea_rate
      ) {
         toast.error('업데이트할 내용이 없습니다.');
         return;
      }

      const result = await updateReviewData(id, updatedReview);

      if (result) {
         toast.success('리뷰가 수정되었습니다.');
         navigate(`/reviews/detail/${id}`);
      } else {
         toast.error('리뷰 수정에 실패했습니다.');
      }
   };

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

   return (
      <>
         <AppHelmet
            title={`${reviewData?.tea.tea_name} 리뷰 수정`}
            description={`Tea of the Day 티 리뷰 수정 - ${reviewData?.tea.tea_name}에 대한 리뷰를 수정합니다. 티의 맛, 향, 색상에 대한 평가를 업데이트하고, 당신의 티 경험을 더욱 정확하게 표현해보세요. Tea of the Day에서 티 리뷰를 통해 다양한 티의 세계를 공유하세요.`}
         />
         <main className="flex flex-col items-center px-6">
            <h1 className="sr-only">리뷰 수정 페이지</h1>
            <div className="h-60 w-60 overflow-hidden rounded-full bg-white">
               <img
                  className="object-contain"
                  src={reviewData?.tea.tea_image}
                  alt={reviewData?.tea.tea_name}
               />
            </div>
            <h2 className="mt-6 text-xl font-bold">
               {reviewData?.tea.tea_name}
            </h2>
            <p className="text-stone-500">{reviewData?.tea.tea_brand}</p>
            <p className="my-4 text-stone-600">{reviewData?.user.nickname}</p>
            <StarRating setScore={setRating} editable={true} score={rating} />
            <TeaTasteCard
               labels={tasteNoteData}
               className="mb-2 mt-8"
               selectedLabels={selectedLabels}
               handleToggleLabel={toggleLabelSelection}
               types="button"
            />
            <TeaColorCard
               className="mb-2"
               initialColor={reviewColor}
               onColorChange={setReviewColor}
            />
            <TeaReviewDetailCard
               title={reviewTitle}
               contents={reviewContent}
               isEditable={true}
               onChangeTitle={setReviewTitle}
               onChangeContents={setReviewContent}
            />
            <Button
               content="리뷰 수정하기"
               size="fullWidth"
               className="mt-6"
               handleClick={handleUpdateReview}
            />
            <Button
               content="삭제"
               size="fullWidth"
               className="mt-2"
               isError={true}
               handleClick={handleDeleteReview}
            />
         </main>
      </>
   );
}
