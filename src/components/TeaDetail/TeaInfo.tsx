import { ButtonHeartwithCount } from '../Buttons/Buttons';
import { LabelGroup } from '../Labels/Labels';
import { StarRatingAverage } from '../Review/StarRate';
import { TeaBrewingGuide } from '../TeaCard/TeaBrewingGuide';

interface Label {
   label: string;
}

interface TeaData {
   img: string;
   category: string;
   name: string;
   brand: string;
   totalLike: number;
   score: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
   teaAmount: number;
   waterAmount: number;
   temperature: number;
   brewingTime: number;
   labels: Label[];
}

const data: TeaData = {
   img: '',
   category: '티 종류',
   name: '티 이름',
   brand: '티 브랜드',
   totalLike: 10,
   score: 3.5,
   teaAmount: 3,
   waterAmount: 200,
   temperature: 92,
   brewingTime: 6,
   labels: [{ label: '🍋 레몬' }, { label: '🍊 오렌지' }, { label: '🍯 꿀' }],
};

export default function TeaInfo() {
   return (
      <section className="flex flex-col items-center gap-4">
         <img
            className="h-[9.375rem] w-[9.375rem] rounded-full bg-stone-300"
            src={data.img}
            alt={`${data.brand}의 ${data.name}`} // DB 연결 후 alt 수정
         />
         <div className="-mb-2 flex flex-col items-center">
            <p className="text-xs font-light">{data.category}</p>
            <h2 className="text-xl font-bold">{data.name}</h2>
            <p className="text-xs font-light">{data.brand}</p>
         </div>
         <ButtonHeartwithCount
            totalLike={data.totalLike}
            onToggle={() => console.log('찜 버튼 토글됨')}
         />
         <StarRatingAverage
            score={data.score}
            aria-label={`리뷰 평균 별점 ${data.score}점`}
         />
         <LabelGroup labels={data.labels} size="small" />
         <TeaBrewingGuide
            teaAmount={data.teaAmount}
            waterAmount={data.waterAmount}
            temperature={data.temperature}
            brewingTime={data.brewingTime}
         />
      </section>
   );
}
