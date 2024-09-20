import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/Buttons/Buttons';
import { loadTasteNoteData } from '@/utils/fetchData';
import { createReviewData } from '@/utils/createData';
import { StarRatingAverage } from '@/components/Review/StarRate';
import {
   TeaColorCard,
   TeaTasteCard,
   TeaReviewDetailCard,
} from '@/components/TeaCard/CardComponents';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

export function Component() {
   const [tasteNoteData, setTasteNoteData] = useState<string[]>([]);
   const [selectedLabels, setSelectedLabels] = useState<boolean[]>([]);
   const [reviewTitle, setReviewTitle] = useState<string>('');
   const [reviewContent, setReviewContent] = useState<string>('');
   const [reviewColor, setReviewColor] = useState<string>('');
   const [teaRate, setTeaRate] = useState<number>(0);
   const [currentUser, setCurrentUser] = useState<string | null>(null);
   const { id } = useParams<{ id: string }>();
   const navigate = useNavigate();
   useEffect(() => {
      // 유저 정보 가져오기
      const userData = localStorage.getItem('@auth/user');
      if (userData) {
         try {
            const user = JSON.parse(userData);
            setCurrentUser(user.nickname); // 유저 닉네임을 저장
         } catch (error) {
            console.error(
               'Failed to parse user data from localStorage:',
               error
            );
         }
      }
   }, []);

   useEffect(() => {
      const fetchTasteNoteData = async () => {
         await loadTasteNoteData((data) => {
            const filteredData = data.filter(
               (note) => note !== '😋️ 가리는 거 없어요!'
            );
            setTasteNoteData(filteredData);
            setSelectedLabels(new Array(filteredData.length).fill(false));
         });
      };

      fetchTasteNoteData();
   }, []);

   const toggleLabelSelection = (index: number) => {
      setSelectedLabels((prevSelected) =>
         prevSelected.map((selected, i) => (i === index ? !selected : selected))
      );
   };

   const handleCreateReview = async () => {
      if (!id || !currentUser) {
         console.error('No tea ID or user information found');
         return;
      }

      const selectedTastingNotes = tasteNoteData.filter(
         (_, index) => selectedLabels[index]
      );

      const newReview = {
         review_tea: id,
         review_title: reviewTitle,
         review_comment: reviewContent,
         review_tasting_note: selectedTastingNotes,
         tea_color: reviewColor,
         tea_rate: teaRate,
         review_user: currentUser,
      };

      console.log('Creating review for tea ID:', id);
      console.log('New review data:', newReview);

      // 생성된 리뷰의 ID를 가져오기
      const reviewId = await createReviewData(newReview);

      if (reviewId) {
         toast.success('리뷰가 작성되었습니다.');
         console.log(`Navigating to /reviews/detail/${reviewId}`);
         try {
            navigate(`/reviews/detail/${reviewId}`);
         } catch (error) {
            console.error('Error navigating to the review detail page:', error);
         }
      } else {
         toast.error('리뷰 작성에 실패했습니다.');
      }
   };

   return (
      <main className="flex flex-col items-center px-6">
         <Helmet>
            <title>TOTD, 티 리뷰 작성 페이지</title>
         </Helmet>
         <h1 className="sr-only">리뷰 작성 페이지</h1>
         <div className="h-60 w-60 overflow-hidden rounded-full bg-white">
            <img
               className="object-contain"
               src="/default-tea-image.jpg" // 기본 이미지 사용
               alt="차 이미지"
            />
         </div>
         <h2>티 이름 및 정보</h2>
         <p className="my-4 text-stone-600">작성자 닉네임</p>
         <StarRatingAverage score={teaRate} onChangeScore={setTeaRate} />
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
            content="리뷰 작성하기"
            size="fullWidth"
            className="mt-6"
            handleClick={handleCreateReview}
         />
      </main>
   );
}
