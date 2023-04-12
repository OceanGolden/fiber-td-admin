import type { PageResponse } from '@/common/types';
import request from '@/utils/request';
import type { PositionParams, PositionRecord, PositionRequest } from './types';

const URL = '/system/positions';

export const query = async (
  params: Partial<PositionParams>,
): Promise<PageResponse<PositionRecord>> => request.get(URL, { params });

export const queryAll = async (
  params: Partial<PositionParams>,
): Promise<PositionRecord[]> => request.get(`${URL}/all`, { params });

export const create = async (data: Partial<PositionRequest>) =>
  request.post(URL, data);

export const update = async (data: Partial<PositionRequest>) =>
  request.put(URL, data);

export const remove = async (data: Partial<PositionRequest>) =>
  request.delete(URL, { data });
