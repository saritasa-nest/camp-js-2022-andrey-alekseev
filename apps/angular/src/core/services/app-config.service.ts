import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

/** Service that provides app config. */
@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  /** Base API url. */
  public readonly apiUrl: string = environment.apiUrl;

  /** API key. */
  public readonly apiKey: string = environment.apiKey;
}
