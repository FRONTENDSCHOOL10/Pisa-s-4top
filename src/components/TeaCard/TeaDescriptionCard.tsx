export interface TeaDescriptionCardProps {
   title: string;
   description: string;
}

export default function TeaDescriptionCard({
   title,
   description,
}: TeaDescriptionCardProps) {
   return (
      <article className="relative w-5/6 rounded-2xl border border-stone-300 bg-white p-5 shadow-xl">
         <h3 className="text-sm font-extrabold text-stone-950">{title}</h3>
         <p className="mt-2 text-xs font-medium text-stone-600">
            {description}
         </p>
      </article>
   );
}
