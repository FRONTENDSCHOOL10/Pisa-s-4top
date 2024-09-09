import { Outlet, useLocation } from 'react-router-dom';
import AppBar from './AppBar';
import BottomNav from './BottomNav';

export default function Layout() {
   const location = useLocation();
   const { pathname } = location;
   const hideAppBar = ['/login', '/my-selection', '/my-taste'].includes(
      pathname
   );
   const hideBottonNav = [
      '/login',
      '/join',
      '/my-selection',
      '/my-taste',
   ].includes(pathname);

   return (
      <>
         {!hideAppBar && <AppBar />}
         <main className="content py-16">
            <Outlet />
         </main>
         {!hideBottonNav && <BottomNav />}
      </>
   );
}
