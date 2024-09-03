export default function TeaReviewCard() {
   return (
      <article className="relative w-5/6 cursor-pointer rounded-2xl border border-stone-300 bg-white p-5 shadow-xl">
         <div className="mb-3 flex">
            <div className="mr-3 h-9 w-9 rounded-full bg-lime-200"></div>
            <div className="w-full">
               <h3 className="mb-1 text-sm font-extrabold text-stone-950">
                  데일리로 마시기 좋아요~
               </h3>
               <div className="flex justify-between">
                  <span className="gray-rateScore-20"></span>
                  <p className="text-xs text-stone-400">닉네임</p>
               </div>
            </div>
         </div>
         <p className="border-t border-t-stone-200 pt-3 text-xs font-medium text-stone-600">
            트와이닝스 얼 그레이는 중국 홍차를 베이스로 하여 감귤계인 베르가못의
            향을 첨가해 부드럽고 산뜻한 맛을 살렸습니다. 핫티로 마셔도 좋고
            아이스티로도 잘 어울리며 진하게 우려서 베이킹 재료로 사용하거나
            밀크티로 마셔도 독특한 풍미를 느낄 수 있습니다. 티백을 뜯어서 홍차
            파운드, 홍차 마들렌, 홍차 쉬폰 등 베이킹에 이용하기도 합니다
         </p>
      </article>
   );
}
