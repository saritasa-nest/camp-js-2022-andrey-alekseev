import { LoginData } from '../../models/user';
import { getErrorMessage, ValidationErrorDto } from '../../dtos/validationError.dto';
import { ValidationError } from '../../models/appError';

/** Mapper for login errors. */
export namespace LoginErrorMapper {

  /**
   * Map login errors.
   * @param errorDto Login error dto.
   */
  export function errorFromDto(errorDto: ValidationErrorDto<LoginData> | undefined): ValidationError<LoginData> {
    return {
      email: getErrorMessage(errorDto?.data?.email),
      password: getErrorMessage(errorDto?.data?.password),
      detail: errorDto?.detail,
    };
  }
}
