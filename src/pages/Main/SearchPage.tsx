import SearchFilterButton from '@/components/Buttons/SearchFilterButton';
import SearchInput from '@/components/Input/SearchInput';
import { TeaRecommendCard } from '@/components/TeaCard/CardComponents';

// ! test용 코드: 추후 삭제
interface Tea {
   imageUrl: string;
   teaName: string;
   brand: string;
}

// ! test용 코드: 추후 삭제
const teaData: Tea[] = [
   { imageUrl: '', teaName: '얼그레이', brand: '브랜드1' },
   { imageUrl: '', teaName: '녹차', brand: '브랜드2' },
   { imageUrl: '', teaName: '홍차', brand: '브랜드3' },
   { imageUrl: '', teaName: '우롱차', brand: '브랜드4' },
   { imageUrl: '', teaName: '페퍼민트', brand: '브랜드5' },
   { imageUrl: '', teaName: '카모마일', brand: '브랜드6' },
   { imageUrl: '', teaName: '라벤더', brand: '브랜드7' },
   { imageUrl: '', teaName: '루이보스', brand: '브랜드8' },
];

export function Component() {
   return (
      <main className="flex flex-col gap-4">
         <h1 className="sr-only">검색 페이지</h1>

         <SearchInput />
         <SearchFilterButton filter={['상품', '리뷰']} />

         <div className="grid grid-cols-[repeat(auto-fill,_minmax(158px,_1fr))] gap-4">
            {teaData.map((tea: Tea, index: number) => (
               <div key={index} className="flex justify-center">
                  <TeaRecommendCard
                     imageUrl={tea.imageUrl}
                     teaName={tea.teaName}
                     brand={tea.brand}
                  />
               </div>
            ))}
         </div>
      </main>
   );
}
