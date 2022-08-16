import { LoginData } from '../../models/user';
import { getErrorMessage, ValidationErrorDto } from '../../dtos/validationError.dto';
import { ValidationError } from '../../models/appError';

import { ValidationErrorMapper } from './validationError.mapper';

/** Mapper for login errors. */
export class LoginErrorMapper implements ValidationErrorMapper<LoginData> {

  /**
   * Map login errors.
   * @param errorDto Login error dto.
   */
  public errorFromDto(errorDto: ValidationErrorDto<LoginData> | undefined): ValidationError<LoginData> {
    return {
      email: getErrorMessage(errorDto?.data?.email),
      password: getErrorMessage(errorDto?.data?.password),
      detail: errorDto?.detail,
    };
  }
}
