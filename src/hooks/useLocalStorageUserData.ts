import { useState, useEffect } from 'react';

type UserDataField = 'email' | 'nickname' | string;

export function useLocalStorageUserData(field: UserDataField) {
   const [value, setValue] = useState<string>('');

   useEffect(() => {
      const localUserData = localStorage.getItem('@auth/user');

      if (localUserData) {
         const parsedUserData = JSON.parse(localUserData);
         setValue(parsedUserData[field]);
      } else {
         console.error('localStorage에 유저 데이터가 존재하지 않습니다');
      }
   }, [field]);

   return value;
}
