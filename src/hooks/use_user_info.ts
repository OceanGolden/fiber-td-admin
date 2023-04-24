import { useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';

import { IUserInfoState } from '@/api/auth/types';
import { userInfoAsyncAtom } from '@/atom/user_atom';

const useUserInfo = (): [IUserInfoState, boolean] => {
  const loadableAtom = loadable(userInfoAsyncAtom);
  const value = useAtomValue(loadableAtom);
  const empty = { staff: {}, menus: [], permissions: [] };
  switch (value.state) {
    case 'hasData':
      return [value.data, false];
    case 'loading':
      return [empty, true];
    case 'hasError':
      return [empty, true];
    default:
      return [empty, false];
  }
};

export default useUserInfo;
