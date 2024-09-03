import { ButtonHeart } from '../Buttons/Buttons';

export default function TeaRecommendCard() {
   return (
      <article className="relative w-40 cursor-pointer rounded-2xl border border-stone-300 bg-gradient-to-b from-white from-70% to-stone-100 to-100% shadow-xl">
         <div className="overflow-hidden rounded-t-2xl bg-stone-200">
            <img
               src="https://totd.pockethost.io/api/files/ew3aawyuslg50pl/j0smvon4ff7mx5b/englishbreakfast_twining_KMTvDgUgoI.png"
               alt="티 상품 미리보기"
               className="h-36 w-full rounded-md object-cover"
            />
         </div>
         <div className="absolute bottom-14 right-3">
            <ButtonHeart />
         </div>
         <div className="mt-2 p-3">
            <h3 className="mb-1 text-sm font-semibold text-stone-950">
               English Breakfast
            </h3>
            <p className="text-xs text-stone-400">TWINING</p>
         </div>
      </article>
   );
}
