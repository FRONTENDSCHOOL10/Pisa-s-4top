import { TeaRecommendCard } from '@/components/TeaCard/CardComponents';

export function Component() {
   return (
      <main>
         <h1 className="sr-only">나의 찜 페이지</h1>
         <article className="grid">
            <ul className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
               <li className="flex justify-center">
                  <TeaRecommendCard imageUrl="" teaName="" brand="" />
               </li>
               <li className="flex justify-center">
                  <TeaRecommendCard imageUrl="" teaName="" brand="" />
               </li>
               <li className="flex justify-center">
                  <TeaRecommendCard imageUrl="" teaName="" brand="" />
               </li>
               <li className="flex justify-center">
                  <TeaRecommendCard imageUrl="" teaName="" brand="" />
               </li>
               <li className="flex justify-center">
                  <TeaRecommendCard imageUrl="" teaName="" brand="" />
               </li>
            </ul>
         </article>
      </main>
   );
}
