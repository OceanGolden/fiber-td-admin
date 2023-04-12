import type {
  RoleMenuParams,
  RoleMenuRecord,
  RoleMenuRequest,
  RoleParams,
  RoleRecord,
  RoleRequest,
} from './types';

import type { PageResponse } from '@/common/types';
import request from '@/utils/request';

const URL = '/system/roles';

export const query = async (
  params: Partial<RoleParams>,
): Promise<PageResponse<RoleRecord>> => request.get(URL, { params });

export const queryAll = async (
  params: Partial<RoleParams>,
): Promise<RoleRecord[]> => request.get(`${URL}/all`, { params });

export const create = async (data: Partial<RoleRequest>) =>
  request.post(URL, data);

export const update = async (data: Partial<RoleRequest>) =>
  request.put(URL, data);

export const remove = async (data: Partial<RoleRequest>) =>
  request.delete(URL, { data });

export const grantMenus = async (data: Partial<RoleMenuRequest>) =>
  request.post(`${URL}/menus`, data);

export const queryMenus = async (
  params: Partial<RoleMenuParams>,
): Promise<RoleMenuRecord[]> => request.get(`${URL}/menus`, { params });
