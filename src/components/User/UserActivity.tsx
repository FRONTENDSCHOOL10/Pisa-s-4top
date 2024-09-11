// 사용법
// <UserActivity title="리뷰 개수" count={25} />
// className 추가 지정 필요할 경우
// <UserActivity title="리뷰 개수" count={25} className = ' '/>

export interface UserActivityProps {
   title: string;
   count: number;
   className?: string;
   [props: string]: any;
}

const containerClass: string =
   'flex w-full flex-col gap-[.625rem] rounded-2xl bg-stone-200 px-4 py-4';
const titleClass: string = 'text-sm font-normal text-stone-600';
const countClass: string = 'text-[2rem] font-bold leading-9 text-lime-700';

export function UserActivity({
   title = '찜 개수',
   count = 0,
   className = '',
   ...restProps
}: UserActivityProps) {
   return (
      <dl className={`${containerClass} ${className}`} {...restProps}>
         <dt className={titleClass}>{title}</dt>
         <dd className={countClass}>{count}</dd>
      </dl>
   );
}
