import type {
  IStaffParams,
  IStaffRecord,
  IStaffRequest,
  IStaffRoleRequest,
} from './types';

import type { IPageResponse } from '@/common/types';
import request from '@/utils/request';

const URL = '/system/staffs';

export const query = async (
  params: Partial<IStaffParams>,
): Promise<IPageResponse<IStaffRecord>> => request.get(URL, { params });

export const create = async (data: Partial<IStaffRequest>) =>
  request.post(URL, data);

export const update = async (data: Partial<IStaffRequest>) =>
  request.put(URL, data);

export const remove = async (data: Partial<IStaffRequest>) =>
  request.delete(URL, { data });

export const assignRole = async (data: IStaffRoleRequest) =>
  request.post(`${URL}/roles`, data);
