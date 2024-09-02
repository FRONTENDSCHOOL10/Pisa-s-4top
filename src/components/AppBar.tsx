import { useNavigate } from 'react-router-dom';

interface AppBarProps {
   title?: string;
   hasBackBtn?: boolean;
   hasLogo?: boolean;
}

function AppBar({ title, hasBackBtn, hasLogo }: AppBarProps) {
   const navigate = useNavigate();

   return (
      <div>
         {hasBackBtn ? (
            <button onClick={() => navigate(-1)}>
               <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
               >
                  <path
                     d="M11.1681 15.9961L4.58606 9.41406C4.21112 9.039 4.00049 8.53038 4.00049 8.00006C4.00049 7.46973 4.21112 6.96111 4.58606 6.58606L11.1641 0.00805664L12.1067 0.950723L5.52873 7.52872C5.40375 7.65374 5.33354 7.82328 5.33354 8.00006C5.33354 8.17683 5.40375 8.34637 5.52873 8.47139L12.1107 15.0534L11.1681 15.9961Z"
                     fill="#68A63C"
                  />
               </svg>
            </button>
         ) : null}
      </div>
   );
}

export default AppBar;
