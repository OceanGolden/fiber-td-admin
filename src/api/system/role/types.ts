export interface IRoleRecord {
  id: string;
  name: string;
  code: string;
  status: string;
  sort: number;
  remark: string;
  updated_at: number;
  updated_by: string;
}

export interface IRoleParams {
  name: string;
  code: string;
  status: string;
  remark: string;
  current: number;
  pageSize: number;
}

export interface IRoleRequest {
  id: string;
  name: string;
  code: string;
  status: string;
  sort: number;
  remark: string;
}

export interface IRoleMenuRecord {
  id: string;
  role_id: string;
  menu_id: string;
  created_at: number;
  created_by: string;
}

export interface IRoleMenuParams {
  role_id: string;
}

export interface IRoleMenuRequest {
  role_id: string;
  menu_ids: string[];
}
