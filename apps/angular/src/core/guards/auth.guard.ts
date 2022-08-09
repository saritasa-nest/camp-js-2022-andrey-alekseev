import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { UserService } from '../services/user.service';
import { routePaths } from '../utils/route-paths';

/** Guard that checks that user is authenticated. */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  public constructor(
    protected readonly userService: UserService,
    protected readonly router: Router,
  ) {
  }

  /**
   * Check that user is authenticated.
   * @param _route Active route snapshot.
   * @param state Router state snapshot.
   */
  public canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> {
    return this.process(state.url);
  }

  /**
   * Check if user is authenticated in user service.
   * Unauthenticated users will be redirected to login page.
   * @param url URL for redirect after login.
   */
  protected process(url = routePaths.home): Observable<boolean | UrlTree> {
    return this.userService.isAuthenticated$.pipe(
      first(),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        }

        return this.router.createUrlTree([routePaths.login], {
          queryParams: { next: url },
        });
      }),
    );
  }
}
