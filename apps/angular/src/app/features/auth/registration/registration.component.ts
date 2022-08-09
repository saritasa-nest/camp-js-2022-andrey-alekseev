import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RegistrationData } from '@js-camp/core/models/user';
import { BehaviorSubject, first } from 'rxjs';
import { Router } from '@angular/router';

import { routePaths } from '../../../../core/utils/route-paths';
import {
  CustomValidators,
  emailValidators,
  NO_PASSWORD_MATCH_ERROR_KEY,
  PasswordRules,
  passwordValidators,
  SERVER_ERROR_KEY,
  setServerErrorsToControls,
} from '../../../../core/utils/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { AppValidationError } from '../../../../core/models/app-errors';
import { catchValidationError } from '../../../../core/rxjs/catch-validation-error';

/** Layout component. */
@UntilDestroy()
@Component({
  selector: 'anime-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {

  /** Route paths. */
  public readonly routePaths = routePaths;

  /** Password rules map. */
  public readonly passwordRulesMessageMap: Readonly<Record<PasswordRules, string>> = {
    [PasswordRules.MinLength]: 'Must have at least 8 characters',
    [PasswordRules.HasNumber]: 'Must have at least 1 number',
    [PasswordRules.HasUpperCase]: 'Must have at least 1 upper case letter',
    [PasswordRules.HasLowerCase]: 'Must have at least 1 lower case letter',
    [PasswordRules.HasSpecialCharacter]: 'Must have at least 1 special character',
  };

  /** No password match validation error key. */
  public readonly noPasswordMatchErrorKey = NO_PASSWORD_MATCH_ERROR_KEY;

  /** Server validation error key. */
  public readonly serverErrorKey = SERVER_ERROR_KEY;

  /** Login form. */
  public readonly registrationForm = this.formBuilder.nonNullable.group({
    email: ['', emailValidators],
    password: ['', passwordValidators],
    confirmPassword: ['', Validators.required],
    firstName: ['', Validators.maxLength(30)],
    lastName: ['', Validators.maxLength(30)],
  },
  { validators: [CustomValidators.passwordMatchValidator] });

  /** Is button active. */
  public isButtonActive$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  /** @inheritDoc */
  public ngOnInit(): void {
    this.registrationForm.statusChanges.pipe(
      untilDestroyed(this),
    ).subscribe(
      status => {
        this.isButtonActive$.next(status === 'VALID');
      },
    );
  }

  /** Handle registration form submit. */
  public onSubmit(): void {
    if (!this.registrationForm.valid) {
      return;
    }
    const formValue = this.registrationForm.value;
    if (
      formValue.email === undefined ||
      formValue.password === undefined ||
      formValue.firstName === undefined ||
      formValue.lastName === undefined
    ) {
      return;
    }
    const registrationData: RegistrationData = {
      email: formValue.email,
      password: formValue.password,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
    };
    this.authService
      .register(registrationData)
      .pipe(
        untilDestroyed(this),
        first(),
        catchValidationError((error: AppValidationError<RegistrationData>) => {
          setServerErrorsToControls(error.validationErrors, this.registrationForm);

          // Mark to update controls.
          this.changeDetectorRef.markForCheck();
          throw error;
        }),
      )
      .subscribe(
        () => this.router.navigate([this.routePaths.home]),
      );
  }
}
