import type { IMenuRecord } from '../system/menu/types';
import type { IStaffRecord } from '../system/staff/types';

export interface ILoginRequest {
  username: string;
  password: string;
  isRemember: boolean;
}

export interface ILoginResponse {
  // id: string;
  // username: string;
  // avatar: string;
  access: string;
  refresh: string;
}

export interface IUserInfoState {
  staff: Partial<IStaffRecord>;
  menus: IMenuRecord[];
  permissions: string[];
}
