import { Button } from '@/components/Buttons/Buttons';
import { TeaDescriptionCard } from '@/components/TeaCard/CardComponents';
import TeaInfo from '@/components/TeaDetail/TeaInfo';
import TeaReviewList from '@/components/TeaDetail/TeaReviewList';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
   fetchTeaData,
   fetchTeaTastingNotes,
   fetchReviewData,
} from '@/utils/fetchData';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';
import { calculateAverageRate } from '@/utils/calculateAverageRate';

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

export function Component() {
   const { id } = useParams<{ id: string }>();
   const [tea, setTea] = useState<Tea | null>(null);
   const [labels, setLabels] = useState<string[]>([]);
   const [reviews, setReviews] = useState<Review[]>([]);
   const [averageRate, setAverageRate] = useState<
      0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5
   >(0);

   useEffect(() => {
      const getTeaData = async () => {
         try {
            if (!id) return;

            const teaData = await fetchTeaData();
            const selectedTea = teaData.find((item: Tea) => item.id === id);
            setTea(selectedTea || null);

            if (selectedTea) {
               const tastingNotes = await fetchTeaTastingNotes(selectedTea.id);
               setLabels(tastingNotes);

               const reviewsData = await fetchReviewData(id); // 여기서 id를 인자로 전달
               setReviews(reviewsData);
               setAverageRate(calculateAverageRate(reviewsData));
            }
         } catch (error) {
            console.error('Failed to fetch tea data:', error);
         }
      };

      getTeaData();
   }, [id]);

   if (!tea) {
      return <LoadingSpinner />;
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
               totalLike={tea.total_like}
               averageRate={averageRate}
               teaAmount={tea.tea_amount}
               waterAmount={tea.tea_water_amount}
               temperature={tea.tea_temperature}
               brewingTime={tea.tea_brew_time}
               labels={labels}
            />
            <Button
               isLink={true}
               href="/reviews/write"
               ariaLabel="리뷰 작성 페이지"
               content="리뷰 쓰기"
               size="fullWidth"
               className="mb-2 mt-4"
            />
         </div>
         <TeaDescriptionCard description={tea.tea_detail} />
         <TeaReviewList reviews={reviews} />
      </main>
   );
}
