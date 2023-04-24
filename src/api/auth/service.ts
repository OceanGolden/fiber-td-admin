import type { ILoginRequest, ILoginResponse, IUserInfoState } from './types';

import request from '@/utils/request';

const URL = '/auth';

export const login = async (
  data: Partial<ILoginRequest>,
): Promise<ILoginResponse> => request.post(`${URL}/login`, data);

export const logout = async () => request.post(`${URL}/logout`);

export const refresh = async () => request.post(`${URL}/refresh`);

export const info = async (): Promise<IUserInfoState> =>
  request.get(`${URL}/info `);
