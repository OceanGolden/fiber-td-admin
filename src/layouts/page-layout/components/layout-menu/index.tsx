import type { MenuRecord } from '@/api/system/menu/types';
import useMenus from '@/hooks/use_menu';
import { Icon } from 'tdesign-icons-react';
import { Menu } from 'tdesign-react';

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
  return (
    <Menu
      className='shrink-0 h-full overflow-y-auto'
      collapsed={false}
      expandMutex={true}
      expandType='normal'
      width='220'
    >
      {renderMenu(menus)}
    </Menu>
  );
};

export default LayoutMenu;
