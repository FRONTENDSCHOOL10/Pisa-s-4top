import { useLocation, matchPath, PathMatch } from 'react-router-dom';
import AppBar from './AppBar';
import { useTeaData } from '@/hooks/useTeaData';
import { ComponentProps } from 'react';

type AppBarProps = ComponentProps<typeof AppBar>;

interface RouteConfig {
   path: string;
   props: AppBarProps;
}

type Route =
   | '/'
   | '/join'
   | '/search'
   | '/reviews'
   | '/reviews/write'
   | '/recommend'
   | '/my-page'
   | '/my-page/edit'
   | '/my-page/favorites'
   | '/my-page/reviews';

const routes: readonly RouteConfig[] = [
   { path: '/', props: { hasLogo: true } },
   { path: '/join', props: { hasBackBtn: true } },
   { path: '/search', props: { title: '검색' } },
   { path: '/reviews', props: { title: '티 리뷰 리스트' } },
   { path: '/reviews/write', props: { title: '티 리뷰 작성' } },
   { path: '/recommend', props: { title: '추천 티 리스트' } },
   { path: '/my-page', props: { title: '마이페이지' } },
   { path: '/my-page/edit', props: { title: '마이페이지 수정' } },
   { path: '/my-page/favorites', props: { title: '나의 찜' } },
   { path: '/my-page/reviews', props: { title: '나의 리뷰' } },
] as const;

const noAppBarRoutes = ['/login', '/my-selection', '/my-taste'] as const;
type NoAppBarRoute = (typeof noAppBarRoutes)[number];

export default function AppBarController() {
   const location = useLocation();

   if (noAppBarRoutes.includes(location.pathname as NoAppBarRoute)) {
      return null;
   }

   const detailMatch: PathMatch<'id'> | null = matchPath(
      '/detail/:id',
      location.pathname
   );
   const reviewEditMatch: PathMatch<'id'> | null = matchPath(
      '/reviews/edit/:id',
      location.pathname
   );
   const reviewDetailMatch: PathMatch<'id'> | null = matchPath(
      '/reviews/detail/:id',
      location.pathname
   );

   const tea = useTeaData(detailMatch?.params?.id);

   const matchedRoute = routes.find(
      (route): route is (typeof routes)[number] =>
         location.pathname === route.path
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
