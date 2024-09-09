import { TeaRecommendCard } from "@/components/TeaCard/CardComponents";

const teaData = [
   { imageUrl: "/image1.jpg", teaName: "얼그레이", brand: "브랜드1" },
   { imageUrl: "/image2.jpg", teaName: "녹차", brand: "브랜드2" },
   { imageUrl: "/image3.jpg", teaName: "홍차", brand: "브랜드3" },
   { imageUrl: "/image4.jpg", teaName: "우롱차", brand: "브랜드4" },
   { imageUrl: "/image5.jpg", teaName: "페퍼민트", brand: "브랜드5" },
   { imageUrl: "/image6.jpg", teaName: "카모마일", brand: "브랜드6" },
   { imageUrl: "/image7.jpg", teaName: "라벤더", brand: "브랜드7" },
   { imageUrl: "/image8.jpg", teaName: "루이보스", brand: "브랜드8" },
];

export default function MyTastePage() {
   return (
      <div className="mx-5">
         {/* TabButton컴포넌트 */}
         <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))]">
            {teaData.map((tea, index) => (
               <div className="flex items-center justify-center">
                  <TeaRecommendCard
                     key={index}
                     imageUrl={tea.imageUrl}
                     teaName={tea.teaName}
                     brand={tea.brand}
                  />
               </div>
            ))}
         </div>
      </div>
   );
}
