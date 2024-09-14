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
export async function fetchLikeData() {
   return fetchDataFromTable('like');
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
