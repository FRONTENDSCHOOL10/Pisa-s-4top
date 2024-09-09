import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';
import BottomNav from './BottomNav';

export default function Layout() {
   return (
      <>
         <main className="content mx-auto box-border py-16">
            <AppBar />
            <Outlet />
            <BottomNav />
         </main>
      </>
   );
}
