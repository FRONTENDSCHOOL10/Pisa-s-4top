import { Button } from '@/components/Buttons/Buttons';
import { TeaDescriptionCard } from '@/components/TeaCard/CardComponents';
import TeaInfo from '@/components/TeaDetail/TeaInfo';
import TeaReviewList from '@/components/TeaDetail/TeaReviewList';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchTeaData, fetchTeaTastingNotes } from '@/utils/fetchData';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';

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
   score: number; //review 데이터 추가 후 수정 예정
}

export function Component() {
   const { id } = useParams<{ id: string }>();
   const [tea, setTea] = useState<Tea | null>(null);
   const [labels, setLabels] = useState<string[]>([]);

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
               score={
                  tea.score as
                     | 0
                     | 0.5
                     | 1
                     | 1.5
                     | 2
                     | 2.5
                     | 3
                     | 3.5
                     | 4
                     | 4.5
                     | 5
               } // review 데이터 추가 후 수정 예정
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
         <TeaReviewList /> // review 데이터 추가 후 수정 예정
      </main>
   );
}
