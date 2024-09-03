export function Label() {
   return (
      <button
         className="rounded-[1.375rem] border border-solid border-lime-700 bg-stone-100 px-2.5 py-[.3125rem] text-xs font-normal text-lime-700"
         type="button"
      >
         🪻 라벤더
      </button>
   );
}

export function LabelWarning() {
   return (
      <button
         className="rounded-[1.375rem] border border-solid border-red-600 bg-stone-100 px-2.5 py-[.3125rem] text-xs font-normal text-red-600"
         type="button"
      >
         ⛔ 알러지 주의
      </button>
   );
}
