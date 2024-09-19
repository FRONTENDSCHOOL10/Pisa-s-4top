/*
  ----- 사용법 -----

   const [teaData, setTeaData] = useState([]);
   const [usersData, setUsersData] = useState([]);
   const [likeData, setLikeData] = useState([]);

   useEffect(() => {
      ----- tea 데이터를 가져오는 함수 호출
      const getTeaData = async () => {
         try {
            const data = await fetchTeaData();
            setTeaData(data);
         } catch (error) {
            console.error('Failed to fetch tea data:', error);
         }
      };

      ----- users 데이터를 가져오는 함수 호출
      const getUsersData = async () => {
         try {
            const data = await fetchUsersData();
            setUsersData(data);
         } catch (error) {
            console.error('Failed to fetch users data:', error);
         }
      };

      ----- like 데이터를 가져오는 함수 호출
      const getLikeData = async () => {
         try {
            const data = await fetchLikeData();
            setLikeData(data);
         } catch (error) {
            console.error('Failed to fetch like data:', error);
         }
      };

      getTeaData();
      getUsersData();
      getLikeData();
 */

import axios from 'axios';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
// export async function fetchLikeData() {
//    try {
//       return await fetchDataFromTable('like');
//    } catch (error) {
//       console.error('Error fetching like data:', error);
//       return [];
//    }
// }

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
      const response = await supabaseAxios.get('/rest/v1/teatastingnote', {
         params: {
            tea_id: `eq.${teaId}`,
            select: 'tasting_note',
         },
      });
      return response.data.map(
         (item: { tasting_note: string }) => item.tasting_note
      );
   } catch (error) {
      console.error('Error fetching tea tasting notes:', error);
      return [];
   }
}

// 리뷰 데이터 함수
export async function fetchReviewData(options?: {
   reviewId?: string;
   teaId?: string;
}) {
   try {
      let url =
         '/rest/v1/review?select=id,review_title,review_comment,tea_rate,review_tasting_note,tea:review_tea(id,tea_name,tea_image,tea_category(id,category)),user:review_user(nickname,profile_img),teacolor:tea_color(id,tea_color)';

      if (options?.reviewId) {
         url += `&id=eq.${options.reviewId}`;
      } else if (options?.teaId) {
         url += `&review_tea=eq.${options.teaId}`;
      }

      const response = await supabaseAxios.get(url);

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
         user: {
            nickname: review.user?.nickname || '익명',
            profile_img:
               review.user?.profile_img || '/assets/profileDefault.webp',
         },
         teacolor: {
            id: review.teacolor?.id || '',
            tea_color: review.teacolor?.tea_color || '',
         },
      }));
   } catch (error) {
      console.error('Error fetching review data:', error);
      throw error;
   }
}

// 테이스팅 노트 카테고리 함수
export async function fetchTastingNoteCategories() {
   return fetchDataFromTable('tastingnotecategory');
}
