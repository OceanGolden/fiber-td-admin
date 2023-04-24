import { create } from 'zustand';

import { IMenuRecord } from '@/api/system/menu/types';
import { IStaffRecord } from '@/api/system/staff/types';

interface UserState {
  staff: IStaffRecord;
  menus: IMenuRecord[];
  permissions: string[];

  clear: () => void;
}

export const useUserInfoStore = create<UserState>((set) => ({
  staff: {} as IStaffRecord,
  menus: [],
  permissions: [],

  clear: () =>
    set(() => ({ staff: {} as IStaffRecord, menus: [], permissions: [] })),
}));
