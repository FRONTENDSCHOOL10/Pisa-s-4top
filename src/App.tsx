import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JoinPage from './pages/Join/JoinPage';
import LoginPage from './pages/Join/LoginPage';
import MySelectionPage from './pages/Join/MySelectionPage';
import MyTastePage from './pages/Join/MyTastePage';
import MainPage from './pages/Main/MainPage';
import TeaListPage from './pages/Recommend/TeaListPage';
import SearchPage from './pages/Main/SearchPage';
import ReviewsPage from './pages/Reviews/ReviewsPage';
import ReviewsDetailPage from './pages/Reviews/ReviewsDetailPage';
import TeaDetailPage from './pages/Recommend/TeaDetailPage';
import ReviewsWritePage from './pages/Reviews/ReviewsWritePage';
import ReviewsEditPage from './pages/Reviews/ReviewsEditPage';
import MyPage from './pages/Settings/MyPage';
import MyEditPage from './pages/Settings/MyEditPage';
import MyReviewsPage from './pages/Settings/MyReviewsPage';
import MyFavoritesPage from './pages/Settings/MyFavoritesPage';
import BottomNav from './components/BottomNav';

function App() {
   return (
      <Router>
         <div>
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
               <Route path="/reviews/edit/:id" element={<ReviewsEditPage />} />
               <Route path="/my-page" element={<MyPage />} />
               <Route path="/my-page/edit" element={<MyEditPage />} />
               <Route path="/my-page/reviews" element={<MyReviewsPage />} />
               <Route path="/my-page/favorites" element={<MyFavoritesPage />} />
            </Routes>
            <BottomNav />
         </div>
      </Router>
   );
}

export default App;
