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

export default function AppBar({ hasBackBtn, hasLogo, title }: AppBarProps) {
   const navigate = useNavigate();

   function renderBackButton() {
      return (
         <button
            type="button"
            className="focus-green m-4"
            aria-label="뒤로가기"
            onClick={() => navigate(-1)}
         >
            <span
               className="fi fi-rs-angle-left text-xs text-green-700"
               aria-hidden={true}
            />
         </button>
      );
   }

   function renderContent() {
      if (hasLogo) {
         return (
            <div className="focus-green mx-auto">
               <Logo />
            </div>
         );
      }

      if (title) {
         return (
            <>
               {renderBackButton()}
               <p className="w-full text-green-700">{title}</p>
            </>
         );
      }

      if (hasBackBtn) {
         return renderBackButton();
      }

      return null;
   }

   return (
      <header className="top-0 z-50 w-full min-w-80 max-w-3xl">
         <nav className="flex h-16 !w-full min-w-80 max-w-layout items-center bg-stone-100">
            {renderContent()}
         </nav>
      </header>
   );
}
