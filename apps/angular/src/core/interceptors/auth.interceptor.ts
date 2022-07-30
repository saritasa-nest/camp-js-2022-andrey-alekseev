import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, Observable, switchMap, switchMapTo, take } from 'rxjs';
import { Router } from '@angular/router';

import { TokenService } from '../services/token.service';
import { AppUrlConfigService } from '../services/app-url-config.service';
import { AuthService } from '../services/auth.service';
import { routePaths } from '../utils/route-paths';

/**
 * Auth interceptor.
 * This interceptor adds access token to headers.
 * Also it updates access token if it expired.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;

  private refreshTokenSubject$ = new BehaviorSubject<string | null>(null);

  public constructor(
    private readonly tokenService: TokenService,
    private readonly appUrlConfigService: AppUrlConfigService,
    private readonly authService: AuthService,
    private readonly router: Router,
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
        return next.handle(this.addTokenHeader(request, accessToken)).pipe(
          catchError((error: unknown) => {
            if (error instanceof HttpErrorResponse) {
              // Login returns 401 on bad credentials
              const isLoginRequest = request.url === this.appUrlConfigService.authUrls.login;
              const isRefreshTokenRequest = request.url === this.appUrlConfigService.authUrls.refreshToken;
              if (error.status === 401 && !isRefreshTokenRequest && !isLoginRequest) {
                return this.handleRefreshToken(request, next);
              }
            }
            throw error;
          }),
        );
      }),
    );
  }

  /**
   * Handle refresh token.
   * It tries to refresh token and re-requests all failed
   * requests after refresh.
   * @param request Http request.
   * @param next Http handler.
   */
  private handleRefreshToken(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.isRefreshing) {
      return this.refreshTokenSubject$.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => next.handle(this.addTokenHeader(request, token as string))),
      );
    }

    this.isRefreshing = true;
    this.refreshTokenSubject$.next(null);
    return this.authService.refreshToken().pipe(
      switchMap(token => {
          this.isRefreshing = false;
          if (token === null) {
            return next.handle(request);
          }
          this.refreshTokenSubject$.next(token);
          return next.handle(this.addTokenHeader(request, token));
        }),
      catchError((error: unknown) => {
          this.isRefreshing = false;

          // Remove tokens from storage and redirect to login page
          return this.tokenService.clear().pipe(
            switchMapTo(this.router.navigate([routePaths.login])),
            switchMap(() => {
              throw error;
            }),
          );
        }),
    );
  }

  /**
   * Add token to header.
   * @param request Http request.
   * @param token Access token.
   */
  private addTokenHeader(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  }
}
