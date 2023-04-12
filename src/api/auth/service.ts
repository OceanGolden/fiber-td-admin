import type { LoginRequest, LoginResponse } from './types';

import request from '@/utils/request';

const URL = '/auth';

export const login = async (
  data: Partial<LoginRequest>,
): Promise<LoginResponse> => request.post(`${URL}/login`, data);
export const logout = async () => request.post(`${URL}/logout`);
