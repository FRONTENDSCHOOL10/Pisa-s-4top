import { useMemo } from 'react';

// 사용법
// 필수 속성만 지정(단위 지정 X)
// <TeaBrewingGuide teaAmount={3} waterAmount={200} temperature={92} brewingTime={3} />
// 옵션 속성도 지정(단위 지정 O + ariaLabel)
// <TeaBrewingGuide teaAmount={3} waterAmount={200} temperature={92} brewingTime={3} teaUnit='mg' waterUnit='l' tempUnit='°C' timeUnit='sec' ariaLabel='얼그레이 티 우리기 가이드' />

export interface TeaBrewingGuideProps {
   teaAmount: number;
   waterAmount: number;
   temperature: number;
   brewingTime: number;
   teaUnit?: string;
   waterUnit?: string;
   tempUnit?: string;
   timeUnit?: string;
   ariaLabel?: string;
   [props: string]: any;
}

const sectionClass: string =
   'shadow-tea-brewing-guide w-full min-w-72 max-w-md md:w-[24rem] flex justify-between rounded-2xl bg-stone-50 px-10 py-6 select-none';
const containerClass: string = 'flex flex-col items-center';
const iconClass: string =
   'text-green-700 text-3xl flex justify-center items-center';
const valueClass: string = 'text-green-700 text-lg font-bold mt-2';
const unitClass: string = 'text-stone-500 text-sm leading-3 font-medium';

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
            <span
               className={`${iconClassName} ${iconClass}`}
               aria-hidden="true"
            ></span>
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
   brewingTime,
   teaUnit = 'g',
   waterUnit = 'ml',
   tempUnit = '°C',
   timeUnit = 'min',
   ariaLabel = '최적의 티 우리기 가이드',
   ...restProps
}: TeaBrewingGuideProps) {
   const brewingDetails = useMemo(
      () => [
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
            value: brewingTime,
            unit: timeUnit,
            srLabel: '최적의 티 우리는 시간',
         },
      ],
      [
         teaAmount,
         waterAmount,
         temperature,
         brewingTime,
         teaUnit,
         waterUnit,
         tempUnit,
         timeUnit,
      ]
   );

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
