import axios, { AxiosInstance } from 'axios';

import { CONFIG } from './config';

import { schemaInterceptor } from './interceptors/schemaInterceptor';

export const http: AxiosInstance = axios.create({
  baseURL: CONFIG.apiUrl,
});

http.interceptors.request.use(schemaInterceptor);
