/* 사용법
   <AppBar hasBackBtn /> => 뒤로가기 버튼만 있는 상단 바
   <AppBar hasLogo /> => 로고만 있는 상단 바
   <AppBar title="얼그레이"/> => 뒤로가기 버튼과 얼그레이가 적힌 상단 바 (title에 변수 string 가능)
                              props 없을 시 기본값 hasBackBtn
*/

import { useNavigate } from 'react-router-dom';

interface AppBarProps {
   hasBackBtn?: boolean;
   hasLogo?: boolean;
   title?: string;
}

function AppBar({ hasBackBtn, hasLogo, title }: AppBarProps) {
   const navigate = useNavigate();

   return (
      <header>
         <nav className="flex h-[3.25rem] w-[22.5rem] items-center bg-slate-50 py-[0.88rem] text-base">
            {hasBackBtn ? (
               <button
                  className="p-[1rem]"
                  aria-label="뒤로가기 버튼"
                  onClick={() => navigate(-1)}
               >
                  <span className="fi fi-rs-angle-left text-xs text-green-700" />
               </button>
            ) : hasLogo ? (
               <button className="mx-auto p-3">
                  <img src="/assets/totd-logo.svg" alt="totd 로고" />
               </button>
            ) : title ? (
               <>
                  <button
                     className="p-[1rem]"
                     aria-label="뒤로가기 버튼"
                     onClick={() => navigate(-1)}
                  >
                     <span className="fi fi-rs-angle-left text-xs text-green-700" />
                  </button>
                  <span className="text-green-700">{title}</span>
               </>
            ) : (
               <button
                  className="p-[1rem]"
                  aria-label="뒤로가기 버튼"
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
