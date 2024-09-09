interface StarRatingProps {
   score: 0 | 1 | 2 | 3 | 4 | 5;
   altText?: string;
}

export function StarRating({ score, altText = '별점' }: StarRatingProps) {
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

interface StarRatingAverageProps {
   score: 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
   altText?: string;
}

export function StarRatingAverage({
   score,
   altText = '별점',
}: StarRatingAverageProps) {
   const src = `/assets/starRate.svg#rateScore-${Math.floor(score * 10)}`;

   return (
      <div className="w-32">
         <img
            className="h-7 object-cover"
            src={src}
            alt={`${altText} ${score}`}
         />
      </div>
   );
}
