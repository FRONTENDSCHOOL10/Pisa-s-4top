import { Link } from 'react-router-dom';

interface UserCollectionProps {
   href: string;
}

export default function UserCollection({ href }: UserCollectionProps) {
   return (
      <Link
         to={href}
         className="flex w-full flex-col items-center gap-2 rounded-2xl bg-white p-6"
      >
         <span
            className="fi fi-rr-heart inline-flex text-red-600"
            aria-hidden={true}
         ></span>
         <p className="text-base font-extrabold text-stone-950">나의 찜</p>
      </Link>
   );
}
