import request from '@/utils/request';

import type {
  IOrganizationParams,
  IOrganizationRecord,
  IOrganizationRequest,
} from './types';

const URL = '/system/organizations';

export const queryTree = async (
  params: Partial<IOrganizationParams>,
): Promise<IOrganizationRecord[]> => request.get(`${URL}/tree`, { params });

export const create = async (data: Partial<IOrganizationRequest>) =>
  request.post(URL, data);

export const update = async (data: Partial<IOrganizationRequest>) =>
  request.put(URL, data);

export const remove = async (data: Partial<IOrganizationRequest>) =>
  request.delete(URL, { data });
