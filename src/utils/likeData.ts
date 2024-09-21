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

export async function addLike(userNickname: string, teaId: string) {
   try {
      const response = await supabaseAxios.post('/rest/v1/likes', {
         user_nickname: userNickname,
         liked_tea: teaId,
      });

      return response.data;
   } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
         console.error('Error response:', error.response.data);
      }
      console.error('Error adding like:', error);
      throw error;
   }
}

export async function removeLike(userNickname: string, teaId: string) {
   try {
      const response = await supabaseAxios.delete('/rest/v1/likes', {
         params: {
            user_nickname: `eq.${userNickname}`,
            liked_tea: `eq.${teaId}`,
         },
      });
      return response.data;
   } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
         console.error('Error response:', error.response.data);
      }
      console.error('Error removing like:', error);
      throw error;
   }
}

export async function checkLikeStatus(userNickname: string, teaId: string) {
   try {
      const response = await supabaseAxios.get('/rest/v1/likes', {
         params: {
            user_nickname: `eq.${userNickname}`,
            liked_tea: `eq.${teaId}`,
         },
      });
      return response.data.length > 0;
   } catch (error) {
      console.error('Error checking like status:', error);
      throw error;
   }
}

export async function fetchTotalLikes(teaId: string) {
   try {
      const response = await supabaseAxios.get('/rest/v1/likes', {
         params: {
            liked_tea: `eq.${teaId}`,
            select: 'count',
         },
      });
      return response.data[0]?.count || 0;
   } catch (error) {
      console.error('Error fetching total likes:', error);
      return 0;
   }
}