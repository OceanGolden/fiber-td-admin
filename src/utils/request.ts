import type { AxiosError, AxiosResponse } from 'axios';

import axios from 'axios';

import { Token } from '@/common/constants';

import Storage from './storage';

import type { HttpResponse } from '@/common/types';

const instance = axios.create({
  baseURL: '/api',
  timeout: 3 * 1000,
  withCredentials: true,
});

// 拦截请求
instance.interceptors.request.use(
  (config) => {
    const token = Storage.get(Token.Access);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 拦截响应
instance.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const { data } = response.data;
    return data;
  },
  (error: AxiosError<HttpResponse>) => {
    const { response } = error;
    if (response) {
      const { message } = response.data;
      return Promise.reject(message);
    }
    return Promise.reject(error);
  },
);

export default instance;
