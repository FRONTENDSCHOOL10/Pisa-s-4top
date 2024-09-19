import { useEffect } from 'react';

export function useInputFocus(inputName: string) {
   useEffect(() => {
      // 느낌표 ! → 무조건 input element가 있다!
      const input = document.querySelector(inputName)! as HTMLInputElement;

      // 바로 검색할 수 있도록 input에 focus
      input.focus();
   }, []);
}
