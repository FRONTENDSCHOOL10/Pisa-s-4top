import { useLocation, matchPath } from 'react-router-dom';
import AppBar from './AppBar';
import { useTeaData } from '@/hooks/useTeaData';
import type { ComponentProps } from 'react';

interface RouteConfig {
   path: string;
   props: ComponentProps<typeof AppBar>;
}

const routes: RouteConfig[] = [
   { path: '/', props: { hasLogo: true } },
   { path: '/join', props: { hasBackBtn: true } },
   { path: '/search', props: { title: '검색' } },
   { path: '/reviews', props: { title: '티 리뷰 리스트' } },
   { path: '/reviews/write', props: { title: '티 리뷰 작성' } },
   { path: '/recommend', props: { title: '추천 티 리스트' } },
   { path: '/my-page', props: { title: '마이페이지' } },
   { path: '/my-page/edit/email', props: { title: '이메일 변경' } },
   { path: '/my-page/edit/nickname', props: { title: '닉네임 변경' } },
   { path: '/my-page/edit/password', props: { title: '비밀번호 변경' } },
   {
      path: '/my-page/edit/my-selection',
      props: { title: '나의 취향 태그 변경' },
   },
   { path: '/my-page/favorites', props: { title: '나의 찜' } },
   { path: '/my-page/reviews', props: { title: '나의 리뷰' } },
];

// AppBar를 표시하지 않을 페이지들의 경로
const noAppBarRoutes = ['/login', '/my-selection', '/my-taste'];

export default function AppBarController() {
   const location = useLocation();

   // AppBar를 표시하지 않을 페이지들에서는 null을 반환합니다.
   if (noAppBarRoutes.includes(location.pathname)) {
      return null;
   }

   const detailMatch = matchPath('/detail/:id', location.pathname);
   const reviewEditMatch = matchPath('/reviews/edit/:id', location.pathname);
   const reviewDetailMatch = matchPath(
      '/reviews/detail/:id',
      location.pathname
   );

   const tea = useTeaData(detailMatch?.params?.id);

   const matchedRoute = routes.find(
      (route) => location.pathname === route.path
   );

   if (matchedRoute) {
      return <AppBar {...matchedRoute.props} />;
   }

   if (detailMatch) {
      return <AppBar title={tea?.tea_name ?? '티 상세'} />;
   }

   if (reviewEditMatch) {
      return <AppBar title="티 리뷰 수정" />;
   }

   if (reviewDetailMatch) {
      return <AppBar title="티 리뷰 상세" />;
   }

   return <AppBar hasBackBtn />;
}
