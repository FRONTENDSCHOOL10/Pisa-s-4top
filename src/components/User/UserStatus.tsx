// 사용법
// <UserStatus title="리뷰 개수" count={25} />

export interface UserStatusProps {
   title: string;
   count: number;
   [props: string]: any;
}

const containerClass: string =
   'flex w-full flex-col gap-[.625rem] rounded-2xl bg-stone-200 px-4 py-4';
const titleClass: string = 'text-sm font-normal text-stone-600';
const countClass: string = 'text-[2rem] font-bold leading-9 text-lime-700';

export function UserStatus({
   title = '찜 개수',
   count = 0,
   ...restProps
}: UserStatusProps) {
   return (
      <div className={containerClass} {...restProps}>
         <p className={titleClass}>{title}</p>
         <span className={countClass}>{count}</span>
      </div>
   );
}
