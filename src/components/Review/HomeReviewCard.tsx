import { Link } from 'react-router-dom';
import { StarRating } from './StarRate';

/* 홈 리뷰 카드 컴포넌트 */
// 사용법
// <HomeReviewCard id="리뷰 ID" teaName="티 이름" teaImg="티 이미지 URL" title="리뷰 제목" nickname="작성자 닉네임" comment="리뷰 내용" score={리뷰 별점} />
interface HomeReviewCardProps {
   id: string;
   teaName: string;
   teaImg: string;
   nickname: string;
   title: string;
   comment: string;
   score: 0 | 1 | 2 | 3 | 4 | 5;
}

export default function HomeReviewCard({
   id = '리뷰글 id',
   teaName = '티 이름',
   teaImg = '티 이미지 URL',
   nickname = '작성자 닉네임',
   title = '리뷰 타이틀',
   comment = '리뷰 내용',
   score = 5,
}: HomeReviewCardProps) {
   return (
      <Link
         to={`/reviews/detail/${id}`}
         aria-label={`${nickname}님이 작성한 ${teaName}에 대한 ${title} 리뷰 상세 페이지`}
      >
         <article className="flex min-h-28 w-full gap-2 rounded-2xl border border-white bg-white/20 p-3 shadow-home-review">
            <img
               src={teaImg}
               className="h-9 w-9 rounded-full object-cover"
               alt={`${teaName} 이미지`}
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
