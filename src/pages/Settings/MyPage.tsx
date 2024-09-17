import supabase from '@/api/supabase';
import { Button } from '@/components/Buttons/Buttons';
import { UserActivity } from '@/components/User/UserActivity';
import UserCollection from '@/components/User/UserCollection';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface Activity {
   title: string;
   count: number;
   className?: string;
}

const activities: Activity[] = [
   { title: '찜 개수', count: 999 },
   { title: '리뷰 개수', count: 999 },
   { title: '평균', count: 4.5, className: 'col-span-2' },
];

export function Component() {
   const navigate = useNavigate();

   const handleLogout = async () => {
      const { error } = await supabase.auth.signOut();

      toast.success('로그아웃하였습니다');
      navigate('/login');
      localStorage.removeItem('@auth/login');

      if (error) {
         toast.error('로그아웃에 실패하였습니다');
         console.error('로그아웃 오류: ', error.message);
      }
   };

   return (
      <main className="flex flex-col gap-6">
         <h1 className="sr-only">마이페이지</h1>
         <section className="mb-3 flex flex-col items-center">
            <img
               src=""
               alt="프로필"
               className="mb-4 h-[9.375rem] w-[9.375rem] rounded-full bg-stone-300 object-cover"
            />
            <p className="mb-2 text-xs font-normal text-stone-950">상큼한</p>
            <p className="mb-6 text-base font-extrabold text-stone-950">
               닉네임
            </p>
            <Button
               isLink={true}
               href="/my-page/edit"
               ariaLabel="프로필 수정 페이지"
               content="프로필 수정"
               size="small"
            />
         </section>
         <section>
            <h2 className="mb-6 text-2xl font-extrabold text-stone-950">
               나의 활동
            </h2>
            <div className="grid grid-cols-2 gap-4">
               {activities.map((activity, index) => (
                  <UserActivity
                     key={index}
                     className={activity.className}
                     {...activity}
                  />
               ))}
            </div>
         </section>
         <UserCollection />
         <Button
            content="로그아웃"
            size="fullWidth"
            handleClick={handleLogout}
         />
      </main>
   );
}
