import { MenuRecord } from '@/api/system/menu/types';
import { menuAsyncAtom } from '@/atom/menu_atom';
import { useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';

const useMenus = (): [MenuRecord[], boolean] => {
  const loadableAtom = loadable(menuAsyncAtom);
  const value = useAtomValue(loadableAtom);
  switch (value.state) {
    case 'hasData':
      return [value.data, false];
    case 'loading':
      return [[], true];
    case 'hasError':
      return [[], true];
    default:
      return [[], false];
  }
};

export default useMenus;
