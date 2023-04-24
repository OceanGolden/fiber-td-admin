import jwtDecode from 'jwt-decode';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

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
const PrivateRoute = (props: IProps) => {
  const token = Storage.get(Token.Access);
  const decode: IAccessToken = jwtDecode(token);
  const now = new Date().getTime();
  const timeIn = decode.expired_at * 1000 > now;
  const isLogin = Boolean(token);

  return isLogin && timeIn ? (
    <>{props.children}</>
  ) : (
    <Navigate to='/login' replace={true} />
  );
};

export default PrivateRoute;
