import { JWTDto } from '@js-camp/core/dtos/jwt.dto';
import { UserRegistrationMapper } from '@js-camp/core/mappers/userRegistration.mapper';
import { RefreshTokenDto } from '@js-camp/core/dtos/refreshToken.dto';
import { UserLoginMapper } from '@js-camp/core/mappers/userLogin.mapper';
import { LoginData, RegistrationData } from '@js-camp/core/models/user';
import { User } from '@js-camp/core/models/user/user';
import { AxiosError } from 'axios';
import { AppErrorMapper } from '@js-camp/core/mappers/appError.mapper';
import { LoginErrorMapper } from '@js-camp/core/mappers/validation-mappers/login-error-mapper';
import { RegistrationErrorMapper } from '@js-camp/core/mappers/validation-mappers/registration-error-mapper';

import { http } from '..';
import { KEY_ACCESS_TOKEN, KEY_REFRESH_TOKEN } from '../constants';
import { ApiUrls } from '../../utils/apiUrls';

import { StorageService } from './storageService';
import { UserService } from './userService';

export namespace AuthService {

  /**
   * Register new user.
   * @param registrationData User registration data.
   */
  export async function register(registrationData: RegistrationData): Promise<User> {
    const userRegistrationDto = UserRegistrationMapper.toDto(registrationData);
    try {
      const { data } = await http.post<JWTDto>(ApiUrls.authUrls.register, userRegistrationDto);
      await setTokens(data);
      return UserService.getProfile();
    } catch (error: unknown) {
      if (!(error instanceof AxiosError)) {
        throw error;
      }
      throw AppErrorMapper.fromDtoWithValidation(
        error,
        RegistrationErrorMapper.errorFromDto,
      );
    }

  }

  /**
   * Login user.
   * @param loginData User login data.
   */
  export async function login(loginData: LoginData): Promise<User> {
    const userLoginDto = UserLoginMapper.toDto(loginData);
    try {
      const { data } = await http.post<JWTDto>(ApiUrls.authUrls.login, userLoginDto);
      await setTokens(data);
      return UserService.getProfile();
    } catch (error: unknown) {
      if (!(error instanceof AxiosError)) {
        throw error;
      }
      throw AppErrorMapper.fromDtoWithValidation(
        error,
        LoginErrorMapper.errorFromDto,
      );
    }

  }

  /** Logout user. */
  export async function logout(): Promise<void> {
    await clearTokens();
  }

  /** Refresh token. */
  export async function refreshToken(): Promise<void> {
    const token = await StorageService.get(KEY_REFRESH_TOKEN);
    if (token === null) {
      throw new Error('There isn\'t refresh token');
    }
    const { data } = await http.post<JWTDto>(
      ApiUrls.authUrls.tokenRefresh,
      { refresh: token } as RefreshTokenDto,
    );
    await setTokens(data);
  }

  /**
   * Set jwt tokens.
   * @param jwt JWT tokens.
   */
  async function setTokens(jwt: JWTDto): Promise<void> {
    await StorageService.set(KEY_ACCESS_TOKEN, jwt.access);
    await StorageService.set(KEY_REFRESH_TOKEN, jwt.refresh);
  }

  /** Clear jwt tokens. */
  async function clearTokens(): Promise<void> {
    await StorageService.remove(KEY_ACCESS_TOKEN);
    await StorageService.remove(KEY_REFRESH_TOKEN);
  }
}
