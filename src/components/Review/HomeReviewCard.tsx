import { Link } from 'react-router-dom';
import StarRating from './StarRate';

interface HomeReviewCardProps {
   id: string;
   profileImg: string;
   altText?: string;
   title: string;
   nickname: string;
   comment: string;
   score: 0 | 1 | 2 | 3 | 4 | 5;
}

export default function HomeReviewCard({
   id = '리뷰글 id',
   profileImg = '작성자 프로필 이미지 URL',
   altText = '작성자 프로필 이미지',
   title = '리뷰 타이틀',
   nickname = '리뷰 작성자',
   comment = '한줄평(max 50자)',
   score = 5,
}: HomeReviewCardProps) {
   return (
      <Link
         to={`/reviews/detail/${id}`}
         className="flex min-h-28 w-full gap-2 rounded-2xl border border-white bg-white/20 p-3 shadow-home-review"
         aria-label={`${nickname}님이 작성한 ${title} 리뷰 상세 페이지로 이동`}
      >
         <img
            src={profileImg}
            className="h-9 w-9 rounded-full object-cover"
            alt={altText}
         />
         <div className="flex w-full flex-col gap-1">
            <h1 className="text-base font-black text-stone-950">{title}</h1>
            <h2 className="text-sm font-medium text-stone-400">{nickname}</h2>
            <p className="text-sm font-light text-stone-950">{comment}</p>
            <div className="self-end">
               <StarRating score={score} aria-label={`별점 ${score}점`} />
            </div>
         </div>
      </Link>
   );
}
