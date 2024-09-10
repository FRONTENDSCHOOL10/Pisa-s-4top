import { Button } from '@/components/Buttons/Buttons';
import { UserActivity } from '@/components/User/UserActivity';
import UserCollection from '@/components/User/UserCollection';
import { Link } from 'react-router-dom';

function MyPage() {
   return (
      <div className="mx-5 flex flex-col gap-12 ">
         <UserCollection href='/my-page/favorites'/>
         <h1 className="sr-only">마이페이지</h1>
         <div className="-mb-2 flex flex-col items-center">
            <img
               src=""
               alt=""
               className="mb-4 h-[9.375rem] w-[9.375rem] rounded-full bg-stone-300"
            />
            <p className="mb-2 text-xs font-normal text-stone-950">상큼한</p>
            <p className="mb-6 text-base font-extrabold text-stone-950">
               닉네임
            </p>
            {/* 링크 버튼으로 수정 필요 */}
            <Button
               content="프로필 수정"
               size="small"
               handleClick={() => console.log('프로필 수정 버튼 클릭됨')}
            />
         </div>
         <div>
            <h2 className="mb-6 text-2xl font-extrabold text-stone-950">
               나의 활동
            </h2>
            <div className="grid grid-cols-2 gap-4">
               <UserActivity title="찜 개수" count={999} />
               <UserActivity title="리뷰 개수" count={999} />
               <UserActivity title="평균" count={4.5} className="col-span-2" />
            </div>
         </div>
         <Link to={'/'}>
            <h2 className="text-2xl font-extrabold text-stone-950">나의 찜</h2>
         </Link>
         <Link to={'/'}>
            <h2 className="text-2xl font-extrabold text-stone-950">
               나의 리뷰
            </h2>
         </Link>
         <Button
            content="로그아웃"
            size="fullWidth"
            handleClick={() => console.log('로그아웃 버튼 클릭됨')}
         />
      </div>
   );
}

export default MyPage;
