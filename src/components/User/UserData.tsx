import { Button } from '../Buttons/Buttons';

interface Props {
   label: string;
   userData?: string;
   href: string;
}

export default function UserData({ label, userData = '', href }: Props) {
   return (
      <div className="flex justify-between items-center">
         {userData ? (
            <div>
               <span className="text-sm font-bold text-stone-500">{label}</span>
               <span className="ml-2 text-sm">{userData}</span>
            </div>
         ) : (
            <span className="text-sm font-bold text-stone-500">{label}</span>
         )}
         <Button
            className="h-[0.88rem] w-[1.3rem] text-xs font-bold"
            isLink={true}
            href={href}
            ariaLabel={`${label} 변경 페이지`}
            content="변경"
            size="small"
         />
      </div>
   );
}
