import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import supabase from '@/api/supabase';
import { Button } from '@/components/Buttons/Buttons';
import { UserActivity } from '@/components/User/UserActivity';
import UserCollection from '@/components/User/UserCollection';
import { LoadingSpinner } from '@/components/Main/LoadingSpinner';
import UserData from '@/components/User/UserData';
import UserDataLayout from '@/components/User/UserDataLayout';
import UserProfileImg from '@/components/User/UserProfileImg';
import AppHelmet from '@/components/Main/AppHelmet';
import { fetchMultipleReviews, fetchUserTaste } from '@/utils/fetchData';

interface UserInfo {
   id: string;
   email: string;
   nickname: string;
   profile_img: string;
}

interface Activity {
   title: string;
   count: number;
   className?: string;
}

const defaultActivities: Activity[] = [
   { title: '찜 개수', count: 0 },
   { title: '리뷰 개수', count: 0 },
   { title: '평균 평점', count: 0, className: 'col-span-2' },
];

export function Component() {
   const navigate = useNavigate();
   const [userInfo, setUserInfo] = useState<UserInfo>({
      id: '',
      email: '',
      nickname: '',
      profile_img: '',
   });
   const [activities, setActivities] = useState<Activity[]>(defaultActivities);
   const [userTaste, setUserTaste] = useState<string>('');
   const [isLoading, setIsLoading] = useState<boolean>(true);

   useEffect(() => {
      const fetchUserData = async () => {
         const userData = localStorage.getItem('@auth/user');

         if (!userData) {
            console.error('유저 데이터 없음: ', userData);
            return;
         }

         const user: UserInfo = JSON.parse(userData);
         setUserInfo(user);

         try {
            setIsLoading(true);

            // 유저의 taste 데이터 가져오기
            const tasteData = await fetchUserTaste(user.nickname);
            setUserTaste(tasteData || '');

            // 유저의 리뷰 데이터 가져오기
            const reviewData = await fetchMultipleReviews();
            const userReviews = reviewData
               ? reviewData.filter(
                    (review) => review.user.nickname === user.nickname
                 )
               : [];

            const reviewCount = userReviews.length;
            const averageRating =
               reviewCount > 0
                  ? userReviews.reduce(
                       (sum, review) => sum + (review.tea_rate || 0),
                       0
                    ) / reviewCount
                  : 0;

            // 유저의 찜 데이터 가져오기
            const { data: likeData, error: likeError } = await supabase
               .from('likes')
               .select('*')
               .eq('user_nickname', user.nickname); // 유저 닉네임으로 필터링

            if (likeError) throw likeError;

            const likeCount = likeData?.length || 0; // 찜 개수

            setActivities([
               { title: '찜 개수', count: likeCount },
               { title: '리뷰 개수', count: reviewCount },
               {
                  title: '평균 평점',
                  count: Number(averageRating.toFixed(1)),
                  className: 'col-span-2',
               },
            ]);
         } catch (err) {
            toast.error('유저 데이터를 가져오는 데 실패했습니다.');
            console.error('Error fetching user data:', err);
         } finally {
            setIsLoading(false);
         }
      };

      fetchUserData();
   }, [navigate]);

   // 로그아웃
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

   // 회원 탈퇴
   const handleUserDelete = async () => {
      try {
         const { data, error } = await supabase.auth.admin.deleteUser(
            userInfo.id
         );

         if (error) throw error;

         console.log('탈퇴 완료');

         toast.success('회원 탈퇴가 완료되었습니다');
         localStorage.clear();
         navigate('/login');

         return data;
      } catch (error) {
         console.error('회원 탈퇴 오류: ', error);
         toast.error('탈퇴 도중 오류가 발생하였습니다');
      }
   };

   if (isLoading) {
      return <LoadingSpinner />;
   }

   return (
      <>
         <AppHelmet
            title={`${userInfo.nickname}님의 마이페이지`}
            description={`Tea of the Day 마이페이지 - ${userInfo.nickname}님의 프로필, 활동 내역, 찜과 리뷰 목록을 확인하세요. 개인정보 수정, 취향 태그 변경 등 다양한 기능을 이용할 수 있습니다.`}
         />
         <main className="flex flex-col gap-6">
            <h1 className="sr-only">마이페이지</h1>
            <section className="mb-3 flex flex-col items-center">
               <UserProfileImg
                  userId={userInfo.id}
                  userName={userInfo.nickname}
                  img={userInfo.profile_img}
                  name="profile_img"
               />
               <p className="mb-2 text-xs font-normal">{userTaste}</p>
               <p className="mb-1 text-base font-bold">{userInfo.nickname}</p>
            </section>
            <section className="flex flex-col gap-2">
               <h2 className="sr-only">나의 프로필 수정</h2>
               <UserDataLayout>
                  <UserData
                     label="닉네임"
                     userData={userInfo.nickname}
                     href="edit/nickname"
                  />
                  <UserData
                     label="이메일"
                     userData={userInfo.email}
                     href="edit/email"
                  />
               </UserDataLayout>
               <UserDataLayout>
                  <UserData label="비밀번호 변경" href="edit/password" />
               </UserDataLayout>
               <UserDataLayout>
                  <UserData
                     label="나의 취향 태그 변경"
                     href="edit/my-selection"
                  />
               </UserDataLayout>
            </section>
            <section>
               <h2 className="mb-6 text-2xl font-bold text-stone-950">
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
            <div className="button-group">
               <Button
                  content="로그아웃"
                  size="fullWidth"
                  handleClick={handleLogout}
               />
               <Button
                  content="회원 탈퇴"
                  size="fullWidth"
                  isError={true}
                  className="mt-2"
                  handleClick={handleUserDelete}
               />
            </div>
         </main>
      </>
   );
}
