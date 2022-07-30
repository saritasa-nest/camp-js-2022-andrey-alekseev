import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export const noPasswordMatchError = 'NoPasswordMatch';

/** Custom form validators. */
export class CustomValidators {

  /**
   * Validate control value by regex.
   * @param regex Regex to validate.
   * @param error Error that will be returned if value fails regex test.
   */
  public static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === null) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }

  /**
   * Validate confirm password matches.
   * @param control Control.
   */
  public static passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('confirmPassword');
    if (passwordControl === null) {
      throw new Error('There isn\'t password control');
    }
    if (confirmPasswordControl === null) {
      throw new Error('There isn\'t confirmPassword control');
    }

    const password: string = passwordControl.value;
    const confirmPassword: string = confirmPasswordControl.value;

    const isNotSamePassword = password !== confirmPassword;
    if (isNotSamePassword) {
      confirmPasswordControl.setErrors({ [noPasswordMatchError]: true });
      return { [noPasswordMatchError]: isNotSamePassword };
    }
    return null;
  }
}

/** Password rules. */
export enum PasswordRules {
  MinLength = 'minlength',
  HasNumber = 'hasNumber',
  HasLowerCase = 'hasLowerCase',
  HasUpperCase = 'hasUpperCase',
  HasSpecialCharacter = 'hasSpecialCharacter',
}

export const passwordValidators = [
  Validators.required,
  Validators.minLength(8),
  Validators.maxLength(128),
  CustomValidators.patternValidator(
    RegExp('\\d'),
    { [PasswordRules.HasNumber]: true },
  ),
  CustomValidators.patternValidator(
    RegExp('[a-z]'),
    { [PasswordRules.HasLowerCase]: true },
  ),
  CustomValidators.patternValidator(
    RegExp('[A-Z]'),
    { [PasswordRules.HasUpperCase]: true },
  ),
  CustomValidators.patternValidator(
    RegExp(
      '[()[\\]{}|`~!@#$%^&*_\\-+=;:\'",<>./?]',
    ),
    { [PasswordRules.HasSpecialCharacter]: true },
  ),
];

export const emailValidators = [
  Validators.required,
  Validators.email,
];
