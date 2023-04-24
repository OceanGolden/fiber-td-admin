export interface IStaffRecord {
  id: string;
  username: string;
  name: string;
  email: string;
  mobile: string;
  avatar: string;
  gender: string;
  organization_id: string;
  position_id: string;
  role_ids: string[];
  work_status: string;
  status: string;
  sort: number;
  remark: string;
  updated_at: number;
  updated_by: string;
}

export interface IStaffParams {
  username: string;
  name: string;
  email: string;
  mobile: string;
  organization_id: string;
  position_id: string;
  work_status: string;
  status: string;
  remark: string;
  current: number;
  pageSize: number;
}

export interface IStaffRequest {
  id: string;
  username: string;
  name: string;
  email: string;
  mobile: string;
  avatar: string;
  gender: string;
  organization_id: string;
  position_id: string;
  work_status: string;
  status: string;
  sort: number;
  remark: string;
}

export interface IStaffRoleRequest {
  staff_id: string;
  role_ids: string[];
}
