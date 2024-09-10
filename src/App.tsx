import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Main/Layout';
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
      element: <Layout />,
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
            element: <MySelectionPage />,
         },
         {
            path: 'my-taste',
            element: <MyTastePage />,
         },
         {
            path: 'recommend',
            element: <TeaListPage />,
         },
         {
            path: 'search',
            element: <SearchPage />,
         },
         {
            path: 'detail/:id',
            element: <TeaDetailPage />,
         },
         {
            path: 'reviews',
            element: <ReviewsPage />,
         },
         {
            path: 'reviews/detail',
            element: <ReviewsDetailPage />,
         },
         {
            path: 'reviews/write',
            element: <ReviewsWritePage />,
         },
         {
            path: 'reviews/edit/:id',
            element: <ReviewsEditPage />,
         },
         {
            path: 'my-page',
            element: <MyPage />,
         },
         {
            path: 'my-page/edit',
            element: <MyEditPage />,
         },
         {
            path: 'my-page/reviews',
            element: <MyReviewsPage />,
         },
         {
            path: 'my-page/favorites',
            element: <MyFavoritesPage />,
         },
      ],
   },
];

const router = createBrowserRouter(routes);

const App = () => {
   return <RouterProvider router={router} />;
};

export default App;
