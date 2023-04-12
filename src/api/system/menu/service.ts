import type { MenuParams, MenuRecord, MenuRequest } from './types';

import request from '@/utils/request';

const URL = '/system/menus';

export const queryTreeAll = async (
  params: Partial<MenuParams>,
): Promise<MenuRecord[]> =>
  request.get(`${URL}/tree/all`, {
    params,
  });

export const queryTree = async (): Promise<MenuRecord[]> =>
  request.get(`${URL}/tree`);

export const create = async (data: Partial<MenuRequest>) =>
  request.post(URL, data);

export const update = async (data: Partial<MenuRequest>) =>
  request.put(URL, data);

export const remove = async (data: Partial<MenuRequest>) =>
  request.delete(URL, { data });
