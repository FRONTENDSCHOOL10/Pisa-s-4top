/* 사용법
   <Logo /> => 글자 없는 잎 로고
   <Logo small/> => totd 글자 있는 작은 로고
   <Logo large/> => totd 글자 있는 큰 로고
*/

interface LogoProps {
   small?: boolean;
   large?: boolean;
}

function Logo({ small, large }: LogoProps) {
   return (
      <div>
         {small ? (
            <img src="/assets/typeLogo-sm.svg" alt="totd 로고" />
         ) : large ? (
            <img src="/assets/typeLogo-lg.svg" alt="totd 로고" />
         ) : (
            <img src="/assets/totd-logo.svg" alt="totd 로고" />
         )}
      </div>
   );
}

export default Logo;
