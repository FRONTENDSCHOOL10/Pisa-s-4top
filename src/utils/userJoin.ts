import supabase from '@/api/supabase';

export async function userJoin(
   email: string,
   password: string,
   nickname: string
) {
   const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
   });

   if (error) throw error;

   await supabase.from('users').insert({
      id: data.user?.id,
      email: data.user?.email,
      password: password,
      nickname: nickname,
      profile_img: '/assets/profileDefault.webp',
      created_at: data.user?.created_at,
   });

   return data;
}
