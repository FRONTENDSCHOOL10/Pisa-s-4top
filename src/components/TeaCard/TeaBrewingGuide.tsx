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
}

const sectionClass: string =
   'shadow-icon-recipe flex justify-between rounded-2xl bg-stone-50 px-6 py-6 select-none';
const containerClass: string = 'flex flex-col items-center';
const iconClass: string =
   'text-lime-600 text-3xl flex justify-center items-center';
const valueClass: string = 'text-lime-600 text-sm font-extrabold mt-2';
const unitClass: string = 'text-stone-300 text-[.625rem] leading-3 font-medium';

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
   return (
      <section className={sectionClass} {...restProps} aria-label={ariaLabel}>
         <dl className={containerClass}>
            <dt>
               <span
                  className={`fi fi-rr-leaf ${iconClass}`}
                  aria-hidden="true"
               ></span>
               <span className="sr-only">최적의 티의 양</span>
            </dt>
            <dd className={containerClass}>
               <p className={valueClass}>{teaAmount}</p>
               <span className={unitClass}>{teaUnit}</span>
            </dd>
         </dl>
         <dl className={containerClass}>
            <dt>
               <span
                  className={`fi fi-rr-mug-alt ${iconClass}`}
                  aria-hidden="true"
               ></span>
               <span className="sr-only">최적의 물의 양</span>
            </dt>
            <dd className={containerClass}>
               <p className={valueClass}>{waterAmount}</p>
               <span className={unitClass}>{waterUnit}</span>
            </dd>
         </dl>
         <dl className={containerClass}>
            <dt>
               <span
                  className={`fi fi-rr-thermometer-half ${iconClass}`}
                  aria-hidden="true"
               ></span>
               <span className="sr-only">최적의 물 온도</span>
            </dt>
            <dd className={containerClass}>
               <p className={valueClass}>{temperature}</p>
               <span className={unitClass}>{tempUnit}</span>
            </dd>
         </dl>
         <dl className={containerClass}>
            <dt>
               <span
                  className={`fi fi-rr-hourglass-end ${iconClass}`}
                  aria-hidden="true"
               ></span>
               <span className="sr-only">최적의 티 우리는 시간</span>
            </dt>
            <dd className={containerClass}>
               <p className={valueClass}>{time}</p>
               <span className={unitClass}>{timeUnit}</span>
            </dd>
         </dl>
      </section>
   );
}
