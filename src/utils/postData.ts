import axios from 'axios';
import { fetchTastingNoteCategories } from './fetchData';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseAxios = axios.create({
   baseURL: SUPABASE_URL,
   headers: {
      apiKey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
   },
});

export async function postTasteSelection(
   userNickname: string,
   selectedTastes: string[]
) {
   try {
      // 1. 테이스팅 노트 카테고리 가져오기
      const tastingNoteCategories = await fetchTastingNoteCategories();
      console.log('Tasting Note Categories:', tastingNoteCategories); // 확인

      // 2. 선택된 맛을 카테고리로 매핑하고, 카테고리별로 카운트
      const categoryCounts = selectedTastes
         .map((taste) => {
            console.log('Processing taste:', taste); // 확인
            const note = tastingNoteCategories.find(
               (note) => note.tasting_note === taste
            );
            console.log('Mapped note:', note); // 확인
            return note ? note.tasting_category : null; // 여기에서 tasting_category로 변경
         })
         .filter((category) => category !== null)
         .reduce(
            (acc, category) => {
               console.log('Counting category:', category); // 확인
               acc[category!] = (acc[category!] || 0) + 1;
               return acc;
            },
            {} as Record<string, number>
         );

      // 3. 가장 많이 선택된 카테고리 찾기
      console.log('Category Counts:', categoryCounts); // 확인
      let userTaste = '자유로운';
      let maxCount = 0;
      for (const category in categoryCounts) {
         if (categoryCounts[category] > maxCount) {
            maxCount = categoryCounts[category];
            userTaste = category;
         }
      }

      console.log('Selected userTaste:', userTaste); // 최종 확인

      // 4. 데이터 삽입
      const response = await supabaseAxios.post('/rest/v1/tasteselection', {
         user_nickname: userNickname,
         user_selection: selectedTastes,
         user_taste: userTaste,
      });

      return response.data;
   } catch (error) {
      console.error('Error posting taste selection:', error);
      throw error;
   }
}
