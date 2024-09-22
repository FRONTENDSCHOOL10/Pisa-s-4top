interface NoDataProps {
   text: string;
}

export default function NoData({ text }: NoDataProps) {
   return (
      <div className="my-auto grid h-[70vh] w-full place-content-center place-items-center">
         <div className="mb-5 h-32 w-32 overflow-hidden">
            <img
               src="https://yjjphgkgrmyokojwfyzu.supabase.co/storage/v1/object/public/pisa-s-4top-storage/info_images/img_tea_leaf.png"
               alt="No Data Illustration"
               className="h-full w-full object-contain"
            />
         </div>
         <p className="text-lg font-medium text-stone-500">{text}</p>
      </div>
   );
}
