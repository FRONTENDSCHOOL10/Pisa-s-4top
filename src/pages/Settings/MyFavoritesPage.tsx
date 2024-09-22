import { TabButton } from '@/components/Buttons/TabButton';
import { TeaRecommendCard } from '@/components/TeaCard/CardComponents';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';
import { useTeaLikes } from '@/hooks/useTeaLikes';
import NoData from '@/components/Data/NoData';

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
                  <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
   );
}
