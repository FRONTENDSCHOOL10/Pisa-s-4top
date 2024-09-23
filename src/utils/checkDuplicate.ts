import supabase from '@/api/supabase';

// DB에서 중복 검사
export const checkDuplicate = async (column: string, value: string) => {
   const { data, error } = await supabase
      .from('users')
      .select(column)
      .eq(column, value);

   if (error) {
      console.error('오류 발생: ', error);
      return false;
   }

   return data.length !== 0; // true면 중복인 것
};
