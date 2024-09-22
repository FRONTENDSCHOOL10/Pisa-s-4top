import { isLoginCheck } from '@/utils/isLoginCheck';
import { Navigate, Outlet } from 'react-router-dom';

interface Props {
   redirectPath?: string;
}

export default function PublicRoute({ redirectPath = '/' }: Props) {
   if (isLoginCheck()) {
      return <Navigate to={redirectPath} replace />;
   }

   return <Outlet />;
}
