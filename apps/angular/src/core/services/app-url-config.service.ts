import { Injectable } from '@angular/core';

import { AppConfigService } from './app-config.service';

interface AnimeUrls {

  /** Anime list url. */
  readonly list: string;
}

/** Service that provides API urls. */
@Injectable({
  providedIn: 'root',
})
export class AppUrlConfigService {
  private readonly animePrefix = 'anime/';

  public constructor(
    private readonly appConfig: AppConfigService,
  ) {}

  /** Get anime API urls. */
  public get animeUrls(): AnimeUrls {
    return {
      list: new URL(`${this.animePrefix}anime/`, this.appConfig.apiUrl).toString(),
    };
  }
}
