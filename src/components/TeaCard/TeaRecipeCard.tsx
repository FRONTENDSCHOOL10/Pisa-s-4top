export default function TeaRecipeCard() {
   return (
      <article className="relative max-w-lg rounded-2xl border border-stone-300 bg-white p-5 shadow-xl">
         <h3 className="mb-3 text-sm font-extrabold text-stone-950">
            이렇게도 드실 수 있어요!
         </h3>
         <div className="flex gap-5">
            <div className="w-1/3">
               <img
                  src="https://totd.pockethost.io/api/files/ba37rtzuoyf8a76/rdz34ahzyaxwjal/iced_tea_TH78Nnewod.svg"
                  alt=""
                  className="w-full object-contain"
               />
            </div>
            <div className="text-xs leading-6">
               1. 티백 2개를 뜨거운 물(100°C) 200ml에 넣고 5분 동안 진하게
               우려낸다. <br />
               2. 홍차에 설탕 2 티스푼을 넣고 녹을 때까지 잘 젓는다.(원하는
               과일청 60ml도 가능) <br />
               3. 잔에 얼음을 가득 담고 홍차를 부어 식힌다. <br />
               4. 레몬 슬라이스나 민트로 장식한다.
            </div>
         </div>
      </article>
   );
}
