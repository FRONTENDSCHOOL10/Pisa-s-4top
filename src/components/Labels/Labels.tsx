import { memo, useState } from 'react';

/* label 컴포넌트 */
// 컴포넌트 사용법
// <Label label='라벨 데이터' size='small'/> : small 라벨
// <Label label='라벨 데이터' size='large'/> : large 라벨
// <Label label='라벨 데이터' size='large' isWarning={true}/> : large 알러지 주의 warning 라벨
interface LabelProps {
   label?: string;
   size?: 'small' | 'large';
   isWarning?: boolean;
}

const smallClass = 'text-sm font-medium px-3 py-1.5';
const largeClass = 'text-base font-semibold px-4 py-2';

export const Label = memo(
   ({ label = '라벨', size = 'small', isWarning = false }: LabelProps) => {
      const defaultClass =
         'select-none inline-flex items-center justify-center rounded-[1.375rem] border bg-stone-50';
      const defaultStyle = 'border-stone-300 text-stone-600';
      const warningStyle = 'border-red-600  text-red-600';

      const sizeClass = isWarning
         ? largeClass
         : size === 'large'
           ? largeClass
           : smallClass;
      const labelStyle = isWarning ? warningStyle : defaultStyle;

      return (
         <span className={`${defaultClass} ${sizeClass} ${labelStyle}`}>
            {isWarning ? '⛔ 알러지 주의' : label}
         </span>
      );
   }
);

/* label 버튼 컴포넌트 */
// 컴포넌트 사용법
// <LabelButton label='라벨 데이터' size='small'/> : small 라벨 버튼
// <LabelButton label='라벨 데이터' size='large'/> : large 라벨 버튼
interface LabelButtonProps {
   label?: string;
   size?: 'small' | 'large';
}

export const LabelButton = memo(
   ({ label = '라벨 버튼', size = 'small' }: LabelButtonProps) => {
      const [isActive, setIsActive] = useState(false);

      function handleClick() {
         setIsActive((prevState) => !prevState);
      }

      const defaultClass =
         'select-none inline-flex items-center justify-center rounded-[1.375rem] hover:border-2 hover:border-stone-400 hover:bg-stone-200';
      const sizeClass = size === 'large' ? largeClass : smallClass;

      const activeClass = 'border-2 bg-lime-50 border-lime-700 text-lime-700';
      const inactiveClass =
         'border bg-stone-50 border-stone-300 text-stone-600';

      const buttonClass = `${defaultClass} ${sizeClass} ${isActive ? activeClass : inactiveClass}`;

      return (
         <button
            className={buttonClass}
            type="button"
            onClick={handleClick}
            aria-pressed={isActive}
         >
            {label}
         </button>
      );
   }
);
