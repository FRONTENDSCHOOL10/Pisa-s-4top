/* 닉네임 중복확인 input */

/*

사용법: <form> 태그 꼭 넣어주세요

<form>
   <DuplicateNicknameInput title="닉네임" type="text" name="nickname" />
</form>

*/

import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';

import { INPUT_ERROR_MESSAGE, INPUT_SUCCESS_MESSAGE } from '@/constants';
import { useJoinStore } from '@/stores/useJoinStore';
import { checkDuplicate, isValidNickName } from '@/utils';
import { Button } from '../Buttons/Buttons';
import Input from './Input';

export interface Props {
   title: string;
   type: string;
   [property: string]: any;
}

export default function DuplicateNicknameInput({
   title,
   type,
   ...restProps
}: Props) {
   const [showText, setShowText] = useState('');
   const [outlineColor, setOutlineColor] = useState('outline-default');
   const [error, setError] = useState(false);

   const textRef = useRef<string>('');

   const { setNicknameSuccess } = useJoinStore();

   //! 버튼클릭 테스트
   const handleClick = async () => {
      const currentText: string = textRef.current; // 최신 입력 값 가져옴

      let isNull: boolean = false; // 공백 확인
      let isValid: boolean = false; // 정규식 확인
      let isDuplicate: boolean = false; // 중복확인

      isNull = currentText === '';
      isValid = isValidNickName(currentText);
      isDuplicate = await checkDuplicate('nickname', currentText);

      // null이거나 정규식이 안 맞다면
      if (currentText === '' || !isValid) {
         setShowText(INPUT_ERROR_MESSAGE.NICKNAME);
         setOutlineColor('outline-error');
         setError(true);
         setNicknameSuccess(false);
      }
      // 이메일 중복 시
      if (isDuplicate) {
         setShowText(INPUT_ERROR_MESSAGE.NICKNAME_DUPLICATE);
         setOutlineColor('outline-error');
         setError(true);
         setNicknameSuccess(false);
      }
      // 원하는 조건 모두 완료 시
      if (!isNull && isValid && !isDuplicate) {
         setShowText(INPUT_SUCCESS_MESSAGE.NICKNAME);
         setOutlineColor('outline-success');
         setError(false);
         setNicknameSuccess(true);
      }

      console.log('내가원하는조건:', !isNull, isValid, !isDuplicate);
   };

   // 입력값 실시간으로 변경
   const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      textRef.current = e.target.value.trim();
      setNicknameSuccess(false);
   };

   // Enter key 눌렀을 때
   const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         handleClick?.();
         return;
      }
   };

   return (
      <div className="flex gap-1.5">
         <Input
            className={outlineColor}
            title={title}
            type={type}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            error={error}
            errorMessage={showText}
            successMessage={showText}
            {...restProps}
         />
         <Button
            className="mt-6 h-12"
            content="중복확인"
            type="button"
            size="small"
            handleClick={handleClick}
         />
      </div>
   );
}
