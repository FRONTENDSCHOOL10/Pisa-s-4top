import supabase from "@/api/supabase"

export async function addLike(userNickname: string, teaId: string) {
   try {
     const { data, error } = await supabase
       .from('likes')
       .insert({ user_nickname: userNickname, liked_tea: teaId })
     
     if (error) throw error
     return data
   } catch (error) {
     console.error('Error adding like:', error)
     throw error
   }
 }
 
 export async function removeLike(userNickname: string, teaId: string) {
   try {
     const { data, error } = await supabase
       .from('likes')
       .delete()
       .match({ user_nickname: userNickname, liked_tea: teaId })
     
     if (error) throw error
     return data
   } catch (error) {
     console.error('Error removing like:', error)
     throw error
   }
 }
 
 export async function checkLikeStatus(userNickname: string, teaId: string) {
   try {
     const { data, error } = await supabase
       .from('likes')
       .select()
       .match({ user_nickname: userNickname, liked_tea: teaId })
     
     if (error) throw error
     return data.length > 0
   } catch (error) {
     console.error('Error checking like status:', error)
     throw error
   }
 }
 
 export async function fetchTotalLikes(teaId: string) {
   try {
     const { count, error } = await supabase
       .from('likes')
       .select('*', { count: 'exact', head: true })
       .eq('liked_tea', teaId)
     
     if (error) throw error
     return count || 0
   } catch (error) {
     console.error('Error fetching total likes:', error)
     return 0
   }
 }