import { useState } from 'react';

type ColorOption = {
   label: string;
   value: string;
};

const options: ColorOption[] = [
   { label: '초록', value: 'bg-lime-600' },
   { label: '노랑', value: 'bg-amber-300' },
   { label: '주황', value: 'bg-orange-500' },
   { label: '빨강', value: 'bg-red-600' },
   { label: '갈색', value: 'bg-yellow-900' },
];

export function SelectColor() {
   const [isOpen, setIsOpen] = useState(false);
   const [selectedOption, setSelectedOption] = useState<ColorOption | null>(
      null
   );

   const handleToggle = () => {
      setIsOpen(!isOpen);
   };

   const handleSelect = (option: ColorOption) => {
      setSelectedOption(option);
      setIsOpen(false);
   };

   return (
      <div className="relative w-full">
         <div
            className="relative z-20 flex cursor-pointer items-center justify-center rounded-full border border-stone-300 bg-stone-50 p-2"
            onClick={handleToggle}
         >
            <span
               className={`mr-2 h-4 w-4 rounded-full ${
                  selectedOption ? selectedOption.value : 'bg-stone-200'
               }`}
            ></span>
            <span className="text-base">
               {selectedOption ? selectedOption.label : '색상을 선택하세요'}
            </span>
         </div>

         {isOpen && (
            <ul className="absolute top-0 z-10 flex w-full flex-col gap-4 rounded-3xl border border-stone-300 bg-stone-50 pb-5 pt-12 shadow-lg">
               {options.map((option) => (
                  <li
                     key={option.value}
                     className="flex cursor-pointer items-center justify-center p-2 hover:bg-stone-100"
                     onClick={() => handleSelect(option)}
                  >
                     <span
                        className={`mr-2 h-4 w-4 rounded-full ${option.value}`}
                     ></span>
                     {option.label}
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
}
