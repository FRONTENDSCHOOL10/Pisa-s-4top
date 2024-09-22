import supabase from '@/api/supabase';

export const deleteReviewData = async (id: string) => {
   const { data, error } = await supabase.from('review').delete().eq('id', id);

   if (error) {
      console.error('Error deleting review:', error);
      return false;
   }

   return true;
};
