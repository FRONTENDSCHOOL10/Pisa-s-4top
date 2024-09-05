import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';
import BottomNav from './BottomNav';

const Layout = () => {
   return (
      <>
         <AppBar />
         <main className="content">
            <Outlet />
         </main>
         <BottomNav />
      </>
   );
};

export default Layout;
