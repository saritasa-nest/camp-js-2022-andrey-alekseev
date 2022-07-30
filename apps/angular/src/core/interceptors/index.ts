import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiKeyInterceptor } from './api-key.interceptor';
import { AuthInterceptor } from './auth.interceptor';

/** Http interceptor providers. */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
