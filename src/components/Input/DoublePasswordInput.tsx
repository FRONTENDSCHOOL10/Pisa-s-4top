import { ChangeEvent, useState } from 'react';

import { INPUT_ERROR_MESSAGE, INPUT_SUCCESS_MESSAGE } from '@/constants';
import { useJoinStore } from '@/stores';
import { isValidPassword } from '@/utils';
import Input from './Input';

interface passwordValue {
   password: string;
   passwordConfirm: string;
}

interface OutlineColorState {
   password: string;
   password_confirm: string;
}

interface Props {
   [property: string]: any;
}

export default function DoublePasswordInput({ ...restProps }: Props) {
   const {
      passwordSuccess,
      passwordConfirmSuccess,
      setPasswordSuccess,
      setPasswordConfirmSuccess,
   } = useJoinStore();

   const [passwordValue, setPasswordValue] = useState<passwordValue>({
      password: '',
      passwordConfirm: '',
   });

   const [outlineColor, setOutlineColor] = useState<OutlineColorState>({
      password: 'outline-default',
      password_confirm: 'outline-default',
   });

   // 비밀번호 유효성 검사
   const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();

      setPasswordValue((prev) => ({ ...prev, password: value }));

      const isValidCheck = isValidPassword(value);

      setOutlineColor((prev) => ({
         ...prev,
         password: isValidCheck ? 'outline-success' : 'outline-error',
      }));

      setPasswordSuccess(isValidCheck ? true : false);
   };

   // 비밀번호 확인 유효성 검사
   const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim();

      setPasswordValue((prev) => ({
         ...prev,
         passwordConfirm: value,
      }));

      const isValidCheck = passwordValue.password === value;

      setOutlineColor((prev) => ({
         ...prev,
         password_confirm: isValidCheck ? 'outline-success' : 'outline-error',
      }));

      setPasswordConfirmSuccess(isValidCheck ? true : false);
   };

   return (
      <>
         <Input
            title="비밀번호"
            type="password"
            className={outlineColor.password}
            onChange={handlePasswordChange}
            error={!passwordSuccess}
            errorMessage={INPUT_ERROR_MESSAGE.PASSWORD}
            showMessage={passwordValue.password !== ''}
            successMessage={INPUT_SUCCESS_MESSAGE.PASSWORD}
         />
         <Input
            title="비밀번호"
            type="password"
            className={outlineColor.password_confirm}
            onChange={handlePasswordConfirmChange}
            error={!passwordConfirmSuccess}
            errorMessage={INPUT_ERROR_MESSAGE.PASSWORD_CONFIRM}
            showMessage={passwordValue.passwordConfirm !== ''}
            successMessage={INPUT_SUCCESS_MESSAGE.PASSWORD_CONFIRM}
            {...restProps}
         />
      </>
   );
}
