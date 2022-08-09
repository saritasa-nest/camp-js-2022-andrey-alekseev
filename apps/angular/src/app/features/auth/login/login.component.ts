import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LoginData } from '@js-camp/core/models/user';
import { BehaviorSubject, first } from 'rxjs';
import { Router } from '@angular/router';

import { routePaths } from '../../../../core/utils/route-paths';
import {
  emailValidators,
  passwordValidators,
  SERVER_ERROR_KEY,
  setServerErrorsToControls,
} from '../../../../core/utils/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { catchValidationError } from '../../../../core/rxjs/catch-validation-error';
import { AppValidationError } from '../../../../core/models/app-errors';

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
  public isButtonActive$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /** Server validation error key. */
  public readonly serverErrorKey = SERVER_ERROR_KEY;

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  /** @inheritDoc */
  public ngOnInit(): void {
    this.loginForm.statusChanges.pipe(
      untilDestroyed(this),
    ).subscribe(
      status => {
        this.isButtonActive$.next(status === 'VALID');
      },
    );
  }

  /** Handle login form submit. */
  public onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }
    const formValue = this.loginForm.value;
    if (formValue.email === undefined || formValue.password === undefined) {
      return;
    }
    const loginData: LoginData = {
      email: formValue.email,
      password: formValue.password,
    };
    this.authService
      .login(loginData)
      .pipe(
        untilDestroyed(this),
        first(),
        catchValidationError((error: AppValidationError<LoginData>) => {
          setServerErrorsToControls(error.validationErrors, this.loginForm);
          this.changeDetectorRef.markForCheck();
          throw error;
        }),
      )
      .subscribe(
        () => this.router.navigate([this.routePaths.home]),
      );
  }
}
