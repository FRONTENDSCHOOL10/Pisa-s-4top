export interface UserStatusProps {
   title: string;
   count: number;
   ariaLabel?: string;
}

export function UserStatus({
   title,
   count,
   ariaLabel,
   ...restProps
}: UserStatusProps) {
   return (
      <div
         className="flex w-full flex-col gap-[.625rem] rounded-2xl bg-stone-200 px-4 py-4"
         aria-label={ariaLabel}
         {...restProps}
      >
         <p className="text-sm font-normal text-stone-600">{title}</p>
         <span className="text-[2rem] font-bold leading-9 text-lime-700">
            {count}
         </span>
      </div>
   );
}
