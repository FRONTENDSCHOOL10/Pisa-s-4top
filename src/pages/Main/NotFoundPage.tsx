import { Button } from '@/components/Buttons/Buttons';
import { useLocation } from 'react-router-dom';

export default function NotFoundPage() {
   const location = useLocation();

   return (
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
   );
}
