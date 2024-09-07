import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';
import BottomNav from './BottomNav';

export default function Layout() {
   return (
      <>
         <AppBar />
         <main className="content py-16">
            <Outlet />
         </main>
         <BottomNav />
      </>
   );
}
