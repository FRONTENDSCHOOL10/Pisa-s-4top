/*
.test는 JavaScript와 TypeScript에서 정규 표현식을 사용하여 문자열을 검사할 때 사용하는 메서드입니다.
이 메서드는 주어진 문자열이 정규 표현식과 일치하는지 여부를 확인하고, 일치하면 true, 일치하지 않으면 false를 반환합니다.

- 이메일 검사
- 비밀번호 검사
    - 최소 8 자, 최소 하나의 문자 + 숫자 + 특수문자가 포함되어야 합니다.
*/

export function isValidEmail(email: string): boolean {
   const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
   const passwordRegex: RegExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%#?&])[A-Za-z\d@!%*#?&]{8,16}$/;
   return passwordRegex.test(password);
}

export function isValidNickName(nickName: string, min = 1, max = 10): boolean {
   return nickName.length >= min && nickName.length <= max;
}
