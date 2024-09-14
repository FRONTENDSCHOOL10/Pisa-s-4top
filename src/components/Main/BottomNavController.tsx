import { useLocation, matchPath, PathMatch } from 'react-router-dom';
import BottomNav from './BottomNav';

type Route =
   | '/'
   | '/recommend'
   | '/search'
   | '/detail/:id'
   | '/reviews'
   | '/reviews/detail/:id'
   | '/reviews/write'
   | '/reviews/edit/:id'
   | '/my-page'
   | '/my-page/edit'
   | '/my-page/reviews'
   | '/my-page/favorites';

const showRoutes: readonly Route[] = [
   '/',
   '/recommend',
   '/search',
   '/detail/:id',
   '/reviews',
   '/reviews/detail/:id',
   '/reviews/write',
   '/reviews/edit/:id',
   '/my-page',
   '/my-page/edit',
   '/my-page/reviews',
   '/my-page/favorites',
] as const;

export default function BottomNavController() {
   const location = useLocation();

   const shouldShow = showRoutes.some((route) => {
      const match: PathMatch<string> | null = matchPath(
         route,
         location.pathname
      );
      return match !== null;
   });

   return shouldShow ? <BottomNav /> : null;
}
