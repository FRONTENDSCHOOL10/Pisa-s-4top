import { ReactNode } from 'react';

interface Props {
   children: ReactNode;
}

export default function UserDataLayout({ children }: Props) {
   return (
      <>
         <div className="flex flex-col gap-2 rounded-2xl border border-solid border-stone-300 bg-white px-4 py-3">
            {children}
         </div>
      </>
   );
}
