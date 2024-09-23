import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'; // useSearchParams 사용
import toast from 'react-hot-toast';

import { Button } from '@/components/Buttons/Buttons';
import { StarRating } from '@/components/Review/StarRate';
import {
   TeaColorCard,
   TeaTasteCard,
   TeaReviewDetailCard,
} from '@/components/TeaCard/CardComponents';
import AppHelmet from '@/components/Main/AppHelmet';
import { loadTasteNoteData, fetchTeaData } from '@/utils/fetchData';
import { createReviewData } from '@/utils/createData';
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
   const [rating, setRating] = useState(3);
   const [isEditable, setIsEditable] = useState(true);

   const [searchParams] = useSearchParams();
   const teaId = searchParams.get('teaId'); // teaId를 가져옴
   const navigate = useNavigate();

   useEffect(() => {
      const userData = localStorage.getItem('@auth/user');
      if (userData) {
         try {
            const user = JSON.parse(userData);
            setCurrentUser(user.nickname);
         } catch (error) {
            console.error(
               'Failed to parse user data from localStorage:',
               error
            );
         }
      }
   }, []);

   useEffect(() => {
      const fetchTeaInfo = async () => {
         if (!teaId) {
            console.error('No tea ID found in the query string');
            return;
         }

         try {
            const teaData = await fetchTeaData();
            console.log('Fetched tea data:', teaData);

            const selectedTea = teaData.find((tea) => tea.id == teaId);
            if (selectedTea) {
               setTeaInfo(selectedTea);
            } else {
               console.error('Tea with the given ID not found');
            }
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
      if (!reviewTitle.trim()) {
         toast.error('리뷰 제목을 입력해주세요.');
         return;
      }

      if (!reviewContent.trim()) {
         toast.error('리뷰 내용을 입력해주세요.');
         return;
      }

      if (!reviewColor.trim()) {
         toast.error('차의 수색을 선택해주세요.');
         return;
      }

      if (selectedLabels.every((label) => label === false)) {
         toast.error('테이스팅 노트를 선택해주세요.');
         return;
      }

      if (!teaId || !currentUser) {
         console.error('No tea ID or user information found');
         return;
      }

      const selectedTastingNotes = tasteNoteData.filter(
         (_, index) => selectedLabels[index]
      );

      const newReview = {
         review_tea: teaId,
         review_title: reviewTitle,
         review_comment: reviewContent,
         review_tasting_note: selectedTastingNotes,
         tea_color: reviewColor,
         tea_rate: rating,
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
         <AppHelmet
            title={`${teaInfo?.tea_name || '티'} 리뷰 작성`}
            description={`Tea of the Day 리뷰 작성 - Tea of the Day에서 ${teaInfo?.tea_name || '티'}에 대한 리뷰를 작성해보세요. 맛, 향, 색상 등 다양한 측면에서 당신의 티 경험을 공유하고, 다른 사람들과 소중한 의견을 나눠보세요. 당신만의 특별한 티 이야기를 만들어가세요.`}
         />
         <main className="flex flex-col items-center px-6">
            <h1 className="sr-only">리뷰 작성 페이지</h1>
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
