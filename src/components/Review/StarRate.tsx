interface StarRatingProps {
   score: number;
   altText?: string;
}

export default function StarRating({
   score,
   altText = '별점',
}: StarRatingProps) {
   const src = `/assets/starRate.svg#gray-rateScore-${Math.floor(score * 10)}`;

   return (
      <div className="w-20">
         <img
            className="h-4 object-cover"
            src={src}
            alt={`${altText} ${score}`}
         />
      </div>
   );
}
