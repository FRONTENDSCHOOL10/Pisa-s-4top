import { createBrowserRouter, RouteObject } from 'react-router-dom';

import RootLayout from './layouts/RootLayout';
import { JoinPage, LoginPage, MainPage } from './pages';

export const routes: RouteObject[] = [
   {
      path: '/',
      element: <RootLayout />,
      children: [
         {
            index: true,
            element: <MainPage />,
         },
         {
            path: 'login',
            element: <LoginPage />,
         },
         {
            path: 'join',
            element: <JoinPage />,
         },
         {
            path: 'my-selection',
            lazy: () => import('@/pages/Join/MySelectionPage'),
         },
         {
            path: 'my-taste',
            lazy: () => import('@/pages/Join/MyTastePage'),
         },
         {
            path: 'recommend',
            lazy: () => import('@/pages/Recommend/TeaListPage'),
         },
         {
            path: 'search',
            lazy: () => import('@/pages/Main/SearchPage'),
         },
         {
            path: 'detail', // DB 연결 후 수정 예정
            lazy: () => import('@/pages/Recommend/TeaDetailPage'),
         },
         {
            path: 'reviews',
            lazy: () => import('@/pages/Reviews/ReviewsPage'),
         },
         {
            path: 'reviews/detail',
            lazy: () => import('@/pages/Reviews/ReviewsDetailPage'),
         },
         {
            path: 'reviews/write',
            lazy: () => import('@/pages/Reviews/ReviewsWritePage'),
         },
         {
            path: 'reviews/edit/:id',
            lazy: () => import('@/pages/Reviews/ReviewsEditPage'),
         },
         {
            path: 'my-page',
            lazy: () => import('@/pages/Settings/MyPage'),
         },
         {
            path: 'my-page/edit',
            lazy: () => import('@/pages/Settings/MyEditPage'),
         },
         {
            path: 'my-page/reviews',
            lazy: () => import('@/pages/Settings/MyReviewsPage'),
         },
         {
            path: 'my-page/favorites',
            lazy: () => import('@/pages/Settings/MyFavoritesPage'),
         },
      ],
   },
];

const router = createBrowserRouter(routes, {
   basename: import.meta.env.BASE_URL,
});
export default router;
