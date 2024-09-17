import { useState, useEffect } from 'react';
import supabase from '@/api/supabase';
import { Button } from '@/components/Buttons/Buttons';
import { UserActivity } from '@/components/User/UserActivity';
import UserCollection from '@/components/User/UserCollection';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { fetchReviewData } from '@/utils';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';

interface UserInfo {
   nickname: string;
   profile_img: string;
}

interface Activity {
   title: string;
   count: number;
   className?: string;
}

interface Review {
   id: string;
   review_user: string;
   review_title: string;
   review_comment: string;
   tea_rate: number;
}

const defaultActivities: Activity[] = [
   { title: '찜 개수', count: 0 },
   { title: '리뷰 개수', count: 0 },
   { title: '평균 평점', count: 0, className: 'col-span-2' },
];

export function Component() {
   const navigate = useNavigate();
   const [userInfo, setUserInfo] = useState<UserInfo>({
      nickname: '',
      profile_img: '',
   });
   const [activities, setActivities] = useState<Activity[]>(defaultActivities);
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
      const fetchUserData = async () => {
         const userString = localStorage.getItem('@auth/user');
         if (!userString) {
            navigate('/login');
            return;
         }

         const user: UserInfo = JSON.parse(userString);
         setUserInfo(user);

         try {
            setLoading(true);
            const reviewData: Review[] = await fetchReviewData();
            const userReviews = reviewData.filter(
               (review) => review.review_user === user.nickname
            );

            const reviewCount = userReviews.length;
            const averageRating =
               reviewCount > 0
                  ? userReviews.reduce(
                       (sum, review) => sum + (review.tea_rate || 0),
                       0
                    ) / reviewCount
                  : 0;

            setActivities([
               // 찜 개수는 아직 구현 전
               { title: '찜 개수', count: 0 },
               { title: '리뷰 개수', count: reviewCount },
               {
                  title: '평균 평점',
                  count: Number(averageRating.toFixed(1)),
                  className: 'col-span-2',
               },
            ]);
         } catch (err) {
            toast.error('리뷰 데이터를 가져오는 데 실패했습니다.');
            console.error('Error fetching user data:', err);
         } finally {
            setLoading(false);
         }
      };

      fetchUserData();
   }, [navigate]);

   const handleLogout = async () => {
      try {
         const { error } = await supabase.auth.signOut();
         if (error) throw error;

         toast.success('로그아웃하였습니다');
         localStorage.removeItem('@auth/login');
         localStorage.removeItem('@auth/user');
         navigate('/login');
      } catch (error) {
         console.error('로그아웃 오류:', error);
         toast.error('로그아웃에 실패하였습니다');
      }
   };

   if (loading) {
      return <LoadingSpinner />;
   }

   return (
      <main className="flex flex-col gap-6">
         <h1 className="sr-only">마이페이지</h1>
         <section className="mb-3 flex flex-col items-center">
            <img
               src={userInfo.profile_img || '/assets/profileDefault.webp'}
               alt="프로필"
               className="mb-4 h-[9.375rem] w-[9.375rem] rounded-full bg-stone-300 object-cover"
            />
            <p className="mb-2 text-xs font-normal text-stone-950">상큼한</p>
            <p className="mb-6 text-base font-extrabold text-stone-950">
               {userInfo.nickname}
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
