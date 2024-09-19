import SearchFilterButton from '@/components/Buttons/SearchFilterButton';
import SearchInput from '@/components/Input/SearchInput';
import HomeReviewCard from '@/components/Review/HomeReviewCard';
import SearchCount from '@/components/Search/SearchCount';
import SearchMessage from '@/components/Search/SearchMessage';
import { TeaRecommendCard } from '@/components/TeaCard/CardComponents';
import { useInputFocus } from '@/hooks/useInputFocus';
import { getSearchReviewData } from '@/utils/getSearchReviewData';
import { getSearchTeaData } from '@/utils/getSearchTeaData';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

interface Tea {
   id: string;
   tea_name: string;
   tea_category: string;
   tea_brand: string;
   tea_image: string;
}

interface Review {
   id: string;
   review_title: string;
   review_comment: string;
   tea_rate: 0 | 1 | 2 | 3 | 4 | 5;
   users: {
      nickname: string;
   };
   tea: {
      tea_name: string;
      tea_image: string;
   };
}

export function Component() {
   const [selectedFilter, setSelectedFilter] = useState<number>(0);
   const [searchTeaResults, setSearchTeaResults] = useState<Tea[]>([]);
   const [searchReviewResults, setSearchReviewResults] = useState<Review[]>([]);
   const [searchValue, setSearchValue] = useState('');
   const [isSearched, setIsSearched] = useState(false); // 검색했는지 안 했는지 상태 확인

   useInputFocus('input[type="search"]');

   // 필터 버튼
   const handleFilterChange = (index: number) => {
      setSelectedFilter(index);
   };

   // 티 데이터 가져오기
   const teaSearch = (searchTerm: string) => {
      return `tea_name.ilike.%${searchTerm}%,tea_category.ilike.%${searchTerm}%,tea_brand.ilike.%${searchTerm}%`;
   };

   // 검색 함수
   const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const searchTerm = formData.get('value') as string; // 입력한 검색어
      setSearchValue(searchTerm); // 검색어로 상태 업데이트

      if (searchTerm.trim() === '') {
         toast.error('검색어를 입력하세요');
      } else {
         setIsSearched(true);
         const teaData = await getSearchTeaData(teaSearch(searchTerm)); // 티 데이터 가져오기
         const reviewData = await getSearchReviewData(searchTerm); // 리뷰 데이터 가져오기

         setSearchTeaResults(teaData || []);
         setSearchReviewResults(reviewData as any);
         console.log(teaData); // 결과
         console.log(reviewData); // 결과
      }
   };

   return (
      <main className="flex flex-col gap-4">
         <h1 className="sr-only">검색 페이지</h1>

         <SearchInput onSubmit={handleSearch} />

         {!isSearched ? (
            <SearchMessage message="검색어를 입력하세요" />
         ) : (
            <>
               <SearchFilterButton
                  filter={['상품', '리뷰']}
                  handleFilterChange={handleFilterChange}
               />

               {selectedFilter === 0 && (
                  <>
                     <SearchCount
                        data={searchValue}
                        count={searchTeaResults.length}
                     />
                     <ul className="grid grid-cols-[repeat(auto-fill,_minmax(158px,_1fr))] gap-4">
                        {searchTeaResults.map((tea: Tea) => (
                           <li key={tea.id} className="flex justify-center">
                              <TeaRecommendCard
                                 id={tea.id}
                                 imageUrl={tea.tea_image}
                                 teaName={tea.tea_name}
                                 brand={tea.tea_brand}
                              />
                           </li>
                        ))}
                     </ul>
                  </>
               )}
               {selectedFilter === 1 && (
                  <>
                     <SearchCount
                        data={searchValue}
                        count={searchReviewResults.length}
                     />
                     <section className="flex flex-col gap-2">
                        {searchReviewResults.map((review: Review) => (
                           <HomeReviewCard
                              key={review.id}
                              id={review.id}
                              teaName={review.tea.tea_name}
                              teaImg={review.tea.tea_image}
                              nickname={review.users.nickname}
                              title={review.review_title}
                              comment={review.review_comment}
                              score={review.tea_rate}
                           />
                        ))}
                     </section>
                  </>
               )}
            </>
         )}
      </main>
   );
}
