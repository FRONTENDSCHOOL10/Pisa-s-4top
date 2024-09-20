import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/Buttons/Buttons';
import { loadTasteNoteData, fetchReviewData } from '@/utils/fetchData';
import { updateReviewData } from '@/utils/updateData';
import { StarRatingAverage } from '@/components/Review/StarRate';
import {
   TeaColorCard,
   TeaReviewDetailCard,
   TeaTasteCard,
} from '@/components/TeaCard/CardComponents';
import toast from 'react-hot-toast';

export function Component() {
   const [tasteNoteData, setTasteNoteData] = useState<string[]>([]);
   const [selectedLabels, setSelectedLabels] = useState<boolean[]>([]);
   const [reviewData, setReviewData] = useState<any>(null);
   const [reviewTitle, setReviewTitle] = useState<string>('');
   const [reviewContent, setReviewContent] = useState<string>('');
   const [reviewColor, setReviewColor] = useState<string>('');
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();

   useEffect(() => {
      // 테이스팅 노트 데이터를 불러오는 함수
      const fetchTasteNoteData = async () => {
         try {
            const data = await loadTasteNoteData();
            const filteredData = data.filter(
               (note) => note !== '😋️ 가리는 거 없어요!'
            );
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
         const review = await fetchReviewData(id);
         if (review) {
            setReviewData(review);
            setReviewTitle(review.review_title);
            setReviewContent(review.review_comment);
            setReviewColor(review.tea_color);

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

      const updatedTastingNotes = tasteNoteData.filter(
         (_, index) => selectedLabels[index]
      );

      const updatedReview = {
         review_title: reviewTitle,
         review_comment: reviewContent,
         review_tasting_note: updatedTastingNotes,
         tea_color: reviewColor,
      };

      // 기존 데이터와의 비교
      if (
         reviewData.review_title === updatedReview.review_title &&
         reviewData.review_comment === updatedReview.review_comment &&
         JSON.stringify(reviewData.review_tasting_note) ===
            JSON.stringify(updatedReview.review_tasting_note) &&
         reviewData.tea_color === updatedReview.tea_color
      ) {
         toast.error('업데이트할 내용이 없습니다.');
         return;
      }

      // 리뷰 업데이트 로직
      const result = await updateReviewData(id, updatedReview);

      if (result) {
         toast.success('리뷰가 수정되었습니다.');
         navigate(`/reviews/detail/${id}`);
      } else {
         toast.error('리뷰 수정에 실패했습니다.');
      }
   };

   return (
      <main className="flex flex-col items-center px-6">
         <h1 className="sr-only">리뷰 수정 페이지</h1>
         <div className="h-60 w-60 overflow-hidden rounded-full bg-white">
            <img
               className="object-contain"
               src={reviewData?.tea.tea_image}
               alt={reviewData?.tea.tea_name}
            />
         </div>
         <p className="my-4 text-stone-600">{reviewData?.user.nickname}</p>
         <StarRatingAverage score={reviewData?.tea_rate} />

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
         />
      </main>
   );
}
