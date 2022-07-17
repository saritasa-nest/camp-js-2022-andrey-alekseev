import { JWTDto } from '@js-camp/core/dtos/jwt.dto';
import { UserRegistrationMapper } from '@js-camp/core/mappers/userRegistration.mapper';
import { RefreshTokenDto } from '@js-camp/core/dtos/refreshToken.dto';
import { UserLoginMapper } from '@js-camp/core/mappers/userLogin.mapper';

import { LoginData, RegistrationData } from '@js-camp/core/models/user';

import { UserHelpers } from '../helpers';
import { http } from '..';

const url = 'auth/';

/** Fields that can be in error. */
export enum RegisterErrorField {
  Email = 'email',
}

/** Error data for registration request. */
export interface RegisterErrorData {

  /** Email error. */
  readonly [RegisterErrorField.Email]?: readonly string[];
}

export namespace AuthService {

  /**
   * Register new user.
   * @param registrationData User registration data.
   */
  export async function register(registrationData: RegistrationData): Promise<void> {
    const userRegistrationDto = UserRegistrationMapper.toDto(registrationData);
    const { data } = await http.post<JWTDto>(`${url}register/`, userRegistrationDto);
    await UserHelpers.setSessionToken(data);
  }

  /**
   * Login user.
   * @param loginData User login data.
   */
  export async function login(loginData: LoginData): Promise<void> {
    const userLoginDto = UserLoginMapper.toDto(loginData);
    const { data } = await http.post<JWTDto>(`${url}login/`, userLoginDto);
    await UserHelpers.setSessionToken(data);
  }

  /** Logout user. */
  export async function logout(): Promise<void> {
    await UserHelpers.clearUserData();
  }

  /** Refresh token. */
  export async function refreshTokens(): Promise<void> {
    const refreshToken = await UserHelpers.getRefreshToken();
    if (refreshToken === null) {
      throw new Error('There isn\'t refresh token');
    }
    const { data } = await http.post<JWTDto>(
      `${url}token/refresh/`,
      { refresh: refreshToken } as RefreshTokenDto,
    );
    await UserHelpers.setSessionToken(data);
  }
}
