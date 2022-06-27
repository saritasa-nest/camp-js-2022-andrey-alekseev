import { AxiosRequestConfig } from 'axios';

import { CONFIG } from '../config';
import { StorageService } from '../services/storageService';
import { KEY_ACCESS_TOKEN } from '../../../utils/localStorageKeys';

/**
 * Checks if a request should be intercepted.
 * @param config Request config.
 */
function shouldInterceptToken(config: AxiosRequestConfig): boolean {
  return config.baseURL?.startsWith(CONFIG.apiUrl) ?? false;
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
      // eslint-disable-next-line @typescript-eslint/naming-convention
      [CONFIG.apiTokenHeader]: `Bearer ${token}`,
    },
  };
}
