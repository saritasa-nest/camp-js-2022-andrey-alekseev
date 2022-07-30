import { Injectable } from '@angular/core';

import { AppConfigService } from './app-config.service';

interface AnimeUrls {

  /** Anime list url. */
  readonly list: string;
}

interface AuthUrls {

  /** Login url. */
  readonly login: string;

  /** Registration url. */
  readonly registration: string;

  /** Refresh token url. */
  readonly refreshToken: string;
}

interface UsersUrls {

  /** Profile url. */
  readonly profile: string;
}

/** Service that provides API urls. */
@Injectable({
  providedIn: 'root',
})
export class AppUrlConfigService {
  private readonly animePrefix = 'anime/';

  private readonly authPrefix = 'auth/';

  private readonly usersPrefix = 'users/';

  public constructor(
    private readonly appConfig: AppConfigService,
  ) {}

  /** Get anime API urls. */
  public get animeUrls(): AnimeUrls {
    return {
      list: new URL(`${this.animePrefix}anime/`, this.appConfig.apiUrl).toString(),
    };
  }

  /** Get auth API urls. */
  public get authUrls(): AuthUrls {
    return {
      login: new URL(`${this.authPrefix}login/`, this.appConfig.apiUrl).toString(),
      registration: new URL(`${this.authPrefix}register/`, this.appConfig.apiUrl).toString(),
      refreshToken: new URL(`${this.authPrefix}token/refresh/`, this.appConfig.apiUrl).toString(),
    };
  }

  /** Get users API urls. */
  public get usersUrls(): UsersUrls {
    return {
      profile: new URL(`${this.usersPrefix}profile/`, this.appConfig.apiUrl).toString(),
    };
  }
}
