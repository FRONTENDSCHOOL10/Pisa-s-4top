import { memo } from 'react';
import { Link } from 'react-router-dom';

interface UserCollectionItemProps {
   to: string;
   iconClass: string;
   text: string;
}

const UserCollectionItem = memo(
   ({ to, iconClass, text }: UserCollectionItemProps) => {
      return (
         <Link
            to={to}
            aria-label={`${text} 리스트 페이지`}
            className="flex w-full flex-col items-center gap-2 rounded-2xl bg-white p-6"
         >
            <span
               className={`fi ${iconClass} inline-flex`}
               aria-hidden={true}
            ></span>
            <p className="text-base font-bold text-stone-950">{text}</p>
         </Link>
      );
   }
);

const items: UserCollectionItemProps[] = [
   {
      to: '/my-page/favorites',
      iconClass: 'fi-rr-heart text-red-600',
      text: '나의 찜',
   },
   {
      to: '/my-page/reviews',
      iconClass: 'fi-rr-comment-alt text-green-600',
      text: '나의 리뷰',
   },
];

export default function UserCollection() {
   return (
      <div className="flex gap-4">
         {items.map((item, index) => (
            <UserCollectionItem key={index} {...item} />
         ))}
      </div>
   );
}
