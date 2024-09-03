import { useNavigate } from 'react-router-dom';

interface AppBarProps {
   title?: string;
   hasBackBtn?: boolean;
   hasLogo?: boolean;
}

function AppBar({ title, hasBackBtn, hasLogo }: AppBarProps) {
   const navigate = useNavigate();

   return (
      <div className="flex h-20 w-80 items-center space-x-1 bg-slate-200 px-4 py-3 text-lg">
         {hasBackBtn ? (
            <button aria-label="뒤로가기 버튼" onClick={() => navigate(-1)}>
               <span className="fi fi-rs-angle-left"></span>
            </button>
         ) : hasLogo ? (
            <button className="">
               <img src="/assets/logo.svg" alt="totd 로고" />
            </button>
         ) : title ? (
            <>
               <button aria-label="뒤로가기 버튼" onClick={() => navigate(-1)}>
                  <span className="fi fi-rs-angle-left"></span>
               </button>
               <span>{title}</span>
            </>
         ) : null}
      </div>
   );
}

export default AppBar;
