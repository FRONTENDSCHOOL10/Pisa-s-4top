const TeaRecommendCard = () => {
   return (
      <article className="rounded-2xl bg-stone-100 p-4 shadow-md">
         <div>
            <img
               src=""
               alt="티 상품 미리보기"
               className="h-32 w-full rounded-md object-cover"
            />
         </div>
         <button className="mt-4 rounded px-4 py-2">
            <span className="fi fi-sr-heart white"></span>
         </button>
         <div className="mt-2">
            <h3 className="text-lg font-semibold">English Breakfast</h3>
            <p className="text-sm text-gray-600">TWINING</p>
         </div>
      </article>
   );
};

export default TeaRecommendCard;
