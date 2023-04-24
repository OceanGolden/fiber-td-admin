import type { IPageResponse } from '@/common/types';
import request from '@/utils/request';

import type { IDictionaryItemRecord } from '../dictionary_item/types';
import type {
  IDictionaryParams,
  IDictionaryRecord,
  IDictionaryRequest,
} from './types';

const URL = '/system/dictionaries';

export const query = async (
  params: Partial<IDictionaryParams>,
): Promise<IPageResponse<IDictionaryRecord>> => request.get(URL, { params });

export const queryItems = async (
  code: string,
): Promise<IDictionaryItemRecord[]> =>
  request.get(`${URL}/items`, {
    params: { code },
  });

export const create = async (data: Partial<IDictionaryRequest>) =>
  request.post(URL, data);

export const update = async (data: Partial<IDictionaryRequest>) =>
  request.put(URL, data);

export const remove = async (data: Partial<IDictionaryRequest>) =>
  request.delete(URL, { data });
