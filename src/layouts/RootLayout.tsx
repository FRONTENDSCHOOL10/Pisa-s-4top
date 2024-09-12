import { Outlet, useNavigation } from 'react-router-dom';

import AppBarController from '@/components/Main/AppBarController';
import BottomNavController from '@/components/Main/BottomNavController';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';

export default function RootLayout() {
   const navigation = useNavigation();

   const isLoading = navigation.state === 'loading';

   return (
      <>
         <AppBarController />
         {isLoading ? <LoadingSpinner size={45} /> : <Outlet />}
         <BottomNavController />
      </>
   );
}
