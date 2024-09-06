import { Link } from 'react-router-dom';
import StarRating from '../Review/StarRate';

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
      // 링크로 리팩토링
      <Link>
         <article className="relative w-full cursor-pointer rounded-2xl border border-stone-300 bg-white p-5 shadow-xl">
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
                  {/* text 사이즈 확인 */}
                  <h3 className="mb-1 text-sm font-extrabold text-stone-950">
                     {reviewTitle}
                  </h3>
                  <div className="flex justify-between">
                     <StarRating score={3} />
                     <p className="text-xs text-stone-400">{nickName}</p>
                  </div>
               </div>
            </div>
            <p className="border-t border-t-stone-200 pt-3 text-xs font-medium text-stone-600">
               {reviewContent}
            </p>
         </article>
      </Link>
   );
}
