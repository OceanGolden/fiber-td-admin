import type {
  IRoleMenuParams,
  IRoleMenuRecord,
  IRoleMenuRequest,
  IRoleParams,
  IRoleRecord,
  IRoleRequest,
} from './types';

import type { IPageResponse } from '@/common/types';
import request from '@/utils/request';

const URL = '/system/roles';

export const query = async (
  params: Partial<IRoleParams>,
): Promise<IPageResponse<IRoleRecord>> => request.get(URL, { params });

export const queryAll = async (
  params: Partial<IRoleParams>,
): Promise<IRoleRecord[]> => request.get(`${URL}/all`, { params });

export const create = async (data: Partial<IRoleRequest>) =>
  request.post(URL, data);

export const update = async (data: Partial<IRoleRequest>) =>
  request.put(URL, data);

export const remove = async (data: Partial<IRoleRequest>) =>
  request.delete(URL, { data });

export const grantMenus = async (data: Partial<IRoleMenuRequest>) =>
  request.post(`${URL}/menus`, data);

export const queryMenus = async (
  params: Partial<IRoleMenuParams>,
): Promise<IRoleMenuRecord[]> => request.get(`${URL}/menus`, { params });
