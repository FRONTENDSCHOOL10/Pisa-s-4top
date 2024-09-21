import { create } from 'zustand';

interface JoinStore {
   emailSuccess: boolean;
   nicknameSuccess: boolean;
   passwordSuccess: boolean;
   passwordConfirmSuccess: boolean;
   setEmailSuccess: (valid: boolean) => void;
   setNicknameSuccess: (valid: boolean) => void;
   setPasswordSuccess: (valid: boolean) => void;
   setPasswordConfirmSuccess: (valid: boolean) => void;
}

export const useJoinStore = create<JoinStore>((set) => ({
   emailSuccess: false,
   nicknameSuccess: false,
   passwordSuccess: false,
   passwordConfirmSuccess: false,
   setEmailSuccess: (valid: boolean) => set({ emailSuccess: valid }),
   setNicknameSuccess: (valid: boolean) => set({ nicknameSuccess: valid }),
   setPasswordSuccess: (valid: boolean) => set({ passwordSuccess: valid }),
   setPasswordConfirmSuccess: (valid: boolean) =>
      set({ passwordConfirmSuccess: valid }),
}));
