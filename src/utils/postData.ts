import supabase from '@/api/supabase';

export async function postTasteSelection(
   userNickname: string,
   selectedTastes: string[]
) {
   try {
      const mostFrequentCategory = await calculateCategory(selectedTastes);

      const { error: insertError } = await supabase
         .from('tasteselection')
         .insert([
            {
               user_nickname: userNickname,
               user_selection: selectedTastes,
               user_taste: mostFrequentCategory,
            },
         ]);

      if (insertError) {
         console.error('Error posting taste selection:', insertError);
         throw insertError;
      }

      return mostFrequentCategory;
   } catch (error) {
      console.error('Error in postTasteSelection:', error);
   }
}

export async function calculateCategory(selectedTastes: string[]) {
   try {
      const normalizedTastes = selectedTastes.map((taste) =>
         taste.trim().toLowerCase()
      );

      const { data: tasteNotes, error: fetchError } = await supabase
         .from('tastingnotecategory')
         .select('tasting_note, tasting_category')
         .in('tasting_note', normalizedTastes);

      if (fetchError) {
         console.error('Error fetching tasting categories:', fetchError);
         throw fetchError;
      }

      if (!tasteNotes || tasteNotes.length === 0) {
         console.error('No matching tasting categories found.');
         return null;
      }

      const categoryCount: Record<string, number> = {};
      tasteNotes.forEach((note) => {
         const category = note.tasting_category;
         categoryCount[category] = (categoryCount[category] || 0) + 1;
      });

      const mostFrequentCategory = Object.keys(categoryCount).reduce((a, b) =>
         categoryCount[a] > categoryCount[b] ? a : b
      );

      return mostFrequentCategory;
   } catch (error) {
      console.error('Error in calculateCategory:', error);
      return null;
   }
}
