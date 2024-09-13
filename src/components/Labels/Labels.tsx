import { memo } from 'react';

/* label 컴포넌트 */
// 컴포넌트 사용법
// <Label content='라벨 데이터' size='small'/> : small 라벨
// <Label content='라벨 데이터' size='large'/> : large 라벨
// <Label content='라벨 데이터' size='large' isWarning={true}/> : large 알러지 주의 warning 라벨
interface LabelProps {
   content?: string;
   size?: 'small' | 'large';
   isWarning?: boolean;
}

const smallClass: string = 'text-sm font-medium px-3 py-1.5';
const largeClass: string = 'text-base font-semibold px-4 py-2';

export const Label = memo(
   ({ content = '라벨', size = 'small', isWarning = false }: LabelProps) => {
      const defaultClass: string =
         'select-none inline-flex items-center justify-center rounded-[1.375rem] border bg-stone-50';
      const defaultStyle: string = 'border-stone-300 text-stone-600';
      const warningStyle: string = 'border-red-600  text-red-600';

      const sizeClass: string = isWarning
         ? largeClass
         : size === 'large'
           ? largeClass
           : smallClass;

      return (
         <span
            className={`${defaultClass} ${sizeClass} ${isWarning ? warningStyle : defaultStyle}`}
         >
            {isWarning ? '⛔ 알러지 주의' : content}
         </span>
      );
   }
);

/* label 버튼 컴포넌트 */
// 컴포넌트 사용법
// <LabelButton content='라벨 데이터' size='small'/> : small 라벨 버튼
// <LabelButton content='라벨 데이터' size='large'/> : large 라벨 버튼
interface LabelButtonProps {
   content?: string;
   size?: 'small' | 'large';
   isActive: boolean;
   handleClick: () => void;
}

export const LabelButton = memo(
   ({
      content = '라벨 버튼',
      size = 'small',
      isActive,
      handleClick,
   }: LabelButtonProps) => {
      const defaultClass: string =
         'select-none inline-flex items-center justify-center rounded-[1.375rem] hover:ring-2 hover:ring-stone-400 hover:bg-stone-200';
      const sizeClass: string = size === 'large' ? largeClass : smallClass;

      const activeClass: string =
         'ring-2 bg-lime-50 ring-lime-700 text-lime-700 border';
      const inactiveClass: string =
         'border bg-stone-50 border-stone-300 text-stone-600';

      const buttonClass: string = `${defaultClass} ${sizeClass} ${isActive ? activeClass : inactiveClass}`;

      return (
         <button
            className={buttonClass}
            type="button"
            onClick={handleClick}
            aria-pressed={isActive}
            aria-label={
               isActive ? `${content} 버튼 활성화` : `${content} 버튼 비활성화`
            }
         >
            {content}
         </button>
      );
   }
);

/* LabelGroup 사용법

---- 사용법 예시 ----

import { LabelGroup } from './path_to_component/LabelGroup';

export default function App() {
   const labelData = [
      { label: '라벤더' },
      { label: '풀향' },
      { label: '우유' },
   ];

   return (
      <div>
         <LabelGroup labels={labelData} size="large" />
         <LabelGroup labels={labelData} size="small" />
      </div>
   );
}

*/

interface LabelGroupProps {
   labels: string[];
   types: 'label' | 'button';
   size?: 'small' | 'large';
   className?: string;

   selectedLabels: boolean[];
   handleToggleLabel: (index: number) => void;
}

export const LabelGroup = memo(
   ({
      labels = [],
      types = 'label',
      size = 'large',
      className = '',
      selectedLabels,
      handleToggleLabel,
   }: LabelGroupProps) => {
      return (
         <div className={`flex flex-wrap gap-2 ${className}`}>
            {labels.map((label, index) => {
               if (types === 'label') {
                  return <Label key={index} content={label} size={size} />;
               } else if (types === 'button') {
                  return (
                     <LabelButton
                        key={index}
                        content={label}
                        size={size}
                        isActive={selectedLabels[index]}
                        handleClick={() => handleToggleLabel(index)}
                     />
                  );
               }
               return null;
            })}
         </div>
      );
   }
);
