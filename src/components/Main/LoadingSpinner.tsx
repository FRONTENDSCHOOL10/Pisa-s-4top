import { memo } from 'react';

interface Props {
   color?: string;
   size?: number;
   duration?: number;
}

export const LoadingSpinner = memo(
   ({ color = '#15803d', size = 45, duration = 1.2, ...restProps }: Props) => {
      return (
         <svg
            role="presentation"
            viewBox="0 0 38 38"
            width={size}
            height={size}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            {...restProps}
         >
            <defs>
               <linearGradient
                  x1="8.042%"
                  y1="0%"
                  x2="65.682%"
                  y2="23.865%"
                  id="a"
               >
                  <stop stopColor={color} stopOpacity={0} offset="0%" />
                  <stop stopColor={color} stopOpacity=".631" offset="63.146%" />
                  <stop stopColor={color} offset="100%" />
               </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
               <g transform="translate(1 1)">
                  <path
                     d="M36 18c0-9.94-8.06-18-18-18"
                     id="Oval-2"
                     stroke="url(#a)"
                     strokeWidth={2}
                  >
                     <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur={`${duration}s`}
                        repeatCount="indefinite"
                     />
                  </path>
                  <circle fill={color} cx={36} cy={18} r={1}>
                     <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur={`${duration}s`}
                        repeatCount="indefinite"
                     />
                  </circle>
               </g>
            </g>
         </svg>
      );
   }
);
