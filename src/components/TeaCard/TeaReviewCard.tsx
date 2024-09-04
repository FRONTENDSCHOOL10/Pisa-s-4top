export interface TeaReviewCardProps {
   profileImageUrl?: string;
   reviewTitle: string;
   nickName: string;
   reviewContent: string;
}

export default function TeaReviewCard({
   profileImageUrl,
   reviewTitle,
   nickName,
   reviewContent,
}: TeaReviewCardProps) {
   return (
      <article className="relative w-5/6 cursor-pointer rounded-2xl border border-stone-300 bg-white p-5 shadow-xl">
         <div className="mb-3 flex">
            <div className="mr-3 h-9 w-9 overflow-hidden rounded-full bg-lime-200">
               {profileImageUrl ? (
                  <img
                     src={profileImageUrl}
                     alt={`${nickName}'s profile`}
                     className="h-full w-full object-cover"
                  />
               ) : (
                  <div className="h-full w-full bg-lime-200" />
               )}
            </div>
            <div className="w-full">
               <h3 className="mb-1 text-sm font-extrabold text-stone-950">
                  {reviewTitle}
               </h3>
               <div className="flex justify-between">
                  <span className="gray-rateScore-20"></span>
                  <p className="text-xs text-stone-400">{nickName}</p>
               </div>
            </div>
         </div>
         <p className="border-t border-t-stone-200 pt-3 text-xs font-medium text-stone-600">
            {reviewContent}
         </p>
      </article>
   );
}
