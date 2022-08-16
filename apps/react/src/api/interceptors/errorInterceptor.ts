import { AxiosError, AxiosResponse } from 'axios';

import { store } from '@js-camp/react/store';

import { logoutUser } from '@js-camp/react/store/auth/dispatchers';

import { AuthService } from '../services/authService';
import { http } from '../index';
import { ApiUrls } from '../../utils/apiUrls';

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
      originalRequest.url?.includes(ApiUrls.authUrls.login)
    );
    if (
      response.status === 400 || response.status === 404 ||
      response.status === 401 && isNoTokenExpiredError
    ) {
      throw error;
    }

    const isRefreshTokenRequest = originalRequest.url?.includes(
      ApiUrls.authUrls.tokenRefresh,
    );
    if (response.status === 401 && !isRefreshTokenRequest) {
      try {
        await AuthService.refreshToken();
        return http(originalRequest);
      } catch {
        store.dispatch(logoutUser());
      }
    }
  }

  return Promise.reject(error);
};
