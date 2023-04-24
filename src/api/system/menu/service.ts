import type { IMenuParams, IMenuRecord, IMenuRequest } from './types';

import request from '@/utils/request';

const URL = '/system/menus';

export const queryTreeAll = async (
  params: Partial<IMenuParams>,
): Promise<IMenuRecord[]> =>
  request.get(`${URL}/tree/all`, {
    params,
  });

export const queryTree = async (): Promise<IMenuRecord[]> =>
  request.get(`${URL}/tree`);

export const create = async (data: Partial<IMenuRequest>) =>
  request.post(URL, data);

export const update = async (data: Partial<IMenuRequest>) =>
  request.put(URL, data);

export const remove = async (data: Partial<IMenuRequest>) =>
  request.delete(URL, { data });
