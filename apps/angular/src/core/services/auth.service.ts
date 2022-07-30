import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginData, RegistrationData } from '@js-camp/core/models/user';
import { JWTDto } from '@js-camp/core/dtos/jwt.dto';
import { User } from '@js-camp/core/models/user/user';

import { AppUrlConfigService } from './app-url-config.service';
import { StorageService } from './storage.service';
import { UserService } from './user.service';

/** Authentication service. */
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public constructor(
    private readonly http: HttpClient,
    private readonly appUrls: AppUrlConfigService,
    private readonly storageService: StorageService,
    private readonly userService: UserService,
  ) {}

  /**
   * Login user.
   * @param loginData Login data.
   */
  public login(loginData: LoginData): Observable<User> {
    return this.http.post<JWTDto>(
      this.appUrls.authUrls.login,
      loginData,
    ).pipe(
      switchMap(jwtDto => this.userService.storeUserData(jwtDto)),
    );
  }

  /**
   * Register user.
   * @param registrationData Login data.
   */
  public register(registrationData: RegistrationData): Observable<User> {
    return this.http.post<JWTDto>(
      this.appUrls.authUrls.registration,
      registrationData,
    ).pipe(
      switchMap(jwtDto => this.userService.storeUserData(jwtDto)),
    );
  }
}
