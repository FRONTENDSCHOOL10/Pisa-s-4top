export const INPUT_TYPE = {
   EMAIL: 'email',
   PASSWORD: 'password',
   NICKNAME: 'text',
};

export const INPUT_ERROR_MESSAGE = {
   EMAIL: '유효하지 않은 이메일 형식입니다',
   EMAIL_DUPLICATE: '이미 사용 중인 이메일입니다',
   PASSWORD:
      '영문·숫자·특수문자를 포함하여 최소 8글자, 최대 16글자 입력해주세요',
   PASSWORD_CONFIRM: '비밀번호가 일치하지 않습니다',
   NICKNAME: '최소 1글자, 최대 10글자 입력해주세요',
   NICKNAME_DUPLICATE: '이미 사용 중인 닉네임입니다',
};

export const INPUT_SUCCESS_MESSAGE = {
   EMAIL: '사용 가능한 이메일입니다',
   PASSWORD: '사용 가능한 비밀번호입니다',
   PASSWORD_CONFIRM: '비밀번호가 일치합니다',
   NICKNAME: '사용 가능한 닉네임입니다',
};
