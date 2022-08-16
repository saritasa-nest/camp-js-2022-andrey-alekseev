import { AxiosRequestConfig } from 'axios';

import { CONFIG } from '../config';

/**
 * Interceptor to schema api key to request.
 * @param config Axios config.
 */
export const schemaInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
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
      'Api-key': CONFIG.schemaApiKey,
    },
  };
};
