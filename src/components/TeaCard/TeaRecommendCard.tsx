import { Link } from 'react-router-dom';
import { ButtonHeart } from '../Buttons/Buttons';

export interface TeaRecommendCardProps {
   imageUrl: string;
   teaName: string;
   brand: string;
   teaId: string;
}

export default function TeaRecommendCard({
   imageUrl,
   teaName,
   brand,
   teaId,
}: TeaRecommendCardProps) {
   return (
      <Link to={`/tea/${teaId}`}>
         <article className="relative w-40 cursor-pointer rounded-2xl border border-stone-300 bg-gradient-to-b from-white from-70% to-stone-100 to-100% shadow-xl">
            <div className="overflow-hidden rounded-t-2xl bg-stone-200">
               <img
                  src={imageUrl}
                  alt={`${teaName} 미리보기`}
                  className="h-36 w-full rounded-md object-cover"
               />
            </div>
            <div className="absolute bottom-14 right-3">
               <ButtonHeart />
            </div>
            <div className="mt-2 p-3">
               <h3 className="mb-1 text-base font-semibold text-stone-950">
                  {teaName}
               </h3>
               <p className="text-sm text-stone-400">{brand}</p>
            </div>
         </article>
      </Link>
   );
}
