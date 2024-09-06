import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';
import BottomNav from './BottomNav';

// 펑션으로 통일~
const Layout = () => {
   return (
      <>
         <AppBar />
         <main className="content py-16">
            <Outlet />
         </main>
         <BottomNav />
      </>
   );
};

export default Layout;
// 통일~
