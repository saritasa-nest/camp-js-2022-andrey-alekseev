import { ValidationErrorDto } from '../dto/validation-error.dto';
import { ValidationError } from '../../../models/app-errors';

/** Interface for validation errors mappers. */
export interface ValidationErrorMapper<T> {

  /** Map error from dto. */
  errorFromDto(errorDto: ValidationErrorDto<T> | undefined): ValidationError<T>;
}
