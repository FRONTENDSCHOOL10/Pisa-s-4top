export function ButtonSmall() {
   return (
      <button
         className="h-9 w-[5.19rem] rounded bg-green-700 text-xs font-normal text-stone-100"
         type="button"
      >
         버튼sm
      </button>
   );
}

export function ButtonMedium() {
   return (
      <button
         className="h-[1.94rem] w-60 rounded bg-green-700 text-xs font-normal text-stone-100"
         type="button"
      >
         버튼md
      </button>
   );
}

export function ButtonLarge() {
   return (
      <button
         className="h-[1.94rem] w-[18.5rem] rounded bg-green-700 text-xs font-normal text-stone-100"
         type="button"
      >
         버튼lg
      </button>
   );
}

export function ButtonLargeError() {
   return (
      <button
         className="h-[1.94rem] w-[18.5rem] rounded bg-red-600 text-xs font-normal text-stone-100"
         type="button"
      >
         버튼lg-error
      </button>
   );
}

export function ButtonXlarge() {
   return (
      <button
         className="h-[2.81rem] w-[18.5rem] rounded bg-green-700 text-xs font-normal text-stone-100"
         type="button"
      >
         버튼xl
      </button>
   );
}

export function ButtonHeart() {
   return (
      <button
         className="rounded-2xl border border-stone-300 bg-gradient-to-b from-white from-60% to-stone-100 px-1.5 py-1.5 transition hover:bg-gradient-to-b hover:from-red-600 hover:from-0% hover:to-red-400"
         type="button"
      >
         <span className="fi fi-sr-heart text-shadow-sm flex justify-center text-white"></span>
      </button>
   );
}

export function ButtonHeartSmall() {
   return (
      <button
         className="rounded-2xl border border-stone-300 bg-gradient-to-b from-white from-60% to-stone-100 px-1 py-1 transition hover:bg-gradient-to-b hover:from-red-600 hover:from-0% hover:to-red-400"
         type="button"
      >
         <span className="fi fi-sr-heart text-shadow-sm flex justify-center text-[0.625rem] text-white"></span>
      </button>
   );
}

export function ButtonHeartSmallwithCount() {
   return (
      <>
         <button
            className="rounded-2xl border border-stone-300 bg-gradient-to-b from-white from-60% to-stone-100 px-1 py-1 transition hover:bg-gradient-to-b hover:from-red-600 hover:from-0% hover:to-red-400"
            type="button"
         >
            <span className="fi fi-sr-heart text-shadow-sm flex justify-center text-[0.625rem] text-white"></span>
         </button>
         <span className="ml-1 text-base font-bold text-red-600">10</span>
      </>
   );
}
