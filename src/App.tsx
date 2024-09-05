import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import AppBar from './components/AppBar';

import {
   LoginPage,
   JoinPage,
   MySelectionPage,
   MyTastePage,
   MainPage,
   TeaListPage,
   SearchPage,
   TeaDetailPage,
   ReviewsPage,
   ReviewsDetailPage,
   ReviewsWritePage,
   ReviewsEditPage,
   MyPage,
   MyEditPage,
   MyReviewsPage,
   MyFavoritesPage,
} from './pages';

const routes = [
   {
      path: '/',
      element: <MainPage />,
   },
   {
      path: '/login',
      element: <LoginPage />,
   },
   {
      path: '/join',
      element: <JoinPage />,
   },
   {
      path: '/my-selection',
      element: <MySelectionPage />,
   },
   {
      path: '/my-taste',
      element: <MyTastePage />,
   },
   {
      path: '/recommend',
      element: <TeaListPage />,
   },
   {
      path: '/search',
      element: <SearchPage />,
   },
   {
      path: '/detail/:id',
      element: <TeaDetailPage />,
   },
   {
      path: '/reviews',
      element: <ReviewsPage />,
      children: [
         {
            path: 'detail/:id',
            element: <ReviewsDetailPage />,
         },
         {
            path: 'write',
            element: <ReviewsWritePage />,
         },
         {
            path: 'edit/:id',
            element: <ReviewsEditPage />,
         },
      ],
   },
   {
      path: '/my-page',
      element: <MyPage />,
      children: [
         {
            path: 'edit',
            element: <MyEditPage />,
         },
         {
            path: 'reviews',
            element: <MyReviewsPage />,
         },
         {
            path: 'favorites',
            element: <MyFavoritesPage />,
         },
      ],
   },
];

const router = createBrowserRouter(routes);

const App = () => {
   return (
      <>
         <AppBar />
         <RouterProvider router={router} />
         <BottomNav />
      </>
   );
};

export default App;
