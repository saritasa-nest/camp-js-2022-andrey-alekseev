import axios, { AxiosInstance } from 'axios';

import { CONFIG } from './config';

import { authInterceptor } from './interceptors/authInterceptor';
import { errorInterceptor } from './interceptors/errorInterceptor';
import { schemaInterceptor } from './interceptors/schemaInterceptor';

export const http: AxiosInstance = axios.create({
  baseURL: CONFIG.apiUrl,
});

http.interceptors.request.use(async baseConfig => {
  const config = await authInterceptor(baseConfig);
  return schemaInterceptor(config);
});
http.interceptors.response.use(response => response, errorInterceptor);
