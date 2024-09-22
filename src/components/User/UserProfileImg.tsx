import supabase from '@/api/supabase';
import { updateLocalData } from '@/utils/updateLocalData';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
   userId: string;
   userName: string;
   img: string;
   [property: string]: any;
}

export default function UserProfileImg({
   userId,
   userName,
   img,
   ...restProps
}: Props) {
   const [imgPath, setImgPath] = useState('');
   const MAX_IMAGE_SIZE_BYTES = 1024 * 1024 * 2;

   // 접근성 → Enter 또는 스페이스바 눌렀을 때 클릭되도록
   const handleKeyDown = (e: KeyboardEvent<HTMLLabelElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
         e.preventDefault();
         e.currentTarget.click();
      }
   };

   //  이미지 미리보기 기능
   const handleImagePreview = async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
         const file = e.target.files[0];

         // 이미지 크기 제한
         if (file.size > MAX_IMAGE_SIZE_BYTES) {
            toast.error('이미지 크기는 2MB를 초과할 수 없습니다');
            return;
         }

         try {
            // 1. 이미지 미리보기 설정
            const reader = new FileReader();
            reader.onload = (event) => {
               if (event.target) {
                  setImgPath(event.target.result as string);
               }
            };
            reader.readAsDataURL(file);

            // 2. 스토리지에 이미지 업로드
            const fileName = `${userId}_${Date.now()}`;
            const filePath = `profile_images/${fileName}`;
            const { error: uploadError } = await supabase.storage
               .from('pisa-s-4top-storage')
               .upload(filePath, file, { upsert: true });

            if (uploadError) throw uploadError;

            // 3. 업로드된 이미지의 공개 URL 가져오기
            const { data: publicUrlData } = supabase.storage
               .from('pisa-s-4top-storage')
               .getPublicUrl(filePath);

            const publicUrl = publicUrlData.publicUrl;

            // 4. users 테이블의 profile_img 컬럼 업데이트
            const { error: updateError } = await supabase
               .from('users')
               .update({ profile_img: publicUrl })
               .eq('id', userId);

            if (updateError) throw updateError;

            updateLocalData('profile_img', publicUrl);

            toast.success('프로필 이미지 변경을 완료하였습니다');
         } catch (error) {
            console.error('이미지 업로드 중 오류 발생:', error);
            toast.error('이미지 업로드 중 오류가 발생하였습니다');
         }
      }
   };

   return (
      <div className="relative mb-10">
         <img
            src={imgPath || img || '/assets/profileDefault.webp'}
            alt={`${userName} 프로필`}
            className="h-[9.375rem] w-[9.375rem] rounded-full bg-stone-300 object-cover"
         />
         <label
            aria-label="이미지 첨부"
            htmlFor="profile-upload"
            className="absolute bottom-[0.3125rem] right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-stone-600 text-white hover:bg-stone-500"
            tabIndex={0}
            onKeyDown={handleKeyDown}
         >
            <span className="fi-rr-mode-portrait flex items-center justify-center"></span>
            <input
               id="profile-upload"
               type="file"
               accept=".png, .jpeg, .jpg"
               hidden={true}
               onChange={handleImagePreview}
               {...restProps}
            />
         </label>
      </div>
   );
}
