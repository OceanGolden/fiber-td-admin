import { selectAtom } from 'jotai/utils';

import { userInfoAsyncAtom } from './user_atom';

import type { IUserInfoState } from '@/api/auth/types';

export const menusAtom = selectAtom(
  userInfoAsyncAtom,
  (s: IUserInfoState) => s.menus,
);
// const menussAtom = focusAtom(userInfoAsyncAtom, async (optic) =>
//   optic.prop('menus'),
// ); // PrimitiveAtom<number>

// const strAtom = atom((get) => localStorage.getItem('myKey') ?? get(menussAtom));

// export const menusAtom = atom(
//   (get) => get(strAtom),
//   (get, set, newStr) => {
//     set(strAtom, newStr);
//     localStorage.setItem('myKey', newStr);
//   },
// );
