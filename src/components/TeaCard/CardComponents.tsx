import { Link } from 'react-router-dom';
import { ButtonHeart } from '../Buttons/Buttons';
import { StarRating } from '../Review/StarRate';

// 공통 UI 컴포넌트
interface ImageProps {
   src: string;
   alt: string;
   className?: string;
   decorative?: boolean; // 장식용 이미지 여부
}

export function CardImage({
   src,
   alt,
   className,
   decorative = false,
}: ImageProps) {
   return (
      <img
         src={src}
         alt={decorative ? '' : alt} // 장식용 이미지는 alt 속성을 빈 문자열로 처리
         className={`w-full rounded-md object-cover ${className}`}
         aria-hidden={decorative} // 장식용 이미지는 스크린 리더에서 숨김 처리
      />
   );
}

interface TitleProps {
   children: React.ReactNode;
   className?: string;
}

export function CardTitle({ children, className }: TitleProps) {
   return (
      <h3 className={`text-sm font-extrabold text-stone-950 ${className}`}>
         {children}
      </h3>
   );
}

// 공통 카드 레이아웃
interface CardLayoutProps {
   children: React.ReactNode;
   className?: string;
   to?: string;
   ariaLabel?: string; // 접근성을 위한 설명
}

export function CardLayout({
   children,
   className = '',
   to,
   ariaLabel,
}: CardLayoutProps) {
   const content = (
      <article
         role="article"
         className={`relative w-full rounded-2xl border border-stone-300 bg-white p-5 shadow-xl ${className}`}
         aria-label={ariaLabel} // aria-label을 통해 의미를 명확히 전달
      >
         {children}
      </article>
   );

   return to ? (
      <Link to={to} aria-label={ariaLabel}>
         {content}
      </Link>
   ) : (
      content
   );
}

// 티 설명 카드
export interface TeaDescriptionCardProps {
   description: string;
}

export function TeaDescriptionCard({ description }: TeaDescriptionCardProps) {
   return (
      <CardLayout ariaLabel="티 설명 카드">
         <CardTitle>어떤 티인가요?</CardTitle>
         <p className="mt-2 text-xs font-medium text-stone-600">
            {description}
         </p>
      </CardLayout>
   );
}

// 티 레시피 카드
export interface TeaRecipeCardProps {
   title: string;
   imageUrl: string;
   steps: string[];
}

export function TeaRecipeCard({ title, imageUrl, steps }: TeaRecipeCardProps) {
   return (
      <CardLayout ariaLabel="티 레시피 카드">
         <CardTitle className="mb-3">{title}</CardTitle>
         <div className="flex gap-5">
            <div className="w-1/3">
               <CardImage src={imageUrl} alt="Recipe" />
            </div>
            <ol className="text-xs leading-6">
               {steps.map((step, index) => (
                  <li key={index}>{step}</li>
               ))}
            </ol>
         </div>
      </CardLayout>
   );
}

// 티 추천 카드
export interface TeaRecommendCardProps {
   imageUrl: string;
   teaName: string;
   brand: string;
}

export function TeaRecommendCard({
   imageUrl,
   teaName,
   brand,
}: TeaRecommendCardProps) {
   return (
      <CardLayout
         className="!w-40 cursor-pointer bg-gradient-to-b from-white from-70% to-stone-100 to-100%"
         ariaLabel={`${teaName} 추천 카드`}
      >
         <div className="absolute left-0 top-0 w-[158px] overflow-hidden rounded-t-2xl bg-stone-200">
            <CardImage
               src={imageUrl}
               alt={`${teaName} 미리보기`}
               className="h-36"
            />
         </div>
         <div className="absolute bottom-10 right-5">
            <ButtonHeart />
         </div>
         <div className="mt-36">
            <CardTitle className="mb-1 text-base">{teaName}</CardTitle>
            <p className="text-sm text-stone-400">{brand}</p>
         </div>
      </CardLayout>
   );
}

// 티 리뷰 카드
export interface TeaReviewCardProps {
   profileImageUrl?: string;
   reviewTitle: string;
   nickName: string;
   reviewContent: string;
}

export function TeaReviewCard({
   profileImageUrl,
   reviewTitle,
   nickName,
   reviewContent,
}: TeaReviewCardProps) {
   return (
      <CardLayout to={''} ariaLabel="티 리뷰 카드">
         <div className="mb-3 flex">
            <div className="mr-3 h-9 w-9 overflow-hidden rounded-full bg-lime-200">
               {profileImageUrl ? (
                  <CardImage
                     src={profileImageUrl}
                     alt={`${nickName}'s profile`}
                     className="h-full w-full"
                  />
               ) : (
                  <div
                     className="h-full w-full bg-lime-200"
                     aria-hidden="true"
                  />
               )}
            </div>
            <div className="w-full">
               <CardTitle className="mb-1">{reviewTitle}</CardTitle>
               <div className="flex justify-between">
                  <StarRating score={3} />
                  <p className="text-xs text-stone-400">{nickName}</p>
               </div>
            </div>
         </div>
         <p className="border-t border-t-stone-200 pt-3 text-xs font-medium text-stone-600">
            {reviewContent}
         </p>
      </CardLayout>
   );
}
