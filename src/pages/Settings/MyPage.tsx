import { Button } from '@/components/Buttons/Buttons';
import { UserStatus } from '@/components/User/UserStatus';
import { Link } from 'react-router-dom';

function MyPage() {
   return (
      <div className='m-5 flex flex-col gap-12'>
         <h1 className="sr-only">마이페이지</h1>
         <div className="flex flex-col items-center -mb-2">
            <img
               src=""
               alt=""
               className="h-[9.375rem] w-[9.375rem] rounded-full bg-stone-300 mb-4"
            />
            <p className="text-xs font-normal text-stone-950 mb-2">상큼한</p>
            <p className="text-base font-extrabold text-stone-950 mb-6">닉네임</p>
            <Button content="프로필 수정" size="small" />
         </div>
         <div>
            <h2 className="text-2xl font-extrabold text-stone-950 mb-6">나의 활동</h2>
            <div className="grid grid-cols-2 gap-4">
               <UserStatus title="찜 개수" count={999} />
               <UserStatus title="리뷰 개수" count={999} />
               <UserStatus title="평균" count={4.5} className="col-span-2" />
            </div>
         </div>
         <Link to={'/'}>
            <h2 className='text-2xl font-extrabold text-stone-950'>나의 찜</h2>
         </Link>
         <Link to={'/'}>
            <h2 className='text-2xl font-extrabold text-stone-950'>나의 리뷰</h2>
         </Link>
         <Button content='로그아웃' size='fullWidth'/>
      </div>
   );
}

export default MyPage;
