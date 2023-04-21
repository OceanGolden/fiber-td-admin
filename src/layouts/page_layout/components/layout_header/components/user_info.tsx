import { useSetAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import { useNavigate } from 'react-router-dom';
import {
  ChevronDownIcon,
  PoweroffIcon,
  UserCircleIcon,
} from 'tdesign-icons-react';
import { Button, Dropdown, DropdownOption } from 'tdesign-react';

import { useLogoutMutation } from '@/api/auth/query';
import {
  accessAtomWithLocalStorage,
  refreshAtomWithLocalStorage,
} from '@/atom/token_atom';
import useUserInfo from '@/hooks/use_user_info';

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
  },
];

const UserInfo = () => {
  // const staff = useAtomValue(staffAtom);
  const [{ staff }] = useUserInfo();
  const { confirmLogout } = useLogoutMutation();
  const setAccessToken = useSetAtom(accessAtomWithLocalStorage);
  const setRefreshToken = useSetAtom(refreshAtomWithLocalStorage);
  const navigate = useNavigate();

  const onClick = ({ value }: DropdownOption) => {
    if (value === 'logout') {
      confirmLogout(() => {
        setAccessToken(RESET);
        setRefreshToken(RESET);
        navigate('/login');
      });
    }
  };

  return (
    <Dropdown trigger='click' options={options} onClick={onClick}>
      <Button variant='text' className='flex items-center px-0'>
        <UserCircleIcon size='large' className='m-2' />
        <span className='flex items-center'>{staff.name}</span>
        <ChevronDownIcon size='large' className='m-2' />
      </Button>
    </Dropdown>
  );
};

export default UserInfo;
