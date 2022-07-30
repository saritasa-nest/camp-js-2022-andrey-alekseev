import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, switchMapTo } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginData, RegistrationData } from '@js-camp/core/models/user';
import { JWTDto } from '@js-camp/core/dtos/jwt.dto';
import { User } from '@js-camp/core/models/user/user';
import { RefreshTokenDto } from '@js-camp/core/dtos/refreshToken.dto';

import { AppError } from '../models/app-errors';

import { AppUrlConfigService } from './app-url-config.service';
import { StorageService } from './storage.service';
import { UserService } from './user.service';
import { AppErrorMapper } from './mappers/app-error.mapper';
import { LoginErrorMapper } from './mappers/validation-mappers/login-error-mapper.service';
import { RegistrationErrorMapper } from './mappers/validation-mappers/registration-error-mapper.service';
import { TokenService } from './token.service';

/** Authentication service. */
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public constructor(
    private readonly http: HttpClient,
    private readonly appUrls: AppUrlConfigService,
    private readonly storageService: StorageService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly appErrorMapper: AppErrorMapper,
    private readonly loginErrorMapper: LoginErrorMapper,
    private readonly registrationErrorMapper: RegistrationErrorMapper,
  ) {}

  /**
   * Login user.
   * @param loginData Login data.
   */
  public login(loginData: LoginData): Observable<User> {
    return this.http.post<JWTDto>(
      this.appUrls.authUrls.login,
      loginData,
    ).pipe(
      switchMap(jwtDto => this.userService.storeUserData(jwtDto)),
      catchError((httpError: unknown) => {
        if (httpError instanceof HttpErrorResponse) {
          throw this.appErrorMapper.fromDtoWithValidation<LoginData>(httpError, this.loginErrorMapper);
        }
        throw httpError;
      }),
    );
  }

  /**
   * Register user.
   * @param registrationData Login data.
   */
  public register(registrationData: RegistrationData): Observable<User> {
    return this.http.post<JWTDto>(
      this.appUrls.authUrls.registration,
      registrationData,
    ).pipe(
      switchMap(jwtDto => this.userService.storeUserData(jwtDto)),
      catchError((httpError: unknown) => {
        if (httpError instanceof HttpErrorResponse) {
          throw this.appErrorMapper.fromDtoWithValidation<LoginData>(httpError, this.registrationErrorMapper);
        }
        throw httpError;
      }),
    );
  }

  /** Refresh access token.
   * @returns Access token.
   */
  public refreshToken(): Observable<string | null> {
    return this.tokenService.refreshToken$.pipe(
      switchMap(refreshToken => {
        if (refreshToken === null) {
          throw new AppError('User not logged in.');
        }
        return this.http.post<JWTDto>(
          this.appUrls.authUrls.refreshToken,
          { refresh: refreshToken } as RefreshTokenDto,
        ).pipe(
          switchMap(jwtDto => this.tokenService.set(jwtDto)),
          switchMapTo(this.tokenService.accessToken$),
        );
      }),
    );
  }

  /** Logout user. */
  public logout(): Observable<void> {
    return this.userService.removeUserData();
  }
}
