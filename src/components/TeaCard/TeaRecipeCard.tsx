export interface TeaRecipeCardProps {
   title: string;
   imageUrl: string;
   steps: string[];
}

export default function TeaRecipeCard({
   title,
   imageUrl,
   steps,
}: TeaRecipeCardProps) {
   return (
      <article className="relative max-w-lg rounded-2xl border border-stone-300 bg-white p-5 shadow-xl">
         <h3 className="mb-3 text-sm font-extrabold text-stone-950">{title}</h3>
         <div className="flex gap-5">
            <div className="w-1/3">
               <img
                  src={imageUrl}
                  alt="Recipe"
                  className="w-full object-contain"
               />
            </div>
            <ol className="text-xs leading-6">
               {steps.map((step, index) => (
                  <li key={index}>{step}</li>
               ))}
            </ol>
         </div>
      </article>
   );
}
