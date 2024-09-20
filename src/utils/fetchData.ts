import supabase from '@/api/supabase';

// 테이블 이름에 따라 데이터를 가져오는 함수
export async function fetchDataFromTable(tableName: string) {
   const { data, error } = await supabase.from(tableName).select('*');
   if (error) {
      console.error(`Error fetching data from ${tableName}:`, error);
   }
   return data;
}

// 티 데이터 함수
export async function fetchTeaData() {
   return fetchDataFromTable('tea') || [];
}

// 티 카테고리 함수
export async function fetchTeaCategoryData() {
   return fetchDataFromTable('teacategory') || [];
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
export async function loadTasteNoteData(
   setTasteNoteData: Function,
   setSelectedLabels: Function
) {
   try {
      const { data, error } = await supabase
         .from('tastingnote') // 테이블 이름에 맞게 수정
         .select('*');

      // console.log('Fetched data:', data);
      // console.log('Fetch error:', error);

      if (error) {
         console.error('Failed to fetch taste note data:', error);
         throw error; // 오류가 발생하면 상위에서 처리할 수 있도록 던져줌
      }

      if (!data || data.length === 0) {
         console.error('No data found in tastingnote table.', error);
         return;
      }

      // 데이터 설정
      setTasteNoteData(data.map((note) => note.taste_name)); // 필요한 데이터만 추출
      setSelectedLabels(new Array(data.length).fill(false));
   } catch (error) {
      console.error('Error in loadTasteNoteData:', error);
   }
}

// 티 테이스팅 노트 데이터 함수
export async function fetchTeaTastingNotes(teaId: string) {
   const { data, error } = await supabase
      .from('teatastingnote')
      .select('tastingnote')
      .eq('tea', teaId);

   if (error) {
      console.error('Error fetching tea tasting notes:', error);
      return []; // 에러 발생 시 빈 배열 반환
   }

   return data.map((item: { tastingnote: string }) => item.tastingnote);
}

// 리뷰 데이터 함수
export async function fetchReviewData(reviewId?: string) {
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
      return null; // 에러 발생 시 null 반환
   }

   return {
      id: data.id || '',
      review_title: data.review_title || '제목 없음',
      review_comment: data.review_comment || '코멘트 없음',
      tea_rate: data.tea_rate || 0,
      review_tasting_note: Array.isArray(data.review_tasting_note)
         ? data.review_tasting_note
         : [],
      tea_color: data.tea_color || 'default',
      tea: {
         id: data.tea?.id || '',
         tea_name: data.tea?.tea_name || '',
         tea_image: data.tea?.tea_image || '',
         category: data.tea?.tea_category?.category || '',
      },
      user: {
         nickname: data.user?.nickname || '익명',
         profile_img: data.user?.profile_img || '/assets/profileDefault.webp',
      },
   };
}

// 테이스팅 노트 카테고리 함수
export async function fetchTastingNoteCategories() {
   return fetchDataFromTable('tastingnotecategory') || [];
}

// 유저 입맛 데이터 함수
export async function fetchUserTaste(userNickname: string) {
   const trimmedNickname = userNickname.trim();

   // 사용자 닉네임으로 데이터베이스에서 직접 필터링
   const { data, error } = await supabase
      .from('tasteselection')
      .select('user_taste')
      .eq('user_nickname', trimmedNickname)
      .single(); // 단일 항목을 가져옵니다.

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
