import { AxiosRequestConfig } from 'axios';

import { CONFIG } from '../config';

/**
 * Interceptor that adds the schema API key header to the request.
 * @param config Axios config.
 */
export function schemaInterceptor(config: AxiosRequestConfig): AxiosRequestConfig {
  const { headers } = config;

  if (headers === null) {
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
}
