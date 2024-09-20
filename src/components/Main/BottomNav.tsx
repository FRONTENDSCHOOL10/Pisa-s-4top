import { Link, useLocation } from 'react-router-dom';

const navItems = [
   { to: '/main', label: '메인 페이지', icon: 'home' },
   { to: '/recommend', label: '추천 티 페이지', icon: 'star' },
   { to: '/reviews', label: '리뷰 페이지', icon: 'comment' },
   { to: '/my-page', label: '마이 페이지', icon: 'user' },
];

export default function BottomNav() {
   const { pathname } = useLocation();

   return (
      <nav
         aria-label="하단 내비게이션"
         className="fixed bottom-0 flex h-[3.75rem] w-full min-w-80 max-w-3xl items-center justify-around border-t-[1px] bg-stone-50 text-xl bg-blend-multiply [box-shadow:0px_-10px_30px_0px_var(--tailwind-stone-stone-300,_#D6D3D1),_0px_0px_30px_0px_var(--tailwind-white-white,_#FFF)_inset]"
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
