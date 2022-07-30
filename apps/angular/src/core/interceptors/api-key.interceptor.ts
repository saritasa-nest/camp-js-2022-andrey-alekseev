import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppConfigService } from '../services/app-config.service';

/**
 * Api key interceptor.
 * This interceptor adds api key to headers.
 * This key determines what data will be processed.
 */
@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  public constructor(
    private readonly appConfigService: AppConfigService,
  ) {}

  /** @inheritDoc */
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const newRequest = request.clone({
      headers: request.headers.set('Api-Key', this.appConfigService.apiKey),
    });
    return next.handle(newRequest);
  }
}
