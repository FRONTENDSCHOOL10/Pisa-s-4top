import { Link } from 'react-router-dom';

interface HomeReviewCardProps {
   reviewDetailPage: string;
   imageUrl: string;
   altText?: string;
   title: string;
   nickname: string;
   comment: string;
}

export default function HomeReviewCard({
   reviewDetailPage,
   imageUrl,
   altText = '',
   title,
   nickname,
   comment,
}: HomeReviewCardProps) {
   return (
      <Link
         to={reviewDetailPage}
         className="shadow-home-review flex h-[9.375rem] w-[21.5rem] gap-2 rounded-2xl border border-white bg-white/20 p-2"
         aria-label={`${nickname}님이 작성한 ${title} 리뷰`}
      >
         <img
            src={imageUrl}
            className="w-[8.375rem] rounded-lg object-cover"
            alt={altText}
         />
         <div className="flex flex-col justify-between">
            <h1 className="text-sm font-black text-stone-950">{title}</h1>
            <h2 className="text-[.625rem] font-extrabold leading-tight text-stone-400">
               {nickname}
            </h2>
            <p className="max-h-[63px] overflow-hidden text-ellipsis text-[.625rem] font-extralight leading-tight text-stone-950">
               {comment}
            </p>
            <span className="gray-rateScore-00"></span>
         </div>
      </Link>
   );
}
