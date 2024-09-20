import { FormEvent, useEffect, useState } from 'react';

import supabase from '@/api/supabase';
import { Button } from '@/components/Buttons/Buttons';
import DoublePasswordInput from '@/components/Input/DoublePasswordInput';
import DuplicateEmailInput from '@/components/Input/DuplicateEmailInput';
import DuplicateNicknameInput from '@/components/Input/DuplicateNicknameInput';
import UserProfileImg from '@/components/User/UserProfileImg';
import { useJoinStore } from '@/stores';
import toast from 'react-hot-toast';

export function Component() {
   const [user, setUser] = useState({
      id: '',
      email: '',
      nickname: '',
      profile_img: '',
   });

   const [newProfileImage, setNewProfileImage] = useState<File | null>(null);

   // 츄스탄트
   const {
      emailSuccess,
      nicknameSuccess,
      setEmailSuccess,
      setNicknameSuccess,
   } = useJoinStore();

   // 유저 데이터 가져오기
   useEffect(() => {
      const localUserData = localStorage.getItem('@auth/user');

      if (localUserData) {
         const parseUserData = JSON.parse(localUserData);
         setUser(parseUserData); // 로컬 스토리지에 있는 유저 데이터로 상태 업데이트
      } else {
         console.error('localStorage에 유저 데이터가 존재하지 않습니다');
      }
   }, []);

   // 이미지 체인지
   const handleImageChange = async (file: File) => {
      setNewProfileImage(file);

      if (emailSuccess) console.log('이메일 성공');
      else if (nicknameSuccess) console.log('닉네임 성공');
      else if (emailSuccess && !nicknameSuccess)
         console.log('이메일성공/닉네임실패');
   };

   // 수정하기
   const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (emailSuccess) console.log('이메일 성공');
      else if (nicknameSuccess) console.log('닉네임 성공');
      else if (emailSuccess && !nicknameSuccess)
         console.log('이메일성공/닉네임실패');

      if (newProfileImage) {
         try {
            console.log('이미지 업로드 시작');

            const fileName = `${user.id}_${Date.now()}`; // 파일 이름 설정
            const filePatch = `profile_images/${fileName}`; // 파일 경로

            // 1. 스토리지에 이미지 업로드
            const { data, error } = await supabase.storage
               .from('pisa-s-4top-storage')
               .upload(filePatch, newProfileImage, { upsert: true });

            if (error) throw error;
            console.log('이미지 업로드 성공:', data);

            // 2. 업로드된 이미지의 공개 URL 가져오기
            const { data: publicUrlData } = supabase.storage
               .from('pisa-s-4top-storage')
               .getPublicUrl(filePatch);

            const publicUrl = publicUrlData.publicUrl;
            console.log('이미지 공개 URL:', publicUrl);

            // 3. users 테이블의 profile_img 컬럼 업데이트
            const { data: updateData, error: updateError } = await supabase
               .from('users')
               .update({ profile_img: publicUrl })
               .eq('id', user.id);

            if (updateError) throw updateError;
            console.log('프로필 업데이트 성공:', updateData);

            // 4. 로컬 상태 및 로컬 스토리지 업데이트
            setUser((prev) => ({ ...prev, profile_img: publicUrl }));
            const updatedUserData = { ...user, profile_img: publicUrl };
            localStorage.setItem('@auth/user', JSON.stringify(updatedUserData));

            toast.success('프로필 이미지가 성공적으로 업데이트되었습니다');
         } catch (error) {
            console.error('이미지 업로드 중 오류 발생:', error);
            toast.error('이미지 업로드 중 오류가 발생했습니다');
         }
      } else {
         toast.error('새로운 이미지를 선택해주세요');
      }
   };

   const handleImageUpdate = (newImageUrl: string) => {
      setUser((prev) => ({ ...prev, profile_img: newImageUrl }));
      const updatedUserData = { ...user, profile_img: newImageUrl };
      localStorage.setItem('@auth/user', JSON.stringify(updatedUserData));
   };

   return (
      <main className="flex flex-col items-center gap-6">
         <h1 className="sr-only">마이페이지 수정</h1>

         <form
            className="flex w-full flex-col items-center"
            onSubmit={handleEdit}
         >
            <UserProfileImg
               userId={user.id}
               userName={user.nickname}
               img={user.profile_img}
               name="profile_img"
               onImageUpdate={handleImageUpdate}
            />
            <DuplicateEmailInput
               title="이메일"
               type="email"
               name="email"
               defaultValue={user.email}
            />
            <DuplicateNicknameInput
               title="닉네임"
               type="text"
               name="nickname"
               defaultValue={user.nickname}
            />

            <DoublePasswordInput name="password" />

            <Button
               className="mt-10"
               content="수정 완료하기"
               type="submit"
               size="fullWidth"
            />
         </form>
      </main>
   );
}
