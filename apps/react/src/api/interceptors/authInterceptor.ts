import { AxiosRequestConfig } from 'axios';

import { CONFIG } from '../config';
import { StorageService } from '../services/storageService';
import { KEY_ACCESS_TOKEN } from '../constants';
import { ApiUrls } from '../../utils/apiUrls';

/**
 * Checks if a request should be intercepted.
 * @param config Request config.
 */
function shouldInterceptToken(config: AxiosRequestConfig): boolean {
  const { baseURL } = config;
  if (baseURL === undefined || !baseURL.startsWith(CONFIG.apiUrl) || config.url === undefined) {
    return false;
  }
  return !config.url.includes(ApiUrls.authUrls.login);
}

/**
 * Interceptor to append token to requests.
 * @param config Axios config.
 */
export async function authInterceptor(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
  if (!shouldInterceptToken(config)) {
    return config;
  }

  const token = await StorageService.get<string>(KEY_ACCESS_TOKEN);
  if (token === null) {
    return config;
  }
  const { headers } = config;

  if (headers === undefined) {
    throw new Error(
      'Axios did not pass any header. Please check your request.',
    );
  }

  return {
    ...config,
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
}
