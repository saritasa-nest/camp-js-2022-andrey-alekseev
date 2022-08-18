import axios, { AxiosInstance } from 'axios';

import { CONFIG } from './config';
import { authInterceptor } from './interceptors/authInterceptor';
import { errorInterceptor } from './interceptors/errorInterceptor';

export const http: AxiosInstance = axios.create({
  baseURL: CONFIG.apiUrl,
  headers: {
    'Api-key': CONFIG.schemaApiKey,
  },
});
http.interceptors.request.use(baseConfig => authInterceptor(baseConfig));

http.interceptors.response.use(response => response, errorInterceptor);
