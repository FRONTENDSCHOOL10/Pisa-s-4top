import supabase from '@/api/supabase';

export const deleteReviewData = async (id: string) => {
   const { error } = await supabase.from('review').delete().eq('id', id);

   if (error) {
      console.error('Error deleting review:', error);
      return false;
   }

   return true;
};
