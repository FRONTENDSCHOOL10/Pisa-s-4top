import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'; // useSearchParams 사용
import { Button } from '@/components/Buttons/Buttons';
import { loadTasteNoteData, fetchTeaData } from '@/utils/fetchData';
import { createReviewData } from '@/utils/createData';
import { StarRating, StarRatingAverage } from '@/components/Review/StarRate';
import {
   TeaColorCard,
   TeaTasteCard,
   TeaReviewDetailCard,
} from '@/components/TeaCard/CardComponents';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { getValidEmoji } from '@/utils/emojiMap';

export function Component() {
   const [tasteNoteData, setTasteNoteData] = useState<string[]>([]);
   const [selectedLabels, setSelectedLabels] = useState<boolean[]>([]);
   const [reviewTitle, setReviewTitle] = useState<string>('');
   const [reviewContent, setReviewContent] = useState<string>('');
   const [reviewColor, setReviewColor] = useState<string>('');
   const [teaRate, setTeaRate] = useState<number>(0);
   const [currentUser, setCurrentUser] = useState<string | null>(null);
   const [teaInfo, setTeaInfo] = useState<any>(null);
   const [rating, setRating] = useState(3); // 기본 별점 3점
   const [isEditable, setIsEditable] = useState(true); // editable 상태

   // useSearchParams를 사용하여 쿼리 스트링에서 teaId 가져오기
   const [searchParams] = useSearchParams();
   const teaId = searchParams.get('teaId'); // teaId를 가져옴
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

   // 차 정보 가져오기
   useEffect(() => {
      const fetchTeaInfo = async () => {
         if (!teaId) return; // teaId가 없으면 리턴
         try {
            const teaData = await fetchTeaData();
            const selectedTea = teaData.find((tea) => tea.id === teaId);
            setTeaInfo(selectedTea); // 차 정보 저장
         } catch (error) {
            console.error('Failed to fetch tea info:', error);
         }
      };
      fetchTeaInfo();
   }, [teaId]);

   useEffect(() => {
      const fetchTasteNoteData = async () => {
         try {
            const data = await loadTasteNoteData();
            console.log('Loaded taste note data:', data);

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

   const toggleLabelSelection = (index: number) => {
      setSelectedLabels((prevSelected) =>
         prevSelected.map((selected, i) => (i === index ? !selected : selected))
      );
   };

   const handleCreateReview = async () => {
      if (!teaId || !currentUser) {
         console.error('No tea ID or user information found');
         return;
      }

      const selectedTastingNotes = tasteNoteData.filter(
         (_, index) => selectedLabels[index]
      );

      // teaRate를 rating 값으로 설정
      const newReview = {
         review_tea: teaId,
         review_title: reviewTitle,
         review_comment: reviewContent,
         review_tasting_note: selectedTastingNotes,
         tea_color: reviewColor,
         tea_rate: rating, // teaRate를 rating 값으로 설정
         review_user: currentUser,
      };

      console.log('Creating review for tea ID:', teaId);
      console.log('New review data:', newReview);

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
      <>
         <Helmet>
            <title>TOTD, 티 리뷰 작성 페이지</title>
         </Helmet>
         <main className="flex flex-col items-center px-6">
            <h1 className="sr-only">리뷰 작성 페이지</h1>
            {/* 차 정보 표시 */}
            {teaInfo ? (
               <>
                  <div className="h-60 w-60 overflow-hidden rounded-full bg-white">
                     <img
                        className="object-contain"
                        src={teaInfo.tea_image || '/default-tea-image.jpg'}
                        alt={teaInfo.tea_name || '차 이미지'}
                     />
                  </div>
                  <h2 className="mt-6 text-xl font-bold">{teaInfo.tea_name}</h2>
                  <p className="text-stone-500">{teaInfo.tea_brand}</p>
               </>
            ) : (
               <p>티 정보를 불러오는 중입니다...</p>
            )}

            <p className="mb-3 mt-1 text-stone-600">
               {currentUser || '작성자 닉네임'}
            </p>
            <StarRating
               score={rating}
               setScore={setRating}
               editable={isEditable}
            />
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
      </>
   );
}
