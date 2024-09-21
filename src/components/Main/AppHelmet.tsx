/*
사용법

<AppHelmet title="로그인" description="Tea of the Day 로그인 - 차 애호가를 위한 맞춤 추천 서비스 접속" />
*/

import { Helmet } from 'react-helmet-async';

interface Props {
   title: string;
   description: string;
}

export default function AppHelmet({ title, description }: Props) {
   return (
      <Helmet>
         <title>{title} | Tea of the Day, 데일리 차 추천 서비스</title>
         <meta name="description" content={description} />
      </Helmet>
   );
}
