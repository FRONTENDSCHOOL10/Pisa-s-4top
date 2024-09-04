import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';

const JoinPage = lazy(() => import('./pages/Join/JoinPage'));
const LoginPage = lazy(() => import('./pages/Join/LoginPage'));
const MySelectionPage = lazy(() => import('./pages/Join/MySelectionPage'));
const MyTastePage = lazy(() => import('./pages/Join/MyTastePage'));
const MainPage = lazy(() => import('./pages/Main/MainPage'));
const TeaListPage = lazy(() => import('./pages/Recommend/TeaListPage'));
const SearchPage = lazy(() => import('./pages/Main/SearchPage'));
const ReviewsPage = lazy(() => import('./pages/Reviews/ReviewsPage'));
const ReviewsDetailPage = lazy(
   () => import('./pages/Reviews/ReviewsDetailPage')
);
const TeaDetailPage = lazy(() => import('./pages/Recommend/TeaDetailPage'));
const ReviewsWritePage = lazy(() => import('./pages/Reviews/ReviewsWritePage'));
const ReviewsEditPage = lazy(() => import('./pages/Reviews/ReviewsEditPage'));
const MyPage = lazy(() => import('./pages/Settings/MyPage'));
const MyEditPage = lazy(() => import('./pages/Settings/MyEditPage'));
const MyReviewsPage = lazy(() => import('./pages/Settings/MyReviewsPage'));
const MyFavoritesPage = lazy(() => import('./pages/Settings/MyFavoritesPage'));

function App() {
   return (
      <Router>
         <div>
            <Suspense fallback={<div>Loading...</div>}>
               <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/join" element={<JoinPage />} />
                  <Route path="/my-selection" element={<MySelectionPage />} />
                  <Route path="/my-taste" element={<MyTastePage />} />
                  <Route path="/" element={<MainPage />} />
                  <Route path="/recommend" element={<TeaListPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/detail/:id" element={<TeaDetailPage />} />
                  <Route path="/reviews" element={<ReviewsPage />} />
                  <Route
                     path="/reviews/detail/:id"
                     element={<ReviewsDetailPage />}
                  />
                  <Route path="/reviews/write" element={<ReviewsWritePage />} />
                  <Route
                     path="/reviews/edit/:id"
                     element={<ReviewsEditPage />}
                  />
                  <Route path="/my-page" element={<MyPage />} />
                  <Route path="/my-page/edit" element={<MyEditPage />} />
                  <Route path="/my-page/reviews" element={<MyReviewsPage />} />
                  <Route
                     path="/my-page/favorites"
                     element={<MyFavoritesPage />}
                  />
               </Routes>
            </Suspense>
            <BottomNav />
         </div>
      </Router>
   );
}

export default App;
