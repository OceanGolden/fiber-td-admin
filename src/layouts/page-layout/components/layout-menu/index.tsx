import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon, ViewListIcon } from 'tdesign-icons-react';
import { Button, Menu } from 'tdesign-react';

import { menusAtom } from '@/atom/menu_atom';
import { routesAtom } from '@/atom/route_atom';
import useToggle from '@/hooks/use_toggle';
import { defaultRoutes, generateRoutesFromMenus } from '@/router';

import type { IMenuRecord } from '@/api/system/menu/types';

const LayoutMenu = () => {
  const menus = useAtomValue(menusAtom);
  const location = useLocation();
  const [collapsed, toggle] = useToggle(false);
  const navigate = useNavigate();
  const setRoutesAtom = useSetAtom(routesAtom);

  useEffect(
    () => setRoutesAtom([...defaultRoutes, ...generateRoutesFromMenus(menus)]),
    [menus],
  );

  const renderMenu = (menuList: IMenuRecord[]) => {
    if (!menuList) {
      return [];
    }
    return menuList.map((item) => {
      const { children, path, visible, name, icon } = item;
      if (visible === false) {
        return null;
      }
      if (!children || children.length === 0) {
        return (
          <Menu.MenuItem
            // style={{ marginLeft: '0.5rem' }}
            className='ml-2'
            key={path}
            value={path}
            icon={icon ? <Icon name={icon} /> : undefined}
            content={name}
            onClick={() => {
              navigate(path);
            }}
          />
        );
      }
      return (
        <Menu.SubMenu
          key={path}
          value={path}
          title={name}
          icon={icon ? <Icon name={icon} /> : undefined}
        >
          {renderMenu(children)}
        </Menu.SubMenu>
      );
    });
  };

  return (
    <Menu
      className='h-full flex shrink-0 flex-col'
      collapsed={collapsed}
      expandMutex={true}
      expandType='normal'
      value={location.pathname}
      operations={
        <Button
          variant='text'
          shape='square'
          icon={<ViewListIcon />}
          onClick={toggle}
        />
      }
    >
      {renderMenu(menus)}
    </Menu>
  );
};

export default LayoutMenu;
