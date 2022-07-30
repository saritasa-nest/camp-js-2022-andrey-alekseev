import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RegistrationData } from '@js-camp/core/models/user';
import { first } from 'rxjs';
import { Router } from '@angular/router';

import { routePaths } from '../../../../core/utils/route-paths';
import { CustomValidators, emailValidators, PasswordRules, passwordValidators } from '../../../../core/utils/forms';
import { AuthService } from '../../../../core/services/auth.service';

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
  public isButtonActive = false;

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
  }

  /** @inheritDoc */
  public ngOnInit(): void {
    this.registrationForm.statusChanges.pipe(
      untilDestroyed(this),
    ).subscribe(
      status => {
        this.isButtonActive = status === 'VALID';
      },
    );
  }

  /** Handle registration form submit. */
  public onSubmit(): void {
    if (!this.registrationForm.valid) {
      return;
    }
    const registrationData: RegistrationData = {
      email: this.registrationForm.value.email as string,
      password: this.registrationForm.value.password as string,
      firstName: this.registrationForm.value.firstName as string,
      lastName: this.registrationForm.value.lastName as string,
    };
    this.authService
      .register(registrationData)
      .pipe(
        first(),
      )
      .subscribe(
        () => this.router.navigate([this.routePaths.home]),
      );
  }
}
