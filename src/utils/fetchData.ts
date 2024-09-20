import axios from 'axios';

const SUPABASE_URL = 'https://yjjphgkgrmyokojwfyzu.supabase.co';
const SUPABASE_SERVICE_KEY =
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqanBoZ2tncm15b2tvandmeXp1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTcwNDcwOSwiZXhwIjoyMDQxMjgwNzA5fQ.sjdXS9mMdowCudGucdYYvHIKR991ksBBilg6mzfpBIg';

const supabaseAxios = axios.create({
   baseURL: SUPABASE_URL,
   headers: {
      apiKey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
   },
});

// 테이블 이름에 따라 데이터를 가져오는 함수
export async function fetchDataFromTable(tableName: string) {
   try {
      const response = await supabaseAxios.get(`/rest/v1/${tableName}`);
      console.log(`Data from ${tableName}:`, response.data);
      return response.data;
   } catch (error) {
      console.error(`Error fetching data from ${tableName}:`, error);
      throw error;
   }
}

// 티 데이터 함수
export async function fetchTeaData() {
   return fetchDataFromTable('tea');
}

// 티 카테고리 함수
export async function fetchTeaCategoryData() {
   return fetchDataFromTable('teacategory');
}

// 유저 데이터 함수
export async function fetchUsersData() {
   return fetchDataFromTable('users');
}

// 찜 데이터 함수
// export async function fetchLikeData() {
//    return fetchDataFromTable('like');
// }
export async function fetchLikeData() {
   try {
      return await fetchDataFromTable('like');
   } catch (error) {
      console.error('Error fetching like data:', error);
      return [];
   }
}

// 테이스팅 노트 데이터 함수
export const loadTasteNoteData = async (
   setTasteNoteData: (data: string[]) => void,
   setSelectedLabels: (data: boolean[]) => void
) => {
   try {
      const response = await supabaseAxios.get(
         `/rest/v1/tastingnote?select=taste_name`
      );

      if (!Array.isArray(response.data)) {
         throw new Error('Unexpected response format: expected an array');
      }

      const tasteNoteArray = response.data.map(
         (item: { taste_name: string }) => item.taste_name
      );

      setTasteNoteData(tasteNoteArray);
      setSelectedLabels(new Array(tasteNoteArray.length).fill(false));
   } catch (error) {
      console.error('Error fetching taste note data:', error);
      throw new Error('Failed to load tasting notes. Please try again later.');
   }
};

// 티 테이스팅 노트 데이터 함수
export async function fetchTeaTastingNotes(teaId: string) {
   try {
      const response = await supabaseAxios.get(
         `/rest/v1/teatastingnote?tea=eq.${teaId}&select=tastingnote`
      );
      return response.data.map(
         (item: { tastingnote: string }) => item.tastingnote
      );
   } catch (error) {
      console.error('Error fetching tea tasting notes:', error);
      throw error;
   }
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
      let url =
         '/rest/v1/review?select=id,review_title,review_comment,review_tasting_note,tea_rate,tea:review_tea(id,tea_name,tea_image,tea_category(id,category)),user:review_user(nickname,profile_img),teacolor:tea_color(id)';

      if (reviewId) {
         url += `&id=eq.${reviewId}`;
      }

      const response = await supabaseAxios.get(url);
      console.log(response);

      return response.data.map((review) => ({
         id: review.id || '',
         review_title: review.review_title || '제목 없음',
         review_comment: review.review_comment || '코멘트 없음',
         tea_rate: review.tea_rate || 0,
         review_tasting_note: review.review_tasting_note || [],
         tea: {
            id: review.tea?.id || '',
            tea_name: review.tea?.tea_name || '',
            tea_image: review.tea?.tea_image || '',
            category: review.tea?.tea_category?.category || '',
         },
         teacolor: {
            tea_color: review.teacolor?.id || '',
         },
         user: {
            nickname: review.user?.nickname || '익명',
            profile_img:
               review.user?.profile_img || '/assets/profileDefault.webp',
         },
      }));
   } catch (error) {
      console.error('Error fetching review data:', error);
      throw error;
   }
}
