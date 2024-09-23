import { useLocation } from 'react-router-dom';

import { Button } from '@/components/Buttons/Buttons';
import AppHelmet from '@/components/Main/AppHelmet';

export default function NotFoundPage() {
   const location = useLocation();

   return (
      <>
         <AppHelmet
            title="404 Not Found - 페이지를 찾을 수 없습니다"
            description="죄송합니다. 요청하신 페이지를 찾을 수 없습니다. Tea of the Day의 다른 페이지를 둘러보시거나 홈으로 돌아가 다양한 티 정보를 확인해보세요."
         />
         <main className="center-layout">
            <h1 className="sr-only">잘못된 경로 진입</h1>
            <p className="text-9xl font-bold">
               <span className="text-green-700">4</span>0
               <span className="text-green-700">4</span>
            </p>
            <p className="mb-7 text-5xl font-bold" lang="en">
               Not Found
            </p>
            <p>페이지 경로를 찾을 수 없습니다.</p>
            <p>
               현재 경로는{' '}
               <span className="break-all rounded bg-green-700 px-2 text-white">
                  {location.pathname}
               </span>{' '}
               입니다.
            </p>
            <Button
               content="홈으로 이동하기"
               size="fullWidth"
               isLink={true}
               href="/"
               ariaLabel="홈"
               className="mt-[7rem]"
            />
         </main>
      </>
   );
}
