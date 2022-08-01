import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AppError, AppValidationError } from '../../models/app-errors';

import { ValidationErrorMapper } from './validation-mappers/validation-error-mapper';

/** Mapper for app errors. */
@Injectable({
  providedIn: 'root',
})
export class AppErrorMapper {

  /**
   * Convert http error to application error.
   * @param httpError Http error.
   */
  public fromDto(httpError: HttpErrorResponse): AppError {
    const { message } = httpError;
    return new AppError(message);
  }

  /**
   * Convert http error to error with validation.
   * Can return AppError if response has no validation errors.
   * @param httpError Http error.
   * @param mapper Errors mapper.
   */
  public fromDtoWithValidation<T>(
    httpError: HttpErrorResponse,
    mapper: ValidationErrorMapper<T>,
  ): AppError | AppValidationError<T> {
    if (
      httpError.status !== 400 &&
      httpError.status !== 401
    ) {
      return this.fromDto(httpError);
    }
    return new AppValidationError<T>(
      httpError.error.detail,
      mapper.errorFromDto({
        ...httpError.error.data,
        detail: httpError.error.detail,
      }),
    );
  }
}
