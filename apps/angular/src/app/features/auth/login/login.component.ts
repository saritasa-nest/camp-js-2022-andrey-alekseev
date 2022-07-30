import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LoginData } from '@js-camp/core/models/user';
import { first } from 'rxjs';
import { Router } from '@angular/router';

import { routePaths } from '../../../../core/utils/route-paths';
import { emailValidators, passwordValidators } from '../../../../core/utils/forms';
import { AuthService } from '../../../../core/services/auth.service';

/** Layout component. */
@UntilDestroy()
@Component({
  selector: 'anime-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  /** Route paths. */
  public readonly routePaths = routePaths;

  /** Login form. */
  public readonly loginForm = this.formBuilder.nonNullable.group({
    email: ['', emailValidators],
    password: ['', passwordValidators],
  });

  /** Is button active. */
  public isButtonActive = false;

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
  }

  /** @inheritDoc */
  public ngOnInit(): void {
    this.loginForm.statusChanges.pipe(
      untilDestroyed(this),
    ).subscribe(
      status => {
        this.isButtonActive = status === 'VALID';
      },
    );
  }

  /** Handle login form submit. */
  public onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }
    const loginData: LoginData = {
      email: this.loginForm.value.email as string,
      password: this.loginForm.value.password as string,
    };
    this.authService
      .login(loginData)
      .pipe(
        first(),
      )
      .subscribe(
        () => this.router.navigate([this.routePaths.home]),
      );
  }
}
