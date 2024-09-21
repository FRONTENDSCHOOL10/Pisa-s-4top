import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/Buttons/Buttons';
import {
   TeaDescriptionCard,
   TeaRecipeCard,
} from '@/components/TeaCard/CardComponents';
import TeaInfo from '@/components/TeaDetail/TeaInfo';
import TeaReviewList from '@/components/TeaDetail/TeaReviewList';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';
import {
   fetchTeaData,
   fetchTeaTastingNotes,
   fetchReviewData,
} from '@/utils/fetchData';
import { calculateAverageRate } from '@/utils/calculateAverageRate';
import {
   addLike,
   removeLike,
   checkLikeStatus,
   fetchTotalLikes,
} from '@/utils/likeData';

interface Tea {
   id: string;
   tea_name: string;
   tea_category: string;
   tea_brand: string;
   tea_image: string;
   tea_amount: number;
   tea_water_amount: number;
   tea_temperature: number;
   tea_brew_time: number;
   tea_detail: string;
   total_like: number;
}

interface Review {
   id: string;
   review_title: string;
   review_comment: string;
   tea_rate: 0 | 1 | 2 | 3 | 4 | 5;
   tea: {
      id: string;
      tea_name: string;
      category: string;
   };
   user: {
      nickname: string;
      profile_img: string;
   };
}

interface User {
   id: string;
   nickname: string;
}

export function Component() {
   const { id } = useParams<{ id: string }>();
   const [tea, setTea] = useState<Tea | null>(null);
   const [labels, setLabels] = useState<string[]>([]);
   const [reviews, setReviews] = useState<Review[]>([]);
   const [averageRate, setAverageRate] = useState<
      0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5
   >(0);
   const [currentUser, setCurrentUser] = useState<User | null>(null);
   const [isLiked, setIsLiked] = useState(false);
   const [likeCount, setLikeCount] = useState(0);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const getCurrentUser = () => {
         const userData = localStorage.getItem('@auth/user');
         if (userData) {
            try {
               const user = JSON.parse(userData);
               setCurrentUser(user);
            } catch (error) {
               console.error(
                  'Failed to parse user data from localStorage:',
                  error
               );
            }
         }
      };

      getCurrentUser();
   }, []);

   useEffect(() => {
      const getTeaData = async () => {
         setIsLoading(true);
         setError(null);

         if (!id) {
            setError('Tea ID is missing');
            setIsLoading(false);
            return;
         }

         try {
            const teaData = await fetchTeaData();
            const selectedTea = teaData.find((item: Tea) => item.id === id);

            if (!selectedTea) {
               setError('Tea not found');
               return;
            }

            console.log('Selected tea data:', selectedTea);
            setTea(selectedTea);

            const tastingNotes = await fetchTeaTastingNotes(selectedTea.id);
            setLabels(tastingNotes);

            const reviewsData = await fetchReviewData({ teaId: id });
            setReviews(reviewsData);
            setAverageRate(calculateAverageRate(reviewsData));

            const totalLikes = await fetchTotalLikes(selectedTea.id);
            setLikeCount(totalLikes);

            if (currentUser) {
               const likeStatus = await checkLikeStatus(
                  currentUser.nickname,
                  id
               );
               setIsLiked(likeStatus);
            }
         } catch (error) {
            console.error('Failed to fetch tea data:', error);
            setError('Failed to load tea data. Please try again.');
         } finally {
            setIsLoading(false);
         }
      };

      getTeaData();
   }, [id, currentUser]);

   const handleLikeToggle = async () => {
      if (!currentUser || !tea) {
         console.log('User not logged in or tea data not available');
         return;
      }

      try {
         if (isLiked) {
            await removeLike(currentUser.nickname, tea.id);
         } else {
            await addLike(currentUser.nickname, tea.id);
         }
         setIsLiked(!isLiked);

         // Update total likes count
         const updatedTotalLikes = await fetchTotalLikes(tea.id);
         setLikeCount(updatedTotalLikes);
      } catch (error) {
         console.error('Error toggling like:', error);
      }
   };

   if (isLoading) {
      return <LoadingSpinner />;
   }

   if (error) {
      return <div>{error}</div>;
   }

   if (!tea) {
      return <div>티 데이터를 불러오지 못했습니다.</div>;
   }

   return (
      <main className="flex flex-col gap-4">
         <h1 className="sr-only">티 상세 페이지</h1>
         <div className="mx-8">
            <TeaInfo
               img={tea.tea_image}
               category={tea.tea_category}
               name={tea.tea_name}
               brand={tea.tea_brand}
               totalLike={likeCount}
               isLiked={isLiked}
               handleToggle={handleLikeToggle}
               averageRate={averageRate}
               teaAmount={tea.tea_amount}
               waterAmount={tea.tea_water_amount}
               temperature={tea.tea_temperature}
               brewingTime={tea.tea_brew_time}
               labels={labels}
            />
            <Button
               isLink={true}
               href={`/reviews/write?teaId=${tea.id}`}
               ariaLabel="리뷰 작성 페이지"
               content="리뷰 쓰기"
               size="fullWidth"
               className="mb-2 mt-4"
            />
         </div>
         <TeaDescriptionCard description={tea.tea_detail} />
         <TeaReviewList reviews={reviews} />
         <TeaRecipeCard title="" imageUrl="" steps={[]} />
      </main>
   );
}
