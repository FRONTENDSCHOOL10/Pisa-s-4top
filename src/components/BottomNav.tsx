import { Link, useLocation } from 'react-router-dom';

function BottomNav() {
   const location = useLocation();
   const { pathname } = location;

   return (
      <nav
         aria-label="하단 내비게이션"
         className="flex h-[3.75rem] w-[22.5rem] items-center justify-around border-t-[1px] bg-opacity-20 text-xl bg-blend-multiply backdrop-blur-[.3125rem] [box-shadow:0px_-10px_30px_0px_var(--tailwind-stone-stone-300,_#D6D3D1),_0px_0px_30px_0px_var(--tailwind-white-white,_#FFF)_inset]"
      >
         <Link to={'/'} className="focus-green" aria-label="메인 페이지">
            {pathname === '/' ? (
               <span className="fi fi-sr-home text-stone-500" />
            ) : (
               <span className="fi fi-rr-home active: cursor-pointer text-stone-400" />
            )}
         </Link>
         <Link
            to={'/recommend'}
            className="focus-green"
            aria-label="추천 티 페이지"
         >
            {pathname === '/recommend' ? (
               <span className="fi fi-sr-star text-stone-500" />
            ) : (
               <span className="fi fi-rr-star text-stone-400" />
            )}
         </Link>
         <Link to={'/reviews'} className="focus-green" aria-label="리뷰 페이지">
            {pathname === '/reviews' ? (
               <span className="fi fi-sr-comment text-stone-500" />
            ) : (
               <span className="fi fi-rr-comment text-stone-400" />
            )}
         </Link>
         <Link to={'/my-page'} className="focus-green" aria-label="마이 페이지">
            {pathname === '/my-page' ? (
               <span className="fi fi-sr-user text-stone-500" />
            ) : (
               <span className="fi fi-rr-user text-stone-400" />
            )}
         </Link>
      </nav>
   );
}

export default BottomNav;
