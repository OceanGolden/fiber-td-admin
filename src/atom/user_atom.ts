import { atom } from 'jotai';
import { selectAtom } from 'jotai/utils';

import * as AuthService from '@/api/auth/service';

import type { IUserInfoState } from '@/api/auth/types';

export const userInfoAsyncAtom = atom(async () => AuthService.info());

// export const staffAsyncAtom = atom(async (get) => {
//   const info = await get(userInfoAsyncAtom);
//   return info.staff;
// });

export const staffAtom = selectAtom(
  userInfoAsyncAtom,
  (s: IUserInfoState) => s.staff,
);
