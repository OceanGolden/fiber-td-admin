import request from '@/utils/request';
import type {
  OrganizationParams,
  OrganizationRecord,
  OrganizationRequest,
} from './types';

const URL = '/system/organizations';

export const queryTree = async (
  params: Partial<OrganizationParams>,
): Promise<OrganizationRecord[]> => request.get(`${URL}/tree`, { params });

export const create = async (data: Partial<OrganizationRequest>) =>
  request.post(URL, data);

export const update = async (data: Partial<OrganizationRequest>) =>
  request.put(URL, data);

export const remove = async (data: Partial<OrganizationRequest>) =>
  request.delete(URL, { data });
