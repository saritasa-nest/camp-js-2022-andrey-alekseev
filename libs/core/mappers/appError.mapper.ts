import { AxiosError } from 'axios';

import { ValidationErrorDto } from '../dtos/validationError.dto';
import { AppError, AppValidationError, ValidationError } from '../models/appError';

export type ValidationErrorMapper = <T extends undefined>(
  errorDto: ValidationErrorDto<T> | undefined
) => ValidationError<T>;

/** Mapper for app errors. */
export namespace AppErrorMapper {

  /**
   * Convert http error to application error.
   * @param httpError Http error.
   */
  export function fromDto(httpError: AxiosError): AppError {
    const { message } = httpError;
    return new AppError(message);
  }

  /**
   * Convert http error to error with validation.
   * Can return AppError if response has no validation errors.
   * @param error Axios error.
   * @param mapperFunc Errors mapper.
   */
  export function fromDtoWithValidation<T>(
    error: AxiosError<ValidationErrorDto<T>>,
    mapperFunc: ValidationErrorMapper<T>,
  ): AppError | AppValidationError<T> {

    const { response } = error;

    if (
      response === undefined ||
      response.status !== 400 &&
      response.status !== 401
    ) {
      return fromDto(error);
    }
    return new AppValidationError<T>(
      error.message,
      mapperFunc({
        ...response.data,
        detail: response.data.detail,
      }),
    );
  }
}
