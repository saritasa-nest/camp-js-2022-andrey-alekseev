import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

import { TokenService } from '../services/token.service';

/**
 * Auth interceptor.
 * This interceptor adds access token to headers.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(
    private readonly tokenService: TokenService,
  ) {}

  /** @inheritDoc */
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return this.tokenService.accessToken$.pipe(
      switchMap(accessToken => {
        if (accessToken === null) {
          return next.handle(request);
        }
        const newRequest = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
        });
        return next.handle(newRequest);
      }),
    );
  }
}
