import { createBrowserRouter, RouteObject } from 'react-router-dom';

import RootLayout from './layouts/RootLayout';
import { JoinPage, LoginPage, MainPage, NotFoundPage } from './pages';
import PublicRoute from './layouts/PublicRoute';
import PrivateRoute from './layouts/PrivateRoute';

export const routes: RouteObject[] = [
   {
      path: '/',
      element: <RootLayout />,
      children: [
         {
            element: <PublicRoute />,
            children: [
               {
                  path: 'login',
                  element: <LoginPage />,
               },
               {
                  path: 'join',
                  element: <JoinPage />,
               },
            ],
         },
         {
            element: <PrivateRoute />,
            children: [
               {
                  index: true,
                  element: <MainPage />,
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
                  path: 'detail/:id',
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
                        path: 'detail/:id',
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
                        path: 'edit/email',
                        lazy: () => import('@/pages/Settings/MyEditEmailPage'),
                     },
                     {
                        path: 'edit/nickname',
                        lazy: () =>
                           import('@/pages/Settings/MyEditNicknamePage'),
                     },
                     {
                        path: 'edit/password',
                        lazy: () =>
                           import('@/pages/Settings/MyEditPasswordPage'),
                     },
                     {
                        path: 'edit/my-selection',
                        lazy: () => import('@/pages/Settings/MyEditTastePage'),
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
