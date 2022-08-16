import { AxiosError } from 'axios';

import { ValidationErrorDto } from '../dtos/validationError.dto';
import { AppError, AppValidationError } from '../models/appError';

import { ValidationErrorMapper } from './validation-mappers/validationError.mapper';

/** Mapper for app errors. */
export class AppErrorMapper {

  /**
   * Convert http error to application error.
   * @param httpError Http error.
   */
  public static fromDto(httpError: AxiosError): AppError {
    const { message } = httpError;
    return new AppError(message);
  }

  /**
   * Convert http error to error with validation.
   * Can return AppError if response has no validation errors.
   * @param error Axios error.
   * @param mapper Errors mapper.
   */
  public static fromDtoWithValidation<T>(
    error: AxiosError<ValidationErrorDto<T>>,
    mapper: ValidationErrorMapper<T>,
  ): AppError | AppValidationError<T> {

    const { response } = error;

    if (
      response === undefined ||
      response.status !== 400 &&
      response.status !== 401
    ) {
      return this.fromDto(error);
    }
    return new AppValidationError<T>(
      error.message,
      mapper.errorFromDto({
        ...response.data,
        detail: response.data.detail,
      }),
    );
  }
}
