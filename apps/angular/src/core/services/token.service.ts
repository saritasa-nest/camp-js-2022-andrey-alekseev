import { merge, Observable } from 'rxjs';
import { JWTDto } from '@js-camp/core/dtos/jwt.dto';
import { Injectable } from '@angular/core';

import { ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from '../consts';

import { StorageService } from './storage.service';

/** Service for working with tokens. */
@Injectable({
  providedIn: 'root',
})
export class TokenService {

  /** Access token. */
  public readonly accessToken$ = this.storageService.get<string>(ACCESS_TOKEN_STORAGE_KEY);

  /** Refresh token. */
  public readonly refreshToken$ = this.storageService.get<string>(REFRESH_TOKEN_STORAGE_KEY);

  public constructor(
    private readonly storageService: StorageService,
  ) {}

  /**
   * Set tokens.
   * @param jwtDto JWT dto.
   */
  public set(jwtDto: JWTDto): Observable<void> {
    return merge(
      this.storageService.set(ACCESS_TOKEN_STORAGE_KEY, jwtDto.access),
      this.storageService.set(REFRESH_TOKEN_STORAGE_KEY, jwtDto.refresh),
    );
  }

  /** Clear token. */
  public clear(): Observable<void> {
    return merge(
      this.storageService.remove(ACCESS_TOKEN_STORAGE_KEY),
      this.storageService.remove(REFRESH_TOKEN_STORAGE_KEY),
    );
  }
}