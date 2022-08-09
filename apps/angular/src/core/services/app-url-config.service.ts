import { Injectable } from '@angular/core';

import { AppConfigService } from './app-config.service';

interface AnimeUrls {

  /** Anime list url. */
  readonly list: string;

  /** Anime details url. */
  readonly details: (id: number) => string;

  /** Studios list url. */
  readonly studios: string;
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

interface S3DirectUrls {

  /** S3 direct params url. */
  readonly getParams: string;
}

/** Service that provides API urls. */
@Injectable({
  providedIn: 'root',
})
export class AppUrlConfigService {
  private readonly animePrefix = 'anime/';

  private readonly authPrefix = 'auth/';

  private readonly usersPrefix = 'users/';

  private readonly s3directPrefix = 's3direct/';

  public constructor(
    private readonly appConfig: AppConfigService,
  ) {}

  /** Get anime API urls. */
  public get animeUrls(): AnimeUrls {
    return {
      list: new URL(`${this.animePrefix}anime/`, this.appConfig.apiUrl).toString(),
      details: (id: number) => new URL(`${this.animePrefix}anime/${id}/`, this.appConfig.apiUrl).toString(),
      studios: new URL(`${this.animePrefix}studios/`, this.appConfig.apiUrl).toString(),
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

  /** Get s3direct API urls. */
  public get s3directUrls(): S3DirectUrls {
    return {
      getParams: new URL(`${this.s3directPrefix}get_params/`, this.appConfig.apiUrl).toString(),
    };
  }
}
