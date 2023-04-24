import axios, { AxiosError, AxiosResponse } from 'axios';

import { Token } from '@/common/constants';

import Storage from './storage';

import type { IHttpResponse } from '@/common/types';

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
  (response: AxiosResponse<IHttpResponse>) => {
    const { data } = response.data;
    return data;
  },
  (error: AxiosError<IHttpResponse>) => {
    const { response } = error;
    if (response) {
      const { message } = response.data;
      return Promise.reject(message);
    }
    return Promise.reject(error);
  },
);

export default instance;
