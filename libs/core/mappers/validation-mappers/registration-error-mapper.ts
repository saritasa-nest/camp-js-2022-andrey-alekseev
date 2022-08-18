import { RegistrationData } from '../../models/user';
import { getErrorMessage, ValidationErrorDto } from '../../dtos/validationError.dto';
import { ValidationError } from '../../models/appError';

/** Mapper for registration errors. */
export namespace RegistrationErrorMapper {

  /**
   * Map registration errors.
   * @param errorDto Registration error dto.
   */
  export function errorFromDto(errorDto: ValidationErrorDto<RegistrationData> | undefined): ValidationError<RegistrationData> {
    return {
      email: getErrorMessage(errorDto?.data?.email),
      firstName: getErrorMessage(errorDto?.data?.firstName),
      lastName: getErrorMessage(errorDto?.data?.lastName),
      password: getErrorMessage(errorDto?.data?.password),
      detail: errorDto?.detail,
    };
  }
}
