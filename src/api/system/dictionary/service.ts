import type { PageResponse } from '@/common/types';
import request from '@/utils/request';
import type { DictionaryItemRecord } from '../dictionary_item/types';
import type {
  DictionaryParams,
  DictionaryRecord,
  DictionaryRequest,
} from './types';

const URL = '/system/dictionaries';

export const query = async (
  params: Partial<DictionaryParams>,
): Promise<PageResponse<DictionaryRecord>> => request.get(URL, { params });

export const queryItems = async (
  code: string,
): Promise<DictionaryItemRecord[]> =>
  request.get(`${URL}/items`, {
    params: { code },
  });

export const create = async (data: Partial<DictionaryRequest>) =>
  request.post(URL, data);

export const update = async (data: Partial<DictionaryRequest>) =>
  request.put(URL, data);

export const remove = async (data: Partial<DictionaryRequest>) =>
  request.delete(URL, { data });
