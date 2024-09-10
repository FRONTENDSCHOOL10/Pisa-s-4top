/* 중복확인 input */

/* 사용법

0. 사용 시 <form></form> 태그를 직접 넣어주어야 합니다.

1. 닉네임 중복확인의 경우 (pattern 속성 필요! 최소 1글자, 최대 10글자)
<form onSubmit={(e: FormEvent<HTMLFormElement>) => { e.preventDefault(); }}>
   <DuplicateCheckInput title="닉네임" type="text" pattern=".{1,10}" />
</form>

2. 이메일 중복확인의 경우
<form onSubmit={(e: FormEvent<HTMLFormElement>) => { e.preventDefault(); }}>
   <DuplicateCheckInput title="이메일" type="email" />
</form>

*/

import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';

import { INPUT_TYPE } from '@/constants';
import { isValidEmail, isValidNickName } from '@/utils/isValidCheck';
import { Button } from '../Buttons/Buttons';
import Input from './Input';

export interface Props {
   title: string;
   type: string;
   focusOutlineColor?: string;
   [property: string]: any;
}

export default function DuplicateCheckInput({
   title,
   type,
   ...restProps
}: Props) {
   const [outlineColor, setOutlineColor] = useState<string>('outline-default');
   const [text, setText] = useState<string>('');
   const textRef = useRef<string>('');

   // ! 추후 DB에서 가져오기로 수정
   const TEST: string = '하하';
   const TEST2: string = '12345@naver.com';

   // 입력값 실시간으로 변경
   const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
      textRef.current = e.target.value.trim();
      console.log(textRef.current); // ! test용 코드
   };

   // 중복확인 버튼 눌렀을 때
   const handleClick = (): void => {
      const currentText: string = textRef.current; // 최신 입력 값 가져옴
      setText(currentText); // 상태 업데이트
      console.log('클릭'); // ! test용 코드

      let isNull: boolean = false; // 공백 확인
      let isDuplicate: boolean = false; // 중복확인
      let isValid: boolean = false; // 정규식 확인

      switch (type) {
         case INPUT_TYPE.NICKNAME: {
            isNull = currentText === '';
            isDuplicate = currentText === TEST;
            isValid = isValidNickName(currentText);
            break;
         }
         case INPUT_TYPE.EMAIL: {
            isNull = currentText === '';
            isDuplicate = currentText === TEST2;
            isValid = isValidEmail(currentText);
            break;
         }
      }

      if (isNull || isDuplicate || !isValid) {
         setOutlineColor('outline-error');
         return;
      } else {
         setOutlineColor('outline-success');
         console.log('성공: ', currentText); // ! test용 코드
      }
   };

   // Enter key 눌렀을 때
   const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         handleClick?.();
         return;
      }
   };

   // ! 버튼 컴포넌트로 변경
   return (
      <div className="flex gap-1.5 bg-white">
         <Input
            title={title}
            type={type}
            focusOutlineColor={outlineColor}
            defaultValue={text}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            {...restProps}
         />
         <Button
            content="중복확인"
            type="button"
            size="small"
            handleClick={handleClick}
         />
      </div>
   );
}
