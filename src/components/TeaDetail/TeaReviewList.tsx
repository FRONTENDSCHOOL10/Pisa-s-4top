import { TeaReviewCard } from '../TeaCard/CardComponents';

interface Review {
   id: string;
   review_title: string;
   review_comment: string;
   tea_rate: 0 | 1 | 2 | 3 | 4 | 5;
   tea: {
      id: string;
      tea_name: string;
      category: string;
   };
   user: {
      nickname: string;
      profile_img: string;
   };
}

interface TeaReviewListProps {
   reviews: Review[];
}

export default function TeaReviewList({ reviews }: TeaReviewListProps) {
   return (
      <section className="flex flex-col gap-4">
         <h3 className="mt-3 pl-2 text-2xl font-black text-stone-950">
            {reviews.length}개의 리뷰
         </h3>
         {reviews.map((review) => (
            <TeaReviewCard
               key={review.id}
               profileImageUrl={review.user.profile_img}
               nickName={review.user.nickname}
               reviewTitle={review.review_title}
               reviewContent={review.review_comment}
               score={review.tea_rate}
            />
         ))}
      </section>
   );
}
