import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';

const HIDE_BOTTOM_NAV_PATHS = ['/login', '/join', '/my-selection', '/my-taste'];

export default function Layout() {
   const location = useLocation();
   const { pathname } = location;
   const hideBottonNav = HIDE_BOTTOM_NAV_PATHS.includes(pathname);

   return (
      <>
         <main className="content bg-stone-100 py-16">
            <Outlet />
         </main>
         {!hideBottonNav && <BottomNav />}
      </>
   );
}
