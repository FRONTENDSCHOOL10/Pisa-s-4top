import { isLoginCheck } from '@/utils/isLoginCheck';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
   redirectPath?: string;
}

export default function PrivateRoute({ redirectPath = '/login' }: Props) {
   if (!isLoginCheck()) {
      return <Navigate to={redirectPath} replace />;
   }

   return <Outlet />;
}
