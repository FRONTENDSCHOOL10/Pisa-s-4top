export default function TeaRecommendCard() {
   return (
      <article className="relative w-40 cursor-pointer rounded-2xl border border-stone-300 bg-gradient-to-b from-white from-70% to-stone-100 to-100% shadow-xl">
         <div className="rounded-t-2xl bg-stone-200">
            <img
               src=""
               alt="티 상품 미리보기"
               className="h-36 w-full rounded-md object-cover"
            />
         </div>
         <button className="absolute bottom-14 right-3 rounded-2xl border border-stone-300 bg-gradient-to-b from-white from-60% to-stone-100 px-1.5 py-1.5 transition hover:bg-gradient-to-b hover:from-red-600 hover:from-0% hover:to-red-400">
            <span className="fi fi-sr-heart text-shadow-sm flex justify-center text-white"></span>
         </button>
         <div className="mt-2 p-3">
            <h3 className="mb-1 text-sm font-semibold text-stone-950">
               English Breakfast
            </h3>
            <p className="text-xs text-stone-400">TWINING</p>
         </div>
      </article>
   );
}
