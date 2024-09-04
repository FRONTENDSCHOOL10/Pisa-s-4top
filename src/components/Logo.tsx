/* 사용법
   <Logo /> => 기본 잎 로고
   <Logo alt="대체 텍스트"/> => 대체 텍스트가 들어가는 기본 잎 로고 
   <Logo small/> => totd 글자 있는 작은 로고
   <Logo large/> => totd 글자 있는 큰 로고
*/

import createUrl from '@/utils/createUrl';

interface LogoProps {
   small?: boolean;
   large?: boolean;
   alt?: string;
}

function Logo({ small, large, alt }: LogoProps) {
   return (
      <div>
         {small ? (
            <img src={createUrl('typeLogo-sm')} />
         ) : large ? (
            <img src={createUrl('typeLogo-lg')} />
         ) : alt ? (
            <img src={createUrl('totd-logo')} alt={alt} />
         ) : (
            <img src={createUrl('totd-logo')} />
         )}
      </div>
   );
}

export default Logo;
