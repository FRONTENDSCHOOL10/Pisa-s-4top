export interface TeaDescriptionCardProps {
   title: string;
   description: string;
}

export default function TeaDescriptionCard({
   description,
}: TeaDescriptionCardProps) {
   return (
      // 카드 부분 리팩토링 카드 - 내용
      <article className="relative w-5/6 rounded-2xl border border-stone-300 bg-white p-5 shadow-xl">
         {/* 제목 고정 */}
         <h3 className="text-sm font-extrabold text-stone-950">
            어떤 티인가요?
         </h3>
         <p className="mt-2 text-xs font-medium text-stone-600">
            {description}
         </p>
      </article>
   );
}
