export function calculateAverageRate(
   reviews: { tea_rate: number }[] | null | undefined
): 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 {
   if (!reviews || reviews.length === 0) return 0; // reviews가 null, undefined 또는 빈 배열일 때 처리
   const sum = reviews.reduce((acc, review) => acc + review.tea_rate, 0);
   const average = sum / reviews.length;
   return (Math.round(average * 2) / 2) as
      | 0
      | 0.5
      | 1
      | 1.5
      | 2
      | 2.5
      | 3
      | 3.5
      | 4
      | 4.5
      | 5;
}
