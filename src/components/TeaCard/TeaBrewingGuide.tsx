import React from 'react';

export interface TeaBrewingGuideProps {
   teaAmount: number;
   waterAmount: number;
   temperature: number;
   time: number;
   teaUnit?: string;
   waterUnit?: string;
   tempUnit?: string;
   timeUnit?: string;
   ariaLabel: string;
   [props: string]: any;
}

const sectionClass: string =
   'shadow-tea-brewing-guide flex justify-between rounded-2xl bg-stone-50 px-6 py-6 select-none';
const containerClass: string = 'flex flex-col items-center';
const iconClass: string =
   'text-lime-600 text-3xl flex justify-center items-center';
const valueClass: string = 'text-lime-600 text-sm font-extrabold mt-2';
const unitClass: string = 'text-stone-300 text-[.625rem] leading-3 font-medium';

interface BrewingDetailProps {
   iconClassName: string;
   value: number;
   unit: string;
   srLabel: string;
}

function BrewingDetail({
   iconClassName,
   value,
   unit,
   srLabel,
}: BrewingDetailProps) {
   return (
      <dl className={containerClass}>
         <dt>
            <span className={`${iconClassName} ${iconClass}`} aria-hidden="true"></span>
            <span className="sr-only">{srLabel}</span>
         </dt>
         <dd className={containerClass}>
            <p className={valueClass}>{value}</p>
            <span className={unitClass}>{unit}</span>
         </dd>
      </dl>
   );
}

export function TeaBrewingGuide({
   teaAmount,
   waterAmount,
   temperature,
   time,
   teaUnit = 'g',
   waterUnit = 'ml',
   tempUnit = '°C',
   timeUnit = 'min',
   ariaLabel = '최적의 티 우리기 가이드',
   ...restProps
}: TeaBrewingGuideProps) {
   const brewingDetails: BrewingDetailProps[] = [
      {
         iconClassName: 'fi fi-rr-leaf',
         value: teaAmount,
         unit: teaUnit,
         srLabel: '최적의 티의 양',
      },
      {
         iconClassName: 'fi fi-rr-mug-alt',
         value: waterAmount,
         unit: waterUnit,
         srLabel: '최적의 물의 양',
      },
      {
         iconClassName: 'fi fi-rr-thermometer-half',
         value: temperature,
         unit: tempUnit,
         srLabel: '최적의 물 온도',
      },
      {
         iconClassName: 'fi fi-rr-hourglass-end',
         value: time,
         unit: timeUnit,
         srLabel: '최적의 티 우리는 시간',
      },
   ];

   return (
      <section className={sectionClass} {...restProps} aria-label={ariaLabel}>
         {brewingDetails.map((detail, index) => (
            <BrewingDetail
               key={index}
               iconClassName={detail.iconClassName}
               value={detail.value}
               unit={detail.unit}
               srLabel={detail.srLabel}
            />
         ))}
      </section>
   );
}
