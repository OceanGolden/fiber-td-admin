export interface IPositionRecord {
  id: string;
  name: string;
  code: string;
  status: string;
  sort: number;
  remark: string;
  updated_at: number;
  updated_by: string;
}

export interface IPositionParams {
  name: string;
  code: string;
  status: string;
  remark: string;
  current: number;
  pageSize: number;
}

export interface IPositionRequest {
  id: string;
  name: string;
  code: string;
  status: string;
  sort: number;
  remark: string;
}
