import { createBrowserRouter, RouteObject } from 'react-router-dom';

import RootLayout from './layouts/RootLayout';
import { JoinPage, LoginPage, MainPage, NotFoundPage } from './pages';

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
            path: 'detail', // TODO: DB 연결 후 ':id' 수정 예정?
            lazy: () => import('@/pages/Recommend/TeaDetailPage'),
         },
         {
            path: 'reviews',
            children: [
               {
                  index: true,
                  lazy: () => import('@/pages/Reviews/ReviewsPage'),
               },
               {
                  path: 'detail', // TODO: DB 연결 후 ':id' 수정 예정?
                  lazy: () => import('@/pages/Reviews/ReviewsDetailPage'),
               },
               {
                  path: 'write',
                  lazy: () => import('@/pages/Reviews/ReviewsWritePage'),
               },
               {
                  path: 'edit/:id',
                  lazy: () => import('@/pages/Reviews/ReviewsEditPage'),
               },
            ],
         },
         {
            path: 'my-page',
            children: [
               {
                  index: true,
                  lazy: () => import('@/pages/Settings/MyPage'),
               },
               {
                  path: 'edit',
                  lazy: () => import('@/pages/Settings/MyEditPage'),
               },
               {
                  path: 'reviews',
                  lazy: () => import('@/pages/Settings/MyReviewsPage'),
               },
               {
                  path: 'favorites',
                  lazy: () => import('@/pages/Settings/MyFavoritesPage'),
               },
            ],
         },
         { path: '*', element: <NotFoundPage /> },
      ],
   },
];

const router = createBrowserRouter(routes, {
   basename: import.meta.env.BASE_URL,
});

export default router;
