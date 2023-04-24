export interface IDictionaryItemRecord {
  id: string;
  label: string;
  value: string;
  color: string;
  dictionary_id: string;
  status: string;
  sort: number;
  remark: string;
  updated_at: number;
  updated_by: string;
}

export interface IDictionaryItemParams {
  label: string;
  value: string;
  dictionary_id: string;
  status: string;
  remark: string;
  current: number;
  pageSize: number;
  total: number;
}

export interface IDictionaryItemRequest {
  id: string;
  label: string;
  value: string;
  color: string;
  dictionary_id: string;
  status: string;
  sort: number;
  remark: string;
}
