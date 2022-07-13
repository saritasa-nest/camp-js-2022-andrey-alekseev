import { AxiosError, AxiosResponse } from 'axios';

import { AuthService } from '../services/authService';
import { http } from '../index';
import { UserHelpers } from '../helpers';
import { AppUrl } from '../../../utils/constants';
import { ApiError } from '../errors';
import { CONFIG } from '../config';
import { redirect } from '../../../utils/navigation';

/**
 * Interceptor to check if request was failed.
 * @param error Error or AxiosError or anything.
 * @returns Rejected promise with 1st argument.
 */
export const errorInterceptor = async(error: unknown): Promise<AxiosResponse> => {

  if (error instanceof AxiosError) {
    const originalRequest = error.config;
    const { response } = error;
    if (response === undefined) {
      return Promise.reject(error);
    }

    const { headers } = originalRequest;
    const isNoTokenExpiredError = (
      headers === undefined ||
      headers[CONFIG.apiTokenHeader] === undefined
    );
    if (
      response.status === 400 ||
      response.status === 401 && isNoTokenExpiredError
    ) {
      throw new ApiError(error);
    }

    if (response.status === 401) {
      try {
        await AuthService.refreshTokens();
        return http(originalRequest);
      } catch {
        await UserHelpers.clearUserData();
        redirect(AppUrl.Base);
      }
    }
  }

  return Promise.reject(error);
};
