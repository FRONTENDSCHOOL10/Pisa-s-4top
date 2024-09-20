import supabase from '@/api/supabase';
import { TeaCategory } from '@/types/types';

// 테이블 이름에 따라 데이터를 가져오는 함수
export async function fetchDataFromTable<T>(
   tableName: string
): Promise<T[] | null> {
   const { data, error } = await supabase.from(tableName).select('*');
   if (error) {
      console.error(`Error fetching data from ${tableName}:`, error);
      return null;
   }
   return data;
}

// 티 데이터 함수
export async function fetchTeaData() {
   return fetchDataFromTable('tea') || [];
}

// 유저 데이터 기반한 티 데이터 함수
export async function fetchFilteredTeaData(
   selectedCategory: string,
   userNickname: string
) {
   try {
      const { data: userTastes, error: userTasteError } = await supabase
         .from('tasteselection')
         .select('user_selection')
         .eq('user_nickname', userNickname)
         .single();

      if (userTasteError || !userTastes) {
         throw new Error('사용자의 테이스팅 노트를 가져오지 못했습니다.');
      }

      const selectedTastes = userTastes?.user_selection || [];

      const { data: tastingNotes, error: tastingNoteError } = await supabase
         .from('teatastingnote')
         .select('tea_id')
         .in('tasting_note', selectedTastes);

      if (tastingNoteError || !tastingNotes) {
         throw new Error(
            '테이스팅 노트에 해당하는 차 데이터를 가져오지 못했습니다.'
         );
      }

      const teaIds = tastingNotes.map((note) => note.tea_id);

      if (teaIds.length === 0) {
         return [];
      }

      const { data: teas, error: teaError } = await supabase
         .from('tea')
         .select('id, tea_name, tea_image, tea_brand, tea_category')
         .eq('tea_category', selectedCategory)
         .in('id', teaIds);

      if (teaError || !teas) {
         throw new Error('티 데이터를 가져오는 중 오류가 발생했습니다.');
      }

      return teas;
   } catch (error) {
      console.error('Error fetching filtered tea data:', error);
      return [];
   }
}

// 티 카테고리 함수
export async function fetchTeaCategoryData(): Promise<TeaCategory[]> {
   const data = await fetchDataFromTable<TeaCategory>('teacategory');
   return data || [];
}

// 유저 데이터 함수
export async function fetchUsersData() {
   return fetchDataFromTable('users') || [];
}

// 찜 데이터 함수
export async function fetchLikeData() {
   const data = await fetchDataFromTable('like');
   if (!data) {
      console.error('Error fetching like data.');
      return [];
   }
   return data;
}

// 테이스팅 노트 데이터 함수
export async function loadTasteNoteData() {
   try {
      const { data, error } = await supabase.from('tastingnote').select('*');

      if (error) {
         console.error('Failed to fetch taste note data:', error);
         throw error; // 오류가 발생하면 상위에서 처리할 수 있도록 던져줌
      }

      if (!data || data.length === 0) {
         console.error('No data found in tastingnote table.');
         return [];
      }

      // 데이터 반환
      return data.map((note) => note.taste_name); // 필요한 데이터만 추출하여 반환
   } catch (error) {
      console.error('Error in loadTasteNoteData:', error);
      return [];
   }
}

// 티 테이스팅 노트 데이터 함수
export async function fetchTeaTastingNotes(teaId: string) {
   const { data, error } = await supabase
      .from('teatastingnote')
      .select('tasting_note')
      .eq('tea_id', teaId);

   if (error) {
      console.error('Error fetching tea tasting notes:', error);
      return [];
   }

   return data.map((item: { tasting_note: string }) => item.tasting_note);
}

// 리뷰 데이터 함수 (단일 데이터)
export async function fetchSingleReview(reviewId?: string) {
   let query = supabase.from('review').select(
      `id, review_title, review_comment, tea_color, review_tasting_note, tea_rate,
         tea:review_tea(id, tea_name, tea_image, tea_category(id, category)),
         user:review_user(nickname, profile_img)`
   );

   if (reviewId) {
      query = query.eq('id', reviewId);
   }

   const { data, error } = await query.single();

   if (error) {
      console.error('Error fetching review data:', error);
      return null;
   }

   return data;
}

// 리뷰 데이터 함수 (여러 데이터)
export async function fetchMultipleReviews(teaId?: string): Promise<any[] | null>  {
   let query = supabase.from('review').select(
      `id, review_title, review_comment, tea_color, review_tasting_note, tea_rate,
         tea:review_tea(id, tea_name, tea_image, tea_category(id, category)),
         user:review_user(nickname, profile_img)`
   );

   if (teaId) {
      query = query.eq('review_tea', teaId);
   }

   const { data, error } = await query;

   if (error) {
      console.error('Error fetching multiple reviews:', error);
      return [];
   }

   return data || [];
}

// 테이스팅 노트 카테고리 함수
export async function fetchTastingNoteCategories() {
   return fetchDataFromTable('tastingnotecategory') || [];
}

// 유저 입맛 데이터 함수
export async function fetchUserTaste(userNickname: string) {
   const trimmedNickname = userNickname.trim();

   const { data, error } = await supabase
      .from('tasteselection')
      .select('user_taste')
      .eq('user_nickname', trimmedNickname)
      .single();
   if (error) {
      console.error('Error fetching user taste:', error);
      return null;
   }

   if (!data) {
      console.log('No matching data found for userNickname:', trimmedNickname);
      return null;
   }

   const userTaste = data.user_taste;
   // console.log('User Taste Result from fetchUserTaste:', userTaste);

   return userTaste;
}

// 테이스팅 노트 -> 티 데이터 함수
export async function fetchTeasByUserSelection(userNickname: string) {
   try {
      // 1. 사용자의 user_selection 가져오기
      const { data: userData, error: userError } = await supabase
         .from('tasteselection')
         .select('user_selection')
         .eq('user_nickname', userNickname)
         .single();

      if (userError) {
         console.error('Error fetching user selection:', userError);
         throw userError;
      }

      const selectedTastes = userData?.user_selection || [];
      console.log('Selected Tastes:', selectedTastes);

      if (!selectedTastes || selectedTastes.length === 0) {
         console.log('No selected tastes found for user:', userNickname);
         return [];
      }

      // 2. 선택된 맛과 관련된 모든 tea_id 가져오기
      const { data: teaTastingNotes, error: noteError } = await supabase
         .from('teatastingnote')
         .select('tea_id')
         .in('tasting_note', selectedTastes);

      if (noteError) {
         console.error('Error fetching tea tasting notes:', noteError);
         throw noteError;
      }

      const teaIds = teaTastingNotes.map((note) => note.tea_id);
      console.log('Tea IDs:', teaIds);

      if (!teaIds || teaIds.length === 0) {
         console.log('No matching tea IDs found for selected tastes.');
         return [];
      }

      // 3. 해당 tea_id와 관련된 차 가져오기
      const { data: teas, error: teaError } = await supabase
         .from('tea')
         .select('id, tea_name, tea_brand, tea_image')
         .in('id', teaIds);

      if (teaError) {
         console.error('Error fetching teas:', teaError);
         throw teaError;
      }

      console.log('Fetched Teas by User Selection:', teas);
      return teas;
   } catch (error) {
      console.error('Error in fetchTeasByUserSelection:', error);
      return [];
   }
}
