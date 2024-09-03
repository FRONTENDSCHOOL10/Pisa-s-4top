import { useLocation, useMatches, useNavigate } from 'react-router-dom';

function BottomNav() {
   const navigate = useNavigate();
   const location = useLocation();
   const { pathname } = location;
   console.log(pathname);

   return (
      <div className="bg-[var(--tailwind-white-opacity-20, rgba(255, 255, 255, 0.20))] flex h-[3.75rem] w-[22.5rem] items-center justify-around text-xl bg-blend-multiply backdrop-blur-[5px] backdrop-filter [border-top:1px_solid_var(--tailwind-white-white,_#FFF)] [box-shadow:0px_-10px_30px_0px_var(--tailwind-stone-stone-300,_#D6D3D1),_0px_0px_30px_0px_var(--tailwind-white-white,_#FFF)_inset]">
         <button onClick={() => navigate('/')}>
            {pathname === '/' ? (
               <span className="fi fi-sr-home"></span>
            ) : (
               <span className="fi fi-rr-home active: cursor-pointer" />
            )}
         </button>
         <button onClick={() => navigate('/recommend')}>
            {pathname === '/recommend' ? (
               <span className="fi fi-sr-star" />
            ) : (
               <span className="fi fi-rr-star" />
            )}
         </button>
         <button onClick={() => navigate('/reviews')}>
            {pathname === '/reviews' ? (
               <span className="fi fi-sr-comment" />
            ) : (
               <span className="fi fi-rr-comment" />
            )}
         </button>
         <button onClick={() => navigate('/my-page')}>
            {pathname === '/my-page' ? (
               <span className="fi fi-sr-user" />
            ) : (
               <span className="fi fi-rr-user" />
            )}
         </button>
      </div>
   );
}

export default BottomNav;
