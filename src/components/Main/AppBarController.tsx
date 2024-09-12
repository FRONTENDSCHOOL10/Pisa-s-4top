import React from 'react';
import { useLocation } from 'react-router-dom';
import AppBar from './AppBar';

export default function AppBarController() {
   const location = useLocation();

   // 경로에 따른 조건 처리
   switch (location.pathname) {
      case '/':
         return <AppBar hasLogo />;

      case '/join':
         return <AppBar hasBackBtn />;

      case '/search':
         return <AppBar title="검색" />;

      case '/detail:id':
         return <AppBar title="티 상세" />; // TODO: 추후 어떤 티인지, 티 이름 동적으로 받기?

      case '/reviews':
         return <AppBar title="티 리뷰 리스트" />;

      case '/reviews/write':
         return <AppBar title="티 리뷰 작성" />;

      case '/reviews/edit/:id':
         return <AppBar title="티 리뷰 수정" />;

      case '/reviews/detail:id':
         return <AppBar title="티 리뷰 상세" />;

      case '/recommend':
         return <AppBar title="추천 티 리스트" />;

      case '/my-page':
         return <AppBar title="마이페이지" />;

      case '/my-page/edit':
         return <AppBar title="마이페이지 수정" />;

      case '/my-page/favorites':
         return <AppBar title="나의 찜" />;

      case '/my-page/reviews':
         return <AppBar title="나의 리뷰" />;

      default:
         return null;
   }
}
