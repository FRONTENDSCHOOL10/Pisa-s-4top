import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import SearchFilterButton from '@/components/Buttons/SearchFilterButton';
import NoData from '@/components/Data/NoData';
import SearchInput from '@/components/Input/SearchInput';
import HomeReviewCard from '@/components/Review/HomeReviewCard';
import SearchCount from '@/components/Search/SearchCount';
import { TeaRecommendCard } from '@/components/TeaCard/CardComponents';
import { useInputFocus } from '@/hooks/useInputFocus';
import { useLocalStorageUserData } from '@/hooks/useLocalStorageUserData';
import { getSearchReviewData } from '@/utils/getSearchReviewData';
import { getSearchTeaData } from '@/utils/getSearchTeaData';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';

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
      tea_brand: string;
      tea_image: string;
   };
}

export function Component() {
   const [selectedFilter, setSelectedFilter] = useState<number>(0);
   const [searchTeaResults, setSearchTeaResults] = useState<Tea[]>([]);
   const [searchReviewResults, setSearchReviewResults] = useState<Review[]>([]);
   const [searchValue, setSearchValue] = useState('');
   const [isSearched, setIsSearched] = useState(false); // 검색했는지 안 했는지 상태 확인
   const [isLoading, setIsLoading] = useState<boolean>(false);

   useInputFocus('input[type="search"]');
   const userNickname = useLocalStorageUserData('nickname');

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

      if (searchTerm.trim() === '') {
         toast.error('검색어를 입력하세요');
         setIsSearched(false);
      } else {
         setIsSearched(true);

         setIsLoading(true);

         setSearchValue(searchTerm); // 검색어로 상태 업데이트
         try {
            const teaData = await getSearchTeaData(teaSearch(searchTerm)); // 티 데이터 가져오기
            const reviewData = await getSearchReviewData(searchTerm); // 리뷰 데이터 가져오기

            setSearchTeaResults(teaData || []);
            setSearchReviewResults(reviewData as any);
            console.log(teaData);
            console.log(reviewData);
         } catch (error) {
            console.error('검색 중 오류 발생:', error);
            toast.error('검색 중 오류가 발생했습니다.');
         } finally {
            setIsLoading(false); // 검색 완료 후 항상 로딩 상태 false
         }
      }
   };

   return (
      <main className="flex flex-col gap-4">
         <h1 className="sr-only">검색 페이지</h1>

         <SearchInput onSubmit={handleSearch} />

         {!isSearched ? (
            <NoData
               text="검색어를 입력하세요"
               className="h-[calc(100dvh-264px)]"
            />
         ) : (
            <>
               <SearchFilterButton
                  filter={['상품', '리뷰']}
                  handleFilterChange={handleFilterChange}
               />

               {isLoading ? (
                  <LoadingSpinner className="h-[calc(100dvh-324px)]" />
               ) : (
                  <>
                     {selectedFilter === 0 &&
                        (searchTeaResults.length === 0 ? (
                           <NoData
                              text={`'${searchValue}'에 대한 검색 결과가 없습니다`}
                              className="h-[calc(100dvh-324px)]"
                           />
                        ) : (
                           <>
                              <SearchCount
                                 data={searchValue}
                                 count={searchTeaResults.length}
                              />
                              <ul className="grid h-[calc(100dvh-364px)] gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                 {searchTeaResults.map((tea: Tea) => (
                                    <li key={tea.id}>
                                       <TeaRecommendCard
                                          id={tea.id}
                                          imageUrl={tea.tea_image}
                                          teaName={tea.tea_name}
                                          brand={tea.tea_brand}
                                          userNickname={userNickname}
                                       />
                                    </li>
                                 ))}
                              </ul>
                           </>
                        ))}
                     {selectedFilter === 1 &&
                        (searchReviewResults.length === 0 ? (
                           <NoData
                              text={`'${searchValue}'에 대한 검색 결과가 없습니다`}
                              className="h-[calc(100dvh-324px)]"
                           />
                        ) : (
                           <>
                              <SearchCount
                                 data={searchValue}
                                 count={searchReviewResults.length}
                              />
                              <section className="flex h-[calc(100dvh-364px)] flex-col gap-2">
                                 {searchReviewResults.map((review: Review) => (
                                    <HomeReviewCard
                                       key={review.id}
                                       id={review.id}
                                       teaName={review.tea.tea_name}
                                       teaBrand={review.tea.tea_brand}
                                       teaImg={review.tea.tea_image}
                                       nickname={review.users.nickname}
                                       title={review.review_title}
                                       comment={review.review_comment}
                                       score={review.tea_rate}
                                    />
                                 ))}
                              </section>
                           </>
                        ))}
                  </>
               )}
            </>
         )}
      </main>
   );
}
