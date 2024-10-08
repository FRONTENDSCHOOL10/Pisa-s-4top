import { Link } from 'react-router-dom';
import { CardStarRating } from './StarRate';

/* 홈 리뷰 카드 컴포넌트 */
// 사용법
// <HomeReviewCard id="리뷰 ID" teaName="티 이름" teaImg="티 이미지 URL" title="리뷰 제목" nickname="작성자 닉네임" comment="리뷰 내용" score={리뷰 별점} />
interface HomeReviewCardProps {
   id: string;
   teaName: string;
   teaImg: string;
   teaBrand: string;
   nickname: string;
   title: string;
   comment: string;
   score: 0 | 1 | 2 | 3 | 4 | 5;
}

export default function HomeReviewCard({
   id = '',
   teaName = '티 이름',
   teaImg = '',
   nickname = '작성자 닉네임',
   title = '리뷰 타이틀',
   comment = '리뷰 내용',
   score = 5,
   teaBrand = '',
}: HomeReviewCardProps) {
   return (
      <Link
         to={`/reviews/detail/${id}`}
         aria-label={`${nickname}님이 작성한 ${teaName}에 대한 ${title} 리뷰 상세 페이지`}
      >
         <article className="flex min-h-28 w-full items-center gap-2 rounded-2xl border border-white bg-white/20 px-3 py-5 shadow-home-review">
            <img
               src={teaImg}
               className="h-full w-1/5 rounded-full bg-white object-contain"
               alt={`${teaName}`}
            />
            <div className="flex w-full flex-col gap-1 pl-4 pr-2">
               <p className="text-xs text-stone-500">
                  <span className="text-sm font-bold">{teaName}</span>{' '}
                  {teaBrand}
               </p>
               <h3 className="line-clamp-1 text-lg font-bold leading-4 text-stone-800">
                  {title}
               </h3>
               <p className="text-sm font-medium text-stone-400">{nickname}</p>
               <p className="line-clamp-2 text-base text-stone-500">
                  {comment}
               </p>
               <div className="self-end">
                  <CardStarRating score={score} altText={`별점 ${score}점`} />
               </div>
            </div>
         </article>
      </Link>
   );
}
