import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, tap, map, switchMap, switchMapTo, merge, shareReplay, of } from 'rxjs';
import { User } from '@js-camp/core/models/user/user';
import { UserDto } from '@js-camp/core/dtos/user.dto';
import { HttpClient } from '@angular/common/http';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { JWTDto } from '@js-camp/core/dtos/jwt.dto';

import { TokenService } from './token.service';
import { AppUrlConfigService } from './app-url-config.service';

/** Service for working with user. */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly user$ = new ReplaySubject<User | null>(1);

  private readonly userFromStorage$ = this.tokenService.accessToken$.pipe(
    switchMap(accessToken => {
      if (accessToken === null) {
        return of(null);
      }
      return this.getUser();
    }),
  );

  /** Current user profile. */
  public readonly userProfile$ = merge(
    this.user$,
    this.userFromStorage$,
  ).pipe(
    shareReplay({ refCount: true, bufferSize: 1 }),
  );

  public constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService,
    private readonly appUrls: AppUrlConfigService,
  ) {
  }

  /**
   * Store jwt in storage and set user.
   * @param jwtData JWT token.
   */
  public storeUserData(jwtData: JWTDto): Observable<User> {
    return this.tokenService.set(jwtData).pipe(
      switchMapTo(this.getUser()),
      tap(user => this.user$.next(user)),
    );
  }

  /** Get current user. */
  public getUser(): Observable<User> {
    return this.http.get<UserDto>(this.appUrls.usersUrls.profile).pipe(
      map(response => UserMapper.fromDto(response)),
    );
  }

  /** Remove the token and clear user data. */
  public logout(): Observable<void> {
    return this.tokenService.clear().pipe(
      tap(() => this.user$.next(null)),
    );
  }
}
