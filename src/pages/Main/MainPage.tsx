import TeaRecommendSwiper from '@/components/TeaCard/TeaRecommendSwiper';
import SearchInput from '@/components/Input/SearchInput';
import HomeReviewCard from '@/components/Review/HomeReviewCard';

export default function MainPage() {
   const recommendations = [
      {
         imageUrl: 'https://example.com/tea1.jpg',
         teaName: '녹차',
         brand: 'Tea Brand A',
      },
      {
         imageUrl: 'https://example.com/tea1.jpg',
         teaName: '녹차',
         brand: 'Tea Brand A',
      },
      {
         imageUrl: 'https://example.com/tea1.jpg',
         teaName: '녹차',
         brand: 'Tea Brand A',
      },
      {
         imageUrl: 'https://example.com/tea1.jpg',
         teaName: '녹차',
         brand: 'Tea Brand A',
      },
      {
         imageUrl: 'https://example.com/tea1.jpg',
         teaName: '녹차',
         brand: 'Tea Brand A',
      },
      {
         imageUrl: 'https://example.com/tea1.jpg',
         teaName: '녹차',
         brand: 'Tea Brand A',
      },
      {
         imageUrl: 'https://example.com/tea1.jpg',
         teaName: '녹차',
         brand: 'Tea Brand A',
      },
      {
         imageUrl: 'https://example.com/tea2.jpg',
         teaName: '홍차',
         brand: 'Tea Brand B',
      },
      {
         imageUrl: 'https://example.com/tea3.jpg',
         teaName: '백차',
         brand: 'Tea Brand C',
      },
   ];
   return (
      <main>
         <h1 className="sr-only">메인 페이지</h1>
         <SearchInput />
         <h2 className="mb-6 mt-12 text-4xl font-thin text-stone-950">
            상큼한
            <br />
            <strong className="font-extrabold">당신에게,</strong>{' '}
            <span className="sr-only">추천하는 차</span>
         </h2>
         <TeaRecommendSwiper teaRecommendations={recommendations} />
         <h3 className="mb-4 mt-14 text-3xl font-extralight">
            다른 사람들의 <strong className="font-semibold">리뷰</strong>
         </h3>
         <HomeReviewCard />
         <HomeReviewCard />
         <HomeReviewCard />
         <HomeReviewCard />
      </main>
   );
}
