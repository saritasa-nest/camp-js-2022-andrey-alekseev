import { LoginData } from '@js-camp/core/models/user';
import { Injectable } from '@angular/core';

import { getErrorMessage, ValidationErrorDto } from '../dto/validation-error.dto';
import { ValidationError } from '../../../models/app-errors';

import { ValidationErrorMapper } from './validation-error-mapper';

/** Mapper for login errors. */
@Injectable({
  providedIn: 'root',
})
export class LoginErrorMapper implements ValidationErrorMapper<LoginData> {

  /**
   * Map login errors.
   * @param errorDto Login error dto.
   */
  public errorFromDto(errorDto: ValidationErrorDto<LoginData> | undefined): ValidationError<LoginData> {
    return {
      email: getErrorMessage(errorDto?.email),
      password: getErrorMessage(errorDto?.password),
      detail: errorDto?.detail,
    };
  }
}
