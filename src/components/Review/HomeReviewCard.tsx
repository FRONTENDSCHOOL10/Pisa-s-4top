import { Link } from 'react-router-dom';
import { StarRating } from './StarRate';

/* 홈 리뷰 카드 컴포넌트 */
// 사용법
// <HomeReviewCard id="리뷰 ID" profileImg="작성자 프로필 이미지 URL" title="리뷰 제목" nickname="작성자 닉네임" comment="리뷰 내용" score={리뷰 별점} />
interface HomeReviewCardProps {
   id: string;
   profileImg: string;
   title: string;
   nickname: string;
   comment: string;
   score: 0 | 1 | 2 | 3 | 4 | 5;
}

export default function HomeReviewCard({
   id = '리뷰글 id',
   profileImg = '작성자 프로필 이미지 URL',
   title = '리뷰 타이틀',
   nickname = '작성자 닉네임',
   comment = '리뷰 내용',
   score = 5,
}: HomeReviewCardProps) {
   return (
      <Link
         to={`/reviews/detail/${id}`}
         aria-label={`${nickname}님이 작성한 ${title} 리뷰 상세 페이지로 이동`}
      >
         <article className="flex min-h-28 w-full gap-2 rounded-2xl border border-white bg-white/20 p-3 shadow-home-review">
            <img
               src={profileImg}
               className="h-9 w-9 rounded-full object-cover"
               alt={`작성자 ${nickname}의 프로필 이미지`}
            />
            <div className="flex w-full flex-col gap-1">
               <h3 className="text-base font-black text-stone-950">{title}</h3>
               <p className="text-sm font-medium text-stone-400">{nickname}</p>
               <p className="text-sm font-light text-stone-950">{comment}</p>
               <div className="self-end">
                  <StarRating score={score} aria-label={`별점 ${score}점`} />
               </div>
            </div>
         </article>
      </Link>
   );
}
