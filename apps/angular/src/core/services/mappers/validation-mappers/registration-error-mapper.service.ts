import { RegistrationData } from '@js-camp/core/models/user';
import { Injectable } from '@angular/core';

import { getErrorMessage, ValidationErrorDto } from '../dto/validation-error.dto';
import { ValidationError } from '../../../models/app-errors';

import { ValidationErrorMapper } from './validation-error-mapper';

/** Mapper for registration errors. */
@Injectable({
  providedIn: 'root',
})
export class RegistrationErrorMapper implements ValidationErrorMapper<RegistrationData> {

  /**
   * Map registration errors.
   * @param errorDto Registration error dto.
   */
  public errorFromDto(errorDto: ValidationErrorDto<RegistrationData> | undefined): ValidationError<RegistrationData> {
    return {
      email: getErrorMessage(errorDto?.email),
      password: getErrorMessage(errorDto?.password),
      firstName: getErrorMessage(errorDto?.firstName),
      lastName: getErrorMessage(errorDto?.lastName),
    };
  }
}
