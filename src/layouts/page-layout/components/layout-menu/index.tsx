import { Button, Menu } from 'tdesign-react';
import { Icon, ViewListIcon } from 'tdesign-icons-react';

import type { MenuRecord } from '@/api/system/menu/types';
import useMenus from '@/hooks/use_menu';
import { useToggle } from 'react-use';

const renderMenu = (menus: MenuRecord[]) =>
  // const navigate = useNavigate();
  menus.map((item) => {
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
const LayoutMenu = () => {
  const [menus] = useMenus();
  const [collapsed, toggle] = useToggle(false);
  return (
    <Menu
      className='h-full flex shrink-0 flex-col'
      collapsed={collapsed}
      expandMutex={true}
      expandType='normal'
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
