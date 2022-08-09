import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '@js-camp/core/models/user/user';
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
  public user?: User | null;

  public constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly router: Router,
  ) {}

  /** Handle logout button click. */
  public onLogout(): void {
    this.authService.logout().pipe(
      untilDestroyed(this),
      first(),
    )
      .subscribe(() => this.router.navigate([routePaths.login]));
  }

  /** @inheritDoc */
  public ngOnInit(): void {
    this.userService.userProfile$.pipe(
      untilDestroyed(this),
    ).subscribe(user => {
      this.user = user;
    });
  }
}
