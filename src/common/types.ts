export interface IPagination {
  current: number;
  pageSize: number;
  total?: number;
}

export interface IHttpResponse<T = any> {
  success: boolean;
  data: T;
  code: number;
  message: string;
}

export interface IPageResponse<T> {
  list: T[];
  current: number;
  pageSize: number;
  total: number;
}
