import { TeaReviewCard } from "../TeaCard/CardComponents";

interface Review {
  profileImageUrl: string;
  nickName: string;
  title: string;
  content: string;
  score: 0 | 1 | 2 | 3 | 4 | 5;
}

const reviewData: Review[] = [
  {
     profileImageUrl: '',
     nickName: '김철수',
     title: '맛있어요!',
     content: '너무 맛있어요!!',
     score: 4,
  },
  {
     profileImageUrl: '',
     nickName: '김영희',
     title: '맛없어요ㅜㅜ',
     content: '너무 맛없어요ㅜㅜ',
     score: 0,
  },
];

export default function TeaReviewList() {
  return (
     <section className="flex flex-col gap-4">
        <h3 className="mt-3 pl-2 text-2xl font-black text-stone-950">
           {reviewData.length}개의 리뷰
        </h3>
        {reviewData.map((review, index) => (
           <TeaReviewCard
              key={index}
              profileImageUrl={review.profileImageUrl}
              nickName={review.nickName}
              reviewTitle={review.title}
              reviewContent={review.content}
              score={review.score}
           />
        ))}
     </section>
  );
}
