import React from 'react';
import { useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';

export default function BottomNavController() {
   const location = useLocation();

   // 바텀 내비게이션 보여질 경로
   // TODO: 추후 ':id' 는 동적으로 받기?
   const showRoutes = [
      '/',
      '/recommend',
      '/search',
      '/detail:id',
      '/reviews',
      '/reviews/detail:id',
      '/reviews/write',
      '/reviews/edit:id',
      '/my-page',
      '/my-page/edit',
      '/my-page/reviews',
      '/my-page/favorites',
   ];

   if (showRoutes.includes(location.pathname)) {
      return <BottomNav />;
   } else {
      return null;
   }
}
