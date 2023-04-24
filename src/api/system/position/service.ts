import type { IPageResponse } from '@/common/types';
import request from '@/utils/request';

import type {
  IPositionParams,
  IPositionRecord,
  IPositionRequest,
} from './types';

const URL = '/system/positions';

export const query = async (
  params: Partial<IPositionParams>,
): Promise<IPageResponse<IPositionRecord>> => request.get(URL, { params });

export const queryAll = async (
  params: Partial<IPositionParams>,
): Promise<IPositionRecord[]> => request.get(`${URL}/all`, { params });

export const create = async (data: Partial<IPositionRequest>) =>
  request.post(URL, data);

export const update = async (data: Partial<IPositionRequest>) =>
  request.put(URL, data);

export const remove = async (data: Partial<IPositionRequest>) =>
  request.delete(URL, { data });
