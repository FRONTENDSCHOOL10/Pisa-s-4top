import { Outlet, useLocation } from 'react-router-dom';
import { AppBarProps } from '@/components/Main/AppBar';
import BottomNav from '@/components/Main/BottomNav';

interface LayoutProps extends AppBarProps {}

// const HIDE_APP_BAR_PATHS = ['/login', '/my-selection', '/my-taste'];
// const HIDE_BOTTOM_NAV_PATHS = ['/login', '/join', '/my-selection', '/my-taste'];

export default function RootLayout({
   hasBackBtn,
   hasLogo,
   title,
}: LayoutProps) {
   // const location = useLocation();
   // const { pathname } = location;
   // const hideAppBar = HIDE_APP_BAR_PATHS.includes(pathname);
   // const hideBottonNav = HIDE_BOTTOM_NAV_PATHS.includes(pathname);

   return (
      <>
         {/* {!hideAppBar && (
            <AppBar hasBackBtn={hasBackBtn} hasLogo={hasLogo} title={title} />
         )} */}

         <main className="content min-h-[calc(100vh-3.75rem)] overflow-y-scroll bg-stone-100 px-8 py-4">
            <Outlet />
         </main>
         <BottomNav />

         {/* {!hideBottonNav && <BottomNav />} */}
      </>
   );
}
