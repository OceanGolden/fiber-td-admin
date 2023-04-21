import { MenuRecord } from '../system/menu/types';
import { StaffRecord } from '../system/staff/types';

export interface LoginRequest {
  username: string;
  password: string;
  isRemember: boolean;
}

export interface LoginResponse {
  // id: string;
  // username: string;
  // avatar: string;
  access: string;
  refresh: string;
}

export interface UserInfoState {
  staff: Partial<StaffRecord>;
  menus: MenuRecord[];
  permissions: string[];
}
