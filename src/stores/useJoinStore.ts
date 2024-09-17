import { create } from 'zustand';

interface JoinStore {
   emailSuccess: boolean;
   nicknameSuccess: boolean;
   setEmailSuccess: (valid: boolean) => void;
   setNicknameSuccess: (valid: boolean) => void;
}

export const useJoinStore = create<JoinStore>((set) => ({
   emailSuccess: false,
   nicknameSuccess: false,
   setEmailSuccess: (valid: boolean) => set({ emailSuccess: valid }),
   setNicknameSuccess: (valid: boolean) => set({ nicknameSuccess: valid }),
}));
