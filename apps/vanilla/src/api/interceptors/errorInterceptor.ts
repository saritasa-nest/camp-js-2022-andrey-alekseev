import { AxiosError, AxiosResponse } from 'axios';

import { AuthService } from '../services/authService';
import { http } from '../index';
import { UserHelpers } from '../helpers';
import { AppUrl } from '../../../utils/constants';
import { ApiError } from '../errors';
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

    // Login returns 401 on bad credentials
    const isNoTokenExpiredError = (
      originalRequest.url?.includes('/login/')
    );
    if (
      response.status === 400 || response.status === 404 ||
      response.status === 401 && isNoTokenExpiredError
    ) {
      throw new ApiError(error);
    }

    const isRefreshTokenRequest = originalRequest.url?.includes(
      '/token/refresh/',
    );
    if (response.status === 401 && !isRefreshTokenRequest) {
      try {
        await AuthService.refreshTokens();
        return http(originalRequest);
      } catch {
        await UserHelpers.clearUserData();
        redirect(AppUrl.Login);
      }
    }
  }

  return Promise.reject(error);
};
