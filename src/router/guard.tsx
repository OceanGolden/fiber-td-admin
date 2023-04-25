import jwtDecode from 'jwt-decode';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { Token } from '@/common/constants';
import Storage from '@/utils/storage';

interface IProps {
  children?: ReactNode;
}
interface IAccessToken {
  id: string;
  username: string;
  issued_at: number;
  expired_at: number;
}

const RouterGuard = (props: IProps) => {
  const location = useLocation();
  const token = Storage.get(Token.Access);
  const isLogin = Boolean(token);

  if (token) {
    try {
      const decodeToken: IAccessToken = jwtDecode(token);
      const now = new Date().getTime();
      const timeIn = decodeToken.expired_at * 1000 > now;
      if (isLogin && timeIn) {
        return <>{props.children}</>;
      }
    } catch {
      return <Navigate to='/login' />;
    }
  }
  if (location.pathname === '/login') {
    return <>{props.children}</>;
  }
  return <Navigate to='/login' />;
};

export default RouterGuard;
