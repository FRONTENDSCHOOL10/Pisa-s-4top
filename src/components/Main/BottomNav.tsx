import { Link, useLocation } from 'react-router-dom';

const navItems = [
   { to: '/', label: '메인 페이지', icon: 'home' },
   { to: '/recommend', label: '추천 티 페이지', icon: 'star' },
   { to: '/reviews', label: '리뷰 페이지', icon: 'comment' },
   { to: '/my-page', label: '마이 페이지', icon: 'user' },
];

export default function BottomNav() {
   const { pathname } = useLocation();

   return (
      <nav
         aria-label="하단 내비게이션"
         className="sticky bottom-0 left-0 z-50 flex h-[3.75rem] w-full min-w-80 max-w-3xl items-center justify-around border-t-[1px] border-t-stone-200 bg-stone-50 text-xl bg-blend-multiply"
      >
         {navItems.map(({ to, label, icon }) => (
            <Link key={to} to={to} className="focus-green" aria-label={label}>
               <span
                  className={`fi fi-${pathname === to ? 'sr' : 'rr'}-${icon} ${
                     pathname === to ? 'text-stone-500' : 'text-stone-400'
                  }`}
               />
            </Link>
         ))}
      </nav>
   );
}
