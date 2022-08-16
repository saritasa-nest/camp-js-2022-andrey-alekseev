import { ValidationErrorDto } from '../../dtos/validationError.dto';
import { ValidationError } from '../../models/appError';

/** Interface for validation errors mappers. */
export interface ValidationErrorMapper<T> {

  /** Map error from dto. */
  errorFromDto(errorDto: ValidationErrorDto<T> | undefined): ValidationError<T>;
}
