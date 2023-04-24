export interface IOrganizationRecord {
  id: string;
  name: string;
  code: string;
  parent_id: string;
  parent_ids: string;
  status: string;
  sort: number;
  remark: string;
  updated_at: number;
  updated_by: string;
  children: IOrganizationRecord[];
}

export interface IOrganizationParams {
  name: string;
  code: string;
  status: string;
  remark: string;
  current: number;
  pageSize: number;
}

export interface IOrganizationRequest {
  id: string;
  name: string;
  code: string;
  status: string;
  sort: number;
  remark: string;
}
