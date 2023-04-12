import type { PageResponse } from '@/common/types';
import request from '@/utils/request';
import type {
  DictionaryItemParams,
  DictionaryItemRecord,
  DictionaryItemRequest,
} from './types';

const URL = '/system/dictionary/items';

export const query = async (
  params: Partial<DictionaryItemParams>,
): Promise<PageResponse<DictionaryItemRecord>> => request.get(URL, { params });

export const create = async (data: Partial<DictionaryItemRequest>) =>
  request.post(URL, data);

export const update = async (data: Partial<DictionaryItemRequest>) =>
  request.put(URL, data);

export const remove = async (data: Partial<DictionaryItemRequest>) =>
  request.delete(URL, { data });
