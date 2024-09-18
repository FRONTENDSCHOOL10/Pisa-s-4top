import { ButtonHeartwithCount } from '../Buttons/Buttons';
import { LabelGroup } from '../Labels/Labels';
import { StarRatingAverage } from '../Review/StarRate';
import { TeaBrewingGuide } from '../TeaCard/TeaBrewingGuide';

interface TeaInfoProps {
   img: string;
   category: string;
   name: string;
   brand: string;
   totalLike: number;
   averageRate: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
   teaAmount: number;
   waterAmount: number;
   temperature: number;
   brewingTime: number;
   labels: string[];
}

export default function TeaInfo({
   img,
   category,
   name,
   brand,
   totalLike,
   averageRate,
   teaAmount,
   waterAmount,
   temperature,
   brewingTime,
   labels,
}: TeaInfoProps) {
   return (
      <section className="flex flex-col items-center gap-4">
         <img
            className="h-[9.375rem] w-[9.375rem] rounded-full bg-stone-300"
            src={img}
            alt={`${brand}의 ${name}`}
         />
         <div className="-mb-2 flex flex-col items-center">
            <p className="text-xs font-light">{category}</p>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-xs font-light">{brand}</p>
         </div>
         <ButtonHeartwithCount
            totalLike={totalLike}
            onToggle={() => console.log('찜 버튼 토글됨')}
         />
         <StarRatingAverage
            score={averageRate}
            aria-label={`리뷰 평균 별점 ${averageRate}점`}
         />
         <LabelGroup labels={labels} types="label" size="small" />
         <TeaBrewingGuide
            teaAmount={teaAmount}
            waterAmount={waterAmount}
            temperature={temperature}
            brewingTime={brewingTime}
         />
      </section>
   );
}
