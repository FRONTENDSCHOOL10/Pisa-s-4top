import { Button } from '@/components/Buttons/Buttons';
import { UserActivity } from '@/components/User/UserActivity';
import UserCollection from '@/components/User/UserCollection';

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
            handleClick={() => console.log('로그아웃 버튼 클릭됨')}
         />
      </main>
   );
}
