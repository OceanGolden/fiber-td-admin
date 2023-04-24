import { ReactNode } from 'react';

export interface IMenuRecord {
  id: string;
  name: string;
  parent_id: string;
  icon: string;
  path: string;
  permission: string;
  type: string;
  method: string;
  component: string;
  link: string;
  visible: boolean;
  redirect: string;
  status: string;
  sort: number;
  remark: string;
  updated_at: number;
  updated_by: string;
  children?: IMenuRecord[];
}

export interface IMenuRecordWithIcon {
  id: string;
  name: string;
  parent_id: string;
  icon: ReactNode;
  path: string;
  permission: string;
  type: string;
  method: string;
  component: string;
  link: string;
  visible: boolean;
  redirect: string;
  status: string;
  sort: number;
  remark: string;
  updated_at: number;
  updated_by: string;
  children?: IMenuRecord[];
}

export interface IMenuParams {
  name: string;
  status: string;
  remark: string;
  current: number;
  pageSize: number;
}

export interface IMenuRequest {
  id: string;
  name: string;
  parent_id: string;
  icon: string;
  path: string;
  permission: string;
  type: string;
  method: string;
  status: string;
  sort: number;
  remark: string;
}
