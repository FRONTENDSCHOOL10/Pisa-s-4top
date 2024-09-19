import supabase from '@/api/supabase';

export async function getSearchReviewData(searchTerm: string) {
   const { data, error } = await supabase
      .from('review')
      .select(
         'id, review_title, review_comment, tea_rate, users:review_user(nickname), tea:review_tea(tea_name,tea_image)'
      )
      .or(
         `review_title.ilike.%${searchTerm}%,review_comment.ilike.%${searchTerm}%`
      );

   if (error) {
      console.error('검색 페이지 리뷰 데이터 가져오기 오류: ', error);
   }

   return data;
}
