import { useNavigate } from 'react-router-dom';

/* 사용법
   <AppBar hasBackBtn /> => 뒤로가기 버튼만 있는 상단 바
   <AppBar hasLogo /> => 로고만 있는 상단 바
   <AppBar title="얼그레이"/> => 뒤로가기 버튼과 얼그레이가 적힌 상단 바 (title에 변수 string 가능)
*/

interface AppBarProps {
   hasBackBtn?: boolean;
   hasLogo?: boolean;
   title?: string;
}

function AppBar({ hasBackBtn, hasLogo, title }: AppBarProps) {
   const navigate = useNavigate();

   return (
      <header className="flex h-[3.25rem] w-[22.5rem] items-center bg-slate-100 py-[0.88rem] text-base">
         <nav>
            {hasBackBtn ? (
               <button
                  className="p-[1rem]"
                  aria-label="뒤로가기 버튼"
                  onClick={() => navigate(-1)}
               >
                  <span className="fi fi-rs-angle-left text-xs" />
               </button>
            ) : hasLogo ? (
               <button className="mx-auto p-3">
                  <img src="/assets/logo.svg" alt="totd 로고" />
               </button>
            ) : title ? (
               <>
                  <button
                     className="p-[1rem]"
                     aria-label="뒤로가기 버튼"
                     onClick={() => navigate(-1)}
                  >
                     <span className="fi fi-rs-angle-left text-xs" />
                  </button>
                  <span>{title}</span>
               </>
            ) : null}
         </nav>
      </header>
   );
}

export default AppBar;
