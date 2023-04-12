import { useLogoutMutation } from '@/api/auth/query';
import {
  accessAtomWithLocalStorage,
  refreshAtomWithLocalStorage,
} from '@/atom/token_atom';
import { useSetAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDownIcon,
  PoweroffIcon,
  UserCircleIcon,
} from 'tdesign-icons-react';
import { Button, Dropdown, DropdownOption } from 'tdesign-react';

const UserInfo = () => {
  const { confirmLogout } = useLogoutMutation();
  const setAccessToken = useSetAtom(accessAtomWithLocalStorage);
  const setRefreshToken = useSetAtom(refreshAtomWithLocalStorage);
  const navigate = useNavigate();
  const options: DropdownOption[] = [
    {
      prefixIcon: <UserCircleIcon />,
      content: '用户信息',
      value: 'user-center',
    },
    {
      prefixIcon: <PoweroffIcon />,
      content: '退出登录',
      value: 'logout',
      onClick: () =>
        confirmLogout(() => {
          navigate('/login');
          setRefreshToken(RESET);
          setAccessToken(RESET);
        }),
    },
  ];

  return (
    <Dropdown trigger='click' options={options}>
      <Button variant='text' className='flex items-center px-0'>
        <UserCircleIcon size='large' className='m-2' />
        <span className='flex items-center'>个人中心</span>
        <ChevronDownIcon size='large' className='m-2' />
      </Button>
    </Dropdown>
  );
};

export default UserInfo;
