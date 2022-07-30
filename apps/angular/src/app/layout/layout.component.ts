import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, first, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { routePaths } from '../../core/utils/route-paths';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';

/** Layout component. */
@UntilDestroy()
@Component({
  selector: 'anime-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {

  /** Route paths. */
  public readonly routePaths = routePaths;

  /** User profile. */
  public user$ = this.userService.userProfile$;

  /** Is page loading. */
  public isLoading$ = new BehaviorSubject<boolean>(true);

  public constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly router: Router,
  ) {}

  /** Handle logout button click. */
  public onLogout(): void {
    this.authService.logout().pipe(
      first(),
      tap(() => this.router.navigate([routePaths.home])),
      untilDestroyed(this),
    )
      .subscribe();
  }

  /** @inheritDoc */
  public ngOnInit(): void {
    this.userService.userProfile$.pipe(
      tap(() => this.isLoading$.next(false)),
      untilDestroyed(this),
    ).subscribe();
  }
}
