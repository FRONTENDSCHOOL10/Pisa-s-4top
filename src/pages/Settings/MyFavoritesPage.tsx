import { TabButton } from '@/components/Buttons/TabButton';
import { TeaRecommendCard } from '@/components/TeaCard/CardComponents';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';
import NoData from '@/components/Data/NoData';
import AppHelmet from '@/components/Main/AppHelmet';
import { useTeaLikes } from '@/hooks/useTeaLikes';

export function Component() {
   const {
      categories,
      selectedCategory,
      setSelectedCategory,
      currentUser,
      filteredTeas,
      isLoading,
   } = useTeaLikes();

   if (isLoading) {
      return <LoadingSpinner />;
   }

   return (
      <>
         <AppHelmet
            title="나의 찜 목록"
            description="Tea of the Day 나의 찜 목록 - Tea of the Day에서 당신이 찜한 모든 티를 한눈에 확인하세요. 카테고리별로 정리된 티 컬렉션을 통해 좋아하는 티를 쉽게 찾고 관리할 수 있습니다. 당신만의 특별한 티 리스트를 만들어보세요."
         />
         <main className="-mt-2">
            <h1 className="sr-only">나의 찜 페이지</h1>
            <article className="flex flex-col gap-5">
               <div>
                  <TabButton
                     tabs={categories.map((category) => category.category)}
                     onTabSelect={setSelectedCategory}
                     className="mb-8 self-start"
                     activeTab={selectedCategory}
                  />
                  {!currentUser ? (
                     <p className="text-center">로그인이 필요합니다.</p>
                  ) : filteredTeas.length === 0 ? (
                     <NoData text="선택한 카테고리에 해당하는 티가 없습니다" />
                  ) : (
                     <ul className="grid gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {filteredTeas.map((tea) => (
                           <li key={tea.id}>
                              <TeaRecommendCard
                                 id={tea.id}
                                 imageUrl={tea.tea_image}
                                 teaName={tea.tea_name}
                                 brand={tea.tea_brand}
                                 userNickname={currentUser.nickname}
                              />
                           </li>
                        ))}
                     </ul>
                  )}
               </div>
            </article>
         </main>
      </>
   );
}
