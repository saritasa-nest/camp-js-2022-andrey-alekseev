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
   * @param registrationForm User registration form.
   */
  export async function register(registrationForm: RegistrationData): Promise<void> {
    const userRegistrationDto = UserRegistrationMapper.toDto(registrationForm);
    const { data } = await http.post<JWTDto>(`${url}register/`, userRegistrationDto);
    await UserHelpers.setSessionToken(data);
  }

  /**
   * Login user.
   * @param loginForm User register form.
   */
  export async function login(loginForm: LoginData): Promise<void> {
    const userLoginDto = UserLoginMapper.toDto(loginForm);
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
