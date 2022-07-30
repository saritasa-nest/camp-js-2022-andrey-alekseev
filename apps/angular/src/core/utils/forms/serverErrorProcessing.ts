import { FormGroup } from '@angular/forms';

import { ValidationError } from '../../models/app-errors';

export const SERVER_ERROR_KEY = 'serverError';

/**
 * Set server errors to form controls.
 * @param validationErrors Validation errors.
 * @param formGroup Form group.
 */
export function setServerErrorsToControls<T>(
  validationErrors: ValidationError<T>,
  formGroup: FormGroup,
): void {
  Object.keys(validationErrors).forEach(field => {
    const formControl = formGroup.get(field);
    const error = validationErrors[field as keyof T];
    if (error !== undefined) {
      if (formControl !== null) {
        formControl.setErrors({
          [SERVER_ERROR_KEY]: error,
        });
      } else {
        formGroup.setErrors({
          [SERVER_ERROR_KEY]: error,
        });
      }
    }
  });
}
