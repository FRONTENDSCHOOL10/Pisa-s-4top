/* CardComponent 사용법

TeaDescriptionCard

- `description`: 티에 대한 설명 (필수)

---- 사용법 예시 ----
<TeaDescriptionCard description="이 티는 매우 향긋하고 건강에 좋습니다." />
------------------

TeaRecipeCard

- `title`: 레시피 제목 (필수)
- `imageUrl`: 레시피와 관련된 이미지 경로 (필수)
- `steps`: 레시피의 단계들 (필수, 문자열 배열)

---- 사용법 예시 ----
<TeaRecipeCard 
   title="홍차 레시피" 
   imageUrl="image_url" 
   steps={['물 끓이기', '홍차 넣기', '우려내기']} 
/>
------------------

TeaRecommendCard

- `imageUrl`: 추천할 티의 이미지 경로 (필수)
- `teaName`: 티 이름 (필수)
- `brand`: 티 브랜드 이름 (필수)

---- 사용법 예시 ----
<TeaRecommendCard 
   imageUrl="tea_image_url" 
   teaName="녹차" 
   brand="티 브랜드 이름" 
/>
------------------

TeaReviewCard

- `profileImageUrl`: 사용자의 프로필 이미지 경로 (선택)
- `reviewTitle`: 리뷰 제목 (필수)
- `nickName`: 리뷰 작성자 닉네임 (필수)
- `reviewContent`: 리뷰 내용 (필수)
- `score`: 별점 (필수)

---- 사용법 예시 ----
<TeaReviewCard 
   profileImageUrl="profile_image_url" 
   reviewTitle="맛있어요!" 
   nickName="홍차러버" 
   reviewContent="이 티는 정말 맛있습니다. 꼭 추천해요!" 
/>
------------------

*/
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ButtonHeart } from '../Buttons/Buttons';
import { StarRating } from '../Review/StarRate';
import { SelectColor } from '../Select/SelectColor';
import { LabelGroup } from '../Labels/Labels';

// 공통 UI 컴포넌트
interface ImageProps {
   src: string;
   alt: string;
   className?: string;
   decorative?: boolean;
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
         alt={decorative ? '' : alt}
         className={`w-full rounded-md object-contain ${className}`}
         aria-hidden={decorative}
      />
   );
}

interface TitleProps {
   children: React.ReactNode;
   className?: string;
}

export function CardTitle({ children, className }: TitleProps) {
   return (
      <h3
         className={`w-full truncate text-wrap pr-4 text-lg font-extrabold leading-6 text-stone-950 ${className}`}
      >
         {children}
      </h3>
   );
}

// 공통 카드 레이아웃
interface CardLayoutProps {
   children: React.ReactNode;
   className?: string;
   to?: string;
   ariaLabel?: string;
}

export function CardLayout({
   children,
   className = '',
   to,
   ariaLabel,
}: CardLayoutProps) {
   const content = (
      <article
         className={`relative w-full rounded-2xl border border-stone-300 bg-white p-5 ${className}`}
         aria-label={ariaLabel}
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
         <p className="mt-2 text-sm font-medium text-stone-600">
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
            <ol className="text-sm leading-6">
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
   id: string;
   imageUrl: string;
   teaName: string;
   brand: string;
}

export function TeaRecommendCard({
   id,
   imageUrl,
   teaName,
   brand,
}: TeaRecommendCardProps) {
   return (
      <CardLayout
         to={`/detail/${id}`}
         className="!w-48 cursor-pointer overflow-hidden bg-gradient-to-b from-white from-70% to-stone-100 to-100%"
         ariaLabel={`${teaName} 추천 카드`}
      >
         <div className="absolute left-0 top-0 w-48 rounded-t-2xl">
            <CardImage
               src={imageUrl}
               alt={`${teaName} 미리보기`}
               className="h-36"
            />
         </div>
         <div className="relative mt-36">
            <CardTitle className="mb-1 h-12 text-base">{teaName}</CardTitle>
            <div className="absolute right-0 top-0.5">
               <ButtonHeart />
            </div>
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
   score: 0 | 1 | 2 | 3 | 4 | 5;
}

export function TeaReviewCard({
   profileImageUrl,
   reviewTitle,
   nickName,
   reviewContent,
   score,
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
                  <StarRating score={score} />
                  <p className="text-sm text-stone-400">{nickName}</p>
               </div>
            </div>
         </div>
         <p className="border-t border-t-stone-200 pt-3 text-sm font-medium text-stone-600">
            {reviewContent}
         </p>
      </CardLayout>
   );
}

// 티 수색 선택 카드
interface TeaColorCardProps {
   className?: string;
   initialColor?: string; // 초기 색상 prop
   onColorChange?: (color: string) => void; // 선택적 색상 변경 핸들러
}

export function TeaColorCard({
   className = '',
   initialColor = '',
   onColorChange,
}: TeaColorCardProps) {
   const [selectedColor, setSelectedColor] = useState<string | null>(
      initialColor
   );

   useEffect(() => {
      setSelectedColor(initialColor); // initialColor가 변경되면 selectedColor 업데이트
   }, [initialColor]);

   const handleSelectColor = (color: string) => {
      setSelectedColor(color);
      onColorChange?.(color);
   };

   return (
      <CardLayout ariaLabel="티 수색 카드" className={className}>
         <CardTitle className="mb-2">수색</CardTitle>
         <SelectColor
            selectedColor={selectedColor}
            onSelect={handleSelectColor}
         />
      </CardLayout>
   );
}

// 티 맛 선택 카드

interface TeaTasteCardProps {
   labels: string[];
   className?: string;
   selectedLabels: boolean[];
   handleToggleLabel?: (index: number) => void;
   types: 'label' | 'button';
   isEditable?: boolean;
}

export function TeaTasteCard({
   labels,
   className = '',
   selectedLabels,
   handleToggleLabel,
   types = 'label',
   isEditable = true,
}: TeaTasteCardProps) {
   return (
      <CardLayout ariaLabel="티 맛 카드" className={className}>
         <CardTitle className="mb-2">맛</CardTitle>
         {isEditable ? (
            <LabelGroup
               labels={labels}
               types={types}
               className="flex w-full justify-center"
               selectedLabels={selectedLabels}
               handleToggleLabel={handleToggleLabel!}
            />
         ) : (
            <LabelGroup
               labels={labels}
               types={types}
               className="flex w-full justify-center"
               selectedLabels={selectedLabels}
               handleToggleLabel={() => {}}
            />
         )}
      </CardLayout>
   );
}

// 티 리뷰 카드
interface TeaReviewDetailCardProps {
   title: string;
   contents: string;
   className?: string;
}

export function TeaReviewDetailCard({
   title,
   contents,
   className = '',
}: TeaReviewDetailCardProps) {
   return (
      <CardLayout ariaLabel="티 리뷰 디테일 카드" className={className}>
         {isEditable ? (
            <>
               <input
                  type="text"
                  value={title}
                  onChange={(e) => onChangeTitle?.(e.target.value)}
                  className="mb-2 w-full border-b border-stone-300 p-1 text-lg font-bold"
                  placeholder="리뷰 제목을 입력하세요."
               />
               <textarea
                  value={contents}
                  onChange={(e) => onChangeContents?.(e.target.value)}
                  className="w-full border-b border-stone-300 p-1"
                  placeholder="리뷰 내용을 입력하세요."
                  rows={4}
               />
            </>
         ) : (
            <>
               <CardTitle className="mb-2">{title}</CardTitle>
               <p>{contents}</p>
            </>
         )}
      </CardLayout>
   );
}
