import supabase from '@/api/supabase';

interface ReviewData {
   review_tea: string;
   review_title: string;
   review_comment: string;
   review_tasting_note: string[];
   tea_color: string;
   tea_rate: number;
   review_user: string;
}

export async function createReviewData(reviewData: ReviewData) {
   try {
      const { data, error } = await supabase
         .from('review')
         .insert([reviewData])
         .select('id');

      if (error) {
         console.error('Error creating review:', error);
         return null;
      }

      return data[0].id;
   } catch (error) {
      console.error('Unexpected error creating review:', error);
      return null;
   }
}
