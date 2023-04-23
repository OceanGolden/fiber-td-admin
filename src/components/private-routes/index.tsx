import { useAtomValue } from 'jotai';
import { useRoutes } from 'react-router-dom';

import { menusAtom } from '@/atom/menu_atom';
import { generateRoutesFromMenus } from '@/router';

const PrivateRoutes = () => {
  const menus = useAtomValue(menusAtom);

  return useRoutes([...generateRoutesFromMenus(menus)]);
};

export default PrivateRoutes;
