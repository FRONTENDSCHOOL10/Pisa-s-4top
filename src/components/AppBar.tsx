/* 사용법
   <AppBar hasBackBtn /> => 뒤로가기 버튼만 있는 상단 바
   <AppBar hasLogo /> => 로고만 있는 상단 바
   <AppBar title="얼그레이"/> => 뒤로가기 버튼과 얼그레이가 적힌 상단 바 (title에 변수 string 가능)
                              props 없을 시 기본값 hasBackBtn
*/

import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

export interface AppBarProps {
   hasBackBtn?: boolean;
   hasLogo?: boolean;
   title?: string;
}

function AppBar({ hasBackBtn, hasLogo, title }: AppBarProps) {
   const navigate = useNavigate();

   return (
      <header>
         <nav className="flex h-[3.25rem] w-full items-center py-[0.88rem] text-base">
            {hasBackBtn ? (
               <button
                  type="button"
                  className="focus-green px-4"
                  aria-label="뒤로가기"
                  onClick={() => navigate(-1)}
               >
                  <span className="fi fi-rs-angle-left text-xs text-green-700" />
               </button>
            ) : hasLogo ? (
               <button
                  className="focus-green mx-auto"
                  onClick={() => navigate('/')}
                  type="button"
               >
                  <Logo alt="메인 페이지로 이동" />
               </button>
            ) : title ? (
               <>
                  <button
                     type="button"
                     className="focus-green m-4"
                     aria-label="뒤로가기"
                     onClick={() => navigate(-1)}
                  >
                     <span className="fi fi-rs-angle-left text-xs text-green-700" />
                  </button>
                  <span className="text-green-700">{title}</span>
               </>
            ) : (
               <button
                  type="button"
                  className="focus-green px-4"
                  aria-label="뒤로가기"
                  onClick={() => navigate(-1)}
               >
                  <span className="fi fi-rs-angle-left text-xs text-green-700" />
               </button>
            )}
         </nav>
      </header>
   );
}

export default AppBar;
