/* StarRating 사용법

* StarRating

---- 사용법 예시 ----

import { StarRating } from '@/components/Review/StarRate';

export default function App() {
   return (
      <div>
         <StarRating score={4} altText="차의 별점" />
      </div>
   );
}

* StarRatingAverage

---- 사용법 예시 ----

import { StarRatingAverage } from '@/components/Review/StarRate';

export default function App() {
   return (
      <div>
         <StarRatingAverage score={4.5} />
      </div>
   );
}

*/

import { useState } from 'react';

interface CardStarRatingProps {
   score: number;
   altText: string;
}

export function CardStarRating({ score, altText }: CardStarRatingProps) {
   const src = `/assets/starRate.svg#gray-rateScore-${Math.floor(score * 10)}`;

   return (
      <div className="w-20">
         <img
            className="h-5 object-cover"
            src={src}
            alt={`${altText} ${score}`}
         />
      </div>
   );
}
interface StarRatingProps {
   score: number;
   setScore: (newScore: number) => void;
   editable: boolean;
}

export function StarRating({ score, setScore, editable }: StarRatingProps) {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   const handleDropdownToggle = () => {
      if (editable) {
         setIsDropdownOpen(!isDropdownOpen);
      }
   };

   const handleRatingSelect = (newScore: number) => {
      setScore(newScore);
      setIsDropdownOpen(false);
   };

   return (
      <div className="relative flex justify-center">
         <button
            onClick={handleDropdownToggle}
            className="flex items-center space-x-2"
            aria-label="별점 선택"
         >
            <div className="w-32">
               <img
                  className="h-7 object-cover"
                  src={`/assets/starRate.svg#rateScore-${Math.floor(score * 10)}`}
                  alt={`별점 ${score}`}
               />
            </div>
         </button>

         {isDropdownOpen && (
            <ul className="absolute top-6 z-10 mt-2 overflow-hidden rounded-2xl border bg-white shadow-md">
               {[1, 2, 3, 4, 5].map((star) => (
                  <li
                     key={star}
                     className="flex cursor-pointer items-center justify-center p-2 hover:bg-gray-200"
                     onClick={() => handleRatingSelect(star)}
                  >
                     <div className="w-32">
                        <img
                           className="h-7 object-cover"
                           src={`/assets/starRate.svg#rateScore-${Math.floor(star * 10)}`}
                           alt={`${star}점`}
                        />
                     </div>
                  </li>
               ))}
            </ul>
         )}
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
