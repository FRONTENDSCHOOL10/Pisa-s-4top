interface LogoProps {
   small?: boolean;
   large?: boolean;
}

function Logo({ small, large }: LogoProps) {
   return (
      <div>
         {small ? (
            <img src="/assets/typeLogo-sm.svg" alt="totd 로고와 글자" />
         ) : large ? (
            <img src="/assets/typeLogo-lg.svg" alt="totd 로고와 글자" />
         ) : null}
      </div>
   );
}

export default Logo;
