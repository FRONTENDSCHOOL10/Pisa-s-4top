import supabase from '@/api/supabase';

export async function getSearchTeaData(searchTerm: string) {
   const { data, error } = await supabase
      .from('tea')
      .select('id, tea_name, tea_category, tea_brand, tea_image')
      .or(searchTerm);

   if (error) {
      console.error('검색 페이지 티 데이터 가져오기 오류: ', error);
   }

   return data;
}
