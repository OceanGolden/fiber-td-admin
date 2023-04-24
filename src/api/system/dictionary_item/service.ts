import type { IPageResponse } from '@/common/types';
import request from '@/utils/request';

import type {
  IDictionaryItemParams,
  IDictionaryItemRecord,
  IDictionaryItemRequest,
} from './types';

const URL = '/system/dictionary/items';

export const query = async (
  params: Partial<IDictionaryItemParams>,
): Promise<IPageResponse<IDictionaryItemRecord>> =>
  request.get(URL, { params });

export const create = async (data: Partial<IDictionaryItemRequest>) =>
  request.post(URL, data);

export const update = async (data: Partial<IDictionaryItemRequest>) =>
  request.put(URL, data);

export const remove = async (data: Partial<IDictionaryItemRequest>) =>
  request.delete(URL, { data });
