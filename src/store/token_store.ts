import { create } from 'zustand';

import { login } from '@/api/auth/service';
import { ILoginRequest } from '@/api/auth/types';

interface TokenState {
  access_token: string;
  refresh_token: string;

  clear: () => void;
  login: (req: ILoginRequest) => void;
}

export const useTokenStore = create<TokenState>((set) => ({
  access_token: '',
  refresh_token: '',

  clear: () => set(() => ({ access_token: '', refresh_token: '' })),
  login: async (req) => {
    const response = await login(req);
    set({ access_token: response.access, refresh_token: response.refresh });
  },
}));
