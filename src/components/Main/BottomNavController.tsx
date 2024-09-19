import React from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function BottomNavController() {
   const location = useLocation();

   const showRoutes = [
      '/main',
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
   ];

   const shouldShow = showRoutes.some((route) =>
      matchPath(route, location.pathname)
   );

   return shouldShow ? <BottomNav /> : null;
}