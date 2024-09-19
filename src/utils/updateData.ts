import supabase from '../api/supabase';

export async function updateReviewData(id: string, updatedReview: any) {
   const { data, error } = await supabase
      .from('review')
      .update(updatedReview)
      .eq('id', id)
      .select('*');

   if (error) {
      console.error('Error updating review data:', error.message);
      return null;
   }

   // console.log('Update successful:', data);
   return data;
}
