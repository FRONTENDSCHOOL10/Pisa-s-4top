import { Outlet, useLocation } from 'react-router-dom';
import AppBar, { AppBarProps } from './AppBar';
import BottomNav from './BottomNav';

interface LayoutProps extends AppBarProps {}

/* 상단 바 다른 거 쓰는 법 (기본값 hasBackBtn)
   각 페이지 파일에서
   <Layout hasBackBtn/> => 뒤로가기 버튼만 있는 상단 바
   <Layout hasLogo /> => 로고만 있는 상단 바
   <Layout title="얼그레이"/> => 뒤로가기 버튼과 얼그레이가 적힌 상단 바 (title에 변수 string 가능)
*/

export default function Layout({ hasBackBtn, hasLogo, title }: LayoutProps) {
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
         {!hideAppBar && (
            <AppBar hasBackBtn={hasBackBtn} hasLogo={hasLogo} title={title} />
         )}
         <main className="content py-16">
            <Outlet />
         </main>
         {!hideBottonNav && <BottomNav />}
      </>
   );
}
