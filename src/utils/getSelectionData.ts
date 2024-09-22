import supabase from '@/api/supabase';
import toast from 'react-hot-toast';

export async function getSelectionData(nickname: string) {
   const { data: selectionData, error: selectionError } = await supabase
      .from('tasteselection')
      .select('user_nickname')
      .eq('user_nickname', nickname)
      .single();

   if (selectionError && selectionError.code !== 'PGRST116') {
      // 'PGRST116'은 No Rows Found 오류
      toast.error('사용자 선택 정보를 가져오는 데 실패하였습니다');
      return;
   }

   return selectionData;
}

// userData.nickname
