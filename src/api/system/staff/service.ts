import type {
  StaffParams,
  StaffRecord,
  StaffRequest,
  StaffRoleRequest,
} from './types';

import type { PageResponse } from '@/common/types';
import request from '@/utils/request';

const URL = '/system/staffs';

export const query = async (
  params: Partial<StaffParams>,
): Promise<PageResponse<StaffRecord>> => request.get(URL, { params });

export const create = async (data: Partial<StaffRequest>) =>
  request.post(URL, data);

export const update = async (data: Partial<StaffRequest>) =>
  request.put(URL, data);

export const remove = async (data: Partial<StaffRequest>) =>
  request.delete(URL, { data });

export const assignRole = async (data: StaffRoleRequest) =>
  request.post(`${URL}/roles`, data);
